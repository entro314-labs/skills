---
name: remotion-core
description: Core Remotion (v4+) guidance for writing video in React - creating a project and previewing it in Studio, compositions and stills, frame-driven animation (useCurrentFrame, interpolate, Easing, spring, random), timing props and sequencing (from, trimBefore, durationInFrames, playbackRate, loop, Sequence, Track), embedding Video, Audio, images and GIFs with staticFile, fonts, text measuring and animation, 3D with Three.js, Lottie, canvas effects, color correction and LUTs, HTML-in-canvas and motion blur, cropping, charts, calculateMetadata, Zod parameters, Tailwind, video-first layout, editable timelines and connected compositions, Mediabunny metadata helpers, FFmpeg trimming, upgrading Remotion and looking up current docs. Use whenever writing, reviewing or debugging Remotion code or when asked to make, create or build a video with Remotion.
---

# Remotion best practices

Remotion renders React components frame by frame. Everything on screen must be a pure function of the current frame. This skill is the core; detail lives in `rules/`. Load only the rule files the task needs.

## Workflow

1. If asked to make a new video or composition, or no project exists, follow [rules/project-setup-and-studio.md](rules/project-setup-and-studio.md): scaffold with `npx create-video@latest --yes --blank --no-tailwind`, then start Studio (`npx remotion studio`) and open the preview before building the composition. Keep it open while you work.
2. Do not render unless the user is explicit ("render", "export", "give me the MP4"). Rendering options belong to the `remotion-rendering` skill; Studio also has a rendering interface.
3. Before writing the root, read [rules/compositions.md](rules/compositions.md). Before choosing the markup hierarchy for a multi-clip or multi-scene video, read [rules/video-editing-and-connected-compositions.md](rules/video-editing-and-connected-compositions.md).
4. Check the result in Studio; for timeline changes inspect the full composition and any connected components.
5. Users edit code outside the conversation. If you find a surprising change, do not overwrite it: assume it was intentional or ask.
6. When unsure about an API or prop, read the current docs ([rules/upgrade-and-docs.md](rules/upgrade-and-docs.md)) instead of relying on memory.

## Core rules

- Drive all animation with `useCurrentFrame()` and `interpolate()` (or `spring()`). CSS `transition`, CSS `animation`, Tailwind `transition-*` / `animate-*` classes, `Math.random()` and library animations on their own clock render wrongly or flicker. Use `random('seed')` for deterministic randomness.
- Get `fps` from `useVideoConfig()` for every seconds-to-frames conversion, and keep the expression on the JSX node (`trimBefore={4 * fps}`). Never hardcode fps in a component.
- Keep `interpolate()` inline in the `style` prop, with hardcoded output ranges, easing, extrapolation and `output`. Use the `scale`, `translate` and `rotate` CSS properties instead of `transform` strings. Use `output: 'perceptual-scale'` for scale animations. Clamp with `extrapolateLeft/Right: 'clamp'` unless extrapolation is wanted.

```tsx
import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Interactive.Div
      name="Title"
      style={{
        opacity: interpolate(frame, [0, 2 * fps], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      Hello World!
    </Interactive.Div>
  );
};
```

- Studio edits the JSX nodes that create timeline items. Give each independently editable instance its own JSX node with a literal `name` and inline timing and style; keep layout-only containers as plain HTML. Inline `defaultProps` literals on `<Composition>`.
- Put assets in `public/` and reference them with `staticFile()`. Use `<Video>` and `<Audio>` from `@remotion/media`, `<CanvasImage>` or `<Img>` for images, `<AnimatedImage>` for GIF, APNG, WebP and AVIF. Plain `<img>` and CSS background images do not wait for loading.
- Put timing on the item itself: `from`, `trimBefore`, `durationInFrames`, `playbackRate`, `loop`. Wrap in `<Sequence>` only for shared timing or components without timing props. Prefer `trimBefore` + `durationInFrames` over the older `startFrom`, `endAt` or negative `from`.
- Load fonts explicitly (`@remotion/google-fonts` or `@remotion/fonts`); never rely on system fallbacks. Measure text only after the font is loaded.
- Design for video, not for a webpage: one focal point per scene, safe areas, large text ([rules/video-layout-and-tailwind.md](rules/video-layout-and-tailwind.md)). No emoji as visual elements.
- Install packages with `npx remotion add <pkg>` so the version matches (`@remotion/*`, `mediabunny`, `@mediabunny/*`, `zod`, `@huggingface/transformers`). All `remotion` and `@remotion/*` packages must be on one exact version.
- Use `delayRender()` / `continueRender()` / `cancelRender()` when a frame needs asynchronous data before it can be captured.
- Prefer built-in `effects` over CSS approximations when the target component supports them ([rules/effects.md](rules/effects.md)).

## Rule files

| Task | Read |
| --- | --- |
| Scaffold, Studio preview, visual checks, resolutions | [rules/project-setup-and-studio.md](rules/project-setup-and-studio.md) |
| `<Composition>`, `<Still>`, `<Folder>`, default props, nesting | [rules/compositions.md](rules/compositions.md) |
| Dynamic duration, size or props; duration from media or voiceover files | [rules/calculate-metadata.md](rules/calculate-metadata.md) |
| Editable props with a Zod schema, color picker | [rules/parameters-zod.md](rules/parameters-zod.md) |
| `interpolate`, `Easing`, `spring`, `random`, scale, posterize | [rules/animation-timing.md](rules/animation-timing.md) |
| `from`, `trimBefore`, `durationInFrames`, `playbackRate`, `loop`, Sequence, Track, Series, multi-scene | [rules/timing-props-and-sequencing.md](rules/timing-props-and-sequencing.md) |
| Timeline of clips, cutaways, captioned shots, connected compositions, pre-compose | [rules/video-editing-and-connected-compositions.md](rules/video-editing-and-connected-compositions.md) |
| Safe areas, text sizes, Tailwind | [rules/video-layout-and-tailwind.md](rules/video-layout-and-tailwind.md) |
| `staticFile`, images, dynamic paths, image size, GIF/APNG/WebP | [rules/assets-and-images.md](rules/assets-and-images.md) |
| `<Video>` / `<Audio>` trim, delay, speed, volume, loop, pitch | [rules/embedding-video-and-audio.md](rules/embedding-video-and-audio.md) |
| Google and local fonts | [rules/fonts.md](rules/fonts.md) |
| Typewriter, word highlight, rough-notation annotations, `measureText`, `fitText`, DOM measuring | [rules/text-and-measuring.md](rules/text-and-measuring.md) |
| Arabic, Persian, Urdu, Hebrew text | [rules/arabic-rtl-text.md](rules/arabic-rtl-text.md) |
| Three.js / React Three Fiber | [rules/3d.md](rules/3d.md) |
| Lottie | [rules/lottie.md](rules/lottie.md) |
| `effects` prop, built-in effect list, light leaks, `createEffect()` | [rules/effects.md](rules/effects.md) |
| `colorCorrection()`, `lut()` | [rules/color-correction.md](rules/color-correction.md) |
| `<HtmlInCanvas>`, `<HtmlInCanvasMotionBlur>` | [rules/html-in-canvas-and-motion-blur.md](rules/html-in-canvas-and-motion-blur.md) |
| `crop*` props | [rules/cropping.md](rules/cropping.md) |
| Bar and pie charts, data-driven visuals | [rules/charts.md](rules/charts.md) |
| Media duration, dimensions, decode check, frame extraction, FFmpeg trim | [rules/mediabunny-and-ffmpeg.md](rules/mediabunny-and-ffmpeg.md) |
| Upgrade Remotion, read current docs | [rules/upgrade-and-docs.md](rules/upgrade-and-docs.md) |

## Related skills

- `remotion-transitions`: `TransitionSeries`, presentations, overlays, transition duration math.
- `remotion-rendering`: `npx remotion render` / `still`, Node.js rendering, transparent video, headless servers.
- `remotion-maplibre-maps`: map animations.
- `remotion-project-conventions`: code style, file layout and tests for a Remotion codebase.
