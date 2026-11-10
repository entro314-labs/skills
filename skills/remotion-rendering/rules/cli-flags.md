# CLI flags

Syntax:

```bash
npx remotion render <entry-point|serve-url>? <composition-id> <output-location>
npx remotion still  <entry-point|serve-url>? <composition-id> <output-location>
```

- The first argument is optional: a Serve URL or an entry point. Otherwise the entry point is detected automatically.
- If `composition-id` is omitted, Remotion asks which composition to render.
- If the output location is omitted, media goes into `out/`. `--output` (v4.0.0+) sets the path as a flag instead.

Source: https://www.remotion.dev/docs/cli/render.md, https://www.remotion.dev/docs/cli/still.md

## `render` flags used most often

| Flag | Meaning |
|------|---------|
| `--codec` | `h264`, `h265`, `av1`, `png`, `vp8`, `vp9`, `mp3`, `aac`, `wav`, `prores`, `h264-mkv`, `gif`. `av1` is unavailable on Linux ARM64 GNU. |
| `--crf` | Quality, lower is better. Cannot be combined with `--video-bitrate` or hardware acceleration. See [codecs-and-quality](codecs-and-quality.md). |
| `--video-bitrate`, `--audio-bitrate` | Target bitrates. Cannot be combined with other quality options. |
| `--image-format` | Format of the frames captured by Chrome: `jpeg` (default, faster) or `png` (needed for transparency). |
| `--jpeg-quality` | 0-100. Has no effect when frames are PNG. |
| `--pixel-format` | Pixel format of the encoded video, for example `yuv420p`, `yuva420p`, `yuva444p10le`. |
| `--prores-profile` | ProRes profile, only with `--codec=prores`, for example `4444`. |
| `--props` | Input props: a JSON string or a path to a JSON file. |
| `--frames` | A frame, a comma list, or inclusive ranges. `0,30,60` renders an image sequence; `0-99` renders a video of that range; `0,30-59,90-` combines them. |
| `--sequence` | Output images instead of a video. Implied by `--frames` with single frame numbers. |
| `--scale` | Output scale factor, greater than 0 and at most 16, default `1`. |
| `--concurrency` | Number of parallel browser tabs. Default is half the CPU threads. Find the best value with `npx remotion benchmark`. |
| `--gl` | Chrome GL backend: `angle`, `egl`, `swiftshader`, `vulkan`, `angle-egl`, `swangle`. See [headless-linux](headless-linux.md). |
| `--chrome-mode` | `headless-shell` (default) or `chrome-for-testing`. |
| `--muted` | Render without audio. |
| `--enforce-audio-track` | Always write an audio track. |
| `--every-nth-frame` | GIF only: render every n-th frame. |
| `--number-of-gif-loops` | GIF only: loop count. See [gif](gif.md). |
| `--timeout` | Milliseconds a single frame's `delayRender()` calls may take, default `30000`. |
| `--log` | `error`, `warn`, `info` (default), `verbose`. |
| `--overwrite` | On by default; `--overwrite=false` to refuse overwriting. |
| `--offthreadvideo-cache-size-in-bytes` | Cache size for `<OffthreadVideo>` frame extraction (v4.0.23+). |

## `still` flags

| Flag | Meaning |
|------|---------|
| `--frame` | Zero-based frame number. |
| `--image-format` | Image format of the still. |
| `--scale` | Scale factor, for example `1.5` turns 1280x720 into 1920x1080. |
| `--props` | Input props, JSON string or file. |
| `--jpeg-quality` | 0-100, only meaningful for JPEG. |

To render several frames, use `render --frames` instead of calling `still` repeatedly.

## Setting defaults in `remotion.config.ts`

The Studio and CLI read defaults from `remotion.config.ts`. Restart the Studio after changing it.

```ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setPixelFormat("yuva444p10le");
Config.setCodec("prores");
Config.setProResProfile("4444");
Config.setDelayRenderTimeoutInMilliseconds(60000);
Config.setChromeMode("chrome-for-testing"); // CLI and Studio only
```

To make a single composition default to certain export settings, return them from `calculateMetadata`: `defaultCodec`, `defaultOutName`, `defaultVideoImageFormat`, `defaultPixelFormat`, `defaultProResProfile`. See [transparent-videos](transparent-videos.md) for a full example.

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => ({
  defaultOutName: `video-${props.id}.mp4`,
});
```
