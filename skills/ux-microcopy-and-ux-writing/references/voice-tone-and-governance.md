# Voice, tone, and governance

## Voice vs tone

- **Voice** is the product's stable personality. Define 3-4 attributes, each with an anti-pattern.
- **Tone** is how voice flexes for the user's emotional state in a given moment.

### Voice attribute template

| Attribute | Means | Does not mean |
|---|---|---|
| Clear | Plain words, one idea per sentence | Dumbed down |
| Calm | Steady under failure | Cold or robotic |
| Helpful | Always offers the next step | Chatty |
| Confident | States facts directly | Arrogant, over-promising |

Replace with the product's own attributes; keep the "does not mean" column to prevent drift.

### Tone map

| Context | Tone | Example |
|---|---|---|
| Success | Warm, brief | Changes saved |
| Error | Calm, humble | We couldn't save your changes. Try again. |
| Waiting | Reassuring | Importing your contacts. This usually takes about a minute. |
| Warning | Serious | This will remove access for 12 people. |
| Onboarding | Encouraging | You're all set. Start by creating a project. |
| Empty | Inviting | No projects yet. Create your first one. |
| Billing, security, health | Minimal personality | Your card was declined. Use a different card or contact your bank. |

Tone must match stakes: when money, data, privacy, or safety is involved, drop humor and idiom.

## Style rules that carry the voice

- Casual but polite; active voice; positive framing; plain words ("Send money", not "Initiate transfer").
- Contractions are fine, except in legal or highly formal copy.
- Address the user as "you", the product as "we" only when a human organization acts ("We couldn't save"); for system status, a neutral subject ("Your changes weren't saved") also works.
- Pick one conceptual model and keep metaphors consistent (library: shelves, books; inbox: messages). Mixed metaphors confuse.
- Avoid idioms, puns, cultural references, sports metaphors in UI strings (do not survive translation; see localization file).
- Humor: rare, optional, never in errors involving loss, never at the user's expense. Repeated jokes ("Oops!") wear out.
- Exclamation marks: none in errors; at most one per screen.

## Glossary and consistency

Maintain a term list: preferred term, rejected variants, definition, where used.

| Preferred | Rejected | Note |
|---|---|---|
| Log in (verb), Login (noun/adjective) | Sign in, Log-in | Choose one family and keep it |
| Delete | Remove, Trash | Define whether permanent |
| Workspace | Account, Org | One concept per word |

Align glossary with API, docs, support macros, and marketing site names where users see both.

## Patterns, not one-offs

Document each recurring pattern once: template, variables, examples, when not to use.

- Pluralization: "1 notification" / "2 notifications"; implement with plural rules, and some languages need more than two forms.
- Relative time: "just now", "5 minutes ago", switch to a date after a threshold.
- Error template: "[What happened]. [How to fix]."
- Empty state template: "[No items yet]. [Benefit]. [CTA]."
- Confirmation template: "[Verb] [object]?" / "[Consequence]." / [Verb object] [Cancel].

## Governance

- Decide who approves copy, where copy lives (code, CMS, spreadsheet, design file), and who updates it when the product changes.
- Keep strings in one source of truth, extractable and keyed, so copy edits do not need engineering for each change and translators receive context.
- Review copy in context (real screen, real data, real states) not in isolation.
- Track copy-related signals: support tickets by error, form drop-off, search no-results rate, abandonment on confirmation dialogs.
- Style guide minimum: voice attributes, tone map, mechanics (capitalization, punctuation, numbers, dates), glossary, patterns, accessibility rules, localization rules.

## Marketing versus product copy

CTA conversion tactics from landing pages do not transfer to in-product UI:
- Urgency ("Limited time offer") and social proof ("Join 10,000+ users") only when true, specific, and appropriate to the context.
- Do not use dark patterns: confirm-shaming ("No, I don't want to save money"), pre-checked consent, hidden costs, guilt-based decline buttons.
- Friction-reducing microcopy near a conversion point is legitimate: reassure about cost, time, cancellation ("No credit card required", "Cancel anytime") only if true.
