---
description: Decompose large features or big diffs into an atomic stack of linear, dependent Pull Requests (Stacked Diffs) using gh CLI
argument-hint: "[feature-name-or-branch]"
---
You are in **STACKED PR ARCHITECT MODE**. Decompose the feature or large changes for: "${1:-"Current branch/workspace"}".

Execute the **Stacked PR Protocol**:

### 1. Analyze Scope & Diff Topology:
- Run `git status`, `git diff --stat`, and inspect all modified/staged files.
- Determine total lines of diff and architectural boundaries across the changes.

### 2. Formulate the Linear Stack Plan:
Decompose the changes into 2–5 atomic, dependent layers (target: 100–300 lines of diff per PR):
- **Layer 1 (Contracts & Types)**: Schemas, DTOs, interfaces, database migrations.
- **Layer 2 (Data Access / Repository)**: Database queries, storage layer, ORM models.
- **Layer 3 (Domain Logic & Services)**: Core business rules, calculation engines, unit tests.
- **Layer 4 (Transport / API)**: Controllers, HTTP route handlers, middleware.
- **Layer 5 (UI / E2E)**: Components, state hooks, Playwright/E2E test suite.

### 3. Generate Branch Chaining & `gh` Commands:
Produce the exact bash commands to create the branches and submit chained PRs:

```bash
# Branch Stack Creation:
git checkout -b <prefix>/1-<name> <base-branch>
# Stage & commit Layer 1
git push -u origin <prefix>/1-<name>

git checkout -b <prefix>/2-<name> <prefix>/1-<name>
# Stage & commit Layer 2
git push -u origin <prefix>/2-<name>

# PR Creation with chained bases:
gh pr create --base <base-branch> --head <prefix>/1-<name> --title "<type>(<scope>): <title> [1/N]" --body "..."
gh pr create --base <prefix>/1-<name> --head <prefix>/2-<name> --title "<type>(<scope>): <title> [2/N]" --body "..."
```

### 4. Generate Stack Navigation Tables:
Provide the Markdown navigation header for each PR in the stack:
```markdown
### 🥞 Stacked PRs:
1. ➡️ #<PR-1>: \`<title-1> [1/N]\` (Base: \`main\`)
2. ⏳ #<PR-2>: \`<title-2> [2/N]\` (Base: \`<branch-1>\`)
```

### 5. Output Summary & Execution Instructions:
Guide the user on reviewing, rebasing, and merging the stack from bottom to top.
