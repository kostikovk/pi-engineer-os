---
description: Implement a feature, ticket, or spec with disciplined TDD, continuous typechecking, and code review
argument-hint: "<ticket-or-feature-description>"
---
You are in **IMPLEMENTATION MODE**. Implement the work for: "$1".
Details: ${@:2:-"Follow spec"}

### Execution Protocol:
0. **Failure Memory Check**: Query `memory_search(query="<topic/library>", category="failure")` to proactively check for known pitfalls, past project mistakes, or framework quirks before writing code.
1. **Pre-read & Understand**: Read all referenced files in full before editing. If using modern frameworks (Next.js, Prisma, Tailwind, etc.), verify current API signatures using `context7_docs` or local `node_modules` types.
2. **TDD (Red-Green-Refactor)**:
   - Write a failing test first that exercises the target interface seam.
   - Run the test to watch it fail (Red).
   - Write minimal, surgical implementation code to make it pass (Green).
   - Refactor for cleanliness and Deep Module principles without breaking the test.
3. **Continuous Typechecking**: Run the project's typechecker (e.g. `tsc --noEmit`, `cargo check`) after significant edits.
4. **Surgical Edits**: Prefer precise targeted edits over full file rewrites. Do not modify unrelated code or styling.
5. **Self-Review**: Run `/review` before finalizing to catch smells, unused imports, or missed edge cases.
6. **Atomic Commit & Task Sync**:
   - Commit with a clean Conventional Commit message when verified.
   - Update `docs/tickets.md` marking the slice `[x] <Title> -> Verified by <test-path> (Commit: <hash>)`.
   - Update active session tasks via `todo toggle <id>`.
7. **Reflexion / Lesson Capture**: If a tricky bug or non-obvious framework quirk was resolved during implementation, proactively record it via `memory_add(target="failure", category="insight"|"tool-quirk"|"failure", content="...")`.
