# Engineering Operating Standards (AGENTS.md)

Welcome to the project. All AI agents working in this repository must strictly adhere to the following engineering standards.

## 1. Intent Before Mutation (Read Before Edit)
- Never assume file contents or directory structure. Inspect files in full before editing.
- Do not make blind edits. Formulate the design and identify the seam before modifying code.

## 2. Deep Modules Architecture (John Ousterhout)
- Strive for **Deep Modules**: small, clean public interfaces that hide extensive implementation complexity.
- Avoid **Shallow Modules**: bloated interfaces that merely delegate to other functions.
- Apply **The Deletion Test**: If deleting a module makes complexity reappear across callers, the module is earning its keep.

## 3. Test-Driven Development (TDD)
- When implementing a feature or fixing a bug, write a failing test first (*Red*).
- Implement the minimal code required to pass (*Green*).
- Refactor for clarity and performance without altering behavior (*Refactor*).

## 4. Surgical Precision & Blast Radius
- Keep edits localized. Do not reformat unrelated lines or change unrelated dependencies.
- Sequence wide refactors using the **Expand-Contract** pattern.

## 5. Modern Documentation & Zero Hallucinations
- Before implementing code with external frameworks (Next.js, Prisma, React, Tailwind, Stripe, Supabase), use `context7_docs` or inspect local types in `node_modules/` to verify current method signatures.
- Never guess or use deprecated APIs from past versions.

## 6. Verification & Pre-Flight Checks
Before claiming a task is complete, run the project's verification suite:
- **Typecheck**: `{{TYPECHECK_COMMAND}}`
- **Tests**: `{{TEST_COMMAND}}`
- **Lint**: `{{LINT_COMMAND}}`

## 7. Commit Standards
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `test:`).
- One logical change per atomic commit.
