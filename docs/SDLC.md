# 🔄 The `pi-engineer-os` SDLC Methodology

> **Transforming AI coding from trial-and-error "vibe coding" into rigorous, deterministic, and verifiable Software Engineering.**

---

## 🏛️ The 6-Stage SDLC Loop

```
  ┌─────────────────────────────────────────────────────────────┐
  │ 1. Onboarding & Recon (/bootstrap, /grill, scout, researcher)│
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 2. Architecture & Spec (/spec, ADRs, architect, CONTEXT.md) │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 3. Vertical Slicing (/tickets, tracer bullets)              │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 4. TDD & Implementation (/implement, Red-Green-Refactor)    │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 5. Audit & Two-Axis Review (/review, /audit, reviewer)       │
  └──────────────────────────────┬──────────────────────────────┘
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 6. Release & Delivery (/commit, /pr, /release)              │
  └─────────────────────────────────────────────────────────────┘
```

---

## 1. Onboarding & Reconnaissance

Before writing code in an unfamiliar repository:
- Run `/bootstrap` to automatically analyze the architecture (Monolith, Monorepo, Microservices), language versions, test commands, and package managers.
- Generates `AGENTS.md` and `CONTEXT.md` tailored specifically to the project.
- Dispatch `scout` subagent for deep AST dependency mapping:
  ```
  subagent(agent="scout", task="Map authentication middleware and user session dependencies")
  ```
- Dispatch `researcher` subagent to check live upstream library APIs and breaking changes.

---

## 2. Architecture & Specification

Never jump straight into coding complex features:
- Run `/grill <feature>`: The agent acts as a relentless Staff Architect grilling you on edge cases, data invariants, concurrency, and failure modes.
- Run `/spec <feature>`: Synthesizes requirements into a standardized RFC (`docs/specs/RFC-xxx.md`).
- Document irreversible decisions as **Architecture Decision Records (ADRs)** in `docs/adr/`.
- Ensure Ubiquitous Language terms are registered in `CONTEXT.md`.

---

## 3. Tracer-Bullet Vertical Slicing

Break large features into thin vertical slices:
- Run `/tickets [issue-or-spec]`: Slices requirements into independent, testable tickets in `docs/tickets.md`.
- Integrates directly with GitHub Issues (`gh issue view #123`), Jira, Linear, or ClickUp.
- Focus on end-to-end tracer bullets rather than horizontal architectural layers.

---

## 4. TDD & Implementation

Follow strict **Red-Green-Refactor** discipline:
- Run `/implement <ticket>`:
  1. **Check Failure Memories**: Queries past project mistakes and known pitfalls.
  2. **Write Failing Test (Red)**: Test against behavior and public interface, not private implementation.
  3. **Minimal Implementation (Green)**: Write clean code to satisfy the test.
  4. **Refactor**: Clean up design smells while tests pass.
- Use `/handoff <next-phase>` to transition cleanly between tasks without losing architectural context or suffering from lossy token compaction.

---

## 5. Dual-Axis Code Review & Security Audit

Verify quality before merging:
- Run `/review`: Audits changes against **12 Fowler Smells** (Deep modules, Long Parameter Lists, Feature Envy, Leaky Abstractions) and **Spec Fidelity**.
- Run `/audit`: Scans dependencies for CVEs (`npm audit`, `cargo audit`, etc.) and performs OWASP Top 10 security checks.

---

## 6. Delivery & Release

- **Stacked PRs & Slicing (`/gh-stack`)**:
  - Automatically break large multi-layer features into a linear chain of atomic PRs using the `stacked-prs` / `gh-stack` methodology.
  - Supports both the official GitHub CLI `gh-stack` extension (`gh stack init`, `gh stack submit --auto --open`, `gh stack sync --prune`) and standard `gh pr create` chaining.
- Run `/commit`: Inspects git diff, enforces Conventional Commits (`feat:`, `fix:`, `refactor:`), and verifies tests before committing.
- Run `/pr`: Generates a structured Pull Request description with summary, architectural rationale, and verification steps.
- Run `/release`: Calculates SemVer bump, generates CHANGELOG, and creates release tags.
