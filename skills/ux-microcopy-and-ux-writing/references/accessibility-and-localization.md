# Accessibility and localization of UI text

## Accessibility

### Forms and errors

| Need | Do |
|---|---|
| Visible labels | Every input has a programmatic label (`<label for>`), visible at all times |
| Instructions | Rules and formats stated before the field (helper text), not only in placeholder |
| Error identification | Say in text which field and what is wrong; not color or icon alone |
| Error suggestion | Offer the fix when known |
| Association | Link error and helper text to the input with `aria-describedby`; mark invalid with `aria-invalid="true"` |
| Announcement | On submit failure, move focus to an error summary or the first invalid field; status updates through a live region |
| Required | Mark in text ("required"/"optional") plus `required`; not only a red asterisk |

```html
<label for="email">Email address</label>
<input id="email" type="email" aria-describedby="email-help email-err" aria-invalid="true">
<p id="email-help">We'll send a confirmation link.</p>
<p id="email-err">Enter a valid email address, like name@example.com</p>
```

These map to WCAG success criteria on labels or instructions, error identification, error suggestion, and status messages.

### Names and links

- Link text names the destination or action out of context: "Read our pricing FAQ", not "Click here" or repeated "Learn more".
- Icon-only buttons need an accessible name: `aria-label="Close dialog"` (the name should contain any visible text label).
- Decorative images: empty `alt=""`. Informative images: alt describes purpose, not appearance ("Chart: signups doubled in March").
- Accessible name of a control should contain its visible label so voice-control users can say what they see.

### Text and reading

- Short sentences, active voice, plain words, about grade 8 as a rule of thumb.
- Do not convey meaning only by color, position ("click the button on the right"), shape, or sound.
- Do not use ALL CAPS in strings; use CSS if styling is needed.
- Avoid ambiguous abbreviations; spell out on first use.
- Avoid text in images; if unavoidable, repeat it as real text.
- Timed messages: do not auto-dismiss content users must read or act on.
- Emoji and decorative symbols in strings are read aloud; use sparingly and never as the only meaning.

## Localization

| Problem | Fix |
|---|---|
| Concatenated strings assume word order ("You have " + n + " items") | Use whole-sentence templates with named placeholders: "You have {count} items" via message-format with plural rules |
| Plurals with more than two forms | Use plural categories from the localization library, never `count === 1 ? ... : ...` |
| Gender, case, and articles around inserted values | Give translators context and avoid inserting nouns into sentences where grammar changes |
| Text expansion (German, Finnish often much longer) | Design for expansion; test with a pseudolocale (accented, padded strings) to catch overflow and hard-coded text |
| Idioms, puns, jokes, cultural references | Avoid; translation test: would a literal translation still work? |
| Formality and punctuation vary | Check tone and punctuation per locale; some locales have different quote marks, spacing before punctuation |
| Dates, numbers, currency | Format with locale-aware APIs, not hand-built strings |
| Embedded HTML or markup in strings | Avoid, or use named tags with a plan for translators; never split a sentence around a link |
| Right-to-left languages | Mirror layout; do not hard-code left/right in copy ("on the left") |
| Strings not extractable | Keep all UI text in resource files keyed by purpose; no text built in code |
| Missing context | Provide a translator note: where it appears, character limit, what placeholders mean |

Link example: write `"Read the {linkStart}privacy policy{linkEnd}."` as one string, not three.

Repeated terms (see glossary) must be translated consistently; ship the glossary to translators.
