---
name: ux-writing
description: Write clear, accessible interface copy (microcopy) — buttons, labels, error messages, empty states, notifications, forms, onboarding, tooltips, confirmations, loading and success states. Use when writing or editing any text that appears in apps, websites, or software interfaces, reviewing UI strings, or auditing product content for consistency. Applies the four quality standards (purposeful, concise, conversational, clear), research-backed length benchmarks, tone-by-emotional-state adaptation, and accessibility guidelines. For marketing pages use landing-page-copy; for persuasive copy use copywriting.
---

# UX Writing

Interface copy helps users accomplish goals. Unlike marketing copy, clarity beats persuasion — every word must reduce friction, not add charm.

## The Four Quality Standards

Every piece of UX text must be:

1. **Purposeful** — helps the user or business achieve a goal
2. **Concise** — fewest words without losing meaning; every word has a job
3. **Conversational** — sounds human; write how you'd say it
4. **Clear** — unambiguous, accurate, front-loaded

Edit in that order: purpose → cut words → read aloud → verify precision.

## Patterns by Element

### Buttons and links
`[Verb] [object]`, sentence case, active imperative: "Save changes", "Delete account", "Start free trial".
- Never: "OK", "Submit", "Click here" — screen readers and scanners need standalone meaning
- Show the outcome: "Create account" not "Submit"
- Links must describe the destination: "Read our privacy policy" not "Learn more"

### Error messages
Pattern: `[What failed]. [Why/context]. [What to do].` Never blame the user, never dead-end.

| Type | Pattern | Example |
|------|---------|---------|
| Inline validation | `[Field] [specific requirement]` | "Password must be at least 8 characters" |
| System error | `[Action failed]. [Cause]. [Recovery].` | "Couldn't save changes. Connection lost. Reconnect and try again." |
| Blocking | `[What's blocked]. [Why]. [Action needed].` | "Update required. This version is no longer supported. Update now to continue." |
| Permission | `[User benefit]. [Permission needed].` | "Get notified when orders ship. Enable notifications." |

Avoid: bare error codes ("Error 403"), blame language ("invalid input"), robotic tone ("An error has occurred"), vague causes ("Something went wrong") without recovery.

### Empty states
`[What's empty] + [why] + [action to fill it]` — "No messages yet. Start a conversation to connect with your team." First-use, user-cleared, and no-results states each need different framing.

### Success messages
Past tense, specific, proportional: "Changes saved", "Post published!" (+ optional next action: "View post"). Don't over-celebrate routine actions.

### Loading states
Specific and reassuring: "Creating your account…", "Uploading image (2/5)…", "This might take a minute…" — never bare "Loading…" for long operations.

### Forms
- **Labels**: visible noun phrases ("Email address") — never placeholder-only fields
- **Helper text**: explain *why* info is needed; front-load requirements ("Password must be 8 characters", not the reverse)
- **Placeholders**: sparingly, for format examples only ("name@example.com")

### Confirmations (high-stakes)
State consequences plainly, name the action on the confirm button, easy to back out:
"Delete this post? This can't be undone." → buttons: "Delete post" / "Cancel" — never "Warning: Are you sure?" → "Yes"/"No".

### Notifications
Verb-first title + contextual description, 10–15 words total. Action-required = intrusive; passive = quiet. Every notification must be worth the interruption.

### Tooltips
Add context, don't repeat the label: "This action can't be undone" on a Delete button, not "Click to delete".

## Voice and Tone

Voice stays constant (define it with the `brand-voice` skill; a voice chart maps 3–5 brand concepts → adjectives → do/don't examples). Tone adapts to the user's state:

| User is... | Tone | Example |
|-----------|------|---------|
| Frustrated (errors) | Empathetic, solution-focused, no blame | "Payment failed. Your card was declined. Try a different payment method." |
| Confused (first use) | Patient, explanatory | "Connect your bank to see spending insights. We'll guide you through it." |
| Confident (routine) | Efficient, minimal | "Saved" |
| Cautious (high stakes) | Serious, transparent, respectful | "Delete account? You'll lose all data and this can't be undone." |
| Successful | Positive, brief, proportional | "Profile updated. Your changes are live." |

Stakes matter: changing a theme ≠ deleting an account. Match gravity to consequence.

## Benchmarks (research-backed)

| Element | Target |
|---------|--------|
| Buttons/CTAs | 2–4 words (max 6); 15–25 characters |
| Titles | 3–6 words, ≤40 characters |
| Error messages | 12–18 words including the solution |
| Instructions | ≤20 words, 14 ideal |
| Notifications | 10–15 words title + body |
| Line length | 40–60 characters |
| Sentence comprehension | 8 words = 100%, 14 words = 90%, 25 = hard ceiling |
| Reading level | 7th–8th grade general audience; 9th–10th professional tools |

Active voice ~85% of the time. Use consistent terminology — one concept, one word, everywhere ("Delete" ≠ "Remove"; pick per meaning and stick to it).

## Accessibility

- Label all interactive elements explicitly ("Submit application", not "Submit")
- Error messages must work when read with the field label by a screen reader
- Never rely on color alone — pair with text/icon ("Error: Email required" + icon)
- Contrast ≥ 4.5:1 (WCAG AA)
- Plain language: define technical terms on first use; no idioms or cultural references
- Descriptive link text — "click here" is inaccessible

## Audit / Review Mode

When reviewing existing UI strings, check per string: standalone clarity, consistent terminology, pattern conformance (above), tone-state match, benchmark lengths, accessibility. Report as a table: `current → issue → proposed → rationale`.

## Common Mistakes

Generic button labels · blaming users in errors · clever humor in serious contexts · inconsistent terminology · system-oriented language ("query failed") instead of user language · placeholder-only form fields · robotic corporate tone · relying on color for meaning · hidden or late instructions.

## Quick Reference

- **Sentence case**: "Save your changes" (not Title Case)
- **Active imperative** for buttons: "Delete account" (not "Account deletion")
- **User-focused**: "Save time with shortcuts" (not "We offer shortcuts")
- **Specific verbs**: "Delete" when permanent, "Remove" when reversible
- **Front-loaded**: "Password must be 8 characters" (not "Must be 8 characters for your password")

## Related Skills

- **brand-voice** — establish the product voice this skill applies
- **copywriting** — marketing surfaces where persuasion matters
- **copy-editing** — long-form content passes
