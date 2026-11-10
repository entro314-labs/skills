---
id: 01M2NDNGTH0RCVQVG7QVG8T75Q
type: page
title: Athens to Crete
---

# Athens to Crete

An integration-first engineering methodology, packaged as the **crete** plugin for Claude Code and as portable prompts for Codex and other AGENTS.md-aware tools.

One core idea: **don't build roads across seas, don't invent shipcopters - use boats.** Understand the real problem, map the constraints, reuse what exists, and verify the path end-to-end before and after building.

## What's in here

```
.claude-plugin/     plugin.json (Claude Code plugin: "crete")
commands/           10 slash commands (/crete:think-first, /crete:build-connected, ...)
agents/             4 subagents the commands orchestrate
skills/             athens-to-crete skill (auto-activates on implementation work)
hooks/              SessionStart philosophy reminder
AGENTS.md           portable playbook for Codex / any AGENTS.md-aware agent
scripts/            install-codex.sh
```

### Commands

| Command                              | Phase         | What it does                                                              |
| ------------------------------------ | ------------- | ------------------------------------------------------------------------- |
| `/crete:start-session`               | kickoff       | Load project context before any coding                                    |
| `/crete:discovery`                   | kickoff       | Map workflows and current state; writes `product-understanding.md`        |
| `/crete:think-first <feature>`       | before code   | Problem analysis via solution-architect; blueprint before implementation  |
| `/crete:review-approach`             | before code   | Build / don't build / redesign recommendation                             |
| `/crete:build-connected <feature>`   | build         | Full pipeline: architecture → strategy → implement → validate → flow-test |
| `/crete:implement [story]`           | build         | Implementation mode with quality gates                                    |
| `/crete:refocus`                     | drift         | Reset when execution loses the real problem                               |
| `/crete:validate-coherence <area>`   | after code    | Completeness and connectivity check                                       |
| `/crete:find-orphans`                | after code    | Dead/disconnected code scan                                               |
| `/crete:project-synthesis <project>` | whole project | Reconcile docs, code, and vision into a coherent plan                     |

### Agents

- **solution-architect** - maps the complete solution space before code; produces the blueprint
- **implementation-strategist** - dependency-ordered build plan
- **coherence-validator** - post-build reachability/completeness/integration/orphan check
- **flow-analyzer** - end-to-end journey validation

The commands orchestrate these in sequence; each agent is also independently invocable.

## Install (Claude Code)

```
/plugin marketplace add entro314-labs/skills
/plugin install crete@entro314-labs
```

For local development, run `claude --plugin-dir ./` from this directory.

## Install (Codex)

```bash
./scripts/install-codex.sh    # copies commands into ~/.codex/prompts as /prompts:crete-*
cp AGENTS.md <your-project>/  # the methodology itself, agent-agnostic
```

Codex has no subagents; AGENTS.md includes an inline-phase mapping for each agent reference. Re-run the install script after updating this repo.

## Works with mnemosyne

If the [mnemosyne](https://github.com/entro314-labs/mnemosyne) plugin is installed, the context-gathering commands (`start-session`, `discovery`, `think-first`) automatically recall prior decisions and session history via its MCP tools, and `discovery` distills durable findings into memory files mnemosyne can re-serve. Everything degrades gracefully when it isn't installed.

## Why this exists

To keep engineering work practical, modern, and coherent - especially when moving fast. Code that compiles is not code that solves the problem; every feature must be a bridge, not an island.
