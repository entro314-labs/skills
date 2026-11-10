---
name: remotion-explainer-videos
description: Workflow for explainer, tutorial, product-walkthrough and diagram-narrated videos built with Remotion (v4+), entirely local. Covers analysing a project, codebase, set of screens or diagram; writing the script, chapters and narration; scene and chapter structure with timing math; visual style (type sizes, safe area, pacing, theme tokens); screenshot or screen-recording walkthroughs with transitions, zoom/pan, callouts and text overlays; and Excalidraw diagram videos with locally generated narration (macOS say) whose scene lengths follow the measured audio. Use when asked for a tutorial video, explainer, intro or demo video of a project or app, a video from existing screenshots or recordings, or a narrated video of an architecture diagram. For ads and launch videos use remotion-promo-videos.
---

# Remotion explainer videos

An explainer teaches or shows something in a fixed order: a script comes first, scenes follow the script, and timing follows the narration or the reading time of the on-screen text. This skill is the workflow; Remotion API details live in `remotion-core`.

Related skills: `remotion-core` (core API, fonts, assets, Studio), `remotion-transitions` (transition catalogue, custom presentations), `remotion-rendering` (codecs, flags, stills), `remotion-promo-videos` (marketing and launch videos).

## 1. Pick the route

| Source material | Route | Read |
|---|---|---|
| A project, codebase, feature set or concept to explain | Project explainer: chapters with animated scenes | `references/script-template.md`, `references/scene-patterns.md` |
| Screenshots, screen recordings or exported UI screens you already have (or can capture locally) | Walkthrough: transitions, zoom, callouts | `references/walkthrough.md` |
| An Excalidraw diagram plus a narration script | Camera moves over the diagram, one scene per spoken passage | `references/diagram-narration.md` |

All routes share `references/script-template.md` (script and timing) and `references/visual-style.md` (look and pacing). Routes can be combined, for example a project explainer whose "Features" chapter is a walkthrough.

Everything runs locally. Do not call hosted generation, TTS or design services: use files the user already has, local capture, and local TTS or recorded audio.

## 2. Workflow

1. **Brief.** Settle goal, audience, source material, target length, aspect ratio, narrated or silent, brand colours and fonts. Ask only about what changes the outcome; otherwise state the default and go. Defaults: 1920x1080, 30 fps, narrated only if asked.
2. **Discover.** Read the source before writing a word of script.
   - Project: README, CLAUDE.md/AGENTS.md, docs, entry points, directory layout, main user journeys. List demo-worthy features and rank them for the audience.
   - Screens: list every file, check that sizes and aspect ratios match, put them in story order.
   - Diagram: read the `.excalidraw` JSON, list the labelled elements and their coordinates.
   - Every claim on screen must be true of the source. Verify against code or the running app; do not show mock-ups as the real product.
3. **Script.** Write the chapter outline, then per scene: one idea, the exact on-screen text, the narration, the visual and the asset. Format and rules are in `references/script-template.md`. For open-ended requests show the outline and narration to the user before building.
4. **Time it.** Convert to frames only after the script is fixed. Narrated: scene length comes from measured audio. Silent: use the pacing table in `references/visual-style.md`. Transitions shorten the timeline.
5. **Build.** Scaffold or reuse the project (see `remotion-core`), start Studio and keep the preview open, then build scenes one at a time. Fix the theme (`references/visual-style.md`) before the first scene so scenes stay consistent.
6. **Review.** Scrub in Studio and render stills of key frames (`npx remotion still <id> --frame=<n> out/check.png`). Run the checklist below. Almost every first draft is too fast and has text that is too small.
7. **Render** only when the user explicitly asks for a file; flags are in `remotion-rendering`. Remotion needs a company license for some organisations; mention it when the video is for commercial delivery.

## 3. Rules that apply to every explainer

- Get `fps` from `useVideoConfig()` and write times as `2 * fps`. Do not hardcode frame counts that only hold at 30 fps.
- Animate from `useCurrentFrame()` with `interpolate()` and `Easing`; always clamp (`extrapolateLeft/Right: 'clamp'`). CSS `transition`, CSS `animation` and Tailwind animation classes do not render correctly.
- Be deterministic: no `Math.random()` (use `random('seed')` from `remotion`), no `Date.now()`, no state that changes between frames.
- Typewriter text is `text.slice(0, n)`, never per-character opacity.
- Assets go in `public/` and are referenced with `staticFile()`; images with `<Img>`; audio and video with `Audio` and `Video` from `@remotion/media`. Timing props (`from`, `trimBefore`, `durationInFrames`) go directly on those components.
- Scenes run in a `TransitionSeries` (`@remotion/transitions`; `Series` is not exported from there) so durations stay adjacent when one changes. `TransitionSeries.Transition` takes `presentation` (e.g. `fade()`) and `timing` (e.g. `linearTiming({durationInFrames: 15})`). Its children must be `TransitionSeries.Sequence`, `.Transition` or `.Overlay` elements themselves (fragments are flattened, but a helper component that returns a `Sequence` is rejected); two transitions or a transition and an overlay may not be adjacent.
- Transitions overlap their neighbours: `total = sum(scene frames) - sum(transition frames)`. Overlays do not shorten the timeline. A transition must be shorter than both scenes next to it.
- When length depends on audio, measure it in `calculateMetadata` with `getAudioDuration()` (Mediabunny); `calculateMetadata` cannot call `useVideoConfig()`, so repeat the composition fps as a constant there.
- Prefer inline `interpolate()` in the style prop with `scale`, `translate` and `rotate` CSS properties; use a `transform` string only for order-sensitive chains such as a camera (`translate` then `scale`).
- Keep important content inside the safe area and use the type sizes in `references/visual-style.md`.

## 4. Review checklist

- Does the first scene state what the viewer will get, and does the last say what to do next?
- One idea per scene; each scene has a clear thing to look at first.
- Text readable on a phone: headline at least 84 px and supporting text at least 44 px on a 1080 px short side (table in `references/visual-style.md`); nothing outside the safe area.
- Pacing: nothing disappears before it can be read; scene changes are never hard cuts unless intended.
- Transition style is consistent: one or two kinds, 0.5 s each.
- Narration and picture agree; for narrated videos no scene is shorter than its audio.
- Facts, names, commands and diagrams match the real project.
- Every asset exists in `public/`; the Studio preview shows no missing-file errors; fonts are loaded before the first frame is judged.

## Files

- `references/script-template.md`: brief fields, chapter structure and durations, script format, narration writing, timing math.
- `references/visual-style.md`: safe area, type sizes, pacing table, theme tokens, fonts, aspect ratios, common mistakes.
- `references/scene-patterns.md`: tested components: chapter title, typewriter, staggered list, code walkthrough, flow diagram, hand-drawn emphasis.
- `references/walkthrough.md`: screenshot and recording walkthroughs: manifest, camera/zoom helper, slide component, transitions, callouts, recordings, narration.
- `references/diagram-narration.md`: Excalidraw diagram to narrated video: SVG export, coordinate mapping, storyboard, local narration, camera and focus overlay.
- `scripts/make-narration.mjs`: one `.wav` per scene from the storyboard with macOS `say`; no ffmpeg needed.
