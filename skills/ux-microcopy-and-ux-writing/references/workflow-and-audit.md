# Workflow and audit

## Copy engagement: six stages

| # | Stage | Do | Exit condition |
|---|---|---|---|
| 1 | Context and users | Identify the user goal on each screen, stress level, expertise, character limits, platform, channels | Scenario brief per screen |
| 2 | Voice and tone | Define 3-4 voice principles with anti-patterns, tone per context, initial glossary | Before/after examples for success, error, empty |
| 3 | Clarity and structure | Specific titles, verbs on buttons, sentence case, relative time where helpful, clear primary > secondary > tertiary action hierarchy | Redundant words cut, meaning intact |
| 4 | Errors and recovery | For each error: what happened, why, what to do, support path | Top ~10 error states rewritten and validated with engineering |
| 5 | Forms and validation | Labels, programmatic error association, visible rules, neutral tone | Highest-traffic form reviewed end to end |
| 6 | Accessibility and localization | Alt text, non-color cues, accessible names, i18n-safe strings | Strings extraction-ready and context-annotated |

Inputs worth asking for: screenshots, current copy, support-ticket themes, drop-off metrics, character limits, supported locales, existing style guide and glossary.

## Writing tests

| Test | How | Catches |
|---|---|---|
| Readback | Read aloud; would you say it to a person? | Stiff, bureaucratic copy |
| Screenshot | Cover everything except the copy; does the screen still make sense? | Copy that depends on visuals |
| Stress | Imagine frustrated, rushed, one-thumb phone use | Long, ambiguous messages |
| Truncation | Narrow the viewport; is the key word still visible? | Back-loaded meaning |
| Translation | Would a literal translation work? | Idioms, puns, concatenation |
| Cut | Remove a word; did meaning change? | Filler |

After each rewrite check: comprehension, actionability, brevity, consistency, tone.

## Screen/screenshot audit checklist

1. Clear primary action
2. Visual hierarchy and scan order
3. Label clarity and empty-state guidance
4. Error prevention and recovery
5. Trust and credibility signals
6. Accessibility: contrast, tap targets, alt text, focus
7. Mobile ergonomics and reachability
8. Conversion friction and proof elements (only claims that are true)
9. Consistency with the design system
10. Internationalization and localization risks

Cluster findings as: clarity, hierarchy, trust, interaction, accessibility. Give each a severity (blocker / major / minor). Findings from a screenshot are hypotheses; no numeric thresholds apply, validate with analytics or testing when stakes are high.

## Audit output

1. **Summary** (2-4 lines: biggest problems, overall voice fit)
2. **Voice check**: current vs target, adjustments
3. **Issue table**

| Location | Current copy | Problem | Suggested copy | Severity |
|---|---|---|---|---|
| Signup form, email field | "Invalid input" | Generic, no fix | "Enter a valid email address, like name@example.com" | Major |

4. **Patterns to establish** per element type (errors, empty states, confirmations, buttons)
5. **Quick wins** (highest impact, lowest effort)

## Single-string request output

- Context assumed (screen, user state, limits)
- Recommended copy
- Rationale (one or two lines)
- Variations (2 at most, with trade-off, e.g. shorter vs warmer)

## Review checklist before shipping any string

- [ ] Verb + object on buttons; no "Submit"/"OK"
- [ ] Label is a noun phrase, visible; placeholder is only an example
- [ ] Error: what, why if useful, how to fix; no blame, no code, no "!"
- [ ] Empty state has a next action
- [ ] Destructive action names its consequence; confirmation only if needed, undo if possible
- [ ] Sentence case, one term per concept, no jargon
- [ ] Essential info not only in tooltip, placeholder, color, or icon
- [ ] Accessible names for icon-only controls; errors programmatically tied to fields
- [ ] Strings whole, placeholdered, pluralizable, extractable
- [ ] Tone fits the stakes
