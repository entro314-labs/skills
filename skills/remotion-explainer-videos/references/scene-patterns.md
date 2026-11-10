# Scene patterns for project explainers

Tested building blocks for chapter-based explainers. They use only `remotion`, `@remotion/transitions` and `@remotion/rough-notation`, take sizes from `useVideoConfig()`, and are driven entirely by the frame. Style them with the theme from `references/visual-style.md`; the literal colours below stand in for theme tokens.

Install what you use: `npx remotion add @remotion/transitions @remotion/rough-notation`.

## Project layout

```
src/
  index.ts            registerRoot
  Root.tsx            <Composition> registrations
  ProjectExplainer.tsx  TransitionSeries of scenes (below)
  scenes/             one file per chapter when scenes grow beyond ~80 lines
  patterns.tsx        the components below
  theme.tsx           tokens and fonts
public/               logo, screenshots, narration audio
```

## Assembling chapters

One `TransitionSeries.Sequence` per chapter, a fade between each. The exported helper keeps the composition duration and the series in agreement, because every transition removes its overlap from the total.

```tsx
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {ChapterTitle, Flow, StaggerList} from './patterns';
import {theme} from './theme';

/** Scene lengths in seconds; the same numbers feed the composition duration. */
export const SCENE_SECONDS = {intro: 6, features: 12, architecture: 14} as const;
export const TRANSITION_SECONDS = 0.5;

/** Sum of scenes minus the overlap of the two transitions between them. */
export const explainerFrames = (fps: number): number => {
  const scenes = Object.values(SCENE_SECONDS).reduce((a, b) => a + b, 0);
  return Math.round((scenes - 2 * TRANSITION_SECONDS) * fps);
};

const Scene: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{backgroundColor: theme.color.bg, color: theme.color.text, fontFamily: theme.font.body}}>
    {children}
  </AbsoluteFill>
);

export const ProjectExplainer: React.FC = () => {
  const {fps, width} = useVideoConfig();
  const timing = linearTiming({durationInFrames: Math.round(TRANSITION_SECONDS * fps)});
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Intro" durationInFrames={SCENE_SECONDS.intro * fps}>
        <Scene>
          <ChapterTitle index={1} title="Acme Tasks" subtitle="One board for the whole team" />
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence name="Features" durationInFrames={SCENE_SECONDS.features * fps}>
        <Scene>
          <div style={{padding: width * 0.08, fontSize: width * 0.035}}>
            <StaggerList items={['Boards and columns', 'Live updates', 'Keyboard shortcuts']} />
          </div>
        </Scene>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence name="Architecture" durationInFrames={SCENE_SECONDS.architecture * fps}>
        <Scene>
          <Flow
            nodes={[
              {id: 'web', label: 'Web app', x: 0.2, y: 0.5},
              {id: 'api', label: 'API', x: 0.5, y: 0.5},
              {id: 'db', label: 'Database', x: 0.8, y: 0.5},
            ]}
            edges={[
              {from: 'web', to: 'api'},
              {from: 'api', to: 'db'},
            ]}
          />
        </Scene>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

Register it with the duration from the helper:

```tsx
<Composition
  id="ProjectExplainer"
  component={ProjectExplainer}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={explainerFrames(30)}
/>
```

When chapters are narrated, replace the constant `SCENE_SECONDS` with measured audio lengths computed in `calculateMetadata` (`references/diagram-narration.md`).

## Components

- `ChapterTitle`: numbered label, headline, optional subtitle, each fading in after the previous.
- `Typewriter`: types a string with a blinking cursor; use for prompts, commands and quotes. 15 characters per second reads comfortably.
- `StaggerList`: items enter one after another; allow `gapSeconds` of at least 0.8 so each can be read.
- `CodeWalkthrough`: shows an excerpt and moves a highlighted band through line ranges, one step per `stepSeconds`. Show real code from the project, at most about 15 lines at a time. For syntax colours, tokenise outside the render path (a script that emits coloured spans) and keep the component frame-driven.
- `Flow`: boxes and edges for an architecture view, positioned as fractions of the frame. For anything larger than five or six nodes, draw an Excalidraw diagram and use `references/diagram-narration.md`.
- `Emphasis`: hand-drawn highlight, circle, underline, strike-through or box around words with `@remotion/rough-notation`; keep `progress` an inline `interpolate()` of the frame.

```tsx
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Circle, Highlight} from '@remotion/rough-notation';

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Chapter card: small numbered label, big title, optional one-line subtitle. */
export const ChapterTitle: React.FC<{index: number; title: string; subtitle?: string}> = ({index, title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: width * 0.08, fontFamily: 'sans-serif', color: '#fff'}}>
      <div
        style={{
          fontSize: width * 0.022,
          letterSpacing: 4,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 0.6], clamp),
        }}
      >
        CHAPTER {String(index).padStart(2, '0')}
      </div>
      <h1
        style={{
          fontSize: width * 0.06,
          margin: '12px 0 0',
          opacity: interpolate(frame, [0.1 * fps, 0.7 * fps], [0, 1], {...clamp, easing: ease}),
          translate: interpolate(frame, [0.1 * fps, 0.7 * fps], ['0px 40px', '0px 0px'], {...clamp, easing: ease}),
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p style={{fontSize: width * 0.03, margin: '16px 0 0', opacity: interpolate(frame, [0.6 * fps, 1.1 * fps], [0, 0.8], clamp)}}>
          {subtitle}
        </p>
      ) : null}
    </AbsoluteFill>
  );
};

/** Types `text` by slicing the string; never animate per-character opacity. */
export const Typewriter: React.FC<{text: string; charsPerSecond?: number; delayFrames?: number}> = ({
  text,
  charsPerSecond = 15,
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const typed = Math.min(text.length, Math.max(0, Math.floor(((frame - delayFrames) / fps) * charsPerSecond)));
  const typing = typed < text.length;
  const blinkOn = Math.floor(frame / (0.5 * fps)) % 2 === 0;
  return (
    <span style={{whiteSpace: 'pre-wrap'}}>
      {text.slice(0, typed)}
      <span style={{opacity: typing || blinkOn ? 1 : 0}}>{'\u258C'}</span>
    </span>
  );
};

/** Items enter one after another, `gapSeconds` apart. */
export const StaggerList: React.FC<{items: string[]; gapSeconds?: number; startSeconds?: number}> = ({
  items,
  gapSeconds = 0.8,
  startSeconds = 0.5,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
      {items.map((item, i) => {
        const start = (startSeconds + i * gapSeconds) * fps;
        return (
          <div
            key={item}
            style={{
              opacity: interpolate(frame, [start, start + 0.5 * fps], [0, 1], clamp),
              translate: interpolate(frame, [start, start + 0.5 * fps], ['0px 24px', '0px 0px'], {...clamp, easing: ease}),
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Shows `code` and moves a highlight band through `steps` (1-based inclusive line ranges).
 * Each step lasts `stepSeconds`; lines outside the active range are dimmed.
 */
export const CodeWalkthrough: React.FC<{
  code: string;
  steps: {from: number; to: number}[];
  stepSeconds?: number;
}> = ({code, steps, stepSeconds = 3}) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();
  const active = steps[Math.min(steps.length - 1, Math.floor(frame / (stepSeconds * fps)))];
  const fontSize = width * 0.017;
  return (
    <pre style={{margin: 0, fontFamily: 'monospace', fontSize, lineHeight: 1.6, color: '#e2e8f0'}}>
      {code.split('\n').map((line, i) => {
        const on = i + 1 >= active.from && i + 1 <= active.to;
        return (
          <div
            key={i}
            style={{
              padding: '0 16px',
              opacity: on ? 1 : 0.35,
              background: on ? 'rgba(96,165,250,0.22)' : 'transparent',
              borderLeft: `4px solid ${on ? '#60a5fa' : 'transparent'}`,
            }}
          >
            {line || ' '}
          </div>
        );
      })}
    </pre>
  );
};

type FlowNode = {id: string; label: string; x: number; y: number};
type FlowEdge = {from: string; to: string};

/** Boxes appear in order; each edge draws itself once its target box is up. Coordinates are 0-1 fractions. */
export const Flow: React.FC<{nodes: FlowNode[]; edges: FlowEdge[]; gapSeconds?: number}> = ({nodes, edges, gapSeconds = 0.8}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const boxW = width * 0.16;
  const boxH = height * 0.12;
  const at = (id: string) => nodes.findIndex((n) => n.id === id);
  const progress = (i: number, offsetSeconds: number) =>
    interpolate(frame, [(i * gapSeconds + offsetSeconds) * fps, (i * gapSeconds + offsetSeconds + 0.5) * fps], [0, 1], {...clamp, easing: ease});
  return (
    <AbsoluteFill>
      <svg width={width} height={height} style={{position: 'absolute'}}>
        {edges.map((e) => {
          const a = nodes[at(e.from)];
          const b = nodes[at(e.to)];
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={a.x * width + boxW / 2}
              y1={a.y * height}
              x2={b.x * width - boxW / 2}
              y2={b.y * height}
              stroke="#94a3b8"
              strokeWidth={4}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - progress(at(e.to), -0.4)}
            />
          );
        })}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={n.id}
          style={{
            position: 'absolute',
            left: n.x * width - boxW / 2,
            top: n.y * height - boxH / 2,
            width: boxW,
            height: boxH,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            background: '#1e293b',
            border: '2px solid #475569',
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: width * 0.015,
            opacity: progress(i, 0),
            scale: interpolate(progress(i, 0), [0, 1], [0.9, 1]),
          }}
        >
          {n.label}
        </div>
      ))}
    </AbsoluteFill>
  );
};

/** Hand-drawn emphasis on words inside a sentence, driven by the frame. */
export const Emphasis: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = (from: number, to: number) => interpolate(frame, [from, to], [0, 1], clamp);
  return (
    <div style={{fontSize: 80, color: '#fff', fontFamily: 'sans-serif'}}>
      Every request is{' '}
      <Highlight color="rgba(255, 236, 79, 0.45)" progress={draw(15, 40)}>
        validated
      </Highlight>{' '}
      before it reaches the{' '}
      <Circle color="#60a5fa" progress={draw(45, 70)}>
        database
      </Circle>
      .
    </div>
  );
};
```

## Usage notes

- Build the scene first with final text and no animation, check it at a standstill in Studio, then add motion.
- Start a typewriter or list 0.3-0.5 s after the scene begins so it does not collide with the transition.
- Keep annotations to 5-10 words and place them beside what they explain.
- One architecture view should appear in the order the narration explains it: box, then arrow, then next box.
