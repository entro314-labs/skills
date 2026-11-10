---
name: athens-to-crete
description: Integration-first engineering methodology. Use before implementing any feature or significant change, when reviewing an implementation approach, when code feels disconnected or over-engineered, or when checking for dead/orphaned code, silent failures, type-safety violations, or incomplete implementations.
---

# Athens to Crete

You're in Athens and need to reach Crete. The naive approach: build a road - impossible, there's sea in the way. The over-engineered approach: invent a "shipcopter" - wastes time on fantasy. The wise approach: recognize boats and planes exist, and use them.

**Don't build roads across seas. Don't invent shipcopters. Use boats.**

## Before Implementing

1. Understand the actual problem, not the stated request
2. Map real constraints and terrain
3. Identify existing solutions in the codebase
4. Verify the path is complete end-to-end

These guidelines bias toward caution over speed - for trivial tasks, use judgment.

## Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- If you write 200 lines and it could be 50, rewrite it

## Method

### Before Writing Code

- Read existing code and documentation - understand context first
- Search the codebase for similar functionality before creating new
- Understand how domains interconnect and where this work fits
- Verify assumptions by checking, not guessing

### Ambiguity

- If the request is unclear and the choice materially affects the outcome, ask
- If multiple interpretations exist, present them - don't pick silently
- If a simpler approach exists than the one requested, say so - push back when warranted
- Otherwise pick a reasonable default, state your assumptions explicitly, and proceed

### Scope Discipline

- Every changed line should trace directly to the request
- If you find a larger architectural problem, fix it only if it blocks the task; otherwise flag it and leave it
- Never expand a bug fix into a module rewrite unprompted
- Don't "improve" adjacent code, comments, or formatting; match existing style
- Clean up orphans YOUR changes created; mention pre-existing dead code - don't delete it unless asked

### When Implementing

- Refactor in place - no "enhanced", "improved", "new", "v2" file variants
- No internal compatibility layers or wrapper adapters
- Always hard refactor the case in hand and align all references
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
- Write tests for new functionality and bug fixes; for a bug, first write the test that reproduces it
- The project builds and the relevant tests pass - run them, don't assume; no new lint or type errors
- Pre-existing failures unrelated to your change: report them, don't silently fix or ignore them
- Never report "done" on work you haven't verified

### Commits

- Never add yourself as co-author
- Commit only when asked, or when the task explicitly requires it; atomic commits with conventional messages (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`) describing both the change and its effect
- Never force-push to main/master, never use `--no-verify`, never commit secrets

## Quality Bar

Check every implementation against [references/anti-patterns.md](references/anti-patterns.md) - error handling, type safety, implementation integrity, language-specific rules, framework and database pitfalls.

Strip needless indirection using [references/anti-indirection.md](references/anti-indirection.md) - forwarding wrappers, fallback chains, compatibility adapters, single-implementation abstractions. Every layer must justify its existence with actual work.

For tooling and stack choices, follow [references/tooling.md](references/tooling.md) - bleeding-edge-first, with the preferred toolchain per ecosystem.

## Escalation Paths

When installed as the `crete` plugin, deeper workflows are available:

- `/crete:think-first` - problem analysis before any code
- `/crete:build-connected` - full architecture → strategy → build → validate pipeline
- `/crete:validate-coherence` - post-implementation completeness check
- `/crete:find-orphans` - dead/disconnected code scan
- `/crete:project-synthesis` - whole-project reconciliation of docs, code, and vision

## Remember

- Code that "compiles" ≠ code that "solves the problem"
- Semantic coherence > syntactic correctness
- Every feature must be a bridge, not an island
