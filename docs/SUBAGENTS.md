# 🤖 Subagent Orchestration & Execution Engine

`pi-engineer-os` includes a lightweight, non-blocking subagent engine capable of executing specialized background agents in **single**, **parallel**, or **chained** workflows.

---

## 👥 The Specialized Agent Roster

| Agent | Model | Primary Mission | Strengths & Tools |
|---|---|---|---|
| **`scout`** | Fast (Haiku / 4o-mini) | Rapid codebase recon, AST dependency tracing, and file mapping | Read-only codebase explorer, fast symbol resolution |
| **`researcher`** | Fast / General | Upstream library docs, breaking changes, Context7 search | Web & API documentation specialist |
| **`test-runner`** | General (Sonnet / 4o) | Parallel test execution, test generation, and flakiness isolation | Command runner, test failure diagnosis |
| **`reviewer`** | High Reasoning (Sonnet) | Two-axis Fowler smell analysis, security audits (OWASP), spec fidelity | Read-only auditor, strict architectural standards |
| **`architect`** | Max Reasoning (Opus / o3) | Deep module design, ADR evaluation, boundary analysis, high-leverage tradeoffs | System modeling, contract definition |

---

## ⚙️ Orchestration Modes

### 1. Single Agent Execution
Run a focused agent in the background while keeping the main conversation clean:
```typescript
subagent({
  agent: "scout",
  task: "Find all endpoints calling the payment gateway and report their file paths"
})
```

### 2. Parallel Subagent Swarm
Execute multiple background tasks concurrently (e.g., recon + docs research + test auditing):
```typescript
subagent_parallel({
  tasks: [
    { agent: "scout", task: "Map dependencies of /src/auth" },
    { agent: "researcher", task: "Check breaking changes in Next.js 15 App Router Server Actions" },
    { agent: "test-runner", task: "Run existing auth tests and report test suite health" }
  ]
})
```

### 3. Pipeline / Chained Execution
Pipe the output of one agent into the next:
```typescript
subagent_chain({
  steps: [
    { agent: "scout", task: "Locate SQL queries without parameterized inputs" },
    { agent: "reviewer", task: "Audit discovered queries for SQL injection vulnerabilities and draft fixes" }
  ]
})
```

---

## 📁 Custom Subagent Definitions

Agents are defined as clean Markdown profiles with frontmatter in `agents/`:

```markdown
---
name: scout
description: Rapid codebase explorer and dependency mapper
model: claude-3-5-haiku
tools: [read, bash]
---

You are the SCOUT subagent. Your goal is rapid orientation and dependency tracing.
Return structured Markdown maps of files, symbols, and cross-references.
```
