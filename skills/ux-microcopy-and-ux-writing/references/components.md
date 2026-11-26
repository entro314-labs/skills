# Components: buttons, labels, forms, errors

## Buttons and CTAs

| Situation | Use | Avoid |
|---|---|---|
| Form save | Save changes | Submit, OK |
| Account creation | Create account | Sign up now!!, Go |
| Sending | Send message | Send, Done |
| Export | Download report | Click here |
| Destructive | Delete project, Delete forever, Remove member | Delete, Yes, Confirm |
| Soft exit | Maybe later, Not now | No thanks, I hate saving money |
| Continue in flow | Continue to payment | Next, Proceed to next step |
| Trial | Start free trial | Buy now (if no purchase happens) |
| Low commitment discovery | See how it works | Learn more (if specific object exists) |

Rules:
- Verb + object. The label should complete the sentence "I want to ...".
- Primary button = the outcome the user came for; secondary visually and verbally quieter.
- A label that is a question answer ("Yes, delete project") is acceptable in dialogs only when the title is a yes/no question. Prefer the specific verb.
- Match commitment: do not label an action "Buy now" if it opens a cart, or "Free" if a card is required without saying so.
- Button text never relies on surrounding context to make sense ("Learn more" repeated five times is inaccessible; use distinct, specific labels).

### Button pairs

| Primary | Secondary |
|---|---|
| Save changes | Cancel |
| Delete project | Keep project / Cancel |
| Send | Save draft |
| Confirm | Go back |
| Create account | Log in instead |
| Yes, continue | No, cancel |

Cancel vs Close: "Cancel" when an in-progress action is being abandoned; "Close" when nothing was started and the dialog only informs.

## Labels

- Noun or short noun phrase. "Email address", "Phone number", "Company name (optional)".
- Not instructions: "Enter your email address here" fails.
- Same label in the UI, in errors, and in help text ("Email address" everywhere, not "E-mail" in one and "Email" in another).
- Keep visible at all times (including when focused or filled).

## Placeholders

- Example of expected format only: `name@example.com`, `MM/DD/YYYY`, `(555) 123-4567`.
- Do not duplicate the label, give instructions, or hide rules there. Low contrast placeholders are often unreadable; assume some users never see them.
- Consider dropping the placeholder entirely when no format example is needed.

## Helper text

- Below the field, visible before interaction.
- States the rule before the error: "At least 8 characters, including a number", "Letters, numbers, and underscores only", "Maximum file size: 10 MB".
- Explains why when it removes hesitation: "We'll send a confirmation link".
- Complex password rules are shown before typing, not only after failure.
- If instructions are needed, put them above or beside the field as helper text; never only inside the placeholder.

## Checkboxes, toggles, consent

- Checkbox labels state the thing, positively: "Send me product updates", "I agree to the Terms of Service".
- Toggle labels describe the on-state ("Email notifications"); show state in text or an accessible state, not only position/color.
- Legal consent short and linked: "By signing up, you agree to our Terms and Privacy Policy."
- Pricing microcopy: state what is included and the real saving: "$99/year (save 17%)", "Free forever" (only if true).

## Error messages

Formula: what happened + (why, if useful) + how to fix.

| Case | Message |
|---|---|
| Required field | Enter your email address |
| Format | Enter a valid email address, like name@example.com |
| Password rule | Password needs 8+ characters with a mix of letters, numbers, and symbols |
| Too long | Name can be up to 50 characters. You're 6 over. |
| Network | Couldn't connect. Check your internet connection and try again. |
| Server | We couldn't save your changes. Try again in a moment. |
| Permission | You don't have access to this project. Ask the owner to invite you. |
| Not found | We can't find that page. Go to your dashboard or search. |
| Upload size | That file is too large. Choose one under 10 MB. |
| Expired link | This link has expired. Request a new one. |

Checklist for each error string:
- [ ] Plain language, no codes or jargon as the message
- [ ] Explains the problem
- [ ] Suggests a solution or support path
- [ ] Specific to the field or situation
- [ ] No blame, no exclamation mark, no joke

Placement and timing:
- Inline next to the field for field errors; a summary at the top of long forms linking to each field.
- Validate on blur or submit, not on every keystroke before the user finishes (except live rules like password strength).
- Preserve user input after an error.
- Fix suggestions use the same word as the label so the user can find the field.

Security-sensitive: login and password-reset errors may need identical wording regardless of whether an account exists. Agree with security.

## Terminology: one word per concept

Pick one and use it everywhere: Sign up vs Register, Log in vs Sign in, Delete vs Remove (delete = permanent, remove = detach, if you distinguish them keep the distinction), Workspace vs Project vs Team. Align with API and docs names where users see both.
