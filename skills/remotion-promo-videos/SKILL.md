---
name: remotion-promo-videos
description: Plan and build marketing and promo videos in Remotion (v4+) - product launch and demo videos, AIDA-structured product ads, 15/30/60-second video ads, short-form social videos in 9:16, 4:5, 1:1 and 16:9 variants, chat-conversation mockup videos, text-on-b-roll shorts, narrated illustrated shorts, plus shot-by-shot storyboards and promo scripts. Includes brand-agnostic React templates, safe-zone and text-size rules, pacing and transition guidance, and an AIDA plan generator script. Use when the user asks for a promo video, launch video, product demo, video ad, Reel/TikTok/Short, a chat-style video, a video script or storyboard, or multi-format social exports from one Remotion project.
---

# Remotion promo videos

One workflow for videos whose job is to make someone act: understand the brief, pick a story structure, pick the format, build scenes from data-driven templates, QA against the checklist, preview, and render only when asked. Everything runs locally: Remotion, React, Node, FFmpeg, and files you supply or own. No image, video or voice generation services, no hosted APIs.

Core Remotion API, project setup and Studio: `remotion-core`. Transitions: `remotion-transitions`. Render flags and automation: `remotion-rendering`. Code conventions and accessibility: `remotion-project-conventions`. Cinematic launch films built from the real interface: `remotion-product-film`. Check Remotion's license terms for commercial promo work.

## Workflow

1. **Brief.** Gather product, audience, pain, value proposition, 2-4 use cases, CTA plus incentive, placements, duration, tone, brand assets (logo, colors, fonts, real screenshots or captures). Take what you can from the repo, README, design tokens and existing assets; ask only for gaps. Details: [references/story-structures.md](references/story-structures.md).
2. **Structure.** Choose the arc: AIDA for product launches and paid social, problem-solution-proof for 30/60 s ads, hook-first for short-form, curiosity-hook loop for narrated shorts. Write the script or storyboard first when the user wants a plan or a shot list. Get approval on the concept or storyboard before building unless the user waives it.
3. **Format.** Choose canvases and safe zones per placement: [references/formats-and-safe-zones.md](references/formats-and-safe-zones.md). Default 30 fps; one composition per aspect ratio sharing scene components.
4. **Scaffold.** If no project exists: `npx create-video@latest --yes --blank --no-tailwind my-video`, then `npm i`. Open Studio (`npx remotion studio`) before building and keep it running so the user can watch and steer. Add packages with `npx remotion add <package>`.
5. **Build.** Copy the closest template from `templates/` into `src/` and replace the content; keep the plan-driven structure. Style and pacing rules: [references/motion-and-pacing.md](references/motion-and-pacing.md).
6. **QA.** Run the checklist below, inspect stills of the hook, hero scenes, a mid-transition frame and the CTA, then play the video at normal speed.
7. **Deliver.** Preview first. Render only on explicit request ("render", "export", "give me the MP4") and one composition per output: [references/formats-and-safe-zones.md](references/formats-and-safe-zones.md#rendering-per-format).

## Choose a style

| Request | Structure | Template / reference |
| --- | --- | --- |
| Product launch, SaaS explainer, app promo, paid social ad | AIDA, 30-60 s | `templates/aida-product-video/`, `scripts/brief_to_aida_plan.py` |
| 15 / 30 / 60 s video ad | Hook, problem, solution, proof, CTA | [story-structures.md](references/story-structures.md) section 3, `EndCard`, `CtaButton` |
| Reels, TikTok, Shorts, feed post | Hook-first, cut every 3-5 s | [formats-and-safe-zones.md](references/formats-and-safe-zones.md) |
| Text over a looping clip | Pattern-based one-liners | `templates/text-on-broll/`, [short-form-styles.md](references/short-form-styles.md) A |
| Chat conversation video | Event timeline | `templates/chat-mockup/`, [short-form-styles.md](references/short-form-styles.md) B |
| Narrated story over images | Curiosity hook, loop | `templates/narrated-slides/`, [short-form-styles.md](references/short-form-styles.md) C |
| Demo built from the real product | Storyboard with intro and outro | [story-structures.md](references/story-structures.md) sections 5-6 |
| High-end launch film from the real interface, multi-placement package | Evidence-to-film | the `remotion-product-film` skill |
| Plan only: script, storyboard, shot list | Script template | [story-structures.md](references/story-structures.md) section 6 |

## Templates

All templates are plain `.ts`/`.tsx` source (no `package.json`): scaffold with the command above and copy files in. Install what they import:

```bash
npx remotion add @remotion/media @remotion/transitions @remotion/google-fonts
npm i lucide-react
```

`templates/narrated-slides/` imports `../components/promo-components`, so copy `templates/components/` next to it. They type-check against Remotion 4.0.537 and the stills were rendered to check layout.

| Path | Contents |
| --- | --- |
| `templates/aida-product-video/` | `AidaPlan` types, `ProductAidaVideo` (plan to `TransitionSeries`, varied transitions per stage), `Root.tsx` with `calculateMetadata` for plan-driven duration, a sample plan |
| `templates/chat-mockup/` | `ChatVideo` (phone frame, bubbles, typing dots, self-scrolling list, optional SFX), `Root.tsx`, duration helper |
| `templates/text-on-broll/` | `TextOnBroll` (single line or two-part reveal over `public/bg-video.mp4`), `Root.tsx` registering one composition per text variant |
| `templates/narrated-slides/` | `NarratedSlides` (timed images, push-in, narration and music), `Root.tsx` with duration from props |
| `templates/components/promo-components.tsx` | `Brand` type, `AnimatedGradient`, `FeatureCard`, `StatCounter`, `CtaButton`, `KineticText`, `TerminalWindow`, `KenBurnsImage`, `EndCard` |
| `scripts/brief_to_aida_plan.py` | Brief JSON to `{"plan": ...}` JSON for `--props` |

Generate and render an AIDA plan:

```bash
python3 scripts/brief_to_aida_plan.py --in brief.json --out plan.json --duration-sec 45
npx remotion render ProductAida out/aida.mp4 --props=plan.json
```

`brief.json` fields: `product_name`, `audience`, `problem`, `solution`, `use_cases` (1-4 strings), `cta`, `incentive`. The script writes the brief text verbatim as headlines, so tighten them in `plan.json`. Transitions overlap scenes, so the rendered video is shorter than the target by the total overlap (`getPlanDuration` accounts for it).

## Rules that matter

- Frame-driven only: `useCurrentFrame()` + `interpolate()` / `spring()`. No CSS transitions, CSS animations or Tailwind animation classes. Get `fps` from `useVideoConfig()`; write times as `seconds * fps`.
- Media from `@remotion/media` (`<Video>`, `<Audio>`), assets in `public/` via `staticFile()`. Video and audio timing props (`from`, `trimBefore`, `durationInFrames`) go directly on the element.
- Story first: AIDA stages in order, one message per scene, use cases not feature lists, one CTA with an incentive, final frame held at least 2 s.
- Text: headline at least 84 px and supporting text at least 44 px on a 1080 px wide canvas (scale by width), 80 px side and 100 px top/bottom margins, plus the platform UI zones for 9:16 (top about 180 px, bottom about 280 px).
- Design for muted playback; the story must follow without sound. Voiceover primary, music ducked, SFX only where they reinforce movement.
- Show the real product: real captures or real components with clean fixtures. Do not invent metrics, quotes, superiority claims or capabilities; label synthetic data.
- Icons are vectors or the product's artwork, never emoji. Brand colors and fonts come from the product, not from a default gradient.
- Own or licensed footage, music and images only; record sources in the handoff.
- Do not render unless asked; preview in Studio.

## QA checklist

- Problem is clear in 3-5 s; solution before the midpoint; use cases concrete; CTA has an incentive
- Mute, squint and slideshow tests pass ([motion-and-pacing.md](references/motion-and-pacing.md))
- Text inside safe zones and readable at phone size on every format
- No clipped or overlapping elements at any frame, including transitions
- Fonts and assets load before render; durations match the audio
- Each output file is the right size, ratio, duration and codec for its placement

## References

- [references/story-structures.md](references/story-structures.md): brief intake, AIDA, ad lengths, short-form and narrated structures, demo storyboard, script template, naming and variants
- [references/formats-and-safe-zones.md](references/formats-and-safe-zones.md): canvases, platform limits, safe zones, text sizes, multi-format registration, render commands, 2x masters
- [references/motion-and-pacing.md](references/motion-and-pacing.md): avoid/pursue, transitions, timing and spring values, persistent layers, style, quality tests, audio and narration timing
- [references/short-form-styles.md](references/short-form-styles.md): text-on-b-roll, chat mockup, narrated illustrated short
