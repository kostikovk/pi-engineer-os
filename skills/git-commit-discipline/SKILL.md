---
name: git-commit-discipline
description: Standard for creating atomic Conventional Commits with strict 50/72 formatting, scope detection, diff grounding, and pre-commit verification. Use whenever committing changes or structuring Git history.
---

# Git Commit Discipline

Disciplined Git commits are atomic, verifiable, and semantic. They serve as the source of truth for Semantic Versioning (SemVer), automated changelogs, `git bisect` debugging, and cross-session AI context.

Every commit made by an agent or engineer MUST adhere to this standard.

---

## 1. The 4 Golden Rules of Commits

1. **Atomic Slicing (1 Commit = 1 Logical Change)**:
   - Never combine refactoring + feature additions in one commit.
   - Never mix formatting/lint fixes + business logic changes.
   - Never batch unrelated bug fixes together.
   - **The Revert Test**: If this commit is reverted (`git revert <hash>`), does it cleanly undo only the intended change without breaking unrelated features?

2. **Diff Grounding (Zero Hallucinations)**:
   - Always run `git status` and `git diff --staged` before composing the message.
   - Never describe files, changes, or refactors that are not in the actual diff.

3. **Pre-Commit Verification**:
   - Never commit broken code.
   - Prior to committing, verify:
     - Typecheck (`tsc --noEmit`, `cargo check`, `go vet`, etc.) passes with 0 errors.
     - Affected tests pass green.
     - No residual debug code (`console.log`, `debugger`, commented-out blocks).

4. **Imperative & Descriptive 50/72 Rule**:
   - Header is at most 50–72 characters, lowercase, imperative mood ("add", "fix", "refactor", not "added", "fixes").
   - Body is wrapped at 72 characters and focuses on **WHY** the change was made and any architectural trade-offs, rather than repeating the diff (**HOW**).

---

## 2. Commit Message Anatomy

```text
<type>(<scope>): <imperative subject>

[optional body explaining WHY and context, wrapped at 72 chars]

[optional BREAKING CHANGE: description]
[optional issue/ticket trailers]
```

### Types & SemVer Mapping

| Type | When to Use | SemVer Impact |
| :--- | :--- | :--- |
| **`feat`** | New user-facing or API capability | Minor (`0.X.0`) |
| **`fix`** | Bug fix or regression fix | Patch (`0.0.X`) |
| **`refactor`** | Code change that neither fixes a bug nor adds a feature | Patch / None |
| **`perf`** | Code change that improves performance | Patch |
| **`test`** | Adding missing tests or correcting existing tests | None |
| **`docs`** | Documentation only (`README`, ADRs, comments) | None |
| **`chore`** | Build scripts, package manager configs, tool settings | None |
| **`ci`** | CI/CD workflows and automation scripts | None |
| **`style`** | Whitespace, formatting, missing semi-colons (no code change) | None |

### Scope Resolution Guidelines

- **Monorepos**: Use the package or application name:
  - `feat(api): add idempotency key middleware`
  - `fix(web): prevent layout shift on header mount`
  - `chore(deps): bump tailwindcss to v4`
- **Monoliths / Services**: Use the domain model or bounded context:
  - `feat(auth): support passkey registration`
  - `fix(billing): handle prorated refunds on plan downgrade`
  - `refactor(orders): extract payment seam into dedicated service`
- **Global / Cross-cutting**: Omit the scope:
  - `docs: update architectural decision record index`
  - `ci: enforce test coverage gate on pull requests`

---

## 3. Writing Great Subjects & Bodies

### Subject Examples:
- 🟢 `feat(auth): support session revocation on password change`
- 🟢 `fix(checkout): prevent double submission on slow networks`
- 🟢 `refactor(renderer): decouple canvas drawing from DOM events`
- 🔴 `fixed bug in auth` *(Past tense, vague)*
- 🔴 `wip: working on checkout logic.` *(Not atomic, ends with period)*
- 🔴 `feat: updated files` *(No scope, zero explanation)*

### Body Structure (The WHY & Context):
When a change is non-trivial or introduces architectural decisions, include a body:

```text
fix(sync): resolve race condition in offline queue replay

When reconnecting to the network, concurrent replay workers could
attempt to process the same offline mutation payload simultaneously,
leading to duplicate database entries.

Wrap queue item dequeue in a distributed transaction lock and mark
in-flight items before triggering dispatch.

Closes #382
```

---

## 4. Atomic Slicing Workflow

When you have multiple changes across the working directory:

1. Inspect `git status -s`.
2. Stage files incrementally with `git add <path>` (or `git add -p` for hunk-level staging).
3. Commit each slice independently:
   - Slice 1: `test(auth): add failing test for token expiration race`
   - Slice 2: `feat(auth): implement atomic token refresh lock`
   - Slice 3: `docs(auth): document token renewal concurrency model in CONTEXT.md`
4. Confirm `git log -n 3 --oneline` shows a clean, linear, readable progression.
