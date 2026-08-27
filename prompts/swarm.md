---
description: Execute contract-driven parallel implementation swarm across isolated backend and frontend workers with automated test evaluation and ticket synchronization
argument-hint: "<ticket-or-feature-slice>"
---
You are acting as the **Lead Swarm Orchestrator**.
Target slice to implement: "$1"
Additional details: ${@:2:-"Follow spec and contract-driven parallelism"}

Execute the **Contract-Driven Parallel Swarm Protocol** (Anthropic Orchestrator-Workers & Evaluator-Optimizer Pattern):

---

### Phase 1: Topology Discovery & Contract Lock (Single Source of Truth)
1. **Dynamic Workspace & Topology Recon**:
   - Inspect repository structure to determine the architecture topology:
     - **Microservices / Monorepo**: Identify target service/app paths (e.g. `services/<service-name>/`, `apps/<app-name>/`, `packages/<pkg-name>/`, `crates/<crate-name>/`).
     - **Modular / Feature-Sliced**: Identify target domain modules (e.g. `src/features/<feature>/`, `src/modules/<domain>/`).
     - **Layered / Standard**: Identify backend and frontend root seams (e.g. `backend/` / `frontend/`, `cmd/` / `internal/`, `src/server/` / `src/client/`).
   - Inspect package manifests in the target service/app directories to verify exact dependency versions.
   - Check past project failure memories via `memory_search(query="$1", category="failure")`.

2. **Author / Verify the Shared Contract File**:
   - Write or verify the shared typed contract file in the repo's designated contract location (e.g. `packages/contracts/`, `src/contracts/`, `proto/`, or domain types).
   - Ensure the contract defines request/response schemas, validation rules, and error envelopes.
   - Run typecheck or linter on the contract to ensure it is 100% valid on disk before delegating.

---

### Phase 2: Parallel Layered Execution Swarm (`subagent_parallel`)
Launch specialized background workers concurrently, passing their **dynamically resolved, non-overlapping target directories**:

```typescript
subagent_parallel({
  tasks: [
    {
      agent: "backend",
      task: `Implement backend domain logic, database queries/migrations, and API endpoints for slice '$1' strictly adhering to the contract in <contract-file-path>.
Scope boundary: Confine ALL file modifications strictly within the target backend service/module directory (e.g. <target-backend-dir>). Follow the Zero-Noise Comments policy.`
    },
    {
      agent: "frontend",
      task: `Implement UI components, layout integration, client hooks, and 5 UI states (Loading, Success, Empty, Error, Unauthorized) for slice '$1' consuming the contract in <contract-file-path>.
Scope boundary: Confine ALL file modifications strictly within the target frontend app/module directory (e.g. <target-frontend-dir>). Follow the Zero-Noise Comments policy.`
    },
    {
      agent: "qa",
      task: `Author comprehensive integration and contract validation tests for slice '$1' in <target-test-dir> covering edge cases and schema validation.`
    }
  ]
})
```

---

### Phase 3: Evaluator-Optimizer Loop (`test-runner` + `reviewer`)
1. **Test Suite Execution**:
   - Dispatch `test-runner` to execute the relevant test command for the target services (`{{TEST_COMMAND}}` or service-specific test script).
   - If tests fail, send targeted failure diagnostics to the responsible worker (`backend` or `frontend`) in a closed optimizer loop until tests pass.
2. **Code & Quality Audit**:
   - Dispatch `reviewer` to audit all modified files in the target directories against the 12 Fowler Code Smells and the **Zero-Noise Code Commenting Policy**.

---

### Phase 4: Atomic Commit & Task Synchronization
1. **Final Pre-Flight Check**:
   - Run verification commands (`{{TYPECHECK_COMMAND}}` and `{{TEST_COMMAND}}`) across the affected workspace/services.
2. **Update Task Trackers**:
   - Mark the slice as completed in `docs/tickets.md`:
     `[x] $1 -> Verified by <test-path> (Commit: <hash>)`
   - Update active session `todo` item via `todo toggle <id>`.
3. **Atomic Commit**:
   - Stage verified files and create an atomic Conventional Commit (`feat(<service-or-scope>): ...`).
