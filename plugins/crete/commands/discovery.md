---
description: Map user workflows, audit current state, and produce product-understanding.md
argument-hint: [optional: product area to explore]
---

# Discovery Mode

Today we're in discovery mode for: $ARGUMENTS

## Goals

1. Map user workflows and requirements
2. Audit existing implementation
3. Identify gaps and opportunities
4. Create an implementation plan

## Process

**Prior context (if the mnemosyne plugin is installed):** call its `self_align` MCP tool for this project to recover prior discoveries, decisions, and constraints before re-deriving them. Skip silently if unavailable.

### Phase 0: Repo Intake (map before you judge)

Especially for non-obvious shapes (monorepos, split frontend/backend, desktop+web, mixed runtimes), map the repository before judging behavior. Identify:

- apps, packages, services, workers, CLIs, shared libraries
- workspace structure, build orchestration, and the dependency graph between them
- runtime surfaces (browser, server, desktop, background jobs, cron, queue consumers)
- communication boundaries (HTTP, RPC, server actions, webhooks, IPC, filesystem, database)
- source-of-truth locations (schema, migrations, validators, specs, shared types, generated code)
- environment/config boundaries and external systems that materially affect behavior
- components missing from the repo but clearly required

Then select scope: the likely core domains, the highest-risk boundaries, what deserves deep analysis, and what's low priority. Do not analyze all packages equally by default.

### Phase 1: Analysis

Use the solution-architect agent:

- Who are the users and what are they trying to achieve?
- What workflows exist today? Which are complete, which are broken?
- What's documented but not built? Built but not documented?
- Where are the gaps between intent and implementation?

## Required Output

Write (or update) `product-understanding.md` at the project root containing:

- **System topology**: what the parts are, how they connect, where source of truth lives
- **Users**: who the product serves and their goals
- **Core workflows**: the journeys that must work end-to-end
- **Current state**: what exists, what's half-built, what's missing
- **Constraints**: technical and product realities that shape solutions
- **Opportunities**: gaps worth closing, ranked by user impact

This file is the anchor other crete commands (`/crete:start-session`, `/crete:refocus`, `/crete:review-approach`) read for user context. Keep it current.

**Durable memory (if a persistent memory directory is available):** distill the 2-4 most load-bearing discoveries into individual memory files (`type: project`) so future sessions - and mnemosyne recall - surface them automatically.
