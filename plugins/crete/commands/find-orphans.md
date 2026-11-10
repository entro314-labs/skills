---
description: Scan the codebase for dead, disconnected, duplicated, or needlessly indirect code
---

# Find Orphaned Code

Scan for disconnected components and accumulated debt:

## Detection Patterns

### Orphans

- UI components never rendered
- Functions never called
- Endpoints without routes; routes without UI access
- Styles without HTML
- Tests without implementation (or asserting on removed behavior - passing vacuously)
- Config without usage

### Runtime Leftovers

- Debug logging left from development sessions
- Feature flags evaluating to the same value in all environments - inline the winning branch, delete the flag
- Routes/actions with zero frontend references
- DB columns never read or written by current code; indexes on columns no longer queried
- Environment variables read by no code
- Webhooks registered but no handler; scheduled jobs for deleted functionality
- Skipped tests (`skip`/`.only`) left in committed code

### Parallel Implementations

- Two utilities doing the same thing in different files
- Old and new versions coexisting after a partial migration
- Duplicate validation: the same rule in a schema AND an ad-hoc check - consolidate the source of truth
- Multiple error types representing the same failure mode

Pick one implementation, migrate all call sites, delete the other.

### Needless Indirection

- One-line wrappers that just forward arguments
- "Generic" hooks/components/functions with exactly one caller
- Compatibility shims and re-exports kept only for legacy import paths
- Abstractions with a single implementation

Full pattern list: the athens-to-crete skill's `references/anti-indirection.md`.

## Analysis Steps

1. Map all components/functions
2. Trace usage/references
3. Identify unreachable code
4. Determine if intentional
5. Recommend: keep/remove/connect

## Safeguards (AI Traps)

Before recommending deletion, verify the symbol is NOT:

- Dynamically imported or reflectively called (`import()`, `require(name)`, `getattr`, dynamic keys like `process.env[key]` or `t(\`errors.${code}\`)`)
- Part of a public package API with external consumers
- Read from config/env/DB at runtime, or used in migrations, seeds, admin tools, or analytics queries
- Referenced in CI/CD scripts or non-source files (grep `*.md`, `*.yml`, `*.sql`, `*.json` too)

Two "duplicate" implementations may differ in a subtle runtime-relevant way - diff them line-by-line before merging. When in doubt, list under QUESTIONABLE, not ORPHANED.

## Output Format

```
ORPHANED:
- [Component]: Never referenced
- [Function]: Never called
- [Route]: No UI access

QUESTIONABLE:
- [Code]: Only used in tests
- [Config]: Might be legacy
- [Pair]: Possible duplicates - needs line-by-line diff

ACTION REQUIRED:
- Connect: [list items to integrate]
- Remove: [list dead code]
- Investigate: [list unclear items]
```

If asked to fix (not just report): remove debt in place - no parallel "cleaned" modules, no deprecation shims, no compatibility layers to soften deletions. If a symbol has no callers, delete it; don't mark it deprecated. Validate with formatters, linters, type checkers, and the test suite after each batch.
