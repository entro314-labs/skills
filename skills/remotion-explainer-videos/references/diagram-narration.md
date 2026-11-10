# Narrated diagram videos (Excalidraw + local narration)

A camera moves over one diagram, a focus overlay dims everything except the part being discussed, captions show the narration, and each scene lasts exactly as long as its spoken audio. Everything runs locally: Excalidraw for the drawing, macOS `say` (or any local TTS or recorded audio) for the voice, Remotion for the render.

Pipeline:

1. Export the diagram to `public/diagram.svg`.
2. Write `storyboard.json`: one scene per spoken passage with its focus rectangle.
3. Generate narration: `scripts/make-narration.mjs` writes `public/narration/<id>.wav`.
4. `calculateMetadata` measures each file and gives every scene its length.
5. The composition moves the camera, draws the overlay, plays the audio.
6. Check in Studio, adjust rectangles and text, render if asked.

Requirements: Node.js and Remotion with `@remotion/media` (`npx remotion add @remotion/media`); `mediabunny` for the duration helper (it is a dependency of `@remotion/media`; install it directly if the import does not resolve); macOS for `say`. No separate ffmpeg install is needed: Remotion provides `npx remotion ffmpeg` and `npx remotion ffprobe` (for example `npx remotion ffmpeg -i in.wav out.mp3` to shrink narration files).

## 1. Export the diagram

In Excalidraw choose Export image, SVG (background on). Save to `public/diagram.svg`. Excalidraw's SVG export inlines its fonts by default (`exportToSvg` has a `skipInliningFonts` option to turn that off); look at the first frame in Studio to confirm the hand-drawn font appears.

The SVG root has `width`, `height` and `viewBox="0 0 W H"`. Note W and H; they go into `storyboard.json` and define the diagram's coordinate system. To export programmatically from inside a browser context use `exportToSvg({elements, appState, files})` from `@excalidraw/excalidraw` (returns `Promise<SVGSVGElement>`); it needs a DOM, so run it in a page or Studio, not plain Node.

### Mapping `.excalidraw` coordinates to SVG coordinates

Focus rectangles are written in SVG coordinates. From the `.excalidraw` JSON, an element at scene position `(x, y)` lands at

```
svgX = x - minX + padding
svgY = y - minY + padding
```

where `minX`, `minY` are the smallest `x`, `y` over all non-deleted elements and `padding` is the export padding (10 by default in Excalidraw's `exportToSvg`). The SVG size is `(maxX - minX + 2 * padding)` by `(maxY - minY + 2 * padding)`. This follows Excalidraw's export code; arrows, lines and rotated elements can have bounds that differ from their `x`, `y`, so confirm in Studio that each focus box sits on the intended shapes and adjust by eye.

Read the JSON for element `id`, `type`, `x`, `y`, `width`, `height` and, for labels, `text`; build each rectangle as the union of the elements a scene talks about plus a margin of 20-40 px.

## 2. Storyboard

```json
{
  "diagram": {"file": "diagram.svg", "width": 1600, "height": 900, "background": "#ffffff"},
  "scenes": [
    {
      "id": "overview",
      "narration": "This diagram shows how a request travels through the system.",
      "focus": {"x": 0, "y": 0, "width": 1600, "height": 900}
    },
    {
      "id": "client",
      "narration": "First, the client sends a request to the API.",
      "focus": {"x": 100, "y": 300, "width": 400, "height": 300},
      "label": "Client"
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `diagram.width/height` | SVG root size in pixels; `background` matches the diagram's background colour |
| `id` | Unique; also the narration file name |
| `narration` | Spoken text and, unless `subtitle` is set, the caption |
| `focus` | Rectangle in SVG coordinates the camera centres on |
| `label` | Optional pill above the focus rectangle |
| `subtitle` | Optional shorter caption than the spoken text |

Start with an overview scene covering the whole diagram, then go through the story in the order the narration explains it. One or two sentences per scene.

## 3. Narration

```bash
node scripts/make-narration.mjs src/storyboard.json public/narration --rate 175
```

The script calls `say` once per scene with the text on stdin and writes `public/narration/<id>.wav` (mono, 16-bit, 22.05 kHz, no ffmpeg). Options: `--voice <name>` (list with `say -v '?'`), `--rate <words per minute>`. Rerun after any text change.

Any other source works as long as it produces `public/narration/<id>.wav`: a different local TTS, or your own recording. On a platform without `say` the script exits with a message instead of failing silently.

## 4. Composition

Put the camera helper from `references/walkthrough.md` in `src/camera.ts`, then add:

```ts
import {Input, ALL_FORMATS, UrlSource} from 'mediabunny';

export const getAudioDuration = async (src: string): Promise<number> => {
  const input = new Input({formats: ALL_FORMATS, source: new UrlSource(src)});
  return input.computeDuration();
};
```

```tsx
import {Audio} from '@remotion/media';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type CalculateMetadataFunction,
} from 'remotion';
import {getAudioDuration} from './get-audio-duration';
import {cameraForRect, lerpCamera, moveProgress, projectRect, type Camera, type Rect} from './camera';
import storyboard from './storyboard.json';

type Scene = {id: string; narration: string; subtitle?: string; focus: Rect; label?: string};
type TimedScene = Scene & {from: number; durationInFrames: number};
type Props = {scenes: TimedScene[]};

const FPS = 30; // keep identical to the fps on <Composition>; calculateMetadata cannot read it
const LEAD = Math.round(0.2 * FPS); // silence before narration starts
const TAIL = Math.round(0.6 * FPS); // pause after narration ends
const MOVE = Math.round(1.2 * FPS); // camera travel time at the start of each scene
const FOCUS_FILL = 0.7; // share of the frame a focus rect fills; the margin holds the caption
const {diagram} = storyboard;
const WORLD: Rect = {x: 0, y: 0, width: diagram.width, height: diagram.height};

/** Scene length follows the measured narration, so audio and picture can never drift apart. */
export const calculateMetadata: CalculateMetadataFunction<Props> = async () => {
  const seconds = await Promise.all(
    (storyboard.scenes as Scene[]).map((s) => getAudioDuration(staticFile(`narration/${s.id}.wav`))),
  );
  let cursor = 0;
  const scenes = (storyboard.scenes as Scene[]).map((scene, i) => {
    const durationInFrames = LEAD + Math.ceil(seconds[i] * FPS) + TAIL;
    const timed = {...scene, from: cursor, durationInFrames};
    cursor += durationInFrames;
    return timed;
  });
  return {durationInFrames: cursor, props: {scenes}};
};

const Caption: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps, width, durationInFrames} = useVideoConfig();
  const edge = Math.round(0.3 * fps);
  const opacity = interpolate(frame, [0, edge, durationInFrames - edge, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center'}}>
      <div
        style={{
          marginBottom: width * 0.04,
          maxWidth: width * 0.8,
          padding: '16px 24px',
          borderRadius: 16,
          background: 'rgba(0,0,0,0.65)',
          color: '#fff',
          fontFamily: 'sans-serif',
          fontSize: width * 0.022,
          lineHeight: 1.3,
          textAlign: 'center',
          opacity,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** Dims everything except `rect` (screen pixels) and outlines it. */
const FocusOverlay: React.FC<{rect: Rect; label?: string; opacity: number}> = ({rect, label, opacity}) => {
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity}}>
      <svg width={width} height={height}>
        <defs>
          <mask id="focus-hole">
            <rect width={width} height={height} fill="white" />
            <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx={24} fill="black" />
          </mask>
        </defs>
        <rect width={width} height={height} fill="rgba(0,0,0,0.5)" mask="url(#focus-hole)" />
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          rx={24}
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth={3}
        />
      </svg>
      {label ? (
        <div
          style={{
            position: 'absolute',
            left: rect.x,
            top: Math.max(16, rect.y - 56),
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(15,23,42,0.9)',
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: width * 0.016,
          }}
        >
          {label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const DiagramVideo: React.FC<Props> = ({scenes}) => {
  const frame = useCurrentFrame();
  const screen = useVideoConfig();

  const index = scenes.reduce((found, s, i) => (frame >= s.from ? i : found), 0);
  const scene = scenes[index];
  const previous: Camera =
    index > 0
      ? cameraForRect(scenes[index - 1].focus, screen, FOCUS_FILL)
      : cameraForRect(WORLD, screen, 0.95); // open on the whole diagram
  const target = cameraForRect(scene.focus, screen, FOCUS_FILL);
  const progress = moveProgress(frame, scene.from, MOVE);
  const camera = lerpCamera(previous, target, progress);

  return (
    <AbsoluteFill style={{backgroundColor: diagram.background}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: diagram.width,
          height: diagram.height,
          transformOrigin: '0 0',
          transform: `translate(${camera.tx}px, ${camera.ty}px) scale(${camera.scale})`,
        }}
      >
        <Img src={staticFile(diagram.file)} style={{width: diagram.width, height: diagram.height}} />
      </div>
      <FocusOverlay rect={projectRect(scene.focus, camera)} label={scene.label} opacity={progress} />
      {scenes.map((s) => (
        <Sequence key={s.id} name={s.id} from={s.from} durationInFrames={s.durationInFrames}>
          <Audio src={staticFile(`narration/${s.id}.wav`)} from={LEAD} />
          <Caption text={s.subtitle ?? s.narration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
```

How it works:

- `calculateMetadata` measures every `narration/<id>.wav`; each scene lasts `LEAD + audio + TAIL` and starts where the previous one ends, so picture and speech cannot drift. `FPS` must equal the composition's `fps`.
- The camera for the current scene lerps from the previous scene's camera (or the whole-diagram overview for the first scene) to `cameraForRect(focus, screen, FOCUS_FILL)` during the first `MOVE` frames, then holds.
- `FocusOverlay` receives the focus rectangle projected through the current camera, so the dim mask and outline follow the move; it fades in as the camera arrives.
- Each scene is a `Sequence` containing its narration `Audio` (delayed by `LEAD`) and its `Caption`, so both are removed with the scene.
- The diagram is an `<Img>` of the SVG scaled by the camera transform; the SVG is vector, so it stays sharp at any zoom in the render.

Register it:

```tsx
import {Composition} from 'remotion';
import {DiagramVideo, calculateMetadata} from './DiagramVideo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="DiagramExplainer"
    component={DiagramVideo}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={30}
    defaultProps={{scenes: []}}
    calculateMetadata={calculateMetadata}
  />
);
```

`durationInFrames` is only an initial value; `calculateMetadata` overrides it and fills `scenes`. Importing `storyboard.json` needs `"resolveJsonModule": true`. The storyboard is the editable source here, so it is imported rather than inlined in `defaultProps`.

## 5. Review

- Studio: scrub each scene; the focus box should surround the shapes being discussed. If it is offset, recheck the coordinate mapping above.
- Stills for spot checks: `npx remotion still src/index.ts DiagramExplainer out/check.png --frame=140`.
- Caption text must not overlap the focus box: raise the margin (lower `FOCUS_FILL`) or shorten the caption.
- Too little breathing room between scenes: raise `TAIL`. Camera too abrupt: raise `MOVE`.
- Dense diagrams: split into more scenes with tighter focus rectangles instead of longer narration.
- Render only on request: `remotion-rendering`.
