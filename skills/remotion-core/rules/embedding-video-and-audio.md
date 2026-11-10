# Embedding video (and the shared Video/Audio props)

Use `<Video>` and `<Audio>` from `@remotion/media`, not the same-named components from `remotion`. Install if missing: `npx remotion add @remotion/media`.

```tsx
import {Video} from '@remotion/media';
import {staticFile} from 'remotion';

export const MyComposition = () => <Video src={staticFile('video.mp4')} />;

// remote URLs also work
<Video src="https://remotion.media/video.mp4" />;
```

Props are in frames; compute them from `fps = useVideoConfig().fps` and keep the expression on the JSX node.

## Trim, delay, speed, loop

```tsx
const {fps} = useVideoConfig();

// Skip the first 2 seconds, play 8 seconds (until the 10 second mark)
<Video src={staticFile('video.mp4')} trimBefore={2 * fps} durationInFrames={8 * fps} />

// Appear after 1 second
<Video src={staticFile('video.mp4')} from={fps} />

// 2x speed / half speed (reverse playback is not supported)
<Video src={staticFile('video.mp4')} playbackRate={2} />
<Video src={staticFile('video.mp4')} playbackRate={0.5} />

// Loop
<Video src={staticFile('video.mp4')} loop />
```

Trimming with the props is non-destructive and needs no re-encoding; do it instead of cutting the file ([mediabunny-and-ffmpeg.md](mediabunny-and-ffmpeg.md) for when a trimmed file is really needed). How `from`, `trimBefore`, `durationInFrames`, `playbackRate` and `loop` combine: [timing-props-and-sequencing.md](timing-props-and-sequencing.md). Several clips on a timeline: [video-editing-and-connected-compositions.md](video-editing-and-connected-compositions.md).

## Size and position

```tsx
<Video
  src={staticFile('video.mp4')}
  style={{width: 500, height: 300, position: 'absolute', top: 100, left: 50}}
  objectFit="cover"
/>
```

## Volume and muting

Static volume is 0 to 1. For a changing volume pass an inline `interpolate()` of the current frame; Studio shows the keyframes as an editable volume curve in the timeline. (Older snippets use a `volume={(f) => ...}` callback and `loopVolumeCurveBehavior`; use the inline form.)

```tsx
import {Video} from '@remotion/media';
import {interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();

<Video src={staticFile('video.mp4')} volume={0.5} />
<Video src={staticFile('video.mp4')} muted />
<Video
  src={staticFile('video.mp4')}
  volume={interpolate(frame, [0, 1 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })}
/>
```

`muted` also accepts a changing value, for example `muted={frame >= 2 * fps && frame <= 4 * fps}`.

## Pitch

`toneFrequency` (0.01 to 2) changes pitch without changing speed: `<Video src={...} toneFrequency={1.5} />`. It only works during server-side rendering, not in Studio preview or the `<Player>`.

## Audio

`<Audio>` takes the same `trimBefore`, `durationInFrames`, `from`, `volume`, `muted`, `playbackRate`, `loop`, `toneFrequency` props, with the same meaning (trimming still plays at the composition position; only the selected part is heard). Put `name`, `from`, `loop` and `volume` directly on `<Audio>`.

Applying visual effects (vignette, color correction, blur) to a `<Video>`: [effects.md](effects.md). Cropping it: [cropping.md](cropping.md).
