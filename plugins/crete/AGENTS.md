---
id: 01M2NDNG2HZEN13SSW3Y8A6CQT
type: page
title: Athens to Crete - Engineering Playbook
---

# Athens to Crete - Engineering Playbook

Agent-agnostic instructions (Codex, Claude Code, and any AGENTS.md-aware tool). Copy this file into a project root, or merge it into an existing AGENTS.md.

## Philosophy

You're in Athens and need to reach Crete. The naive approach: build a road - impossible, there's sea in the way. The over-engineered approach: invent a "shipcopter" - wastes time on fantasy. The wise approach: recognize boats and planes exist, and use them.

Before implementing:

1. Understand the actual problem, not the stated request
2. Map real constraints and terrain
3. Identify existing solutions in the codebase
4. Verify the path is complete end-to-end

Don't build roads across seas. Don't invent shipcopters. Use boats.

These guidelines bias toward caution over speed - for trivial tasks, use judgment.

## Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- If you write 200 lines and it could be 50, rewrite it

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## Workflow

### Before Writing Code

- Read existing code and documentation - understand context first
- Search the codebase for similar functionality before creating new
- Understand how domains interconnect and where this work fits
- Understand the intent and purpose of the project and each domain within it
- Verify assumptions by checking, not guessing

### Ambiguity

- If the request is unclear and the choice materially affects the outcome, ask
- If multiple interpretations exist, present them - don't pick silently
- If a simpler approach exists than the one requested, say so - push back when warranted
- Otherwise pick a reasonable default, state your assumptions explicitly, and proceed

### Scope Discipline

- Refactor what the task requires - no more; every changed line should trace directly to the request
- If you find a larger architectural problem, fix it only if it blocks the task; otherwise flag it in your final report and leave it
- Never expand a bug fix into a module rewrite unprompted
- Don't "improve" adjacent code, comments, or formatting; match existing style even if you'd do it differently
- Clean up orphans YOUR changes created (imports, variables, functions made unused); mention pre-existing dead code - don't delete it unless asked

### When Implementing

- Refactor in place - no "enhanced", "improved", "new", "v2" file variants
- No internal compatibility layers or wrapper adapters
- Hard refactor the case in hand and align all references
- Fix architecture problems, don't patch around them
- Remove duplicate implementations immediately
- Verify cross-domain integration before considering work complete

### Integration Requirements

- All functionality interconnects across the codebase
- Expose features across TUI, CLI, UI, and API where applicable
- Domains must be able to call each other's functionality
- No siloed components

### Definition of Done

- Translate the task into verifiable goals before starting: "add validation" → tests for invalid inputs pass; "fix the bug" → a reproducing test passes; "refactor X" → same tests pass before and after
- The project builds and the relevant tests pass - run them, don't assume
- No new lint or type errors introduced
- Pre-existing failures unrelated to your change: report them, don't silently fix or ignore them
- Never report "done" on work you haven't verified

## Anti-Patterns

### Error Handling

- Silent failures - operations that fail without surfacing errors
- Error swallowing - catch blocks that log-and-continue
- Missing error context - re-throws without wrapping
- Ignored errors - unchecked return values, unhandled rejections

### Type Safety

- `any` in TypeScript - use `unknown` with narrowing, unions, or generics
- `type: ignore` in Python - requires justification comment
- Implicit `any` - untyped function parameters and returns
- Non-exhaustive switches - all variants handled or explicitly unreachable
- Unsafe casts - assertions that bypass compiler checks
- Nullable access without guards

### Implementation Integrity

- Stubs/mocks outside tests - no placeholder logic in production
- Dead code - unreachable branches, unused functions, commented blocks
- Partial implementations - happy path only, missing error paths
- Orphaned code - no call sites, no integration
- Broken invariants - state that violates contracts

### Language-Specific

**TypeScript:** No `unknown` casts without narrowing; exhaustive switches required

**Rust:** No `.unwrap()`/`.expect()` outside tests - use `?`; `unsafe` requires justification

**Python:** No bare `except:`; no broad `except Exception` without re-raise

**Go:** No `_ = err` - handle or propagate

### Framework (Next.js/React)

- Server/client boundary leaks
- Misplaced `"use client"` directives
- Hydration mismatches

### Database

- Missing FK indexes
- Constraints enforced in app logic instead of schema
- Schema drift - type changes without migrations

## Git & Commits

- DO NOT add yourself as co-author, never
- Commit only when asked, or when the task explicitly requires it - state what you would commit otherwise
- Clean, atomic commits with conventional messages: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- Describe both the code change and its effect (what it fixed)
- Never force-push to main/master, never use `--no-verify`, never commit secrets or credentials
- Keep CHANGELOG.md updated for user-facing changes; skip it for internal-only refactors and fixes invisible to users

## Version Policy & Tooling

Bleeding edge is a feature, not a bug - never downgrade languages, tools, or libraries; continuously evaluate more modern alternatives.

- For **dev tooling** (linters, formatters, bundlers, test runners), prefer the latest including prereleases when they're the project's chosen stack
- For **production dependencies and runtimes**, use the same logic; never downgrade
- Don't upgrade or downgrade dependencies unprompted as a side effect of an unrelated task - propose upgrades separately
- When an upgrade brings breaking API changes, adapt the code in place - no compatibility shims

Preferred toolchain:

- **General:** mise for runtimes/packages, homebrew for system dependencies
- **Node/TS:** pnpm, vite (or Next.js for SSR React), oxlint/oxfmt, tsgo, Knip, Syncpack, tsdown, turborepo
- **Python:** uv, ruff (replaces black/isort/flake8/mypy), pytest, Python 3.13+
- **Go:** golangci-lint, goimports, go mod, go test with coverage
- **Docker:** latest base images, multi-stage builds, .dockerignore, env-based config

## Testing

- Write tests for all new functionality and bug fixes
- For bug fixes, first write a test that reproduces the bug, then make it pass
- Unit tests for isolated components, integration tests for end-to-end scenarios
- You may disable auth gates in local/test configuration only - never commit that state, and verify restoration (e.g. grep for the change) before finishing

## Documentation

- README with setup instructions
- Document complex algorithms and business logic, adjacent to the code they describe
- Update docs when the code they describe changes
- Doc comment conventions - **JS/TS:** JSDoc | **Python:** Google/NumPy docstrings | **Rust:** `///` with examples | **Go:** Godoc for exports
- CHANGELOG.md per the Git section above

## Communication Style

- Direct, factual - no marketing tone or consultant-speak
- No timelines, roadmaps, or projected outcomes
- No HR allocation or ROI discussion
- Realistic assessments over aspirational statements
- Concrete and actionable, not speculative
- When you flag a problem, say whether you fixed it or left it, and why

## Structured Workflows (for agents without subagent support)

When a prompt references a named agent, run its phase inline instead:

- **solution-architect** → analyze problem, map solution, audit existing resources, produce blueprint before code
- **implementation-strategist** → decompose, order by dependency (foundation → logic → service → presentation → integration), exact build order
- **coherence-validator** → after building, reconstruct intent from evidence, then check reachability, completeness, integration, sibling-flow consistency, and orphans; report COHERENT/DISCONNECTED/INCOMPLETE/MISSING/FIXES REQUIRED with severity and confidence
- **flow-analyzer** → validate every journey end-to-end: START → STEPS → BRANCH → ERROR → END
