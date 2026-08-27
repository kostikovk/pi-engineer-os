---
description: Execute contract-driven parallel implementation swarm across isolated backend and frontend workers with automated test evaluation and ticket synchronization
argument-hint: "<ticket-or-feature-slice>"
---
You are acting as the **Lead Swarm Orchestrator**.
Target slice to implement: "$1"
Additional details: ${@:2:-"Follow spec and contract-driven parallelism"}

Execute the **Contract-Driven Parallel Swarm Protocol** (Anthropic Orchestrator-Workers & Evaluator-Optimizer Pattern):

---

### Phase 1: Contract Lock (Single Source of Truth)
1. **Pre-flight & Manifest Verification**:
   - Inspect local package manifests (`package.json`, `Cargo.toml`, etc.) to confirm exact installed versions of frameworks and validation libraries (Zod, Pydantic, Prisma, React, etc.).
   - Check past project failure memories via `memory_search(query="$1", category="failure")`.
2. **Author the Shared Contract File**:
   - Before launching parallel workers, write or verify the shared typed contract file (e.g. `src/contracts/*.schema.ts`, `src/types/*.ts`, or project convention).
   - Ensure the contract includes request/response schemas, validation rules, and error envelopes.
   - Run typecheck (`{{TYPECHECK_COMMAND}}`) to ensure the contract is 100% valid on disk.

---

### Phase 2: Parallel Layered Execution Swarm (`subagent_parallel`)
Launch specialized background workers concurrently with **strict non-overlapping file boundaries**:

```typescript
subagent_parallel({
  tasks: [
    {
      agent: "backend",
      task: `Implement backend services, database queries/migrations, and API route handlers for slice '$1' strictly adhering to the contract in <contract-file-path>. Keep all file mutations strictly inside backend directories (e.g. src/server/**, src/api/**). Follow Zero-Noise Comments policy.`
    },
    {
      agent: "frontend",
      task: `Implement UI components, layout integration, client hooks, and 5 UI states (Loading, Success, Empty, Error, Unauthorized) for slice '$1' consuming the contract in <contract-file-path>. Keep all file mutations strictly inside frontend directories (e.g. src/components/**, src/pages/**). Follow Zero-Noise Comments policy.`
    },
    {
      agent: "qa",
      task: `Author comprehensive integration and contract validation tests for slice '$1' covering edge cases and schema validation.`
    }
  ]
})
```

---

### Phase 3: Evaluator-Optimizer Loop (`test-runner` + `reviewer`)
1. **Test Suite Execution**:
   - Dispatch `test-runner` to execute the full test suite (`{{TEST_COMMAND}}`).
   - If tests fail, send targeted failure diagnostics to the responsible worker (`backend` or `frontend`) in a closed optimizer loop until tests pass.
2. **Code & Quality Audit**:
   - Dispatch `reviewer` to audit all modified files against the 12 Fowler Code Smells and the **Zero-Noise Code Commenting Policy**.

---

### Phase 4: Atomic Commit & Task Synchronization
1. **Final Pre-Flight Check**:
   - Run `{{TYPECHECK_COMMAND}}` and `{{TEST_COMMAND}}` in the main process.
2. **Update Task Trackers**:
   - Mark the slice as completed in `docs/tickets.md`:
     `[x] $1 -> Verified by <test-path> (Commit: <hash>)`
   - Update active session `todo` item via `todo toggle <id>`.
3. **Atomic Commit**:
   - Stage verified files and create an atomic Conventional Commit (`feat(scope): ...`).
