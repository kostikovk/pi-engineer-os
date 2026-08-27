---
description: Perform a two-axis code review on git changes (Standards/Fowler Smells + Spec Fidelity)
argument-hint: "[fixed-point-or-branch]"
---
1. **Detect Base Branch**: Determine the base branch or commit (if not specified as `$1`, detect automatically via `git symbolic-ref refs/remotes/origin/HEAD`, `origin/main`, `origin/master`, `origin/develop`, `production`, or merge-base).
2. **Inspect Changes**: Run `git diff <base-branch>...HEAD` and `git log <base-branch>..HEAD --oneline`.

Perform a thorough **Two-Axis Code Review** of changes since the base branch.

Evaluate against two distinct axes:

### Axis 1: Standards & Domain Quality
Check the diff for:
- **Violations of documented repo standards** (in `AGENTS.md`, `CODING_STANDARDS.md`).
- **Zero-Noise Comments Policy**: Flag any echo comments (`// fetch user`), inline mechanic narration, decorative banners, or changelog tags.
- **Frontend Standards (if frontend files modified)**:
  - 5 UI States present (Loading skeleton, Success, Actionable Empty, Error boundary with retry, Unauthorized).
  - Accessibility (WCAG 2.1 AA, semantic HTML, keyboard navigable, focus traps).
  - State colocation & zero redundant server cache duplication in `useState`.
  - Design token adherence (no raw hex/pixel constants).
- **Backend Standards (if backend files modified)**:
  - Boundary input validation via schemas (Zod/Pydantic/Serde).
  - Database transactional atomicity, index coverage, and zero $N+1$ queries.
  - Idempotency support on mutating endpoints & concurrency safety.
  - Standard RFC 7807 error envelopes and correct HTTP status codes.
- **12 Fowler Smells**:
  1. *Mysterious Name* (unclear purpose)
  2. *Duplicated Code* (extract shared logic)
  3. *Feature Envy* (method reaching into other data)
  4. *Data Clumps* (fields travelling together without a type)
  5. *Primitive Obsession* (raw string/number used instead of domain type)
  6. *Repeated Switches* (recurrent conditionals across files)
  7. *Shotgun Surgery* (one logical change scattered across too many files)
  8. *Divergent Change* (module edited for multiple unrelated reasons)
  9. *Speculative Generality* (abstractions not required by spec)
  10. *Message Chains* (`a.b().c().d()` leaky navigations)
  11. *Middle Man* (useless delegation wrapper)
  12. *Refused Bequest* (unwanted inherited behaviors)

### Axis 2: Spec Fidelity
- Are all requirements from the spec/ticket faithfully delivered?
- Is there any undocumented scope creep?
- Are edge cases handled correctly?

### Output:
- 🚨 **Blockers (Must fix before merge)**
- ⚠️ **Improvements (Should fix)**
- 💡 **Nitpicks (Optional cleanups)**
- ✅ **Verdict**: APPROVED / CHANGES REQUESTED
