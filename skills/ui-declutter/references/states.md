# States

What each non-default state should contain. Rules S1 to S4 and A3 say what to cut; this file says what a good version holds, so that the edit leaves something useful behind.

## Contents
- Finding the states
- Loading
- Success
- Empty
- Error
- Validation
- Confirmation
- Permission and consent prompts
- Disabled controls

## Finding the states

They rarely sit in the main markup. Search the target for:

- conditionals on `loading`, `isLoading`, `pending`, `error`, `isError`, `empty`, `length === 0`, `!data`
- toast, snackbar, notification and alert calls
- dialog, modal and confirm components, and `window.confirm`
- validation schemas and their messages (zod, yup, form libraries)
- `catch` blocks that set a message
- i18n keys named for the above

List the states you found in the report, including the ones you left unchanged, so the owner can see what was covered.

## Loading

| Wait | Show |
|---|---|
| Under about a second | Nothing, or the previous content |
| A few seconds | A spinner or skeleton, no text |
| Long enough to read (upload, export, generation) | What is happening, and progress if the code has it: "Uploading 3 of 12" |

Cut personality ("Hang tight!", "Brewing your dashboard…") and reassurance ("This won't take long") that the code can't back up. A loading label with an ellipsis is fine: "Saving…".

## Success

The best confirmation is the screen showing the result: the row appears, the toggle is on, the badge reads "Paid". Add a message only when the result isn't visible from where the user is.

- State the result, not the effort: "Saved", "Invite sent", "Copied".
- Add the object when it prevents doubt: "Invite sent to ana@example.com", "3 files moved to Archive".
- Offer undo when the code supports it, in place of a confirmation dialog beforehand.
- No "successfully", no exclamation mark, no "Your X has been Y".

## Empty

An empty state is one of the few places a sentence is worth its space, because the user has nothing else to go on. It holds:

1. What goes here, if the heading doesn't already say: "Invoices you send appear here."
2. The one action that adds the first item, as a button with a specific label: "Create invoice".

Separate the three kinds of empty, because they need different text:

- **Nothing yet** (first use): the two parts above.
- **Nothing matches** (filter or search): say so and offer to clear it: "No invoices match 'acme'. Clear search".
- **Nothing left** (inbox zero, all tasks done): one plain line, or nothing.

Cut illustrations that exist only to fill the space, and cut the second and third sentence.

## Error

An error message answers two questions: what failed, and what can I do. Use whatever the code knows.

| The code knows | Write |
|---|---|
| The cause and the fix | "That file is 48 MB. The limit is 25 MB." |
| The cause, no fix | "This link has expired. Ask the sender for a new one." |
| That it failed, and retry may work | "Couldn't save. Check your connection and try again." with a Retry button |
| Only that it failed | "Couldn't load invoices." with a Retry button |

- Say what failed in the user's terms ("Couldn't send the invite"), not the system's ("Request failed with status 500").
- No "Oops", "Whoops", "Uh oh", no apology by default, no blame ("You entered an invalid…").
- "Something went wrong" is acceptable only when the code truly can't know more, and then it still names the thing: "Something went wrong loading your invoices."
- Don't invent a cause. If the catch block has no detail, the message has none either. List it as a task: the fix is in the error handling, not the wording.
- Keep an error code or request id if support uses it. Put it after the message, visually quieter.

## Validation

- State the rule before the user breaks it when it isn't guessable (password rules, formats). This is a constraint and passes the test.
- After an error, say what to change: "Enter a date after 1 March" beats "Invalid date".
- Put the message beside the field. Don't repeat it in a banner unless the form is long enough that the field may be off screen.
- One message per field at a time.

## Confirmation

Confirm only what is destructive, irreversible, expensive or visible to others. For the rest, do the action and offer undo.

- **Title:** the action and its object as a question: "Delete 3 projects?"
- **Body:** the consequence, only if there is one beyond the title: "This also removes their 14 tasks. You can't undo this."
- **Buttons:** the confirm button repeats the verb ("Delete projects"). The other is "Cancel". Never "Yes" and "No", never "OK".

If the title already says everything, there is no body.

## Permission and consent prompts

Text that precedes an operating-system permission prompt, a cookie banner or a data-sharing choice passes the test: the user is being asked to grant something and needs to know what and why. Keep it to what is granted and what it is used for. Don't shorten legal wording, and don't change which option is emphasized. Report anything that looks like it steers the user.

## Disabled controls

A disabled button with no explanation fails the test: the user is surprised that nothing happens. If the code knows why it's disabled, the reason belongs near the control or in its tooltip ("Add a payment method to continue"). This is one of the cases where the edit adds a few words. Add them only from a condition visible in the code.
