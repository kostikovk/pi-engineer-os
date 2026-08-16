---
description: Discover repository architecture (monolith, monorepo, microservices) and initialize tailored AGENTS.md, CONTEXT.md, and ADR baseline
argument-hint: "[extra-context]"
---
You are acting as a Principal Systems Architect bootstrapping the engineering environment for this repository.
Additional instructions / context: ${@:-"Full autonomous discovery"}

Execute the following 4-step onboarding protocol:

### Step 1: Deep Repository Discovery
Examine the repository filesystem and configuration files to determine:
1. **Architecture Topology**:
   - **Monorepo**: Look for `turbo.json`, `pnpm-workspace.yaml`, `nx.json`, `lerna.json`, `go.work`, or `workspaces` in `package.json`. Map out `apps/*` vs `packages/*`.
   - **Monolith**: Single root fullstack or backend/frontend repository.
   - **Microservices / Multirepo**: Multiple independent services with Dockerfile / proto / OpenAPI contracts.
2. **Tech Stack & Tooling**:
   - Package manager (`bun`, `pnpm`, `npm`, `yarn`, `cargo`, `go modules`).
   - Core frameworks (Next.js, React, Node, FastAPI, Go, Rust, etc.).
   - Database / ORM (Prisma, Drizzle, TypeORM, raw SQL, Mongo).
   - Test framework (Vitest, Jest, Playwright, Pytest, Go test).
   - Typechecking & linting commands (e.g. `tsc --noEmit`, `biome check`, `eslint`).

### Step 2: Generate Tailored `AGENTS.md`
Generate or update `AGENTS.md` in the project root containing:
- **Topology Rules**: If Monorepo, declare strict boundary rules (apps cannot import apps directly; packages must expose clean public interfaces).
- **Core Engineering Disciplines**: No blind edits, read before write, TDD red-green loop, deep modules (Ousterhout), and atomic conventional commits.
- **Verified CLI Commands**: Exact commands to run tests, typecheck, lint, build, and database migrations.
- **Protected Paths**: Files the agent should never overwrite blindly (`.env*`, `.git/`, lockfiles without permission).

### Step 3: Bootstrap Initial `CONTEXT.md` (Domain Glossary)
Create `CONTEXT.md` in the root (or `docs/domain/`) capturing:
- Core Domain Entities (e.g., User, Organization, Document, Subscription) extracted from DB schemas or types.
- Ubiquitous Language definitions (replace 20-word explanations with precise domain terms).

### Step 4: Setup Architecture Decision Records (`docs/adr/`)
Ensure `docs/adr/` directory exists and create `docs/adr/0001-record-architecture-baseline.md` documenting the discovered stack, topology, and key architectural choices.

Report back to the user with a concise summary of the discovered topology and the generated artifacts.
