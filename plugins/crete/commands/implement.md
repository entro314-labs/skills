---
description: Enter implementation mode with quality gates for a specific user story
argument-hint: [optional: user story to implement]
---

# Implementation Mode

Implementing: $ARGUMENTS

## Implementation Rules

1. Start with the project's CLAUDE.md / AGENTS.md context
2. Follow existing patterns
3. Build complete features, not fragments
4. Test user workflows, not just code

## Quality Gate

Use the coherence-validator agent to review all changes:

- Does this complete a real user workflow?
- Is it connected to existing systems properly?
- Does it follow the project's architectural patterns?
- Is it half-baked or actually useful?

What user story are we implementing today?
