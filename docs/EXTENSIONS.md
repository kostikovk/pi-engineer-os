# 🛡️ Extension Ecosystem

`pi-engineer-os` bundles high-performance TypeScript extensions that protect your repository, preserve context, and accelerate developer workflows.

---

## 📦 Extension Inventory

### 1. `safety-gate.ts`
- **Destructive Command Interception**: Blocks accidental `rm -rf /`, `git reset --hard`, `git push --force`, `drop database`, and `dd` commands with an explicit TUI confirmation modal.
- **Path Protection**: Prevents unauthorized modifications to `.env`, `.git/`, and sensitive project secrets.

### 2. `token-gauge.ts`
- **Real-Time Context Meter**: Displays live token consumption, saturation percentage, and color-coded status in the TUI footer:
  - 🟢 `< 60%`: Healthy context
  - 🟡 `60% - 80%`: Caution (consider `/handoff` or `/compact`)
  - 🔴 `> 80%`: Saturation warning

### 3. `handoff.ts` (`/handoff`)
- **Lossless SDLC Phase Transition**: Instead of degrading LLM recall with lossy compaction, `/handoff <goal>` distills key architectural decisions, modified files, and acceptance criteria into a clean new session.

### 4. `dirty-repo-guard.ts`
- **Working Tree Protection**: Intercepts `/new`, `/resume`, and `/fork` actions if uncommitted git changes exist, ensuring in-flight work is committed before context switching.

### 5. `project-rules.ts`
- **Autonomous Rule Discovery**: Scans `.claude/rules/*.md`, `docs/rules/*.md`, `.cursorrules`, and `CODING_STANDARDS.md`, injecting them into the agent system prompt via `before_agent_start`.

### 6. `git-merge-and-resolve.ts` (`/resolve-conflicts`)
- **AI Git Conflict Resolver**: Analyzes git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), cross-references both branch histories, and resolves conflicts cleanly while preserving domain invariants.

### 7. `github-issue-autocomplete.ts`
- **Interactive Issue Search**: Type `#` in the prompt editor to trigger instant fuzzy-search over open GitHub issues via `gh issue list`. Selecting an issue inserts its title and number.

### 8. `inline-bash.ts`
- **Prompt Expansions**: Dynamically interpolate command output and file contents directly in prompt text:
  - `!{git status --short}`
  - `@{src/auth/jwt.ts}`

### 9. `custom-compaction.ts` & `trigger-compact.ts`
- **Task & Error-Preserving Compaction**: Replaces lossy generic summarization with an engineering state checkpoint that captures active objectives, in-flight subtasks, tool error diagnostics, working tree diffs, and an authoritative **Immediate Resume Directive**.
- **Non-Disruptive Auto-Compaction**: Dynamically triggers only near context window limits (>=88%), never interrupting active tool error resolution mid-flight. Supports `/trigger-compact` on demand.

### 10. `context7-docs.ts` (`/docs`)
- **Version-Accurate Live Docs**: Fetches real-time documentation for modern frameworks and libraries to eliminate training cutoff hallucinations.
