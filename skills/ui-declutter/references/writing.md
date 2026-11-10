# String-level style

For every string you keep or rewrite. Cite these as W1 to W12.

If the project has a voice guide, a glossary or a consistent existing convention, that wins over anything here. Match what the best-written screens in the project already do.

## Rules

- **W1. Sentence case.** "Create account", "Billing settings". Title Case and ALL CAPS only where the project's design uses them consistently. Don't change the case of a deliberately styled display heading.
- **W2. No sales adjectives.** "Seamless", "effortless", "powerful", "robust", "blazing fast", "next-generation", "all-in-one", "supercharge", "unlock", "elevate", "leverage", "streamline". They describe nothing the user can check. Cut the word. If the sentence is empty without it, the sentence goes (see C8).
- **W3. No forced cheer.** "Oops!", "Whoops", "Uh oh", "Yay!", "Woohoo", "Awesome!", "You're all set!", "Hang tight". No exclamation marks in interface text.
- **W4. No filler.** "Please" before every instruction, "simply", "just", "easily", "quickly", "in order to", "Note that", "Please note". "Please" stays where the app is asking a favor or apologizing for a real inconvenience.
- **W5. Plain punctuation.** No em dashes in interface strings: use a full stop or a comma. No ellipsis except for an action in progress ("Saving…") or truncation. No full stop on labels, buttons, headings or single-phrase toasts. Full stops on complete sentences.
- **W6. Name the object.** "Delete project", not "Delete", when more than one thing on screen could be deleted. "3 files", not "items", when the code knows what they are.
- **W7. One term per thing.** Project, workspace, team, organization: pick the word the product uses and hold it. The same goes for "sign in" and "log in", "settings" and "preferences".
- **W8. One voice for ownership.** "Your projects" throughout, or "My projects" throughout. Never both on the same screen.
- **W9. Active and present.** "Couldn't save" over "Your changes could not be saved". "Removes all tasks" over "All tasks will be removed".
- **W10. Real numbers, one format.** Numbers come from data. One date format, one number format, one unit style per screen. No "10k+" or "99.9%" without a source (see F1).
- **W11. Front-load the difference.** In a list of similar items, the word that tells them apart comes first. Under an "Export" heading the items are "CSV" and "PDF", not "Export as CSV" and "Export as PDF".
- **W12. No self-reference.** "This page lets you…", "Here you can…", "Welcome to your dashboard". The screen is in front of them.

## Length

There is no word limit. A label is as long as it needs to be told apart from its neighbours. A sentence under "Text that earns a full sentence" in SKILL.md is as long as its facts. As a smell test: a heading that wraps, a button label over three words, or a toast with two sentences is worth a second look.

## When a rewrite is not yours to make

- Brand names, product names and feature names, however awkward.
- Legal, consent and regulatory wording.
- Anything a comment or commit marks as approved copy.
- Text in a language you weren't asked to edit.

Flag these in the report if they look wrong.
