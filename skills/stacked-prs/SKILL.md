---
name: stacked-prs
description: Methodology for decomposing large features into a linear stack of small, atomic, chained Pull Requests (Stacked Diffs) to simplify code review, accelerate CI, and eliminate monolithic review bottlenecks.
---

# Stacked PRs (Stacked Diffs) Engineering Standard

A **Stacked PR** workflow breaks a large feature into a sequence of small, focused, dependent Pull Requests (100–300 lines of diff each), where each PR builds on top of the previous one in a linear branch hierarchy:

```
[main] 
  └── [feat/auth-1-models] (PR #101 -> base: main)
        └── [feat/auth-2-crypto] (PR #102 -> base: feat/auth-1-models)
              └── [feat/auth-3-endpoints] (PR #103 -> base: feat/auth-2-crypto)
                    └── [feat/auth-4-ui-e2e] (PR #104 -> base: feat/auth-3-endpoints)
```

---

## 🎯 Why Stacked PRs?

1. **Sub-5-Minute Human Reviews**: Reviewers review 150 lines in 5 minutes with high attention, catching real architectural bugs instead of glancing through a 2,000-line diff and leaving a superficial "LGTM".
2. **Parallel Unblocking**: Frontend, backend, and QA engineers can start working on top of earlier layers in the stack without waiting for the entire feature to be completed.
3. **Bisectability & Blast-Radius Control**: If a bug appears in production, reverting one atomic slice is trivial and safe.
4. **Faster CI Pipelines**: Smaller diffs run focused unit tests faster.

---

## 📐 The 5-Layer Stack Slicing Model

When splitting a large feature into a stack, decompose along these architectural boundaries:

| Layer # | Slice Scope | Typical Diff Size | What to Include |
|---|---|---|---|
| **Layer 1** | **Contracts & Types** | 50–150 lines | TypeScript interfaces, Zod schemas, DB migrations, DTOs, domain models |
| **Layer 2** | **Data & Storage** | 100–250 lines | Repository classes, database queries, ORM models, migration scripts |
| **Layer 3** | **Core Business Logic** | 150–300 lines | Domain services, pure business algorithms, unit tests (TDD) |
| **Layer 4** | **API / Transport** | 100–250 lines | HTTP route handlers, middleware, request validation, controller tests |
| **Layer 5** | **UI / Integration / E2E** | 150–300 lines | Frontend components, state hooks, Playwright/E2E acceptance tests |

---

## 🛠️ Step-by-Step Stacking Protocol

### Step 1: Branch Creation & Git Chaining
Always branch from the immediate predecessor:

```bash
# 1. Base branch
git checkout main
git pull origin main

# 2. Slice 1: Types & DB
git checkout -b feat/checkout-1-models
# ... make changes & commit ...
git push -u origin feat/checkout-1-models

# 3. Slice 2: Payment Service (branched from Slice 1)
git checkout -b feat/checkout-2-service feat/checkout-1-models
# ... make changes & commit ...
git push -u origin feat/checkout-2-service

# 4. Slice 3: API & E2E (branched from Slice 2)
git checkout -b feat/checkout-3-api feat/checkout-2-service
# ... make changes & commit ...
git push -u origin feat/checkout-3-api
```

---

### Step 2: Creating Chained PRs with GitHub CLI (`gh`)

When creating PRs in a stack, set `--base` to the parent branch (except the first, which targets `main`):

```bash
# PR 1 (targets main)
gh pr create --base main --head feat/checkout-1-models \
  --title "feat(checkout): define order models and schema migrations [1/3]" \
  --body "..."

# PR 2 (targets PR 1's branch)
gh pr create --base feat/checkout-1-models --head feat/checkout-2-service \
  --title "feat(checkout): implement payment gateway service [2/3]" \
  --body "..."

# PR 3 (targets PR 2's branch)
gh pr create --base feat/checkout-2-service --head feat/checkout-3-api \
  --title "feat(checkout): add checkout HTTP endpoint and E2E tests [3/3]" \
  --body "..."
```

---

### Step 3: Stack Navigation Header (Required in all PR bodies)

Every PR in the stack MUST include the **Stack Navigation Table** at the top of its description so reviewers can easily navigate up and down the chain:

```markdown
### 🥞 Stacked PRs
This PR is part of a stack. Please review in sequence:

1. ➡️ #101: `feat(checkout): define order models and schema migrations [1/3]`
2. ⏳ #102: `feat(checkout): implement payment gateway service [2/3]` *(Current PR)*
3. ⏳ #103: `feat(checkout): add checkout HTTP endpoint and E2E tests [3/3]`
```

---

### Step 4: Upstream Rebase & Stack Synchronization

When upstream changes happen or changes are requested on PR 1:

1. Commit fixes on `feat/checkout-1-models`:
   ```bash
   git checkout feat/checkout-1-models
   git commit -am "fix(checkout): add missing validation check"
   git push origin feat/checkout-1-models
   ```
2. Rebase child branches sequentially:
   ```bash
   # Rebase PR 2 on PR 1
   git checkout feat/checkout-2-service
   git rebase feat/checkout-1-models
   git push origin feat/checkout-2-service --force-with-lease

   # Rebase PR 3 on PR 2
   git checkout feat/checkout-3-api
   git rebase feat/checkout-2-service
   git push origin feat/checkout-3-api --force-with-lease
   ```

---

### Step 5: Merge Progression (Bottom-to-Top)

1. Merge PR 1 (`feat/checkout-1-models`) into `main`.
2. GitHub will automatically retarget PR 2 to `main`, or retarget manually:
   ```bash
   gh pr edit 102 --base main
   ```
3. Rebase PR 2 on latest `main` and push.
4. Merge PR 2 into `main`, then retarget PR 3.
