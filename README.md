# ⚡ pi-engineer-os

> **The Production-Grade Engineering Operating System for `pi-coding-agent`.**  
> *Real Software Engineering, not Vibe Coding.*

---

## 🎯 Overview

Most AI-assisted coding collapses after 2–3 weeks: agents make blind edits, context windows get bloated with logs, codebases turn into an unmaintainable "Ball of Mud", and developers spend more time debugging hallucinations than shipping value.

**`pi-engineer-os`** solves this by packaging battle-tested engineering discipline into an automated, turnkey operating system for `pi-coding-agent`.

---

## 🏗️ Core Pillars

### 1. 🔄 Full SDLC Pipeline (Operational Commands)
* 🚀 **`/bootstrap`** — Autonomously scans any codebase (Monolith, Monorepo, Microservices) and generates tailored `AGENTS.md`, `CONTEXT.md`, and initial ADR baseline.
* 🗺️ **`/repo-map`** — Dynamically generates an AST-like map of the codebase, routing domain entities and module exports without loading full files.
* ❓ **`/grill <feature>`** — Interrogates requirements across a structured decision tree before touching code.
* 📝 **`/spec <feature>`** — Synthesizes architectural RFCs with Deep Module boundaries and non-goals.
* 🎯 **`/tickets`** — Slices features into **Tracer-Bullet vertical slices** with explicit dependency blocking edges.
* 🛠️ **`/implement`** — Orchestrates execution with strict TDD (Red-Green-Refactor), continuous typechecking, and self-reviews.
* ♻️ **`/refactor`** — Safe structural refactoring without behavior changes, backed by Fowler smells and Ousterhout principles.
* 🔍 **`/diagnose <bug>`** — Industrial-grade 5-phase debugging loop (Red test reproduction, secret redaction, hypothesis verification).
* ⚖️ **`/review`** — Two-Axis Code Review (Standards & 12 Martin Fowler Smells + Spec Fidelity).
* 🛡️ **`/audit`** — DevSecOps scanner for OWASP Top 10 vulnerabilities, hardcoded secrets, and dependency audits.
* 📦 **`/commit`** — Atomic, pre-verified Conventional Commits with 50/72 formatting and diff grounding.
* 🚢 **`/pr`** — Production-ready GitHub Pull Request descriptions.
* 🚀 **`/release`** — Automated SemVer calculation, CHANGELOG generation, and release tagging.
* 📚 **`/docs`** — Generates TSDoc/JSDoc, OpenAPI schemas, and READMEs without altering business logic.
* ⬆️ **`/bump <pkg>`** — Safely upgrades dependencies, detects API breaking changes via typecheck, and fixes call sites.
* 🛑 **`/wait-what`** — Emergency reset requiring the agent to re-pitch explanations in unambiguous domain terms.

### 2. 🧠 Engineering Disciplines (Skills)
* **`codebase-design`** — Deep Modules (*John Ousterhout, A Philosophy of Software Design*): minimal public interfaces hiding deep implementation complexity.
* **`domain-modeling`** — Ubiquitous Language & `CONTEXT.md` to eliminate token waste in thinking.
* **`tdd`** — Red-Green-Refactor loop with disciplined mocking boundaries.
* **`diagnosing-bugs`** — Prohibition of blind hypotheses without a red-capable feedback loop.
* **`code-review`** — Two-axis diff analysis with Fowler smells baseline.
* **`git-commit-discipline`** — Atomic Conventional Commits, 50/72 rule, type/scope resolution, and diff grounding.

### 3. 🛡️ Lean Context & Safety Extensions
* **`custom-compaction.ts`** — Replaces dumb compaction with architecture-preserving state summaries.
* **`trigger-compact.ts`** — Proactive context window management preventing context rot.
* **`safety-guardrails.ts`** — Blocks accidental mutations of `.env*`, `.git/`, and intercepts destructive git commands (`push --force`, `reset --hard`).
* **`git-checkpoint.ts`** — Automatic git checkpoints before major refactors.
* **`todo.ts`** — Real-time interactive TUI task manager.
* **`context7-docs.ts`** — Real-time documentation fetcher (`context7_docs` tool & `/docs` command) preventing framework hallucinations.
* **`skills-list.ts`** — Interactive `/skills` browser.

---

## 🚀 Quickstart & Installation

### Option A: Install Globally (Available across all projects)
```bash
./setup.sh --global
```

### Option B: Install into a Specific Project
```bash
cd /path/to/your-project
/path/to/pi-engineer-os/setup.sh --project
```

### Option C: Onboard Any Project
Once installed, open `pi` inside any project and run:
```text
/bootstrap
```
The agent will analyze the repository topology (Monolith, Monorepo workspaces, or Microservices), configure package manager commands, and generate `AGENTS.md` and `CONTEXT.md`.

---

## 🔁 The Standard SDLC Workflow

1. 🔍 **Discover:** `/bootstrap` ➔ `/repo-map`
2. 📐 **Design:** `/grill` ➔ `/spec` ➔ `/tickets`
3. 🏗️ **Build:** `/implement` ↺ `/refactor` ↺ `/diagnose`
4. 🧪 **Verify:** `/review` & `/audit`
5. 🚢 **Ship:** `/commit` ➔ `/pr` ➔ `/release`
6. ♻️ **Maintain:** `/docs` & `/bump`

---

## 📄 License
MIT © 2026. Built for real engineering teams and solo power builders.
