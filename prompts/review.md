---
description: Perform a two-axis code review on git changes (Standards/Fowler Smells + Spec Fidelity)
argument-hint: "[fixed-point-or-branch]"
---
1. **Detect Base Branch**: Determine the base branch or commit (if not specified as `$1`, detect automatically via `git symbolic-ref refs/remotes/origin/HEAD`, `origin/main`, `origin/master`, `origin/develop`, `production`, or merge-base).
2. **Inspect Changes**: Run `git diff <base-branch>...HEAD` and `git log <base-branch>..HEAD --oneline`.

Perform a thorough **Two-Axis Code Review** of changes since the base branch.

Evaluate against two distinct axes:

### Axis 1: Standards & Fowler Smells Baseline
Check the diff for:
- **Violations of documented repo standards** (in `AGENTS.md`, `CODING_STANDARDS.md`).
- **AI Comment Noise & Redundant Comments**: Flag any echo comments (`// fetch user`), inline mechanic narration, decorative banners, or changelog tags. Ensure comments only explain non-obvious *WHY* or public TSDoc contracts.
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
