# Cinematic custom presentations

All five presentations below follow the same shape: a factory returns `TransitionPresentation<Props>` (`{component, props}`), and the component animates only from `presentationProgress`. The entering scene is the one that gets clipped; the exiting scene stays underneath.

Shared imports and helper:

```tsx
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from '@remotion/transitions';
import {AbsoluteFill, Easing, interpolate, random} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
```

Usage is always the same:

```tsx
<TransitionSeries.Transition
  presentation={diagonalReveal({skew: 30})}
  timing={linearTiming({durationInFrames: 18})}
/>
```

## Easing and stagger cheat sheet

- Sharp "slam" feel: `Easing.bezier(0.7, 0, 0.2, 1)` or `Easing.out(Easing.cubic)`, with `linearTiming` of 12-20 frames.
- Soft feel: `springTiming({config: {damping: 200}, durationInFrames: 25})` and use `presentationProgress` linearly.
- Always pass `extrapolateLeft/Right: 'clamp'` to `interpolate()`.
- Stagger N items across the progress range: item `i` runs on `[i * stagger, i * stagger + (1 - (N - 1) * stagger)]`, so the last item finishes exactly at progress `1`.

```tsx
const staggered = (progress: number, index: number, count: number, stagger: number) =>
  interpolate(progress, [index * stagger, index * stagger + 1 - (count - 1) * stagger], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.7, 0, 0.2, 1),
  });
```

`stagger * (count - 1)` must stay below `1`.

## 1. Striped slam

Vertical stripes of the entering scene drop in from the top with a stagger. One `clipPath: polygon()` is traced across all stripes, so the children are mounted once.

```tsx
type StripedProps = {stripes: number; stagger: number};

const StripedSlamComponent: React.FC<TransitionPresentationComponentProps<StripedProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  if (presentationDirection === 'exiting') {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  const {stripes, stagger} = passedProps;
  const points: string[] = [];
  for (let i = 0; i < stripes; i++) {
    const x0 = (i / stripes) * 100;
    const x1 = ((i + 1) / stripes) * 100;
    const h = staggered(presentationProgress, i, stripes, stagger) * 100;
    // down the left edge of the stripe, across its bottom, back up to the top
    points.push(`${x0}% 0%`, `${x0}% ${h}%`, `${x1}% ${h}%`, `${x1}% 0%`);
  }

  return <AbsoluteFill style={{clipPath: `polygon(${points.join(',')})`}}>{children}</AbsoluteFill>;
};

export const stripedSlam = (props: StripedProps): TransitionPresentation<StripedProps> => ({
  component: StripedSlamComponent,
  props,
});

// stripedSlam({stripes: 8, stagger: 0.06})
```

Each stripe ends where the next one starts (at `y = 0`), so the path is one contiguous polygon. For a vertical shutter, swap the axes (stripes become horizontal bars growing from the left).

## 2. Zoom punch

The outgoing scene pushes toward the camera and blurs while the incoming scene settles from slightly too large.

```tsx
const ZoomPunchComponent: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const eased = Easing.bezier(0.7, 0, 0.2, 1);
  const entering = presentationDirection === 'entering';
  const scale = entering
    ? interpolate(presentationProgress, [0, 1], [1.25, 1], {...clamp, easing: eased})
    : interpolate(presentationProgress, [0, 1], [1, 1.4], {...clamp, easing: eased});
  const opacity = entering
    ? interpolate(presentationProgress, [0.3, 0.7], [0, 1], clamp)
    : interpolate(presentationProgress, [0.3, 0.7], [1, 0], clamp);
  const blur = (entering ? 1 - presentationProgress : presentationProgress) * 12;

  return (
    <AbsoluteFill style={{scale: String(scale), opacity, filter: `blur(${blur}px)`}}>
      {children}
    </AbsoluteFill>
  );
};

export const zoomPunch = (): TransitionPresentation<Record<string, never>> => ({
  component: ZoomPunchComponent,
  props: {},
});
```

## 3. Diagonal reveal

A slanted leading edge sweeps left to right across the entering scene. `skew` is the horizontal offset of the edge in percent of width.

```tsx
type DiagonalProps = {skew: number};

const DiagonalRevealComponent: React.FC<TransitionPresentationComponentProps<DiagonalProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  if (presentationDirection === 'exiting') {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  const {skew} = passedProps;
  // the top edge travels 0 -> 100 + skew so the bottom edge also reaches 100
  const edge = presentationProgress * (100 + skew);

  return (
    <AbsoluteFill
      style={{clipPath: `polygon(0% 0%, ${edge}% 0%, ${edge - skew}% 100%, 0% 100%)`}}
    >
      {children}
    </AbsoluteFill>
  );
};

export const diagonalReveal = (props: DiagonalProps): TransitionPresentation<DiagonalProps> => ({
  component: DiagonalRevealComponent,
  props,
});
```

## 4. Iris

A circle grows from the center (or any point) and reveals the entering scene. A `circle()` percentage radius is relative to `sqrt((w^2 + h^2) / 2)`, so `75%` is enough to cover every corner from the center.

```tsx
type IrisProps = {x: number; y: number}; // center in percent, e.g. {x: 50, y: 50}

const IrisComponent: React.FC<TransitionPresentationComponentProps<IrisProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
  passedProps,
}) => {
  if (presentationDirection === 'exiting') {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  const radius = interpolate(presentationProgress, [0, 1], [0, 75], clamp);
  return (
    <AbsoluteFill style={{clipPath: `circle(${radius}% at ${passedProps.x}% ${passedProps.y}%)`}}>
      {children}
    </AbsoluteFill>
  );
};

export const iris = (props: IrisProps): TransitionPresentation<IrisProps> => ({
  component: IrisComponent,
  props,
});
```

If the center is off-center (e.g. a button position), raise the end radius so the farthest corner is covered.

## 5. Glitch slam

A deterministic glitch: for the first half the outgoing scene jitters horizontally and is sliced by offset bands; then the incoming scene settles out of the same jitter. Randomness comes from Remotion's seeded `random()` keyed by a quantized progress step, so every render is identical.

```tsx
const STEPS = 24;

const GlitchSlamComponent: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const entering = presentationDirection === 'entering';

  // exiting is visible for the first half, entering for the second half
  const visible = entering ? presentationProgress >= 0.5 : presentationProgress < 0.5;
  const step = Math.floor(presentationProgress * STEPS);
  const intensity = 1 - Math.abs(presentationProgress - 0.5) * 2; // peaks at the cut

  const shake = (random(`glitch-x-${step}`) - 0.5) * 120 * intensity;
  const bandTop = random(`glitch-band-${step}`) * 80;
  const bandHeight = 4 + random(`glitch-h-${step}`) * 16;
  const bandShift = (random(`glitch-s-${step}`) - 0.5) * 300 * intensity;

  if (!visible) {
    return null;
  }

  return (
    <AbsoluteFill style={{translate: `${shake}px 0`, filter: `contrast(${1 + intensity * 0.6}) saturate(${1 + intensity})`}}>
      {children}
      <AbsoluteFill
        style={{
          clipPath: `inset(${bandTop}% 0 ${100 - bandTop - bandHeight}% 0)`,
          translate: `${bandShift}px 0`,
          pointerEvents: 'none',
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const glitchSlam = (): TransitionPresentation<Record<string, never>> => ({
  component: GlitchSlamComponent,
  props: {},
});
```

This one mounts `children` twice by design (the displaced band). Use it with image or text scenes, not with scenes that contain `<Video>` or `<Audio>`; for those, drop the band layer and keep only the jitter and filter.

Pair it with `linearTiming({durationInFrames: 12})`.

## Choosing and combining

- Calm, editorial: `fade()`, `slide()`, or `springTiming` with `zoomPunch()` at low blur.
- Energetic promo: `stripedSlam`, `diagonalReveal`, `glitchSlam` with 10-18 frame `linearTiming`.
- Add a `TransitionSeries.Overlay` with a light leak (see [light-leaks.md](light-leaks.md)) on top of a hard cut for a filmic look; it does not shorten the timeline.
- Vary presentations across a video, but keep one timing family (all linear, or all spring) so the rhythm stays consistent.
