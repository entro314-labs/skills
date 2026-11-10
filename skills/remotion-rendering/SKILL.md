---
name: remotion-rendering
description: "Render Remotion compositions to video, stills, image sequences, GIF and transparent video (ProRes or WebM) with the CLI (`npx remotion render`, `still`, `--props`, `--codec`, `--crf`, `--concurrency`, `--frames`) or from Node.js (`@remotion/bundler` + `@remotion/renderer`: bundle, selectComposition, renderMedia, renderStill, onProgress, cancel), run headless rendering on Linux servers and Docker (Chrome Headless Shell, required system libraries), and tune render speed or debug render failures (timeouts, flicker, memory, GPU flags). Use when the user wants to export, batch-render, automate, or speed up Remotion output. Does not cover cloud-hosted rendering (Lambda, Cloud Run, Vercel Sandbox and similar)."
---

# Remotion rendering

Remotion renders by loading a bundle in headless Chrome, capturing every frame, then encoding with its bundled FFmpeg. The Studio render dialog, the CLI and the Node.js APIs all use the same renderer, so every option below exists in each of them.

For composition structure, `calculateMetadata`, animation and media components see `remotion-core`. This skill is only about getting pixels out.

## Choosing a method

| Need | Use |
|------|-----|
| One-off or scripted render, CI job | CLI: `npx remotion render` |
| One frame or a thumbnail | CLI: `npx remotion still` |
| Specific frames as images | `npx remotion render ... --frames=0,30,90` |
| Many renders from your own app or server, progress reporting, cancellation | Node.js API ([programmatic-rendering](rules/programmatic-rendering.md)) |
| Linux server, container, CI runner | [headless-linux](rules/headless-linux.md) |

Cloud-hosted rendering services are out of scope for this skill.

## CLI quick reference

```bash
# Video. Entry point is optional; the composition id and output path are what matter.
npx remotion render MyComp out/video.mp4

# Pass an entry point (or a serve URL) first only when it cannot be auto-detected
npx remotion render src/index.ts MyComp out/video.mp4

# Omit the composition id to pick one interactively; omit the output to write into out/
npx remotion render

# A still
npx remotion still MyStill out/thumb.png --frame=30

# Several frames as images in one call
npx remotion render MyComp out/frames --frames=0,30,90 --image-format=png

# Input props, inline JSON or a JSON file
npx remotion render MyComp out/video.mp4 --props='{"title":"Hello"}'
npx remotion render MyComp out/video.mp4 --props=./props.json
```

Rules of thumb:

- Props passed with `--props` / `inputProps` are the composition's input props. Read them as regular React props, or transform them in `calculateMetadata`. `getInputProps()` is only a fallback for the root component and does not work inside `<Player>`.
- Windows shells do not support inline JSON for `--props`; pass a file name.
- `--frames=0-99` (range, inclusive) renders a sub-clip as one video; `--frames=0,30,90` (single frames) renders an image sequence. Add `--sequence` to force images for a range.
- `--overwrite` is on by default; use `--overwrite=false` to refuse replacing an existing file.
- The file extension picks the default codec; override it with `--codec`.
- Full flag list: [cli-flags](rules/cli-flags.md). Official reference: https://www.remotion.dev/docs/cli/render.md and https://www.remotion.dev/docs/cli/still.md

## Format and quality cheat sheet

| Goal | Command |
|------|---------|
| Universal MP4 (default) | `--codec=h264` |
| Smaller file, weaker player support | `--codec=h265` |
| Web video, smaller but slow to encode | `--codec=vp9` (or `vp8`, `av1`) |
| Editing handoff, transparent | `--codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png` |
| Transparent for browsers | `--codec=vp9 --pixel-format=yuva420p --image-format=png` |
| Short loop | `--codec=gif --every-nth-frame=2` |
| Audio only | `--codec=mp3`, `aac` or `wav` |
| Quality up (h264) | lower `--crf` (default 18, range 1-51) |
| Fast draft | `--scale=0.5`, fewer frames with `--frames` |

Details, per-codec CRF defaults, bitrate and hardware acceleration: [codecs-and-quality](rules/codecs-and-quality.md).
Transparent output: [transparent-videos](rules/transparent-videos.md). GIF: [gif](rules/gif.md).

## Node.js API in one screen

```ts
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

// Bundle once, reuse for every render.
const serveUrl = await bundle({
  entryPoint: path.resolve("./src/index.ts"),
  // webpackOverride: required here if remotion.config.ts overrides webpack
});

const inputProps = { title: "Hello World" };

// Pass the same inputProps to selectComposition and renderMedia.
const composition = await selectComposition({ serveUrl, id: "MyComp", inputProps });

await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: "out/MyComp.mp4",
  inputProps,
  onProgress: ({ progress }) => console.log(`${(progress * 100).toFixed(1)}%`),
});
```

Stills, in-memory output, cancellation, sharing a browser across renders, and a render server: [programmatic-rendering](rules/programmatic-rendering.md).

## Headless Linux

Install the Chrome Headless Shell system libraries (Ubuntu/Debian list and a Dockerfile are in [headless-linux](rules/headless-linux.md)), then run `npx remotion browser ensure` once so the browser is downloaded before the first render. Avoid Alpine and nixOS.

## Speed and failures

- Benchmark concurrency with `npx remotion benchmark`; the default is half the CPU threads. More is not always faster.
- Use `<Video>` from `@remotion/media` for the best video rendering performance; avoid CSS-heavy GPU effects (blur, shadows, gradients, WebGL) on GPU-less machines.
- `--log=verbose` lists the slowest frames. `renderMedia()` also returns `slowestFrames`.
- A "`delayRender()` was called but not cleared" error means an asset or `continueRender()` never resolved within the timeout (30 s by default). Raise it with `--timeout` / `timeoutInMilliseconds` only after checking the cause.
- Flicker or wrong frames almost always come from animation not driven by `useCurrentFrame()` (CSS transitions, Tailwind `animate-*`, `useFrame()` in three.js, third-party library animations).
- Pitch shifting (`toneFrequency`) only takes effect in a render, not in the Studio or `<Player>`.

Full tuning list and troubleshooting: [performance-and-troubleshooting](rules/performance-and-troubleshooting.md).

## Checklist before reporting a render as done

1. The output file exists, has the expected duration and dimensions, and plays.
2. Audio is present when expected (`--muted` and `--enforce-audio-track` change this).
3. For transparent output, open it over a non-black background to confirm the alpha channel survived.
4. For server code, the bundle is created once, `ensureBrowser()` runs at startup, and failures return an error instead of hanging.
