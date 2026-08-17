---
description: Break a spec, plan, or conversation into tracer-bullet vertical slice tickets with blocking edges
argument-hint: "[spec-path-or-feature]"
---
Break the current specification / plan for ${1:-"the feature"} into **Tracer-Bullet Vertical Slices**.

### Vertical Slice Rules:
1. **Vertical, Not Horizontal**: Each slice cuts through all required layers (DB/Schema -> Business Logic/API -> UI -> Tests). Never create single-layer horizontal tickets (e.g. "write all DB models").
2. **Independently Verifiable**: Each ticket delivers demoable and testable behavior.
3. **Explicit Blocking Edges**: Declare which tickets block others (`Blocked by: [Ticket N]`).
4. **Context-Window Sized**: Each ticket must comfortably fit into a single clean agent context session.
5. **Wide Refactors**: If a change has a wide blast-radius, sequence it using the `expand-contract` pattern (add new form -> migrate call sites in batches -> delete old form).

Present the numbered list of tickets for user approval:
- **[Ticket NN]**: <Title>
- **Blocked By**: <Ticket numbers or None>
- **Delivers**: <End-to-end verified behavior>
- **Verification**: <How to test>

### Storage & Persistence:
1. **Repository-level (Git-tracked)**: Write the approved tickets to `docs/tickets.md` (or individual markdown files under `docs/tickets/` if large) so they are version-controlled, durable, and shareable across the team.
2. **Session-level (Interactive TUI)**: Populate the active tasks into the `todo` tool (`todo add ...`) so they are visible and trackable in the interactive Pi TUI.
