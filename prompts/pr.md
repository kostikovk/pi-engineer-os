---
description: Generate a standardized Pull Request description from git diff and commit history
argument-hint: "[target-branch-or-issue]"
---
Analyze commits and diff against target branch ${1:-"origin/main"}:
`git log ${1:-"origin/main"}..HEAD --oneline` and `git diff ${1:-"origin/main"}...HEAD --stat`.

Generate a production-ready Pull Request summary in Markdown:

## 📌 Summary
1-2 sentence high-level overview of what this PR introduces and why.

## 🔗 Related Issues / External Trackers
- `Closes #<id>` (for GitHub Issues)
- `Resolves <KEY-123>` (for Jira / Linear / ClickUp)
- Links to relevant spec in `docs/` or `CONTEXT.md`

## 🛠️ Key Changes
- Grouped bullet points of changes (Database, Business Logic, API, UI, Tooling).
- Mention any architectural decisions or deep modules introduced.

## 🧪 Verification & Testing
- Exact automated tests added or run (`bun test`, `pnpm test`).
- Manual verification steps.

## 📋 Pre-Flight Checklist
- [ ] Typecheck passes without errors (`tsc --noEmit` or equivalent).
- [ ] All tests pass green.
- [ ] No temporary `console.log` or debug code left.
- [ ] Documentation / `CONTEXT.md` updated if new domain terms were introduced.
