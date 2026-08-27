# 🤖 Subagent Orchestration & Execution Engine

`pi-engineer-os` includes a lightweight, non-blocking subagent engine capable of executing specialized background agents in **single**, **parallel**, or **chained** workflows.

---

## 👥 The 11 Specialized Subagents

| Agent | Model | Primary Mission | Strengths & Tools |
|---|---|---|---|
| **`scout`** | Fast (Gemini Flash / Haiku) | Rapid codebase recon, AST dependency tracing, and file mapping | Read-only codebase explorer, fast symbol resolution |
| **`researcher`** | Fast / General | Upstream library docs, breaking changes, Context7 search | Web & API documentation specialist |
| **`qa`** | High Reasoning (Sonnet) | Acceptance criteria (Given-When-Then), edge cases, E2E user journeys, and adversarial input testing | Verification engineer, bug reproduction, Playwright/E2E tests |
| **`test-runner`** | General (Flash / 4o) | Parallel test execution, test generation, and flakiness isolation | Command runner, test failure diagnosis |
| **`reviewer`** | High Reasoning (Sonnet) | Two-axis Fowler smell analysis, deep module boundaries, and spec fidelity | Read-only auditor, strict architectural standards |
| **`architect`** | Max Reasoning (Opus / o3) | Deep module design, ADR evaluation, boundary analysis, high-leverage tradeoffs | System modeling, contract definition |
| **`security`** | High Reasoning (Sonnet) | DevSecOps, OWASP Top 10, secret scanning, AuthN/AuthZ flaws, STRIDE threat modeling | Adversarial auditor, vulnerability remediation |
| **`diagnostician`** | High Reasoning (Sonnet) | 5-Phase Root-Cause Analysis, MRE isolation, and binary search regressions (`git bisect`) | Debugger, hypothesis falsification |
| **`db-architect`** | Max Reasoning (Opus) | Schema design, zero-downtime migrations (*Expand & Contract*), and SQL/ORM query optimization | Database modeling, lock-free DDL, index tuning |
| **`devops`** | Fast (Gemini Flash) | Multi-stage Dockerfiles, GitHub Actions CI/CD pipelines, Makefile automation, container security | Infrastructure, caching, pipeline engineering |
| **`tech-writer`** | Fast (Gemini Flash) | OpenAPI 3.1 specs, Mermaid architecture diagrams, SDK references, and developer guides | Grounded technical writing, zero hallucination |

---

## ⚙️ Orchestration Modes

### 1. Single Agent Execution
Run a focused agent in the background while keeping the main conversation clean:
```typescript
subagent({
  agent: "qa",
  task: "Verify that user registration handles unicode names, empty email fields, and duplicate registrations"
})
```

### 2. Parallel Subagent Swarm
Execute multiple background tasks concurrently (e.g., QA verification + security scan + test execution):
```typescript
subagent_parallel({
  tasks: [
    { agent: "qa", task: "Run acceptance checks on the new checkout flow" },
    { agent: "security", task: "Audit payment webhook signature validation for replay attacks" },
    { agent: "test-runner", task: "Execute full unit test suite" }
  ]
})
```

### 3. Pipeline / Chained Execution
Pipe the output of one agent into the next:
```typescript
subagent_chain({
  steps: [
    { agent: "scout", task: "Locate SQL queries without parameterized inputs" },
    { agent: "security", task: "Audit discovered queries for SQL injection vulnerabilities and draft fixes" },
    { agent: "qa", task: "Generate adversarial test cases verifying SQL injection rejection" }
  ]
})
```

---

## 📁 Custom Subagent Definitions

Agents are defined as clean Markdown profiles with frontmatter in `agents/`:

```markdown
---
name: qa
description: Quality Assurance & Acceptance Verification Engineer
model: anthropic/claude-sonnet-5
tools: [read, bash]
---

You are a Senior QA Automation & Verification Engineer...
```
