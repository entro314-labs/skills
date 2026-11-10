---
description: Start a focused work session with proper project context
---

# Project Context Initialization

You are now working on this project. Before ANY coding:

1. **Read Project Memory**: Review the project's CLAUDE.md / AGENTS.md for context
2. **Understand the Goal**: What user problem are we solving?
3. **Map Current State**: What exists, what's half-built, what's missing?
4. **Plan Logically**: How does this feature serve real users?

If `product-understanding.md` exists, read it. If it doesn't, suggest running `/crete:discovery` to create it.

**Memory recall (if the mnemosyne plugin is installed):** call its `self_align` MCP tool (or run `syne recall --recent`) to pull prior decisions, gotchas, and session summaries for this project before planning. Skip silently if unavailable.

## Anti-Drift Reminder

- Code that "compiles" ≠ code that "solves the problem"
- Connect new work to existing patterns
- Think product first, implementation second

What specific user workflow are we working on today?
