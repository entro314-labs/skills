# Screenshot and recording walkthroughs

Turn screens you already have (or can capture locally) into a polished video: transitions, slow drift, zoom into regions, callouts, titles, optional narration and music. Nothing here needs a hosted service; any set of PNG or JPG screens works, whether exported from a design tool, taken from a running app, or captured by a headless browser.

## 1. Gather screens

- Existing files: take the folder the user names, sort in story order (numeric filename prefix `01-`, `02-`).
- Running app: capture each key state with a headless-browser screenshot tool such as Playwright, at exactly the composition aspect ratio (1280x720 or 1920x1080). Use the same viewport size for every shot so zoom coordinates and scaling stay valid.
- Put everything in `public/screens/`. Check that all images share one size; resize outliers before building.
- Screen recordings: put them in `public/recordings/` (see "Recordings" below).

## 2. Manifest

One `screens.json` drives the video. All coordinates are in screenshot pixels.

```json
{
  "fps": 30,
  "width": 1280,
  "height": 720,
  "screens": [
    {
      "id": "home",
      "title": "Welcome",
      "description": "The landing page states the core value",
      "image": "screens/01-home.png",
      "durationSeconds": 4,
      "transition": "fade"
    },
    {
      "id": "dashboard",
      "title": "Your dashboard",
      "description": "See all projects at a glance",
      "image": "screens/02-dashboard.png",
      "durationSeconds": 6,
      "transition": "slide-left",
      "zoom": {"x": 100, "y": 200, "width": 400, "height": 300, "atSeconds": 1.5},
      "callouts": [{"x": 300, "y": 350, "label": "Projects", "atSeconds": 2.5}]
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `image` | Path relative to `public/`, used with `staticFile()` |
| `durationSeconds` | How long the screen is shown, including its transition overlap |
| `transition` | How this screen enters: `fade`, `slide-left` (new screen comes from the right), `slide-right`, `slide-up`, `wipe`, `none` (hard cut). Ignored on the first screen |
| `zoom` | Optional region to move the camera to, starting at `atSeconds` |
| `callouts` | Optional pulsing markers with a label at a point |
| `narration` | Optional spoken text (see "Narration") |

Timing: 3-5 s per screen, longer for dense screens, under 90 s in total. Fade is the safe default; use one or two other transitions for emphasis.

## 3. Camera helper

One small module does all pan and zoom maths; the diagram route reuses it. `cameraForRect` returns the scale and translation that centre a rectangle on the screen; `lerpCamera` blends two cameras with a single progress value so the motion is a straight, eased move. Apply the result as `translate(...) scale(...)` with `transform-origin: 0 0`.

```ts
import {interpolate, Easing} from 'remotion';

export type Rect = {x: number; y: number; width: number; height: number};
export type Camera = {scale: number; tx: number; ty: number};
export type Size = {width: number; height: number};

/** Camera that centres `rect` on the screen, filling `fill` (0-1) of the limiting axis. */
export const cameraForRect = (rect: Rect, screen: Size, fill = 0.85): Camera => {
  const scale = Math.min(screen.width / rect.width, screen.height / rect.height) * fill;
  return {
    scale,
    tx: screen.width / 2 - (rect.x + rect.width / 2) * scale,
    ty: screen.height / 2 - (rect.y + rect.height / 2) * scale,
  };
};

/** Linear blend of two cameras; the same `p` drives scale and translation so the path stays straight. */
export const lerpCamera = (a: Camera, b: Camera, p: number): Camera => ({
  scale: a.scale + (b.scale - a.scale) * p,
  tx: a.tx + (b.tx - a.tx) * p,
  ty: a.ty + (b.ty - a.ty) * p,
});

/** Where a world-space rect lands on screen under `camera`. */
export const projectRect = (rect: Rect, camera: Camera): Rect => ({
  x: rect.x * camera.scale + camera.tx,
  y: rect.y * camera.scale + camera.ty,
  width: rect.width * camera.scale,
  height: rect.height * camera.scale,
});

/** 0 -> 1 progress of a camera move that starts at `startFrame` and lasts `durationInFrames`. */
export const moveProgress = (frame: number, startFrame: number, durationInFrames: number): number =>
  interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
```

## 4. Walkthrough component

`Walkthrough` renders each screen inside `TransitionSeries`. Each `ScreenSlide`:

- computes its camera in screenshot pixels and scales to the composition with `k`, so the same manifest works at 1280x720 or 1920x1080 as long as the aspect ratio matches;
- drifts slowly (about 4 percent over the screen) when no zoom is set, so stills never look frozen;
- eases into `zoom` over about 0.9 s;
- pops in callouts with a slightly overshooting ease;
- fades a title and description in over a bottom scrim.

`walkthroughDuration()` subtracts the transition overlaps; use it for `durationInFrames`. Hard cuts (`none`) have no overlap. Transitions are children of `TransitionSeries` next to the sequences; the example builds them in a flat array, which `TransitionSeries` accepts like any other list of children.

```tsx
import type {ReactElement} from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {TransitionSeries, linearTiming, type TransitionPresentation} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {cameraForRect, lerpCamera, moveProgress, type Camera, type Rect} from './camera';
import manifest from './screens.json';

export type TransitionName = 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'wipe' | 'none';

export type Screen = {
  id: string;
  title: string;
  description: string;
  /** Spoken text; only needed when the screen is narrated (see diagram-narration.md). */
  narration?: string;
  image: string;
  durationSeconds: number;
  transition: TransitionName;
  zoom?: Rect & {atSeconds: number};
  callouts?: {x: number; y: number; label: string; atSeconds: number}[];
};

export type Manifest = {
  fps: number;
  /** Size in pixels of every screenshot; all coordinates in the manifest use this space. */
  width: number;
  height: number;
  screens: Screen[];
};

export const TRANSITION_SECONDS = 0.5;

const presentationFor = (name: Exclude<TransitionName, 'none'>): TransitionPresentation<Record<string, unknown>> => {
  switch (name) {
    case 'fade':
      return fade();
    case 'slide-left':
      return slide({direction: 'from-right'});
    case 'slide-right':
      return slide({direction: 'from-left'});
    case 'slide-up':
      return slide({direction: 'from-bottom'});
    case 'wipe':
      return wipe({direction: 'from-left'});
  }
};

/** Total frames: scene durations minus the overlap of every transition (hard cuts overlap nothing). */
export const walkthroughDuration = ({fps, screens}: Manifest): number => {
  const scenes = screens.reduce((sum, s) => sum + Math.round(s.durationSeconds * fps), 0);
  const overlaps = screens.slice(1).filter((s) => s.transition !== 'none').length;
  return scenes - overlaps * Math.round(TRANSITION_SECONDS * fps);
};

const ScreenSlide: React.FC<{screen: Screen; imageSize: {width: number; height: number}}> = ({screen, imageSize}) => {
  const frame = useCurrentFrame();
  const {fps, width, height, durationInFrames} = useVideoConfig();
  // Cameras are computed in screenshot pixels; `k` maps screenshot pixels to composition pixels.
  const k = width / imageSize.width;
  const imageRect = {x: 0, y: 0, ...imageSize};

  // Slow drift on every screen so a still image never looks frozen; an explicit zoom replaces it.
  const drift: Camera = lerpCamera(
    cameraForRect(imageRect, imageSize, 1),
    cameraForRect(imageRect, imageSize, 1.04),
    interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateRight: 'clamp'}),
  );
  const camera = screen.zoom
    ? lerpCamera(
        cameraForRect(imageRect, imageSize, 1),
        cameraForRect(screen.zoom, imageSize, 0.8),
        moveProgress(frame, screen.zoom.atSeconds * fps, 0.9 * fps),
      )
    : drift;

  const textIn = interpolate(frame, [0.4 * fps, 0.9 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: imageSize.width,
          height: imageSize.height,
          transformOrigin: '0 0',
          transform: `scale(${k}) translate(${camera.tx}px, ${camera.ty}px) scale(${camera.scale})`,
        }}
      >
        <Img src={staticFile(screen.image)} style={{width: imageSize.width, height: imageSize.height}} />
        {screen.callouts?.map((c) => {
          const s = interpolate(frame, [c.atSeconds * fps, c.atSeconds * fps + 0.5 * fps], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          });
          return (
            <div key={c.label} style={{position: 'absolute', left: c.x, top: c.y, opacity: Math.min(1, s)}}>
              <div
                style={{
                  position: 'absolute',
                  left: -28,
                  top: -28,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '5px solid #3b82f6',
                  scale: s,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 40,
                  top: -20,
                  whiteSpace: 'nowrap',
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: '#3b82f6',
                  color: '#fff',
                  fontSize: 28,
                  fontFamily: 'sans-serif',
                }}
              >
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          padding: `${height * 0.06}px ${width * 0.05}px`,
          background: 'linear-gradient(transparent 55%, rgba(0,0,0,0.75))',
          opacity: textIn,
          translate: `0px ${(1 - textIn) * 24}px`,
        }}
      >
        <h2 style={{color: '#fff', fontSize: height * 0.06, margin: 0, fontFamily: 'sans-serif'}}>{screen.title}</h2>
        <p style={{color: 'rgba(255,255,255,0.85)', fontSize: height * 0.035, margin: '8px 0 0', fontFamily: 'sans-serif'}}>
          {screen.description}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Walkthrough: React.FC = () => {
  const {fps} = useVideoConfig();
  const m = manifest as Manifest;
  const children: ReactElement[] = [];
  m.screens.forEach((screen, i) => {
    if (i > 0 && screen.transition !== 'none') {
      children.push(
        <TransitionSeries.Transition
          key={`${screen.id}-in`}
          presentation={presentationFor(screen.transition)}
          timing={linearTiming({durationInFrames: Math.round(TRANSITION_SECONDS * fps)})}
        />,
      );
    }
    children.push(
      <TransitionSeries.Sequence
        key={screen.id}
        name={screen.title}
        durationInFrames={Math.round(screen.durationSeconds * fps)}
      >
        <ScreenSlide screen={screen} imageSize={{width: m.width, height: m.height}} />
      </TransitionSeries.Sequence>,
    );
  });
  return <TransitionSeries>{children}</TransitionSeries>;
};
```

Root:

```tsx
import {Composition} from 'remotion';
import manifest from './screens.json';
import {Walkthrough, walkthroughDuration, type Manifest} from './walkthrough';

const screens = manifest as Manifest;

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Walkthrough"
    component={Walkthrough}
    width={screens.width}
    height={screens.height}
    fps={screens.fps}
    durationInFrames={walkthroughDuration(screens)}
  />
);
```

Importing JSON needs `"resolveJsonModule": true` in `tsconfig.json`. The title overlay uses a plain `sans-serif` stack; swap in `theme.font.body` from `references/visual-style.md`.

## 5. Extras

**Progress bar.** Render it outside the `TransitionSeries`, in an `AbsoluteFill` of the composition, so it sees the global frame: `width: ${(frame / (durationInFrames - 1)) * 100}%`.

**Intro and outro cards.** Add a title card as the first `TransitionSeries.Sequence` (2-3 s) and a closing card as the last (3-4 s); they use the same transition helpers.

**Background music.** `<Audio src={staticFile('music/bed.mp3')} volume={0.15} loop />` from `@remotion/media`, placed beside the series. Keep it quiet under narration.

**Slideshow, feature highlight, user flow.** Three common shapes of the same manifest: a slideshow is fade-only, 3-5 s per screen with a bottom title and a progress bar; a feature highlight adds `zoom` and `callouts` and may show before/after pairs; a user flow uses directional slides, numbered step titles and callouts on the control the user presses.

## Recordings

A screen recording is a timeline item, not an image. Put the video and everything synchronised with it (callouts, captions) under one `TransitionSeries.Sequence`, so trimming or moving that boundary moves all of them.

```tsx
import {Video} from '@remotion/media';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {staticFile, useVideoConfig} from 'remotion';

export const Recordings: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Sign-up flow" trimBefore={4 * fps} durationInFrames={12 * fps}>
        <Video src={staticFile('recordings/signup.mp4')} objectFit="contain" />
        {/* callouts and captions for this clip go here, timed from the clip start */}
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 15})} />
      <TransitionSeries.Sequence name="Dashboard" trimBefore={2 * fps} durationInFrames={8 * fps}>
        <Video src={staticFile('recordings/dashboard.mp4')} playbackRate={2} objectFit="contain" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

Drop dead time with `trimBefore` and `durationInFrames`; speed up waiting with `playbackRate` (the clip then occupies `durationInFrames / playbackRate` frames in its parent). To size the composition from a recording, read its duration and dimensions in `calculateMetadata` (see `remotion-core`, Mediabunny helpers `getVideoDuration` and `getVideoDimensions`). Reuse the camera helper for zooms by wrapping the `Video` in a div with the camera transform. `TransitionSeries` only accepts `Sequence`, `Transition` and `Overlay` elements as children (fragments are flattened); do not hide them inside helper components, put the helper inside the `Sequence` instead.

## Narration

Add a `narration` string to each screen and generate audio locally with `scripts/make-narration.mjs` (it accepts a `screens` array). Then follow the pattern in `references/diagram-narration.md`:

1. In `calculateMetadata`, measure each `narration/<id>.wav` with `getAudioDuration()` and set the screen duration to `max(durationSeconds, lead + audio + tail)`.
2. Return the total from `walkthroughDuration()` on the measured manifest, passed in as props instead of the static import.
3. Inside each `TransitionSeries.Sequence` add `<Audio src={staticFile(`narration/${screen.id}.wav`)} from={lead} />`. The lead-in must be at least the transition length (0.5 s here), or the narration starts while the previous screen is still on screen.

## Troubleshooting

| Problem | Fix |
|---|---|
| Blurry screenshots | Capture at the composition size or larger; never upscale thumbnails |
| Zoom lands on the wrong spot | Coordinates are screenshot pixels, not composition pixels; check the image size in the manifest |
| Text misaligned | Screenshot aspect ratio differs from the composition; recapture or change the composition size |
| Transitions feel jarring | Lengthen to 0.5-1 s or switch slide to fade |
| Total length wrong | Use `walkthroughDuration()`; transitions shorten the timeline |
| Asset not found | Path must be relative to `public/` and go through `staticFile()` |
| Choppy motion | Check it in the exported video, not in a slow Studio preview |
