# Performance tuning and troubleshooting

Sources: https://www.remotion.dev/docs/performance.md, https://www.remotion.dev/docs/timeout.md

## Measure first

- `npx remotion render MyComp out.mp4 --log=verbose` lists the slowest frames. The first frames in each browser tab can be slow because of initialization.
- `renderMedia()` returns `slowestFrames` (the 10 slowest `{ frame, time }`).
- `npx remotion benchmark` tests different `--concurrency` values.
- Use `console.time` around suspected slow code in the composition.

## Tuning

| Lever | Guidance |
|-------|----------|
| `--concurrency` | Default is half the CPU threads. Higher can be faster or slower; benchmark instead of guessing. |
| Video component | Use `<Video>` from `@remotion/media`. `<Html5Video>` and `<OffthreadVideo>` are not optimized. |
| GPU-heavy content | WebGL (three.js, Skia, p5.js, Mapbox), 2D canvas, `box-shadow`, `text-shadow`, gradients, `filter: blur()` and `drop-shadow()` are slow without a GPU. Replace with a precomputed image where possible. See `--gl` in [headless-linux](headless-linux.md). |
| Slow JavaScript | Cache expensive work with `useMemo()` / `useCallback()`; log timings to find it. |
| Data fetching | Fetch in `calculateMetadata` or pass data as `inputProps` instead of fetching in every frame; avoid overfetching. |
| Frame image format | `jpeg` is faster than `png`; use `png` only for transparency. |
| Codec | `vp8`, `vp9` and `av1` encode slowly; `h264` is the fastest. |
| Resolution | `--scale=0.5` for drafts. Pre-resize large source images to the size needed. |
| Server code | Bundle once and reuse; share one browser across renders ([programmatic-rendering](programmatic-rendering.md)). |
| Long videos | If memory is a problem, render segments (`--frames` ranges) and concatenate them with ffmpeg. |

## Common failures

### "A delayRender() was called but not cleared after 28000ms"

A `delayRender()` handle was never cleared within the timeout (default about 30 s). Causes and fixes:

1. `continueRender()` is never called for some handle. Pass a label such as `delayRender("Fetching data")` so the error names the stalled call, and call `cancelRender(err)` in `catch` blocks.
2. A network asset (font, image, video, audio) is unreachable: no internet, firewall, or blocked outbound traffic.
3. Memory pressure from high concurrency prevents Chrome from loading all `<Html5Video>` elements. Lower `--concurrency`.
4. Slow `<OffthreadVideo>` downloads. Use `<Video>` from `@remotion/media`, or raise the timeout.
5. An old Remotion version; upgrade.

Raise the timeout only after finding the cause:

```bash
npx remotion render MyComp out.mp4 --timeout=60000
```

Other places: `delayRender("label", { timeoutInMilliseconds })` for one slow asset (v4.0.140+), `Config.setDelayRenderTimeoutInMilliseconds()` in `remotion.config.ts`, `timeoutInMilliseconds` in `renderMedia()`, `delayRenderTimeoutInMilliseconds` as a prop on `<Img>`, `<Audio>`, `<Video>`, `<Html5Audio>`, `<Html5Video>`, `<IFrame>` (v4.0.140+).

### Flicker, blank frames or output that differs from the Studio

- Every animation must be driven by `useCurrentFrame()`. CSS transitions and animations, Tailwind `transition-*` / `animate-*` classes, `useFrame()` from `@react-three/fiber`, and self-animating third-party chart or shader libraries flicker in renders.
- Use `<Img>` from `remotion` (not `<img>` or CSS `background-image`) so images are loaded before capture; remote assets need CORS enabled.
- `toneFrequency` (pitch shift) only applies to renders, not to the Studio or `<Player>`.
- A composition measuring DOM nodes must divide `getBoundingClientRect()` by `useCurrentScale()`.

### Output has no audio, or only audio

Check `--muted`, `--enforce-audio-track`, and that the codec supports audio (GIF does not). For audio-only output use `--codec=mp3`, `aac` or `wav`.

### Chrome fails to launch on Linux

Missing shared libraries. Install the list in [headless-linux](headless-linux.md) and run `npx remotion browser ensure`. Avoid Alpine.

### Out of memory on long or heavy renders

Lower `--concurrency`, reduce `--scale`, avoid `outputLocation: null` for long videos, avoid `--gl=angle` for very long renders (known leaks), and split the render into parts.

### Failing or slow WebGL render in CI without a GPU

Leave `--gl` at its default unless the composition uses WebGL or three.js; then use `swangle`.
