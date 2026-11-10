# Writing the product video brief

Before anything is filmed, write a brief listing what the video must show: exactly 7 demonstrations of the signed-in app or dashboard, and exactly 8 demonstrations of the public website. Research the codebase, write the brief, and save it as `PRODUCT_VIDEO_BRIEF.md` in the project root.

When the user asked only for the brief, the brief is the whole task: do not start any video work.

The counts are defaults. If the user gives other numbers, use theirs and adjust the title and headings. If the product has no signed-in app or no public website at all, say so and ask how to split the list before writing it.

## How to research

Read the code before choosing anything. The brief will be used to script and record real flows, so every item must be something the product actually does today, not something the README or marketing copy promises.

- **Frontend:** walk the routes, pages and main components for both the app and the public site. Note what the user sees and can do on each.
- **Backend:** for each candidate feature, follow it to its API route, server function or database write, so you know whether it really saves, loads or calls something, or only looks like it does.
- **Public site:** read the actual page content and copy files, including locale files, and quote headlines and labels exactly as written.

## How to choose

Pick the demonstrations a viewer most needs to see to understand the product, the ones the team would regret leaving out. Balance the list so it covers the breadth of the product rather than several variations of one area.

- Each app item is a working interaction with a visible result (a user does something and the product responds), not a static screen or a settings page.
- Each website item is a distinct section, page or interactive element of the public site, in an order that roughly follows how a visitor moves through it, ending on the way into the app.
- Each item should work as one continuous shot or short sequence. Merge closely related features into one item and split anything that needs two unrelated screens.
- If the product has fewer than 7 or 8 strong candidates, say so at the top of the brief and fill the remaining places with the best available, marked as weaker. Do not invent features to reach the count.

## What each item contains

Write each as a numbered bullet with:

- a short bold title phrased as what the viewer sees happen;
- two to five sentences on what to show, in order: the starting screen or route, the action, the visible result, and any detail worth a close-up;
- an honest note where it applies: sample or prepared content rather than live data, a feature behind a plan, flag or role, a route that exists but is not linked from anywhere, behaviour that depends on a setting;
- sources: the frontend files, and for app items the backend files and functions, as paths relative to the project root.

The shape of one app item, with placeholders:

```markdown
- **1. <What the viewer sees happen>.** Open `<route>` with <prepared state>. <The action the user takes>. <The visible result, and the detail worth a close-up>. <Honest note: what is sample content, gated, unlinked or dependent on a setting>. Frontend: `<path>`, `<path>`. Backend: `<route file>`, `<function>` in `<path>`.
```

## File structure

1. Title: "<Product> product video: 7 app demonstrations + 8 website demonstrations".
2. One short paragraph saying what the list is based on and what was not checked (for example, live deployment behaviour).
3. "App and dashboard — 7 demonstrations".
4. "Public website — 8 demonstrations".
5. "Recording setup": what the recording needs in order to work. Cover the account state, plan or entitlement, settings to enable, sample data to prepare, a single sample task or record to reuse across scenes so the story connects, any development harness or fixture mode that avoids writing to a live database, and file or input requirements. Add anything that must not be shown or claimed because it cannot be demonstrated as built.

## Rules

- Describe only behaviour you confirmed in the code. If you could not confirm something, leave it out or mark it as unverified.
- Keep previews, mock data and scripted examples labelled as such, so the video never presents them as live results.
- Write plain, factual descriptions. No marketing language, invented metrics or claims about performance.
- Exactly 7 and exactly 8. No extra "bonus" items or alternates.
- The brief is a planning document. Never copy its wording into the product's on-screen messaging.

## When the file is saved

Reply with a short summary: the 15 titles, anything left out that the user might have expected to see, and anything that needs a decision from them before recording.
