# Anti-Patterns

Reject code exhibiting any of these, regardless of whether it "works".

## Error Handling

- Silent failures - operations that fail without surfacing errors
- Error swallowing - catch blocks that log-and-continue
- Missing error context - re-throws without wrapping
- Ignored errors - unchecked return values, unhandled rejections

## Type Safety

- `any` in TypeScript - use `unknown` with narrowing, unions, or generics
- `type: ignore` in Python - requires justification comment
- Implicit `any` - untyped function parameters and returns
- Non-exhaustive switches - all variants handled or explicitly unreachable
- Unsafe casts - assertions that bypass compiler checks
- Nullable access without guards

## Implementation Integrity

- Stubs/mocks outside tests - no placeholder logic in production
- Dead code - unreachable branches, unused functions, commented blocks
- Partial implementations - happy path only, missing error paths
- Orphaned code - no call sites, no integration
- Broken invariants - state that violates contracts

## Language-Specific

**TypeScript:** No `unknown` casts without narrowing; exhaustive switches required

**Rust:** No `.unwrap()`/`.expect()` outside tests - use `?`; `unsafe` requires justification

**Python:** No bare `except:`; no broad `except Exception` without re-raise

**Go:** No `_ = err` - handle or propagate

## Framework (Next.js/React)

- Server/client boundary leaks
- Misplaced `"use client"` directives
- Hydration mismatches

## Database

- Missing FK indexes
- Constraints enforced in app logic instead of schema
- Schema drift - type changes without migrations

## Documentation

- README with setup instructions
- Document complex algorithms and business logic
- Keep docs adjacent to code they describe
- Update docs when code changes

**JS/TS:** JSDoc | **Python:** Google/NumPy docstrings | **Rust:** `///` with examples | **Go:** Godoc for exports

## Communication Style

- Direct, factual - no marketing tone or consultant-speak
- No timelines, roadmaps, or projected outcomes
- Realistic assessments over aspirational statements
- Concrete and actionable, not speculative
