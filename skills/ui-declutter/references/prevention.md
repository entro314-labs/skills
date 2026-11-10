# Preventing it at generation time

A short block for the project's instruction file (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`, or the system prompt of whatever generates the interface). It doesn't replace the cleanup pass. It reduces how much the pass has to do.

Offer it to the user. Don't add it to their files without asking.

## The block

```markdown
## Interface text

Write for the person using the screen, who can see it. Before adding any text, ask
whether they would hesitate, make a mistake, or be surprised without it. If not,
leave it out.

- One name per screen or section. No small label above a heading, no sentence
  under it unless it states a fact the heading doesn't.
- Don't describe what an element visibly is or does. No "Click below to…",
  no "This chart shows…".
- Requirements from my prompt and facts about the implementation are for you,
  not for the UI. Put them in code comments. Never render them as text.
- Buttons say what happens: a verb, plus an object where needed. Not
  "Get started", "Learn more" or "Submit".
- Do spend a sentence on: constraints the user must meet, what a destructive or
  paid action will do, what an error means and what to do next, and what belongs
  in an empty state.
- Loading, success and error text is plain. No "Oops", no "Successfully", no
  exclamation marks.
- Never invent statistics, testimonials, customer logos or ratings. If real
  content is missing, leave a visible TODO in the code and tell me.
- No badges, status dots, emoji or decorative numbering unless they reflect
  real state or real order.
```

## Adapting it

- **If the project has a voice guide or glossary,** add a line pointing to it and delete the bullets it already covers.
- **For games,** add: "Flavor text may replace a plain label. It never sits beside one that says the same thing."
- **For marketing pages,** add: "Every claim on the page must come from the brief or the content files I give you."
- **For data products,** add: "Chart titles name the measure. No reading instructions, no legend where the series can be labelled directly."

Keep the block short. A long list of banned patterns in an instruction file tends to produce the neighbouring pattern. The question in the first paragraph does most of the work.
