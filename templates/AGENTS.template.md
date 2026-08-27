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

## 5. Live Manifest as Ground Truth & Zero Hallucinations
- **Manifest is the Single Source of Truth**: Package and library versions MUST ALWAYS be inspected directly from the project's local manifest or lockfiles (`package.json`, `pnpm-lock.yaml`, `Cargo.lock`, `pyproject.toml`, `go.mod`).
- **Never rely on memory or assumptions for versions**: Do not guess versions or read them from persistent memory. Codebases update dependencies frequently on disk.
- **Version-Accurate Verification**: Before implementing code with external frameworks (Next.js, Prisma, React, Tailwind, Stripe, Supabase), read the installed version from the manifest first, then use `context7_docs` or inspect local types in `node_modules/` to verify current method signatures.
- Never guess or use deprecated APIs from past versions.

## 6. Zero-Noise Code Comments & Self-Documenting Code
- **Self-Documenting Code First**: Write expressive function and variable names instead of relying on explanatory comments.
- **Strictly Prohibit AI Comment Noise**:
  - NEVER add echo/redundant comments (`// fetch user`, `// check if valid`, `// return result`).
  - NEVER write "HOW" narration comments inside function bodies.
  - NEVER insert decorative section banners or changelog attribution comments.
- **Only 4 Valid Comment Scenarios**:
  1. *Rationale ("WHY")*: Non-obvious trade-offs or domain business rules.
  2. *Workarounds*: External vendor/browser bugs linked to issue URLs.
  3. *Public Contracts*: TSDoc/JSDoc describing public interface invariants, `@throws`, and preconditions (without repeating types).
  4. *Complex Math / Invariants / Regex*: Complex algorithms requiring intent clarification.

## 7. Verification & Pre-Flight Checks
Before claiming a task is complete, run the project's verification suite:
- **Typecheck**: `{{TYPECHECK_COMMAND}}`
- **Tests**: `{{TEST_COMMAND}}`
- **Lint**: `{{LINT_COMMAND}}`

## 8. Task Lifecycle & External Trackers
- **External Trackers**: Reference external issue keys (`PROJ-123`, `#45`) in `/grill`, `/spec`, and `/tickets`.
- **Active Buffer**: Active technical slices live in `docs/tickets.md` and sync to the interactive TUI (`todo`).
- **Completion**: Completed slices are updated with a 1-line verified proof (`[x] Slice -> Verified by <test> (Commit: <hash>)`).
- **Archiving**: Finished milestones are archived to `docs/archive/tickets-*.md` to keep the active context clean.

## 9. Commit Standards
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `test:`).
- One logical change per atomic commit.
