# 🚀 CI/CD & Headless Automation with `pi -p`

`pi` can run headlessly inside continuous integration pipelines (GitHub Actions, GitLab CI) using the `-p` (prompt mode) flag or `--mode json`.

---

## 🤖 GitHub Action: Automated PR Code Review

Create `.github/workflows/pi-review.yml`:

```yaml
name: 🔍 Pi Engineering Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install Pi Coding Agent
        run: bun install -g @earendil-works/pi-coding-agent

      - name: Install pi-engineer-os
        run: pi install --approve git:github.com/kostikovk/pi-engineer-os

      - name: Run Two-Axis Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          pi -p --approve "/review origin/${{ github.base_ref }}" > review_output.md
          gh pr comment ${{ github.event.pull_request.number }} --body-file review_output.md
```

---

## 🛡️ GitHub Action: Automated DevSecOps Audit

```yaml
name: 🛡️ Pi Security Audit

on:
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday
  workflow_dispatch:

jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install Pi
        run: bun install -g @earendil-works/pi-coding-agent

      - name: Install pi-engineer-os
        run: pi install --approve git:github.com/kostikovk/pi-engineer-os

      - name: Run Security Audit
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          pi -p --approve "/audit"
```
