# States and feedback

## Empty states

Structure: what belongs here, why it is empty (if not obvious), how to fill it (CTA).

| Type | Template |
|---|---|
| First use | **No [items] yet** / [One-line benefit] / [Create first item] |
| No search results | **No results for 'laptop'** / Try different keywords or clear filters. / [Clear filters] |
| Filtered to zero | **Nothing matches these filters** / [Reset filters] |
| Completed | **You're all caught up** (no CTA needed) |
| Error-empty (failed to load) | Treat as an error, not an empty state: "We couldn't load your projects. Try again." / [Try again] |
| No permission | Say who can grant access |

Rules:
- Replace "No data" with the next action.
- Empty states are high-leverage onboarding moments; keep them inviting, not apologetic.
- Do not show an empty state during loading; show loading first.

## Confirmation dialogs

- Title = question about the action: "Delete this project?"
- Body = consequence, scoped: "This permanently deletes 'Website Redesign' and all its files. This can't be undone."
- Primary = specific verb: [Delete project]. Secondary = [Cancel] or [Keep editing].
- No "Are you sure?" with Yes/No.
- Reserve for risky or irreversible actions; confirmation fatigue trains users to click through. Where reversible, act and offer Undo.
- For very destructive actions, require typing the resource name and say so in helper text.

## Success messages

- Say what happened, short: "Changes saved", "Email sent to john@example.com", "Settings saved. Changes take effect immediately."
- Add the next step only when one is natural: [View invoice].
- Avoid "Success!" alone and "Operation completed successfully".
- Reversible destructive success: "Item deleted · Undo".

## Toasts and notifications

- Max 2 lines; confirm what happened.
- At most one action (Undo, View).
- Duration heuristics (unverified, set per product): info about 3 s; toast with Undo about 5 s; success 3-5 s. Warnings and errors persist until dismissed or fixed.
- Accessibility: auto-dismissing text can be missed by screen reader and slow-reading users. Give users a way to review (notification center), announce via a polite live region (status) or assertive (errors), and do not auto-dismiss anything the user must act on.
- Notifications (push, in-app) are actionable and timely: "New comment on your post" + [View comment]. State who/what, not just "You have a notification".

## Tooltips and help text

- One sentence; about 150 characters max; no trailing period unless multiple sentences.
- Answer "What is this?" or "Why do you need this?"; do not restate the label.
- Button/icon tooltips are action-oriented ("Add a new project"); concept tooltips explain ("Projects organize your work").
- Use to clarify icon-only controls and show shortcuts ("Save (Ctrl+S)").
- Never the only place for essential info; tooltips are hard to reach on touch and keyboard unless implemented for focus.

## Loading and progress

| Wait | Copy approach |
|---|---|
| Under about 5 s | Spinner or skeleton; "Loading your projects..." if text is needed |
| Known progress | "Uploading... 45%" |
| Multi-step | Name the step: "Validating data...", "Processing...", "Almost done..." |
| Longer | Set expectation ("This usually takes about a minute"), say what is happening, offer Cancel |
| Very long | "We'll email you when it's ready" and let the user leave |

Rules:
- Name the thing: "Loading your projects..." not "Loading...".
- Humor ("Fetching the goods...") only where brand allows and stakes are low.
- Do not fake progress; vague but honest beats precise but wrong.
- Announce status changes to assistive tech (live region), not only visually.

## Onboarding

- Show value before asking for effort; ask for the minimum first.
- One concept per step; let users skip; never trap.
- Progress labels: "Step 2 of 4", "Almost there", "You're all set".
- Coach tooltips point at a specific UI element and state the benefit: "Add teammates to collaborate in real time", not "Click here to add users".
- Do not explain what the UI already makes obvious.

## Time-sensitive and permission prompts

- Permission requests (notifications, location, camera): say what it enables before the system prompt appears and what happens if declined.
- Session timeouts: state time remaining and the action that extends it.
