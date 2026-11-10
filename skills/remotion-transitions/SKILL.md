---
name: remotion-transitions
description: Build scene-to-scene transitions and cut-point overlays in Remotion with @remotion/transitions (TransitionSeries, fade/slide/wipe/flip/clockWipe, linearTiming/springTiming, light leaks) and write custom or cinematic TransitionPresentation components (striped slam, zoom punch, diagonal reveal, iris, glitch). Use when the user asks for transitions between scenes, custom or high-energy transitions, light leaks, branded transitions, or needs to compute the total duration of a composition that uses transitions.
---

# Remotion transitions

`<TransitionSeries>` arranges scenes and enhances the cut point between them in two ways:

- **Transition** (`<TransitionSeries.Transition>`): both scenes play at once while a presentation (fade, slide, ...) blends them. It **shortens** the timeline.
- **Overlay** (`<TransitionSeries.Overlay>`): an effect (e.g. a light leak) drawn on top of the cut point. It does **not** shorten the timeline.

Children are absolutely positioned. For a multi-scene timeline keep the outer `<TransitionSeries>` visible in Studio's timeline. Give each `TransitionSeries.Sequence` a literal `name`.

Install:

```bash
npx remotion add @remotion/transitions
```

## Basic usage

```tsx
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

export const TransitionVideo = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Opening" durationInFrames={60}>
      <Scene title="Introduction" background="#111111" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({durationInFrames: 15})}
    />
    <TransitionSeries.Sequence name="Feature" durationInFrames={60}>
      <Scene title="New features" background="#243b53" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
```

`<TransitionSeries.Transition>` requires `presentation` (the visual effect) and `timing` (speed and easing).

### Built-in presentations

```tsx
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {flip} from '@remotion/transitions/flip';
import {clockWipe} from '@remotion/transitions/clock-wipe';

// slide takes a direction: "from-left" | "from-right" | "from-top" | "from-bottom"
<TransitionSeries.Transition
  presentation={slide({direction: 'from-left'})}
  timing={linearTiming({durationInFrames: 20})}
/>;
```

### Timing

```tsx
import {linearTiming, springTiming} from '@remotion/transitions';

linearTiming({durationInFrames: 20}); // constant speed, frame-exact
springTiming({config: {damping: 200}, durationInFrames: 25}); // organic motion
springTiming({config: {damping: 200}}); // duration derived from when the spring settles (depends on fps)
```

## Duration math

Transitions overlap their neighbouring scenes, so the composition is shorter than the sum of the sequences. Overlays never change the total.

```tsx
const t1 = linearTiming({durationInFrames: 15}).getDurationInFrames({fps: 30});
const t2 = linearTiming({durationInFrames: 20}).getDurationInFrames({fps: 30});
const durationInFrames = 60 + 60 + 60 - t1 - t2; // 145
```

For `springTiming` without `durationInFrames`, `getDurationInFrames({fps})` is what gives the real length. Use it when setting the composition's `durationInFrames` (or in `calculateMetadata()`).

## Overlays and light leaks

An overlay sits between two sequences and is centered on the cut. `durationInFrames` is required; `offset` (default `0`) shifts it later (positive) or earlier (negative). Separate overlays and transitions with a scene: do not place them back to back.

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence name="Opening" durationInFrames={60}>
    <Scene title="Introduction" background="#111111" />
  </TransitionSeries.Sequence>
  <TransitionSeries.Overlay durationInFrames={30}>
    <LightLeakOverlay />
  </TransitionSeries.Overlay>
  <TransitionSeries.Sequence name="Feature" durationInFrames={60}>
    <Scene title="New features" background="#243b53" />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({durationInFrames: 15})}
  />
  <TransitionSeries.Sequence name="Closing" durationInFrames={60}>
    <Scene title="Thank you" background="#382345" />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

`lightLeak()` (Remotion 4.0.500+, package `@remotion/effects`, WebGL2) is the ready-made overlay effect. See [references/light-leaks.md](references/light-leaks.md) for the component, options (`progress`, `seed`, `hueShift`, `disabled`) and the render flag it needs.

## Custom presentations

A presentation is `{component, props}`. The same component wraps **both** scenes during the transition and receives:

- `presentationProgress`: `0` at the start of the transition, `1` at the end (already shaped by the timing).
- `presentationDirection`: `'entering'` (new scene) or `'exiting'` (old scene).
- `passedProps`: the `props` you returned.
- `children`: the scene being wrapped.

```tsx
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from '@remotion/transitions';

const SlideIn: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  if (presentationDirection === 'exiting') {
    return <>{children}</>;
  }

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, translate: `${(1 - presentationProgress) * 100}% 0`}}>
        {children}
      </div>
    </div>
  );
};

<TransitionSeries.Transition
  presentation={{component: SlideIn, props: {}}}
  timing={linearTiming({durationInFrames: 15})}
/>;
```

Rules:

1. Drive all motion from `presentationProgress` via `interpolate()` / `spring()`. No CSS transitions or animations, and no wall-clock timers.
2. Use `presentationProgress`, not `useCurrentFrame()`, for the transition curve; the timing object already decides the pacing.
3. Always return `props`, even when empty (`props: {}`).
4. Build presentation objects once (module level, or a factory like `stripedSlam({...})` called outside render) so they stay stable across re-renders.
5. Wrapper elements fill the canvas (`position: 'absolute'`, `inset: 0`). Clip with `overflow: 'hidden'` or `clipPath` on the **entering** scene; the exiting scene may also be transformed or faded.
6. Pair `linearTiming` with sharp, frame-exact "slam" effects and `springTiming` with springy, physical ones.
7. Do not mount extra copies of the children (e.g. a `<Video>`) to build a mask. Apply `clipPath` / `mask` to the single wrapper instead.

Ready-to-adapt cinematic presentations (striped slam, zoom punch, diagonal reveal, iris, glitch slam) with the math behind them are in [references/custom-presentations.md](references/custom-presentations.md).

## Related skills

- `remotion-core` for sequencing, timing, and effects basics.
- [references/motion-style.md](references/motion-style.md) for generic motion-design principles (stagger order, spring defaults, pulse) that pair with transitions.
