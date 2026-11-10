# Story structures, scripts and storyboards

Pick the structure before writing any Remotion code. All durations are given in seconds; convert with the composition's `fps` (30 by default), for example `trimBefore={4 * fps}`, `durationInFrames={9 * fps}`.

## 1. Brief intake

Collect these before drafting; ask only for what the repo, README or user message does not already answer:

- Product name, audience, core pain, value proposition in one sentence
- 2 to 4 use cases (concrete scenarios, not feature bullets; if only features are given, ask for the situations they solve)
- CTA and an incentive (discount, trial extension, bonus)
- Target placements and duration
- Brand inputs: logo, colors, fonts, real screenshots or screen captures. Take them from the project's own design tokens and assets or from the user; save them under `public/` and load with `staticFile()`.
- Tone and visual style

## 2. AIDA (default for product launch, app promo, SaaS explainer, paid social)

Follow the stages in order. Reject drafts that skip one.

| Stage | Share | Goal | Rules |
| --- | --- | --- | --- |
| Attention | 0-20% | Establish the problem | Pain visible in the first 3-5 s, one strong visual conflict, very short on-screen text |
| Interest | 20-45% | Introduce the solution | Show the mechanism, not every detail; brisk pacing; introduce before the midpoint |
| Desire | 45-80% | Prove it with use cases | Concrete scenarios, before/after or context wins, one proof signal (metric, quote, trust mark) only if it is real |
| Action | 80-100% | One CTA with an incentive | A single CTA; hold the final frame readable for at least 2 s |

Generate a first scene plan from a brief with `scripts/brief_to_aida_plan.py` (see `templates/aida-product-video/`). It splits 20/25/35/20 and divides the Desire share across the use cases, then you tighten the headlines in `plan.json`.

QA gate before rendering:

- Problem is clear in the first 3-5 s
- Solution appears before the midpoint
- Use cases are scenarios, not feature bullets
- CTA names an explicit incentive
- Voiceover stays intelligible over the music
- One message per scene; motion directs attention, it does not decorate

## 3. Ad lengths

Use one message for 15 s, problem-solution for 30 s, a full arc with proof for 60 s. Frame counts at 30 fps.

| Length | Frames | Scenes (seconds) | Notes |
| --- | --- | --- | --- |
| 15 s | 450 | Hook 3, Value 9, CTA 3 | Front-load the hook, one value prop, large text, brand visible throughout |
| 30 s | 900 | Hook 5, Problem 7, Solution 13, CTA 5 | Show the product in action during Solution; end card with logo, CTA, URL |
| 60 s | 1800 | Hook 5, Problem 10, Solution 20, Social proof 15, CTA 10 | Proof before the ask; end card can carry offer details |

Mapping to AIDA: Hook and Problem are Attention, Solution is Interest, the demo and proof scenes are Desire, CTA is Action.

Ad patterns that recur: text over a full-bleed brand background, product image with scale + opacity entrance, spring pop-in for a price or discount, and an end card (logo, CTA button, URL). `templates/components/promo-components.tsx` has `CtaButton` and `EndCard`.

## 4. Short-form (Reels, TikTok, Shorts)

- Hook in the first 1-3 s: bold text, movement, contrast or a provocative question. Viewers decide in about the first second.
- Cut or change something every 3-5 s.
- Last 2-3 s: follow, subscribe, link or share prompt, or no CTA at all if the video should loop.
- Design for muted playback first; audio enhances.
- Typical length 15-60 s. Recompose per aspect ratio, see `formats-and-safe-zones.md`.

### Curiosity-hook narrated short (30-45 s, loops)

For a spoken explainer over illustrated slides (a concept, study or bias explained in one story):

1. Curiosity hook (0-3 s): one sentence that links something unexpected to a relatable problem. Pattern: "[Unexpected subject] [accidentally / proved] why [relatable problem]."
2. Story (3-15 s): the fact told as a compressed, concrete, visual narrative.
3. Bridge (15-25 s): make it personal for the viewer.
4. Landing line (25-30 s): a restrained reframe. No CTA, so the video loops cleanly into the hook.

Length: about 2.5 spoken words per second, so 75-110 words for 30-45 s. Cut every sentence that does not earn its place. Say the words people would search for out loud where natural. Use 3-5 niche hashtags, no generic ones.

Slides: about one per 3 s (10 for 30 s, 15 for 45 s), each with its own image, timed from the narration's word timestamps. The last slide is a quiet closing image that loops to the first. Use `templates/narrated-slides/`.

## 5. Product-demo video storyboard

For a demo built from the product's real surfaces (README, docs, source, screenshots):

- Always start with an intro and end with an outro.
- Most scenes 8-12 s; at least one clearly animated scene (workflow, comparison, or a dynamic feature).
- Use real code, commands and details from the product; no invented capabilities.
- Narration in spoken language, 120-150 words per minute.
- Show the storyboard to the user for approval before building, unless they waive it.

Narration-driven timing: generate the narration per scene, measure each file, set the scene length to audio length + about 0.8 s. See `motion-and-pacing.md` (audio section).

## 6. Promo script and storyboard document

Write this before building when the user wants a plan, a script or a shot list. Save it next to the code (for example `docs/video-promo.md`).

Think first, in writing:

- Goal: what should the viewer do afterwards (download, sign up, visit)?
- Hook type: question, surprising stat, pain point or bold claim
- Demo moments: the 3 key product moments to show on screen
- Emotion arc: frustration, discovery, relief or delight

Script template (30-45 s, vertical, about 75-100 words of narration; pick the top 3 features only):

```markdown
## Video script: {Product}
Duration: 30-45 s | Format: 9:16 | Style: screen capture + text overlays

### HOOK (0:00-0:03)
Audio: "{question or bold statement}"
Visual: {text overlay on gradient or blurred background}

### PROBLEM (0:03-0:10)
Audio: "{the pain in the user's words}"
Visual: {the frustrating current state}

### DEMO (0:10-0:25)
Audio: "{what the product does}"
Visual: shot 1 (5 s) feature A; shot 2 (5 s) feature B; shot 3 (5 s) the wow moment

### CTA (0:25-0:30)
Audio: "{call to action}"
Visual: logo + URL + store badge
```

Follow it with:

- Assets checklist: one line per capture, logo (transparent PNG), music (licensed or royalty-free)
- Remotion component spec: composition id, fps and frame count, one `Sequence` per beat with frame ranges, assets per sequence
- If no UI exists yet: mockups or wireframes, with the intended visuals described in the storyboard

## 7. Variants, naming and handoff

- Name each creative `{Scenario}{Style}` in PascalCase, specific enough to identify it months later (`ThreeAmThoughtSpiralClay`, not `NewAd` or `VideoV2`).
- Use it everywhere: source folder `src/{Name}/`, composition ids `{Name}-Square` and `{Name}-Vertical`, a `<Folder name="{Name}">` in `Root.tsx`, asset prefixes, output folder.
- Source layout per creative: `config.ts` (timing, text, constants), `index.tsx` (composition), scene components.
- When testing variants, keep one exploratory concept (new angle, style or format) and one close variant of the best existing creative that changes exactly one variable (hook, visual treatment, CTA or pacing).
- Handoff brief per creative (`BRIEF.md` next to the renders): hook / narrative / CTA with timings, duration and why, visual style, audio sources and licenses, render formats and codec, and the hypothesis being tested.
- Ask for approval at concept selection and before the final render.
