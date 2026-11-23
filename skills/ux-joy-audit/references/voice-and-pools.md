# Voice, Dry Wit & Rotating Message Pools

Good product copy feels like a dry, conspiratorial friend sitting next to you — never a sterile spec sheet, and never a hyperactive mascot.

## Anatomy of Great Deadpan Product Copy

Study what makes dry wit land without ever feeling "AI quirky":

1. **Zero forced pep.** No exclamation-mark cheerleading (*"You got this!"*), no emojis, no corporate wellness slogans.
2. **Tight 2- or 3-beat rhythm.** Setup → deadpan pivot → quiet tag.
   - *"The office is closed. The office is a concept. The concept is closed."*
   - *"The morning made promises the afternoon has no intention of keeping."*
   - *"Every 'friendly reminder' is a hostile act wearing a cardigan."*
3. **Permission-giving, never scolding.** Give the user legal, moral, and comic permission to stop, delete, skip, or ignore noise.
   - *"You are allowed to delete things. It's legal in most jurisdictions."*
   - *"Rest like they pay you for it. They don't, but rest like it."*
   - *"Whatever you're avoiding will still be avoidable tomorrow."*
4. **Hyper-specific lived truth.** Name the exact absurd behavior every user recognizes (*`final_v7_FINAL_revised`*, *"checking 14 times"*, *"3am thoughts"*, *"starting a quick refactor at 11pm"*).
5. **Sparse easter eggs.** Keep a tiny, low-weight pool of literary/film/internet winks (*screen, book, net, music*) so one surprises the user once in a while instead of turning the app into a meme page.

## The Targeting Rule

Always check **who/what** the joke is aimed at:

- **Punch at shared absurdity (good targets):**
  - Shiny-object syndrome, endless refactors, half-finished folders, bloated inboxes, performative productivity, 3am hubris, corporate rituals.
- **Stand on the user's side on hard days (protective wit, never snark *at* them):**
  - Low energy, Sunday-evening dread, skipping a day (`Not today`), freezing/composting work, late-night insomnia. Wit here should *defend* the user from guilt (*"Sunday evening dread has been detected. This app cannot fix your entire life."* / *"Rest like they pay you for it."*), never mock them for being tired.
- **Keep facts & errors plain:**
  - Drift facts, OAuth/auth errors, and destructive confirmations stay completely straight. Never crack a joke when something broke or data is at risk.

## Context-Bucket Architecture

Do not dump every line into one flat array. Split pools by **when and why** the user is looking at the screen, and pick:
- **Deterministically per local day + bucket** for greetings (so refreshing does not jitter).
- **Non-repeating per session** for action toasts/celebrations.
- **Weighted rarely (~5–10%)** for pop-culture/literary easter eggs.

Recommended bucket structure (adapt names to the product):

```ts
export type GreetingBucket =
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'lateNight'      // e.g. 00:00–05:00 — gently talk them out of bad 3am decisions
  | 'weekend'
  | 'sundayEvening'
  | 'rest'           // low energy / "Not today" / read-only / snoozed state
  | 'anytime'
  | 'easterEgg'      // sparse film/book/net/music winks
```

Pair with **moment-specific pools** for the product's core actions:
- **Capture / Park a distraction** (e.g., parking an out-of-scope idea)
- **Triage / Inbox zero / Batch done**
- **Letting go / Archiving / Deleting**
- **Milestone / Crossing the finish line** (the biggest earned celebration)
- **Liminal waiting beats** (AI thinking, saving with Undo)

## Example: Adapting This Voice to a Builder / Shipping App

- **Morning:**
  - *"Coffee first. The repo has no legs, it can't chase you."*
  - *"Every half-finished project is Schrödinger's startup. Leave the others in the box."*
  - *"The day is still undefeated. Give it a minute."*
- **Afternoon:**
  - *"The morning made promises the afternoon has no intention of keeping."*
  - *"3pm: too late to rewrite the architecture, too early to stop. Do one small thing instead."*
- **Late night:**
  - *"Nothing good has ever been refactored after 2am. Ask anyone who has tried."*
  - *"4am app ideas belong in the parking lot, not in `git init`."*
  - *"Whatever you're about to rewrite right now, tomorrow-you is going to `git revert` it."*
- **Weekend / Rest / Low energy (`Not today`):**
  - *"It's the weekend. Your side projects can wait until Monday. They've already waited six months."*
  - *"Rest like they pay you for it. They don't, but rest like it."*
  - *"Sunday evening dread has been detected. This app cannot fix your entire life."*
  - *"Low-power mode. Tiny wins only — no heroic rewrites on 12% battery."*
- **Parking a distraction:**
  - *"Parked. That's a future-you problem now, and future-you is legally required to deal with it."*
  - *"Nice try, shiny object. Into the lot."*
  - *"Saved so you can stop thinking about it and not build it today."*
- **Crossing the finish line (Shipped):**
  - *"Actually shipped. Frame the screenshot."*
  - *"One less folder haunting your hard drive. Step away from the 'quick cleanup' PR."*
  - *"Crossed the line. Do not celebrate by starting a new repo."*
- **Compost / Archive / Inbox zero:**
  - *"You are allowed to let projects go. It's legal in most jurisdictions."*
  - *"Inbox zero is a lifestyle. So is dismissing things. One of these is achievable."*
  - *"Zero blockers left. Either it's ready to ship, or you're hiding one."*

## Anti-Patterns to Strip During Audits

- **Spec-sheet phrasing:** *"No items awaiting action"* → *"All clear."*
- **Anticlimactic completions:** *"Project released its slot"* when the user actually shipped → celebrate the ship, then show the quiet next step.
- **Guilt mechanics:** Avoid *"You missed 4 days"*, *"Overdue"*, *"Streak broken"*.
- **Mandatory comedy:** Keep every line ≤ 18 words and skimmable. Where possible, offer a quiet `Voice: Dry wit / Plain` preference in Settings so the user stays in control.
