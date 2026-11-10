# Animation and timing: interpolate, easing, spring

All motion must be a pure function of `useCurrentFrame()`. Write durations in seconds and multiply by `fps` from `useVideoConfig()`; never hardcode an fps constant inside a component.

Forbidden because they do not render correctly: CSS `transition`, CSS `animation`, Tailwind `transition-*` / `animate-*` classes, third-party library animations that run on their own clock, and `Math.random()`.

## interpolate

```ts
import {interpolate} from 'remotion';

// 0 to 1 over 0.3 seconds
const opacity = interpolate(frame, [0, 0.3 * fps], [0, 1]);
```

Values are not clamped by default and can leave the output range. Clamp unless extrapolation is wanted:

```ts
const opacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

`extrapolateLeft` / `extrapolateRight` accept `"extend"` (default), `"clamp"`, `"identity"` and `"wrap"`.

Multiple keyframes: add as many as needed. For per-segment easing pass an array with `n - 1` entries.

```ts
const scale = interpolate(frame, [0, 1 * fps, 9 * fps, 10 * fps], [0, 1, 1, 0], {
  easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.spring({damping: 200})],
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  output: 'perceptual-scale', // for scale animations, see below
});
```

## Easing

Pass `easing` to `interpolate()`. Default is `Easing.linear`.

- `Easing.bezier(x1, y1, x2, y2)`: same arguments as CSS `cubic-bezier`. A good default for UI motion: `Easing.bezier(0.16, 1, 0.3, 1)`.
- `Easing.spring({damping: 200})`: a push movement with no bounce.
- Convexities `Easing.in`, `Easing.out`, `Easing.inOut` combine with curves (most linear to most curved: `Easing.quad`, `Easing.sin`, `Easing.exp`, `Easing.circle`), for example `Easing.inOut(Easing.quad)`.

```ts
import {Easing, interpolate} from 'remotion';

const opacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

## Animating scale

Linear scale output looks smaller than it is as the value grows. Add `output: 'perceptual-scale'` to every scale animation:

```ts
const scale = interpolate(frame, [0, 0.3 * fps], [0, 1], {
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  output: 'perceptual-scale',
});
```

## Studio-editable animation patterns

Studio edits keyframes written as inline `interpolate()` calls directly in the `style` prop, using the individual `scale`, `translate` and `rotate` CSS properties. Use `transform` strings only when these cannot express the effect (`skew()`, `perspective()`, order-sensitive chains).

```tsx
// Inline editable keyframes and transform shorthands
style={{
  scale: interpolate(frame, [0, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.spring({damping: 200}),
    output: 'perceptual-scale',
  }),
  translate: interpolate(frame, [0, 100], ['0px 0px', '100px 100px'], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.spring({damping: 200}),
  }),
  rotate: interpolate(frame, [0, 100], ['20deg', '90deg'], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.spring({damping: 200}),
  }),
}}

// Hidden values and transform strings are computed, not editable
const scale = interpolate(frame, [0, 100], [0, 1]);
style={{transform: `scale(${scale})`}}
```

Keep output ranges, easing, extrapolation and `output` hardcoded. The input range may use `fps`, `durationInFrames`, `width`, `height` destructured from `useVideoConfig()` with plain multiplication or subtraction (`2 * fps`, `durationInFrames - 1`).

## Posterization

Intentionally reduce the frame rate for an artistic look:

```ts
const scale = interpolate(frame, [0, 1 * fps], [0, 1], {
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  posterize: 3, // only every 3rd frame is sampled
});
```

## spring()

`spring()` returns a number that goes from 0 to 1 with physical motion. Inside `interpolate()`, `Easing.spring({damping: 200})` is preferred because it stays editable in Studio; use `spring()` when you need its `delay`, a stretched duration, or arithmetic on several springs.

```ts
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const scale = spring({frame, fps}); // default config has a little bounce
```

Defaults are `mass: 1, damping: 10, stiffness: 100`. Recommended no-bounce config: `{damping: 200}`. Common presets:

```ts
const smooth = {damping: 200}; // smooth, no bounce (subtle reveals)
const snappy = {damping: 20, stiffness: 200}; // minimal bounce (UI elements)
const bouncy = {damping: 8}; // playful entrance
const heavy = {damping: 15, stiffness: 80, mass: 2}; // slow, small bounce
```

`overshootClamping: true` in `config` stops the spring at its target without overshoot.

Delay a spring by frames with `delay`, and stretch it to an exact length with `durationInFrames`:

```ts
const entrance = spring({frame, fps, delay: 20, config: {damping: 200}});
const stretched = spring({frame, fps, durationInFrames: 40});
```

Map the 0-1 output to any range with `interpolate`, and combine springs with arithmetic:

```ts
const rotation = interpolate(spring({frame, fps}), [0, 1], [0, 360]);

const {durationInFrames} = useVideoConfig();
const inAnimation = spring({frame, fps});
const outAnimation = spring({frame, fps, durationInFrames: 1 * fps, delay: durationInFrames - 1 * fps});
const scale = inAnimation - outAnimation;
```

## Deterministic randomness

Frames can be rendered in parallel and out of order, so values must be reproducible. Use `random(seed)` from `remotion`, which returns the same 0-1 number for the same seed; derive per-item seeds from the index.

```tsx
import {random} from 'remotion';

const x = random('particle-x') * width;
const delay = random(`delay-${i}`) * 30;
```

Frame-based blinking is also deterministic, for example a cursor: `frame % 30 < 15`.

## Related

- Delay, trim, loop and speed of items: [timing-props-and-sequencing.md](timing-props-and-sequencing.md).
- Text reveal patterns: [text-and-measuring.md](text-and-measuring.md).
- Motion blur: [html-in-canvas-and-motion-blur.md](html-in-canvas-and-motion-blur.md).
- Scene transitions: `remotion-transitions` skill.
