---
description: Perform a high-precision, SOTA two-axis code review on git changes with concrete failure scenarios and diff-ready fixes
argument-hint: "[fixed-point-or-branch]"
---
1. **Detect Base Branch**: Determine the base branch or commit (if not specified as `$1`, detect automatically via `git symbolic-ref refs/remotes/origin/HEAD`, `origin/main`, `origin/master`, `origin/develop`, `production`, or merge-base).
2. **Inspect Changes & Full Context**:
   - Run `git diff <base-branch>...HEAD` and `git log <base-branch>..HEAD --oneline`.
   - If unsure about surrounding imports or variable declarations, inspect the full file via `read` before flagging an issue to eliminate out-of-scope hallucinations.

Execute the **SOTA AI Code Review Protocol**:

---

### Review Criteria Checklist:

#### 1. Standards & Domain Engineering Quality:
- **Zero-Noise Comments**: Flag echo comments (`// fetch user`), inline mechanic narration, and decorative banners.
- **Frontend Standards (if UI files modified)**:
  - 5 UI States present (Loading skeleton, Success, Actionable Empty, Error boundary with retry, Unauthorized).
  - Accessibility (WCAG 2.1 AA, semantic HTML, keyboard accessible, modal focus traps).
  - State colocation & zero redundant server cache duplication in `useState`.
  - Design token adherence (no raw hex or arbitrary pixel margins).
- **Backend Standards (if Server/API files modified)**:
  - Boundary input validation via schemas (Zod/Pydantic/Serde).
  - Database transactional atomicity, index coverage, and zero $N+1$ queries.
  - Idempotency support on mutating endpoints & concurrency safety (locks/optimistic concurrency).
  - Standard RFC 7807 error envelopes and correct HTTP status codes.
- **12 Fowler Smells**: Mysterious Name, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Repeated Switches, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Refused Bequest.

#### 2. Correctness, Spec Fidelity & Security:
- Security: Zero SQLi, XSS, SSRF, IDOR, or secret leaks.
- Spec Fidelity: All requirements delivered with zero unapproved scope creep.

---

### Output Format:

## 🚨 Critical Blockers (P0 / P1 - Must Fix Before Merge)
- [ ] **`[path/to/file:line]` - `<Issue Title>`**
  - **Failure Scenario**: Under `<specific input/state>`, line `<N>` fails with `<tangible error/impact>`.
  - **Proposed Fix**:
    ```language
    // Exact replacement code
    ```

## ⚠️ Architectural & Code Smells (P2 - Should Fix)
- **`[path/to/file:line]` - `<Issue Title>`**
  - **Rationale**: `<Why this degrades maintainability or performance>`
  - **Proposed Fix**:
    ```language
    // Recommended refactor snippet
    ```

## 💡 Nitpicks & Cleanups (P3 - Optional)
- **`[path/to/file:line]`**: `<Minor cleanup or Zero-Noise comment removal>`

## ⚖️ Final Verdict
- **APPROVED** / **CHANGES REQUESTED** (with a concise 1-line justification)
