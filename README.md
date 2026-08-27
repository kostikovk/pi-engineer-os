# ⚡ pi-engineer-os

> **The Turnkey Engineering Operating System for [`pi-coding-agent`](https://github.com/earendil-works/pi-coding-agent).**  
> *Transform AI coding from chaotic "vibe coding" into rigorous, scalable, production-grade Software Engineering.*

---

## 📖 Why `pi-engineer-os`? (Manifesto)

Most engineering teams encounter the **"AI Entropy Trap"** after 2–3 weeks of using AI coding assistants:
1. **Blind Mutations:** Agents perform shallow code edits without understanding the system's macro-architecture.
2. **Context Rot & Drift:** Context windows degrade with raw logs, forgotten constraints, and hallucinated requirements.
3. **Living in the Past:** LLMs default to deprecated syntax and outdated library APIs from past training cutoffs.
4. **Shallow Modules & Spaghetti:** Codebases degenerate into hundreds of trivial, leaky wrappers without clear domain boundaries.

**`pi-engineer-os`** solves this by embedding proven software engineering principles (*John Ousterhout, Martin Fowler, Kent Beck, Eric Evans*) into an automated operating system for AI agents.

---

## 📦 What is inside `pi-engineer-os`?

```
pi-engineer-os/
├── 🚀 setup.sh                 # Interactive turnkey installer (Global or Project-local)
├── 📁 skills/                  # Core engineering disciplines (Skills)
│   ├── codebase-design/        # Deep Modules (Ousterhout), Seams, Design it Twice
│   ├── domain-modeling/        # Ubiquitous Language, CONTEXT.md, ADR architecture records
│   ├── tdd/                    # Red-Green-Refactor, Mock boundaries, Test surface rules
│   ├── diagnosing-bugs/        # 5-phase root-cause cycle, reproduction tests, sanitization
│   ├── stacked-prs/            # Stacked Diffs methodology & linear PR decomposition
│   ├── gh-stack/               # GitHub CLI gh-stack extension workflows & references
│   ├── git-commit-discipline/  # Atomic conventional commits & 50/72 rule
│   └── code-review/            # Dual-axis audit (12 Fowler Smells + Spec Fidelity)
├── ⚡ prompts/                 # Standard SDLC workflows (/bootstrap, /grill, /spec, etc.)
├── 🤖 agents/                  # Specialized Subagents (Parallel background execution)
│   ├── scout.md                # Rapid codebase recon & AST dependency mapping
│   ├── researcher.md           # Live Context7 docs & breaking changes verification
│   ├── qa.md                   # Acceptance criteria, edge cases & adversarial E2E testing
│   ├── test-runner.md          # Parallel test execution & flakiness diagnosis
│   ├── reviewer.md             # 2-axis Fowler smells & architectural review (Sonnet)
│   ├── architect.md            # Deep module contracts & ADR trade-offs (Opus)
│   ├── security.md             # DevSecOps, OWASP Top 10 & secret scanning (Sonnet)
│   ├── diagnostician.md        # 5-phase root cause & binary search debugger (Sonnet)
│   ├── db-architect.md         # Zero-downtime migrations & query optimizer (Opus)
│   ├── devops.md               # Multi-stage Dockerfiles & CI/CD pipelines (Flash)
│   └── tech-writer.md          # OpenAPI 3.1 & Mermaid architecture diagrams (Flash)
├── 🛡️ extensions/              # Context preservation, safety gates, and live docs
│   ├── subagent/               # Subagent orchestration engine (single, parallel, chain)
│   ├── handoff.ts              # Lossless SDLC context transfer (/handoff)
│   ├── dirty-repo-guard.ts     # Uncommitted changes guard before session switches
│   ├── project-rules.ts        # Dynamic loader for .claude/rules, .cursorrules & AGENTS
│   ├── github-issue-autocomplete.ts # Fast fuzzy `#issue` autocompletion in prompt input
│   ├── safety-gate.ts          # Protection against rm -rf, git force push, and DROP DB
│   ├── git-merge-and-resolve.ts # AI conflict resolver & `/resolve-conflicts` command
│   ├── inline-bash.ts          # Inline `!{command}` and `@{file}` prompt expansion
│   ├── token-gauge.ts          # Real-time token saturation & context meter in status bar
│   ├── context7-docs.ts        # Real-time version-accurate docs (/docs & context7_docs tool)
│   ├── custom-compaction.ts    # Architecture-preserving context compaction
│   ├── trigger-compact.ts      # Proactive context window management
│   ├── protected-paths.ts      # Write-protection for .env, .git, and lockfiles
│   ├── git-checkpoint.ts       # Automated safety checkpoints before destructive refactoring
│   ├── todo.ts                 # Interactive TUI session task tracker
│   └── skills-list.ts          # Interactive /skills browser
├── ⚙️ config/                  # Next-gen multi-model delegation presets
│   ├── presets.json            # Presets: plan (Opus), implement (Sonnet), research (Gemini Pro), ops (Flash)
│   └── settings.json           # Optimized token buffers and compaction triggers
└── 📑 templates/               # Production starter templates
    ├── AGENTS.template.md      # Ironclad agent behavior & boundary rules
    ├── CONTEXT.template.md     # Ubiquitous Language & domain glossary template
    ├── ADR-template.md         # Standard Architecture Decision Record template
    └── CODING_STANDARDS.md     # Code smell checklist and refactoring guidelines
```

---

## 🗺️ When to Use What? (Workflow & Command Matrix)

| Command | When to Run? | What Does the Agent Do? | Tangible Output |
| :--- | :--- | :--- | :--- |
| **`/bootstrap`** | First time opening any new or existing project | Analyzes topology (Monolith/Monorepo), dependencies, test runners, and generates a custom `AGENTS.md` | Tailored AI configuration |
| **`/grill <topic>`** | Before starting any non-trivial feature or refactor | Conducts a structured decision-tree interview (frontier questions) to eradicate ambiguity | 100% clarified requirements |
| **`/spec <topic>`** | Once requirements are agreed upon | Produces an architectural RFC: Deep Module boundaries, Zod/TS schemas, non-goals, and edge cases | Actionable Technical Spec |
| **`/tickets`** | After spec approval | Breaks the spec into **vertical tracer-bullet slices** with explicit blocking dependencies | Dependency-ordered task list |
| **`/implement`** | When executing a ticket or feature | Executes strict **TDD (Red-Green-Refactor)**, verifies types, and checks `context7_docs` | Clean, tested production code |
| **`/handoff <goal>`** | When transitioning between SDLC phases | Transfers distilled architecture decisions, modified files, and acceptance criteria to a fresh session | Clean context without degradation |
| **`/diagnose <bug>`** | When encountering bugs or regressions | Enforces a 5-phase root cause analysis: reproduces via failing test before modifying code | Verified fix with regression test |
| **`/review`** | Before merging or creating a PR | Performs a dual-axis audit: 12 Fowler code smells + spec fidelity check | Structured blocker list & verdict |
| **`/audit`** | For security and dependency compliance | Scans packages for CVEs and audits against OWASP Top 10 vulnerabilities | DevSecOps security report |
| **`/resolve-conflicts`** | When Git merge conflicts occur (`<<<<<<<`) | Parses unmerged paths, analyzes conflicting branches, and generates clean semantic resolution | Cleanly resolved merge conflicts |
| **`/docs <lib> <q>`** | When using external frameworks & libraries | Fetches clean, version-accurate documentation via Context7 API | Up-to-date syntax without hallucinations |
| **`/commit`** | When staging verified changes | Validates working state and generates atomic Conventional Commits | Verified atomic git commits |
| **`/pr`** | When a ticket or feature is completed | Generates a standardized Pull Request summary with test proofs and checklists | Ready-to-merge PR description |
| **`/gh-stack`** | When implementing a large feature or refactor | Decomposes changes into a linear stack of small, chained Pull Requests (Stacked Diffs) | Chained atomic PRs with navigation |
| **`/release`** | When cutting a production release | Calculates SemVer bump, updates CHANGELOG, and creates release tags | Versioned release artifact |
| **`/wait-what`** | If an explanation is too abstract or convoluted | Forces the agent to re-explain the last decision in plain terms referencing `CONTEXT.md` | Clear, jargon-free explanation |

---

## 🧠 3-Layer Zero Context-Loss Architecture

1. **Persistent Cross-Session Memory (`pi-hermes-memory`):**
   * Durable architectural decisions, conventions, and bug insights persist across sessions via vector-indexed storage (`memory_add` / `memory_search`). Future sessions instantly build on past learnings.
2. **Repository-Anchored State (`CONTEXT.md`, `docs/tickets.md`, `docs/adr/`):**
   * Establishes a shared Ubiquitous Language, formal Architecture Decision Records, and active task slices version-controlled alongside source code.
   * **External Tracker Bridge**: Seamlessly bridges with Jira, Linear, GitHub Projects, and ClickUp via PR auto-closing tags (`Resolves PROJ-123`, `Closes #45`) and `gh` CLI inspection.
   * **Active Task Buffer & Archiving**: Active tickets live in `docs/tickets.md` and are archived to `docs/archive/tickets-*.md` upon milestone completion, preventing context bloat.
3. **Smart Architecture-Preserving Compaction (`custom-compaction.ts`):**
   * When context limits approach, compaction isolates modified files, verified decisions, and active tasks rather than performing lossy truncation.

---

## 🤖 Universal Parallel Subagents (`agents/`)

`pi-engineer-os` includes 11 specialized, stack-agnostic subagents that run in **isolated sub-processes**. They operate without polluting your main conversation context and can run **in parallel**:

| Subagent | Model | Purpose & Universal Capabilities |
| :--- | :--- | :--- |
| **`scout`** | `google/gemini-3.7-flash` | **Codebase Recon:** Rapidly maps file trees, traces dependencies/imports, and extracts AST interface snapshots across any language. |
| **`researcher`** | `google/gemini-3.7-flash` | **Live Docs & Specs:** Queries Context7 and live specs to verify modern API contracts, breaking changes, and migration paths without hallucinations. |
| **`qa`** | `anthropic/claude-sonnet-5` | **Acceptance & E2E Testing:** Validates implementations against Acceptance Criteria (Given-When-Then), hunts adversarial edge cases, and drafts E2E tests. |
| **`test-runner`** | `google/gemini-3.7-flash` | **Isolated Testing:** Executes test suites (`cargo test`, `pytest`, `bun test`, `vitest`, `go test`), filters terminal noise, and diagnoses assertion diffs. |
| **`reviewer`** | `anthropic/claude-sonnet-5` | **Two-Axis Audit:** Strict review against 12 Fowler Code Smells, Deep Module boundaries, and spec fidelity. |
| **`architect`** | `anthropic/claude-opus-5` | **Deep Systems Modeling:** Ousterhout Deep Modules, Domain Ubiquitous Language, Design-It-Twice trade-off evaluation, and ADR creation. |
| **`security`** | `anthropic/claude-sonnet-5` | **DevSecOps & SAST:** OWASP Top 10 audits, secret leakage detection, AuthN/AuthZ flaw verification, and STRIDE threat modeling. |
| **`diagnostician`** | `anthropic/claude-sonnet-5` | **Root-Cause Analysis:** 5-phase bug diagnosis, minimal reproducible examples (MREs), and binary search regressions (`git bisect`). |
| **`db-architect`** | `anthropic/claude-opus-5` | **Database Engineering:** Relational/document schema design, zero-downtime migrations (*Expand & Contract*), and $N+1$ query optimization. |
| **`devops`** | `google/gemini-3.7-flash` | **CI/CD & Containers:** Multi-stage non-root Dockerfiles, GitHub Actions workflow automation, and layer caching. |
| **`tech-writer`** | `google/gemini-3.7-flash` | **Living Documentation:** OpenAPI 3.1 endpoint specs, interactive Mermaid.js architecture diagrams, and SDK guides. |

### How to Trigger Subagents:

```markdown
# 1. Single Background Task:
"Use qa to verify that user registration handles unicode names and duplicate emails"

# 2. Parallel Background Swarm:
"Run qa, security, and test-runner in parallel to verify the new payment checkout flow"

# 3. Chained Workflow Pipeline:
"Run subagent pipeline: scout -> architect -> implement -> qa -> reviewer"
```

---

## 🚀 Quickstart & 1-Line Installation

### 1. One-Command Native Pi Package Install (Recommended)
You can install `pi-engineer-os` globally with a single command via Pi's native package manager:
```bash
pi install git:github.com/kostikovk/pi-engineer-os
```

Or install it for the current repository only:
```bash
pi install -l git:github.com/kostikovk/pi-engineer-os
```

### 2. Turnkey Shell Installer (Alternative)
```bash
git clone https://github.com/kostikovk/pi-engineer-os.git
cd pi-engineer-os
./setup.sh
```

### 3. First Run in Any Repository
Open your project inside `pi`:
```bash
pi
```
Run the automated onboarding command:
```text
/bootstrap
```
The agent scans the codebase topology, locates test runners and package managers, and provisions a tailored `AGENTS.md` and `CONTEXT.md`.

---

## 📚 Deep-Dive Documentation

- [🔄 **SDLC Methodology Guide**](docs/SDLC.md) — 6-stage lifecycle from Recon to Delivery.
- [🤖 **Subagent Orchestration**](docs/SUBAGENTS.md) — Specialized background agents, parallel swarms, and chains.
- [🛡️ **Extension Ecosystem**](docs/EXTENSIONS.md) — Complete inventory of safety gates, token gauges, autocomplete, and handoffs.
- [📦 **Package & Distribution Guide**](docs/PACKAGING.md) — Native `pi` package rules, overrides, and updates.
- [🚀 **CI/CD & Headless Automation**](docs/CI-CD.md) — Automated PR reviews and DevSecOps audits in GitHub Actions.

---

## 🔁 Complete Development Lifecycle (End-to-End Walkthrough)

```
  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │  /bootstrap  │ ───► │    /grill    │ ───► │    /spec     │
  └──────────────┘      └──────────────┘      └──────────────┘
                                                     │
                                                     ▼
  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │     /pr      │ ◄─── │   /review    │ ◄─── │   /tickets   │
  └──────────────┘      └──────────────┘      └──────────────┘
                                                     ▲
                                                     │
                                            ┌─────────────────┐
                                            │   /implement    │
                                            │ (TDD + Context7)│
                                            └─────────────────┘
```

---

## 📄 License
MIT © 2026. Built for high-velocity engineering teams and solo builders who demand correctness, maintainability, and zero hallucination.
