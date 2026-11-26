---
name: copywriting-ux-microcopy-and-ux-writing
description: Write and review interface text for product UI - buttons and CTAs, form labels, placeholders, helper text, error messages, empty states, confirmations, toasts, tooltips, loading states, onboarding - plus voice/tone, accessibility and localization of strings. Use when drafting or rewriting UI copy, auditing screens or screenshots for copy problems, or setting up a UX writing style guide.
---

# UX Writing and Microcopy

Interface text exists to help someone finish a task. Every string should answer: what is this, what happens next, what do I do now. Write for a distracted, possibly frustrated user on a small screen.

## Core rules (in priority order)

1. **Clarity over cleverness.** Plain words, one meaning. "Send money", not "Initiate transfer". Humor and personality only in low-stakes moments.
2. **Say what the user can do next.** Every error, empty state, and dead end ends with a next step.
3. **Specific over generic.** Name the object and the action: "Delete project", "Loading your projects...", "Enter a valid email, like name@example.com".
4. **Front-load meaning.** Put the important word first; strings get truncated on small screens and scanned, not read.
5. **Be consistent.** One term per concept everywhere (UI, docs, API, emails). One capitalization style. One pattern per element type.
6. **Match tone to stakes.** Billing, security, data loss, and health get calm and literal copy. Never joke when something broke or data was lost.
7. **Cut words, then re-check meaning survived.** "Save changes", not "Please click the button below to proceed".
8. **Never put essential information only in a placeholder, tooltip, color, or icon.** These vanish, hide, or are not perceivable by everyone.

## Mechanics (apply by default)

| Topic | Rule |
|---|---|
| Capitalization | Sentence case for buttons, labels, titles, menus. Capitals only for proper nouns, product names, acronyms. No ALL CAPS in strings (style with CSS if needed; screen readers may spell caps). |
| Punctuation | No periods on buttons, labels, short headings, single-sentence tooltips. Periods in body copy and multi-sentence text. |
| Exclamation marks | Never in errors. At most one per screen, normally on success. |
| Voice | Active voice, positive framing ("Enter a date in the future" over "Don't enter past dates"), "we couldn't save your changes" over "An error occurred". |
| Contractions | Fine and human; avoid in legal or very formal copy. |
| Reading level | Aim for roughly grade 8, short sentences, lists over paragraphs. A rule of thumb, not a standard; use a readability check. |
| Jargon | Avoid or explain acronyms (2FA, SSH); link to an explanation when unavoidable. |
| Plurals and numbers | Handle "1 notification" / "2 notifications" as a pattern (plural rules), not by string hacking. |
| Dates | Relative time ("2 hours ago") when recency matters; absolute when precision matters. |

## Buttons and CTAs

- Format: **verb + object**. "Save changes", "Create account", "Send message", "Download report".
- Avoid "Submit", "OK", "Yes", "Click here", "Proceed", "Do it", and "Learn more" when a specific object exists ("Download free guide").
- Destructive actions name the consequence: "Delete project", "Delete forever", not "Delete" or "Yes".
- One primary action per screen. Aim for max about 3 words on primary buttons (a guideline, not a standard); clarity beats brevity when they conflict.
- Commitment of the label matches the commitment of the action: "See how it works" < "Start free trial" < "Buy now".
- Pairs: Save / Cancel, Delete project / Keep project, Send / Save draft, Create account / Log in instead.
- **Cancel vs Close**: "Cancel" abandons an action in progress (a form, a flow). "Close" dismisses something where nothing was started (info dialog, finished result). Why: "Cancel" implies something is being undone.
- Links name their destination: "Read our pricing FAQ", not "Click here".

## Labels, placeholders, helper text

- Labels are always visible, a noun or short noun phrase: "Email address". Placeholders disappear on focus and are not labels.
- Placeholder = example format only: `name@example.com`, `MM/DD/YYYY`. Never repeat the label; never hold rules only there.
- Helper text sits with the field (below it) and states the rule before the user errs: "At least 8 characters, including a number". Say why when it reduces anxiety: "We'll send a confirmation link".
- Mark the minority: "(optional)" if most fields are required; otherwise mark required ones consistently.
- Checkbox labels state the thing, positively framed: "Send me product updates". Consent: "By signing up, you agree to our Terms and Privacy Policy." with links.

## Error messages

Formula: **what happened + why (only if it helps) + how to fix**. Always include the fix.

| Weak | Better |
|---|---|
| Invalid input | Enter a valid email address, like name@example.com |
| Network error | Couldn't connect. Check your internet connection and try again. |
| Error 500 | We couldn't save your changes. Try again in a moment. |
| You entered the wrong password | That password doesn't match. Try again or reset your password. |
| Password invalid | Password needs 8+ characters with a mix of letters, numbers, and symbols |
| You made an error | This field is required |

- Never blame the user; describe the system state or the needed input.
- No codes or stack text as the message; offer codes only as secondary "reference" detail for support.
- "Oops", "Uh oh" only for trivial, recoverable situations and only if brand allows; never when data is lost or money is involved.
- On login, do not reveal whether an account exists if security policy requires ambiguity; agree wording with security/engineering.
- Place the message next to the field, state it in text (not color alone), and expose it programmatically. See `references/accessibility-and-localization.md`.
- Rewrite the top ~10 most frequent error states first and agree the factual cause of each with engineering.

## Empty states

Structure: **what belongs here + why empty (if not obvious) + how to fill it with a CTA**.

- First-use: "No projects yet" + "Projects keep your files and tasks together." + [Create first project].
- No results: "No results for 'laptop'" + "Try different keywords or clear filters." + [Clear filters].
- Cleared/done: "You're all caught up" needs no CTA.
- Replace "No data" with the next action.

## Confirmations and success

- Confirm only risky or irreversible actions. Prefer undo over confirmation when reversible: "Item deleted · Undo".
- Dialog: title = the question ("Delete this project?"); body = the consequence ("This permanently deletes 'Website Redesign' and all its files. This can't be undone."); primary = specific verb ("Delete project"); secondary = "Cancel" / "Keep editing". Never "Are you sure?" with Yes/No.
- Success: say what happened, briefly, add a next step only if relevant: "Changes saved", "Email sent to john@example.com". Not "Operation completed successfully".

## Toasts, tooltips, loading, onboarding (summary)

- **Toasts**: max 2 lines, state what happened, one action max. Auto-dismiss is a product decision (about 3 s info, about 5 s with Undo are common heuristics, not verified); errors and anything with essential info must persist until dismissed or fixed, and must be announced to assistive tech.
- **Tooltips**: one sentence (about 150 characters max), answer "What is this?" or "Why do I need this?", never restate the label. Never hold essential information.
- **Loading**: name the thing ("Loading your projects..."), show progress when known ("Uploading... 45%"), set expectations for waits over a few seconds, offer Cancel, and for very long waits "We'll email you when it's ready".
- **Onboarding**: show value before asking for effort, one idea per step, allow skip, label progress ("Step 2 of 4"), coach marks name the benefit ("Add teammates to collaborate in real time").

Details and templates: `references/states-and-feedback.md`.

## Voice and tone

Voice is stable (3-4 attributes with anti-patterns, e.g. clear, calm, helpful, confident - not cute, not corporate). Tone flexes by moment:

| Moment | Tone |
|---|---|
| Success | Warm, brief |
| Error | Calm, humble, practical |
| Waiting | Reassuring, informative |
| Warning / destructive | Serious, literal |
| Onboarding | Encouraging |
| Empty state | Inviting |
| Billing, security, health | Minimal personality |

Drop marketing hooks in product UI: urgency lines and social-proof numbers ("Join 10,000+ users", "Limited time") belong to marketing pages and are a trust risk if not true. See `references/voice-tone-and-governance.md`.

## Process

1. Know the context: user goal on this screen, emotional state, expertise, character limits, platform.
2. Draft, then cut. Check: comprehension, actionability, brevity, consistency, tone.
3. Test: read it aloud (would you say it to a person?), cover everything except the copy (does the screen still make sense?), try it frustrated and one-handed, check truncation on narrow widths.
4. Record the pattern (term, template, example) in the style guide so it is reused, not reinvented.

Engagement workflow, audit schema, and output formats: `references/workflow-and-audit.md`.

## Routing

| Need | File |
|---|---|
| Buttons, labels, forms, errors: patterns, templates, before/after tables | `references/components.md` |
| Empty, success, confirmation, toast, tooltip, loading, onboarding, notifications | `references/states-and-feedback.md` |
| Voice attributes, tone map, glossary, plurals, governance | `references/voice-tone-and-governance.md` |
| Screen-reader, WCAG-mapped text rules, localization-safe strings | `references/accessibility-and-localization.md` |
| Copy engagement stages, screenshot/copy audit checklist, output formats | `references/workflow-and-audit.md` |

## Output formats

- **Single string request**: context, recommended copy, one-line rationale, 1-2 variations.
- **Audit**: voice check (current vs target), issue table (location | current copy | problem | suggested copy | severity), patterns to establish per element type, top quick wins.
