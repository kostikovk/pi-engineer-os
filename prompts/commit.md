---
description: Create atomic, verified Conventional Commits grounded in current git diff
argument-hint: "[optional-commit-message-hint]"
---
You are in **ATOMIC COMMIT MODE**. Inspect, verify, and commit current workspace changes.
Hint provided: "${@:-"Auto-detect from diff"}"

### Execution Protocol:

1. **Inspect Workspace State**:
   - Run `git status` and `git diff --stat` to see staged and unstaged files.
   - If nothing is staged and unstaged files exist, determine which files belong to the current logical unit.

2. **Pre-Commit Verification**:
   - Run the project's typechecker (e.g. `tsc --noEmit`, `cargo check`, `go vet`, `bun run check` etc.).
   - Run targeted tests for the changed files.
   - If tests or typechecks fail: **DO NOT COMMIT**. Report the failure and fix it first.
   - Ensure no leftover `console.log`, `debugger`, or temporary files (`.DS_Store`, `.env`, temp dumps) are staged.

3. **Enforce Atomic Slicing**:
   - If multiple unrelated concerns exist (e.g. bug fix + documentation + unrelated refactor), **do NOT bundle them into one commit**.
   - Stage the first logical slice with `git add <file1> <file2>`.

4. **Formulate Conventional Commit**:
   - Follow `git-commit-discipline`: `<type>(<scope>): <imperative subject>`
   - Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`.
   - Scope: Package name (for monorepo), domain/module name (for monolith), or omit if global.
   - Header <= 50-72 characters, imperative mood, lowercase, no trailing period.
   - Add body wrapped at 72 chars if explaining non-trivial WHY or context.

5. **Execute Commit & Report**:
   - Run `git commit -m "<message>"` (or multi-line `-m`).
   - Display `git log -n 1 --stat` to verify the commit hash and contents.
   - If remaining unstaged changes exist, inform the user and proceed with the next atomic slice if requested.
