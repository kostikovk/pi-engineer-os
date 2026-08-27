# 🤖 Subagent Orchestration & Execution Engine

`pi-engineer-os` includes a lightweight, non-blocking subagent engine capable of executing specialized background agents in **single**, **parallel**, or **chained** workflows.

---

## 👥 The 16 Specialized Subagents

| Agent | Model | Primary Mission | Strengths & Tools |
|---|---|---|---|
| **`product-manager`** | Max Reasoning (Opus / Sonnet) | User journeys, PRDs, Gherkin Acceptance Criteria (Given-When-Then), and feature backlog prioritization | Product framing, scope bounding, user story authoring |
| **`architect`** | Max Reasoning (Opus / o3) | Universal systems architecture, Deep Module design, ADR evaluation, boundary analysis, high-leverage tradeoffs | System modeling, global contract definition |
| **`backend-architect`** | Max Reasoning (Opus) | High-throughput API topologies, event-driven pipelines, transactional sagas, multi-tier caching hierarchies, and fault-tolerant service boundaries | Distributed reliability, Outbox pattern, cache anti-stampede, rate limiting |
| **`frontend-architect`** | Max Reasoning (Opus) | Web application topologies (SSR/RSC/SPA), client state machines, normalized caching, optimistic UI reconciliation, Core Web Vitals, and design system governance | Client topology, XState statecharts, TanStack Query key factories, zero-CLS |
| **`db-architect`** | Max Reasoning (Opus) | Schema design, zero-downtime migrations (*Expand & Contract*), and SQL/ORM query optimization | Database modeling, lock-free DDL, index tuning |
| **`backend`** | High Reasoning (Sonnet) | High-throughput APIs, domain business logic, data models, background workers, and resilient service boundaries | Server architecture, Deep Backend Modules, DDD, resilience |
| **`frontend`** | High Reasoning (Sonnet) | Responsive component hierarchies, client state, a11y (WCAG 2.1 AA), design systems, and API contract integration | UI/UX architecture, Deep Frontend Modules, state & rendering |
| **`scout`** | Fast (Gemini Flash / Haiku) | Rapid codebase recon, AST dependency tracing, and file mapping | Read-only codebase explorer, fast symbol resolution |
| **`researcher`** | Fast / General | Upstream library docs, breaking changes, Context7 search | Web & API documentation specialist |
| **`qa`** | High Reasoning (Sonnet) | Acceptance criteria (Given-When-Then), edge cases, E2E user journeys, and adversarial input testing | Verification engineer, bug reproduction, Playwright/E2E tests |
| **`test-runner`** | General (Flash / 4o) | Parallel test execution, test generation, and flakiness isolation | Command runner, test failure diagnosis |
| **`reviewer`** | High Reasoning (Sonnet) | Two-axis Fowler smell analysis, deep module boundaries, and spec fidelity | Read-only auditor, strict architectural standards |
| **`security`** | High Reasoning (Sonnet) | DevSecOps, OWASP Top 10, secret scanning, AuthN/AuthZ flaws, STRIDE threat modeling | Adversarial auditor, vulnerability remediation |
| **`diagnostician`** | High Reasoning (Sonnet) | 5-Phase Root-Cause Analysis, MRE isolation, and binary search regressions (`git bisect`) | Debugger, hypothesis falsification |
| **`devops`** | Fast (Gemini Flash) | Multi-stage Dockerfiles, GitHub Actions CI/CD pipelines, Makefile automation, container security | Infrastructure, caching, pipeline engineering |
| **`tech-writer`** | Fast (Gemini Flash) | OpenAPI 3.1 specs, Mermaid architecture diagrams, SDK references, and developer guides | Grounded technical writing, zero hallucination |

---

## ⚙️ Orchestration Modes

### 1. Single Agent Execution
Run a focused agent in the background while keeping the main conversation clean:
```typescript
subagent({
  agent: "backend-architect",
  task: "Design an event-driven Outbox pipeline and Redis caching strategy for high-throughput order processing"
})
```

### 2. Parallel Subagent Swarm
Execute multiple background tasks concurrently (e.g., Backend Architect + Frontend Architect + DB Architect):
```typescript
subagent_parallel({
  tasks: [
    { agent: "backend-architect", task: "Design idempotency keys and transactional boundaries for checkout" },
    { agent: "frontend-architect", task: "Design client state machine and optimistic update rollback for checkout UI" },
    { agent: "db-architect", task: "Design lock-free tables and indexes for orders and payments" }
  ]
})
```

### 3. Pipeline / Chained Execution
Pipe the output of one agent into the next:
```typescript
subagent_chain({
  steps: [
    { agent: "backend-architect", task: "Draft RFC and API contract for multi-tenant billing" },
    { agent: "backend", task: "Implement domain services and Zod validation according to RFC" },
    { agent: "security", task: "Audit billing endpoints for IDOR and authorization flaws" },
    { agent: "qa", task: "Generate adversarial test cases for payment edge cases" }
  ]
})
```

---

## 📁 Custom Subagent Definitions

Agents are defined as clean Markdown profiles with frontmatter in `agents/`:

```markdown
---
name: backend-architect
description: Principal Backend & Distributed Systems Architect
model: anthropic/claude-opus-5
tools: [read, bash, context7_docs]
---

You are a Principal Backend and Distributed Systems Architect...
```
