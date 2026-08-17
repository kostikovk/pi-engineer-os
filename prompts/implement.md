---
description: Implement a feature, ticket, or spec with disciplined TDD, continuous typechecking, and code review
argument-hint: "<ticket-or-feature-description>"
---
You are in **IMPLEMENTATION MODE**. Implement the work for: "$1".
Details: ${@:2:-"Follow spec"}

### Execution Protocol:
1. **Pre-read & Understand**: Read all referenced files in full before editing. If using modern frameworks (Next.js, Prisma, Tailwind, etc.), verify current API signatures using `context7_docs` or local `node_modules` types.
2. **TDD (Red-Green-Refactor)**:
   - Write a failing test first that exercises the target interface seam.
   - Run the test to watch it fail (Red).
   - Write minimal, surgical implementation code to make it pass (Green).
   - Refactor for cleanliness and Deep Module principles without breaking the test.
3. **Continuous Typechecking**: Run the project's typechecker (e.g. `tsc --noEmit`, `cargo check`) after significant edits.
4. **Surgical Edits**: Prefer precise targeted edits over full file rewrites. Do not modify unrelated code or styling.
5. **Self-Review**: Run `/review` before finalizing to catch smells, unused imports, or missed edge cases.
6. **Atomic Commit**: Commit with a clean Conventional Commit message when verified.
