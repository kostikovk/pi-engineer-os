---
description: Break a spec, plan, or external issue (Jira/Linear/GitHub/ClickUp) into vertical tracer-bullet slices
argument-hint: "[spec-path-or-issue-id]"
---
Break the current specification, plan, or external issue for ${1:-"the feature"} into **Tracer-Bullet Vertical Slices**.

### External Tracker Integration:
If the argument is an issue reference (e.g. `#142`, `https://github.com/.../issues/142`, `PROJ-123`, `TASK-456`):
- If `gh` CLI is installed and it is a GitHub issue, run `gh issue view ${1}` to inspect title, acceptance criteria, and comments.
- Associate the generated tickets with the external issue key in the header of `docs/tickets.md`.

### Vertical Slice Rules:
1. **Vertical, Not Horizontal**: Each slice cuts through all required layers (DB/Schema -> Business Logic/API -> UI -> Tests). Never create single-layer horizontal tickets (e.g. "write all DB models").
2. **Independently Verifiable**: Each ticket delivers demoable and testable behavior.
3. **Explicit Blocking Edges**: Declare which tickets block others (`Blocked by: [Ticket N]`).
4. **Context-Window Sized**: Each ticket must comfortably fit into a single clean agent context session.
5. **Wide Refactors**: If a change has a wide blast-radius, sequence it using the `expand-contract` pattern.

Present the numbered list of tickets for user approval:
- **[Ticket NN]**: <Title>
- **Blocked By**: <Ticket numbers or None>
- **Delivers**: <End-to-end verified behavior>
- **Verification**: <How to test>

### Storage & Sync Lifecycle:
1. **Durable File (`docs/tickets.md`)**: Write the active plan to `docs/tickets.md` with:
   - External Tracker Link / ID (e.g. `Jira: PROJ-123` / `GitHub: #142`)
   - Ticket items in state format: `[ ] Pending`, `[-] In Progress`, `[x] Completed (Commit: hash)`
2. **Interactive TUI Tasks**: Sync each ticket into Pi's interactive task list (`todo add "[Ticket NN] <Title>"`).
3. **Archiving Completed Milestones**: When all slices are completed, archive the milestone by moving `docs/tickets.md` to `docs/archive/tickets-YYYY-MM-DD-<feature>.md` or clearing for the next sprint.
