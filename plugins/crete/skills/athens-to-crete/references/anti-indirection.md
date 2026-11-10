# Anti-Indirection (Anti-Onion) Patterns

AI-assisted development tends to add indirection instead of modifying existing code. The result is an onion: wrappers around wrappers, fallbacks catching other fallbacks, bridges between things that should be directly connected, and abstractions that exist only because a previous change was afraid to touch the real implementation.

**The rule:** every layer of indirection must justify its existence with actual work - branching, validation, transformation, or error handling that differs from adjacent layers. Forwarding is not work. Wrapping is not work. Re-converting to the same shape is not work. Rewrapping an error with no new context is not work. If you can delete a layer and the only required changes are import paths or function signatures, that layer should not exist.

## Patterns to strip

- **Fallback chains** - `value or legacy_value or old_legacy_value or DEFAULT`. Two fallbacks means two previous changes were band-aids. Fix the primary source instead of adding another layer.
- **Wrapper functions that just forward** - `get_user()` → `fetch_user()` → `query_user()` → the actual query. Inline; one function, one call to the real thing.
- **Compatibility layers / adapters** - `to_old_format()`, `from_legacy()`, `convert_to_v2()`. If both shapes exist, pick one and migrate all consumers.
- **Defensive type coercion stacking** - converting something already known to be the right type. Assert once at the boundary; multiple conversions in sequence means nobody trusts the data - fix the trust problem at the origin.
- **Abstractions with one implementation** - a trait/interface/ABC with exactly one concrete implementation and no realistic second one. Strategy patterns with one strategy, plugin systems with one plugin, factories that always return the same thing. Remove the abstraction.
- **Error handling at every layer** - catch/wrap chains where intermediate layers add no context, decision, or recovery. Handle once at the appropriate boundary.
- **Null checking repeated at every layer** - validate once at the boundary, trust downstream. If you can't trust downstream, the signature is wrong - fix the signature.
- **Configuration indirection** - env var → config struct → settings module → provider → constructor for a value that rarely changes. Read once at startup, pass it through.
- **Re-export modules that add nothing** - index/barrel files that import and re-export from a single source. Import from the source directly.
- **Event/callback/channel chains** - A signals B which signals C which calls D, with no real work between. If A needs D, connect them directly.
- **Interfaces created only for mocking** - if the mock returns hardcoded values and the test only verifies argument passing, you're testing wiring, not logic.

## How to audit

1. Trace a data flow from entry point to actual effect (DB write, API call, response)
2. Count the intermediate steps
3. For each step: does it transform, validate, branch, or handle errors differently - or just forward?
4. If it just forwards, remove it and connect the layers directly
5. For fallback chains, identify the canonical source and delete the rest
6. For abstractions, count implementations - one (excluding trivial test mocks) means premature; remove it

## Naming flags

`legacy`, `compat`, `adapter`, `bridge`, `wrapper`, `fallback`, `shim`, `temp`, `old`, `deprecated` (still in use), vague `helper`/`utils`/`common` holding domain logic, `Base`/`Abstract` classes with one child, `I`-prefixed interfaces with one implementor, `_inner`/`_impl` functions called by one wrapper.
