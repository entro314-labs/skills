---
id: 01M2NDNGG8EG9T51HHJYESB8KC
type: page
title: Working on this repo
---

# Working on this repo

This directory IS the crete plugin - the Athens to Crete methodology packaged for Claude Code (and, via AGENTS.md + scripts/install-codex.sh, for Codex). The methodology content itself lives in:

- `skills/athens-to-crete/` - the skill (SKILL.md + references/)
- `AGENTS.md` - the portable, agent-agnostic playbook
- `hooks/philosophy.md` - the one-paragraph SessionStart reminder

## Rules for editing

- Keep the three copies above consistent: a change to the methodology must land in SKILL.md/references, AGENTS.md, and (if it affects the core framing) hooks/philosophy.md.
- `commands/*.md` are slash commands (frontmatter: `description`, optional `argument-hint`; may use `$ARGUMENTS`). `agents/*.md` are subagents (frontmatter: `name`, `description`, `tools`). Never mix the two formats.
- Commands reference agents by name (solution-architect, implementation-strategist, coherence-validator, flow-analyzer). If you rename an agent, update every command that invokes it and AGENTS.md's inline-phase mapping.
- mnemosyne integration is optional by design: commands must degrade gracefully ("skip silently if unavailable") when its MCP tools aren't present.
- Bump `version` in `.claude-plugin/plugin.json` for any user-visible change.
- Update README.md's command table when commands are added, removed, or renamed.
