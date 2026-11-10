---
name: ui-declutter
description: "Edit the visible text and decoration of a web page, app screen, game menu, chart or dashboard down to what its user needs: cuts eyebrow labels, stacked titles, helper text that narrates the obvious, leaked implementation notes, vague button labels, invented stats and testimonials, cheerful loading, toast and error filler, decorative badges, dots and emoji, and chart clutter. Use it whenever the user says an interface looks AI-generated, sloppy, wordy, over-explained or like a landing page, asks to tighten, clean up or review UI copy or microcopy, or shares a generated screen and asks what is wrong with it. Also use it as a second pass after generating any interface, before calling the work done. If the user also asks for visual cleanup (gradients, glows, spacing, heavy weights, motion), it covers that too."
compatibility: "Python 3.8+ for the counter script. The optional screenshot script needs Playwright with Chromium."
---

# UI declutter

Edit an interface so that every word and ornament on it is there for the person using it. Generated screens tend to explain themselves: a label above the title, a sentence under it, a hint beside the button. Each addition looks harmless, and together they bury the three words the user came for.

The goal is a screen that serves its user. It is not a screen that avoids looking generated. The difference matters when a rule and the user's need disagree: the user's need wins, and you say so in the report.

**Target:** the file, folder or component the user named. If they named none, use the interface files changed in this conversation. If there are none, ask.

**Scope:** copy, actions, states, invented content, decoration and charts. Visual surface (rules X1 to X4) is included only when the user asks for it, in words or with `--surface`.

## Step 1: say who is at this screen

Before reading a single string, write one line:

> **Who:** a player mid-mission who pressed Esc. **Doing:** deciding whether to go back in, change a setting, or restart.

This line is what you judge everything against. Without it, the rules below get applied as a pattern match, and a pattern match cuts the password requirements along with the filler. A first-time visitor on a pricing page needs more words than a daily user of an admin table. A game can carry flavor text that a tax form cannot.

If the code doesn't tell you who the user is, infer it from the product and state the inference. Ask only if two plausible readings would lead to different edits.

## Step 2: the test

For each piece of visible text and each decorative element, ask:

> **Without this, would that person hesitate, make a mistake, or be surprised by what happens next?**

- **No** → cut it.
- **No, but someone needs it somewhere else** → move it. A fact for developers goes in a code comment. A fact a few users look for goes in a tooltip or the docs. A name only assistive technology needs goes in `aria-label`.
- **Yes, but it's badly said** → rewrite it, using only facts you can find in the code, the content or the conversation.
- **Yes** → keep it, and leave it alone.

The rules that follow are the common ways generated screens fail this test. They help you spot candidates quickly. When a screen fails the test in a way no rule names, the test still applies. When a rule flags something that passes the test, keep it.

### Text that earns a full sentence

These pass the test almost every time. Do not shorten them to a label, and do not cut them:

- Constraints the user must satisfy: password rules, accepted file types and sizes, date and number formats, character limits.
- Consequences: what a destructive or irreversible action removes, what a payment charges and when, what a permission grants, who will see something once it's shared.
- Errors: what went wrong and what to do next.
- Empty states: what belongs here and how to add the first one.
- Consent, legal and regulatory text. Never edit its wording. Report it if it looks wrong.
- Instructions for a task the user does rarely and cannot undo.

## Rules

Ids are stable. Cite them in the report.

### Copy

- **C1. Eyebrow labels.** Small uppercase or letter-spaced text above a heading ("FEATURES", "HOW IT WORKS", "OPERATION ON HOLD" above "PAUSED"). The heading already names the section, so cut the eyebrow. If the eyebrow is the better line (flavor text in a game, a product's own term), promote it to be the heading and cut the generic one. One of the two, never both.
- **C2. Decorative numbering.** "01 02 03", "01 // Features", "§" and "//" prefixes. Cut unless the order is real and the user follows it, as in checkout steps or an install guide.
- **C3. Subtitle reflex.** A sentence under every heading, a description under every menu item ("Settings: Update your settings"). Keep one only when it states a fact the heading doesn't.
- **C4. Narration.** Helper text and captions that describe what the element visibly is or does ("Click the button below to get started", "This card shows your recent activity"). Cut.
- **C5. Leaked implementation notes.** Text about how the screen works underneath, or a requirement from the prompt rendered as copy: "Resume recaptures the mouse", "(updates in real time)", "(powered by AI)", "Data is cached for 5 minutes". The user doesn't act on it. Move it to a code comment, or cut it.
- **C6. Status strings.** Facts chained with "·" or "|" ("12 items · Updated 2m ago · Synced · v2.1"). Keep the fact the user acts on. Put the others where they're needed, or cut them.
- **C7. Duplicate cues.** A label that repeats the placeholder, the icon, the button text or the section heading. Keep one. For form fields, keep the visible label: a placeholder disappears on input and is not an accessible name.
- **C8. Slogans.** "One. Big. Thing.", "Built different.", "Ship faster. Think less." Rewrite as one sentence that names the thing and what it does, if the source gives you those facts. Otherwise flag it for the owner.
- **C9. Generic section headings.** "Why choose us", "Everything you need", "Built for teams like yours". A heading that could sit on any product's page says nothing about this one. Rename it for what the section contains, or cut the heading if the content stands without it.
- **C10. Hint overload.** Tooltips on controls that already have a text label, keyboard-shortcut chips on every action, "Tip:" and "Pro tip" callouts, coach marks on an ordinary screen. Keep a hint where the control is otherwise ambiguous (an icon-only button) or the shortcut is the main way to use it.

### Actions

- **A1. Vague action labels.** "Get started", "Learn more", "Submit", "Continue", "OK", "Click here". A button says what happens when it's pressed: a verb, and an object when the verb alone is ambiguous ("Create account", "Export CSV", "Send invite"). "Continue" and "Next" are fine inside a stepped flow.
- **A2. One action, several names.** "Delete" on one screen, "Remove" on the next and "Trash" in the menu for the same operation, or "Sign in" beside "Log in". Pick the term the project uses most and apply it everywhere in the target. Where two terms name different operations (remove from a list versus delete permanently), leave both.
- **A3. Confirmation dialogs.** "Are you sure?" with "OK" and "Cancel". The title names the action and its object ("Delete 3 projects?"), the body states the consequence if there is one ("This also removes their 14 tasks. You can't undo this."), and the confirm button repeats the verb ("Delete projects"). A confirmation on an action that is trivially undone is itself clutter: flag it for the owner.

### States

Loading, success, empty and error text is where filler collects, because nobody looks at those states when reviewing a screen. Read [references/states.md](references/states.md) before editing any of them: it says what each state should contain, which is more than what to cut.

- **S1. Loading filler.** "Hang tight!", "Crunching the numbers…", "Just a moment while we get things ready". Name what is loading only if the wait is long enough to read it. Otherwise a spinner or skeleton alone.
- **S2. Success filler.** "Successfully saved!", "Your changes have been saved successfully." State the result in as few words as carry it ("Saved", "Invite sent to ana@example.com"). If the screen already shows the result, no toast.
- **S3. Empty-state filler.** "Nothing here yet!", "Looks like you haven't created any projects yet. Get started by creating your first project!" Say what goes here and give the one action that adds it.
- **S4. Vague or cute errors.** "Oops! Something went wrong", "An error occurred. Please try again later." Say what failed and what the user can do. If the code can't know what failed, say so plainly and give the retry.

### Invented content

- **F1. Invented proof.** User counts, uptime figures, star ratings, testimonials with a name and a job title, "Trusted by" logo rows, "As seen in". If the project has no source for it, it is a false claim on a shipped page. Do not rewrite it into a smaller false claim. Remove it and list it in the report so the owner can supply the real thing.
- **F2. Placeholder data in shipped screens.** "John Doe", "Acme Corp", lorem ipsum, `example.com` addresses, stock avatar services. In fixtures, tests and stories this is fine. In a shipped screen, report it as a task. You can't supply real data.

### Decoration

- **D1. Badges without state.** "NEW", "LIVE", "AI", "Beta", "Pro", "Popular" added for flavor. Keep a badge only when it reflects something the app tracks.
- **D2. Status dots.** Pulsing or colored dots beside text. Keep only when bound to a real status, and give it an accessible name.
- **D3. Decorative emoji and icons.** In headings, buttons, labels and list items. Cut. An icon stays when it is the control (an icon button with an `aria-label`) or when it carries meaning the text doesn't.

### Charts and dashboards

- **V1. Titles that name the chart type.** "Bar chart of monthly revenue" becomes "Monthly revenue". State the finding instead ("Revenue doubled since March") only if the data in front of you shows it.
- **V2. Reading instructions.** "Each bar represents one month", "Hover for details". Cut.
- **V3. Saying it twice.** One encoding per quantity. A KPI with an arrow, a percentage, the word "up" and a sentence restating all three keeps the number and one comparison.
- **V4. Scaffolding that competes with the data.** Plot frames, dark or dense gridlines, thick axis borders, 3D, shadows and glows on marks. Cut, or thin what must stay to a hairline. Same chart type, same data, same series colors.
- **V5. Legend where a direct label works.** With four series or fewer and room to label them, name each series at its line end or beside its bar and remove the legend.

### Surface (only when asked)

Read [references/surface.md](references/surface.md) first. It starts with a check for design intent that decides whether these rules apply at all: a game, a marketing page or an editorial layout with deliberate display type is not a defect to be normalized.

- **X1. Gradients and glows.** Hue-to-hue gradients on surfaces and buttons, gradient text, colored glows, blurred color blobs.
- **X2. Off-scale spacing.** One-off values such as `mt-[13px]` or `gap: 7px` where siblings use the scale.
- **X3. Heavy weights in running UI.** 800 and 900 on body text, labels, table cells and controls. Display headings are out of scope.
- **X4. Decorative motion.** `transition-all`, cards that scale on hover, bounces and loops that explain nothing.

For string-level style in what you keep or rewrite (case, punctuation, filler words, consistency), read [references/writing.md](references/writing.md). For worked before-and-after pairs, including cases where the right edit is to keep the text, read [references/examples.md](references/examples.md) when unsure how far to cut.

## Guardrails

- **Never add a fact.** A rewrite uses what is in the code, the content files, the data or the conversation. "Edits sync within seconds" is a product claim, and you don't know that it's true. If the honest rewrite needs a fact you don't have, cut the line or list it as a task for the owner. This is the rule most easily broken, because an invented specific reads better than the vague line it replaces.
- **Change visible text and decorative elements only.** Leave logic, data, colors, type and layout structure alone. The exceptions are chart scaffolding under V4 and the surface rules when asked.
- **Keep accessible names.** Never delete `aria-label`, `alt`, `title` on icon buttons, or screen-reader-only text. If the visible text you cut was the only accessible name, move it to `aria-label`.
- **Edit text at its source.** Strings from i18n files, props, fixtures or a CMS are edited there, or reported. Don't hard-code a replacement in the component. When you change a string in one locale file, list the other locales as tasks; don't translate them yourself unless asked.
- **Clean up after a cut.** Remove the wrapper that is now empty and the margin or gap that existed only for the removed element.
- **Leave a clean screen alone.** If nothing fails the test, change nothing.
- **Follow the project.** Where the project has its own voice guide, glossary, tokens or design system, fix toward those and not toward this skill's defaults.

## Procedure

Track these steps:

```
- [ ] 1. Who and doing: one line
- [ ] 2. Count: python3 scripts/count_tells.py <target>      (add --surface if asked)
- [ ] 3. Look: screenshot the screen if you can
- [ ] 4. Read every visible string and ornament in every state; apply the test; tag failures with a rule id
- [ ] 5. Verdict: heavy, light or none
- [ ] 6. Edit
- [ ] 7. Count again, look again
- [ ] 8. Report
```

`scripts/` is in this skill's folder. Run the script by its full path.

**Count.** `count_tells.py` is a regex pass over the source. It finds candidates and gives a before-and-after number for the patterns that have a code signature. It cannot see C3, C4, C5, C7, A2, V3 or anything that depends on meaning, and it flags legitimate uses. Treat its output as a list of places to look. A count that doesn't reach zero is fine when what remains is kept on purpose.

**Look.** Source hides what the user sees: which strings appear together, what comes from data, what a deletion does to the layout. If you have a browser or screenshot tool, capture the screen before and after. If you have neither, `python3 scripts/screenshot.py <url-or-html-file> <out.png>` does it where Playwright is installed. Check the after image for orphaned gaps, a heading that lost its hierarchy, and controls that moved. If you can't render the screen, say so in the report.

**Read every state.** The default view is a fraction of the interface. Search the target for loading, empty, error, success and disabled branches, toasts, dialogs and validation messages, and apply the test to each.

**Verdict.**

- **Heavy.** Failures across most rule groups, or one failure repeated across the screen. Work through every group.
- **Light.** A few failures. Fix only those and leave everything else exactly as it is.
- **None.** Reading finds nothing that fails the test. Say so, edit nothing, and name at most two optional refinements. A clean screen is a result.

## Report

Lead with the who-and-doing line and the verdict. Then:

| Rule | Found | Fixed | Kept |
|---|---|---|---|
| C1 eyebrow | 6 | 6 | 0 |
| C4 narration | 3 | 2 | 1 |

**Kept on purpose:** one line each, with the reason ("C4: 'Must be 12 characters or more' is a constraint the user has to meet").

**For the owner:** what you found and did not edit, each as a task with its location and what is needed:

```
- [ ] src/pages/Home.tsx:88  F1 "Trusted by 10,000+ teams": no source in the repo. Supply the real figure or leave it out.
- [ ] src/i18n/de.json:42    C3 subtitle removed in en.json; apply the same change here.
```

**Rendered check:** what you compared, or that you couldn't.

## Preventing it next time

Cleanup is slower than not writing the clutter. If the user will generate more screens in this project, offer the short instruction block in [references/prevention.md](references/prevention.md) for their project instructions file.
