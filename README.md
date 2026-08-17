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
│   └── code-review/            # Dual-axis audit (12 Fowler Smells + Spec Fidelity)
├── ⚡ prompts/                 # Standard SDLC workflows (/bootstrap, /grill, /spec, etc.)
├── 🛡️ extensions/              # Context preservation, safety gates, and live docs
│   ├── github-issue-autocomplete.ts # Fast fuzzy `#issue` autocompletion in prompt input
│   ├── safety-gate.ts          # Protection against rm -rf, git force push, and DROP DB
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
| **`/diagnose <bug>`** | When encountering bugs or regressions | Enforces a 5-phase root cause analysis: reproduces via failing test before modifying code | Verified fix with regression test |
| **`/review`** | Before merging or creating a PR | Performs a dual-axis audit: 12 Fowler code smells + spec fidelity check | Structured blocker list & verdict |
| **`/docs <lib> <q>`** | When using external frameworks & libraries | Fetches clean, version-accurate documentation via Context7 API | Up-to-date syntax without hallucinations |
| **`/pr`** | When a ticket or feature is completed | Generates a standardized Pull Request summary with test proofs and checklists | Ready-to-merge PR description |
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

## 🚀 Quickstart & Installation

### 1. Installation

#### Option A: Global Installation (Recommended)
Installs all presets, extensions, skills, and templates to `~/.pi/agent/` for use across all repositories:
```bash
cd /path/to/pi-engineer-os
./setup.sh --global
```

#### Option B: Project-Local Installation
Installs configs and extensions specifically into the current project's `.pi/` directory:
```bash
cd /path/to/your-project
/path/to/pi-engineer-os/setup.sh --project
```

### 2. First Run in a Repository
Open any project inside `pi`:
```bash
pi
```
Run the automated onboarding command:
```text
/bootstrap
```
The agent scans the codebase topology, locates test runners and package managers, and provisions a tailored `AGENTS.md`.

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
