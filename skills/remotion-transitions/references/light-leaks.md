# Light leaks

`lightLeak()` from `@remotion/effects/light-leak` is a canvas effect. It only works from Remotion 4.0.500 (`npx remotion versions` to check, `npx remotion upgrade` to upgrade).

```bash
npx remotion add @remotion/effects
```

Apply it to a canvas-based component such as `<Solid>`. Animate `progress` from `0` to `1`: the leak evolves during the first half and retracts during the second half. Effects do not animate on their own, so drive `progress` from `useCurrentFrame()` and `interpolate()`. Keep that calculation inline so it stays editable in Studio.

## Options

- `progress?`: evolve/retract phase, `0` to `1`. Default `0.5`.
- `seed?`: shape of the leak pattern; different seeds give different patterns. Default `0`.
- `hueShift?`: hue rotation in degrees (`0`-`360`). Default `0` (yellow-to-orange). `120` is green, `240` is blue.
- `disabled?`: skip the effect when `true`. Default `false`.

## Overlay component

```tsx
import {lightLeak} from '@remotion/effects/light-leak';
import type {CSSProperties} from 'react';
import {Interactive, interpolate, Solid, useCurrentFrame, useVideoConfig} from 'remotion';

const LightLeakOverlayInner = ({
  seed = 0,
  hueShift = 0,
  style,
}: {
  readonly seed?: number;
  readonly hueShift?: number;
  readonly style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, height, width} = useVideoConfig();

  return (
    <Solid
      width={width}
      height={height}
      style={style}
      effects={[
        lightLeak({
          seed,
          hueShift,
          progress: interpolate(frame, [0, durationInFrames - 1], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }),
      ]}
    />
  );
};

// Gives the overlay its own Studio timeline item, with seed and hue as editable fields.
export const LightLeakOverlay = Interactive.create({
  Component: LightLeakOverlayInner,
  layout: 'none',
  schema: {
    seed: {type: 'number', default: 0, description: 'Seed', integer: true, hiddenFromList: false},
    hueShift: {type: 'number', default: 0, description: 'Hue shift', min: 0, max: 360, hiddenFromList: false},
  },
});
```

Inside an overlay, `useVideoConfig().durationInFrames` is the overlay's own duration, so `progress` spans exactly the overlay.

## Usage

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence name="A" durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Overlay durationInFrames={30}>
    <LightLeakOverlay name="Light leak" seed={5} hueShift={240} />
  </TransitionSeries.Overlay>
  <TransitionSeries.Sequence name="B" durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

The overlay is also valid outside `TransitionSeries` as a decorative layer: put `<LightLeakOverlay seed={3} />` after the content in any composition.

## Rendering

`lightLeak()` uses WebGL2. Enable WebGL when rendering with `Config.setChromiumOpenGlRenderer("angle")` (or `--gl=angle` on the CLI).
