# Visual and pixel effects (@remotion/effects)

Docs: https://www.remotion.dev/docs/effects and https://www.remotion.dev/docs/create-effect

When adding an effect, first identify the element or group it should affect. If the target component supports `effects` and a built-in effect matches the request, prefer that over a CSS approximation (for example `vignette()` on a `<Video>`'s `effects` prop rather than an overlay). For exposure, white balance, tone and LUTs read [color-correction.md](color-correction.md).

Install: `npx remotion add @remotion/effects`.

## Which components accept `effects`

| Import from        | Components                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `remotion`         | `<Img>`, `<CanvasImage>`, `<AnimatedImage>`, `<Solid>`, `<HtmlInCanvas>`                                                      |
| `@remotion/media`  | `<Video>`                                                                                                                     |
| `@remotion/gif`    | `<Gif>`                                                                                                                       |
| `@remotion/rive`   | `<RemotionRiveCanvas>`                                                                                                        |
| `@remotion/shapes` | `<Arrow>`, `<Callout>`, `<Circle>`, `<Ellipse>`, `<Heart>`, `<Pie>`, `<Polygon>`, `<Rect>`, `<Spark>`, `<Star>`, `<Triangle>` |

Ordinary HTML elements, `<Interactive.*>` DOM wrappers, `<AbsoluteFill>` and `<Sequence>` do not accept `effects`. To apply effects to their content, wrap them in `<HtmlInCanvas>` ([html-in-canvas-and-motion-blur.md](html-in-canvas-and-motion-blur.md)) and put `effects` on the wrapper. For other elements prefer plain HTML and CSS where suitable.

## Usage

Effects are functions passed in the `effects` array. Most imports follow `@remotion/effects/<effect-slug>`; `uvTranslate()` and `xyTranslate()` come from `@remotion/effects/translate`. Check the effect docs for exact parameters.

```tsx
import {Video} from '@remotion/media';
import {blur} from '@remotion/effects/blur';
import {brightness} from '@remotion/effects/brightness';

<Video src="https://remotion.media/video.mp4" effects={[blur({radius: 8})]} />;
<Video src="https://remotion.media/video.mp4" effects={[brightness({})]} />;
```

Effects do not animate on their own: drive parameters such as `progress` or `rotation` with inline `useCurrentFrame()` + `interpolate()`. Keep the `effects` array and its parameters inline (no computed or conditional arrays, no extracted constants) so Studio can edit and keyframe them; render separate elements if one version should have effects and another should not. Every effect takes `disabled?: boolean`.

Most effects use WebGL2; `cylinder()`, `sphere()` and `pageTurn()` use WebGPU. During renders enable WebGL and WebGPU (also used by Studio and CLI as the default):

```ts
import {Config} from '@remotion/cli/config';

Config.setChromiumOpenGlRenderer('angle');
```

## Built-in effects

- Color and tone: `brightness()`, `colorCorrection()`, `colorKey()`, `contrast()`, `duotone()`, `exposure()`, `grayscale()`, `hue()`, `invert()`, `levels()`, `linearGradient()`, `linearGradientTint()`, `lut()`, `saturation()`, `shadowsHighlights()`, `thermalVision()`, `tint()`, `vibrance()`, `whiteBalance()`.
- Blur and trails: `blur()`, `lightTrail()`, `linearProgressiveBlur()`, `radialProgressiveBlur()`, `regionBlur()`, `zoomBlur()`.
- Lighting: `dropShadow()`, `glow()`, `lightLeak()`, `shine()`, `starburst()`, `vignette()`.
- Distortion and transforms: `barrelDistortion()`, `chromaticAberration()`, `cornerPin()`, `fisheye()`, `mirror()`, `noiseDisplacement()`, `scale()`, `skew()`, `tile()`, `uvTranslate()`, `wave()`, `xyTranslate()`.
- Textures and patterns: `burlap()`, `checkerboard()`, `contourLines()`, `dotGrid()`, `emboss()`, `flannel()`, `gridlines()`, `halftone()`, `halftoneLinearGradient()`, `lines()`, `liquidContours()`, `noise()`, `paper()`, `pattern()`, `rings()`, `scanlines()`, `speckle()`, `tvSignalOff()`, `waves()`, `whiteNoise()`, `zigzag()`.
- Edges: `outline()`, `roughenEdges()`, `shrinkwrap()`, `tear()`.
- Pixelation and transitions: `evolve()`, `linearProgressivePixelate()`, `pixelate()`, `pixelDissolve()`, `radialProgressivePixelate()`, `venetianBlinds()`.

## Light leaks

Needs Remotion 4.0.500 or newer (`npx remotion versions`, `npx remotion upgrade`). Apply `lightLeak()` from `@remotion/effects/light-leak` to a canvas-based component such as `<Solid>`. Animate `progress` from 0 to 1: the leak reveals during the first half and retracts during the second.

```tsx
import {lightLeak} from '@remotion/effects/light-leak';
import {interpolate, Solid, useCurrentFrame, useVideoConfig} from 'remotion';

const LightLeakOverlay: React.FC<{seed?: number; hueShift?: number}> = ({seed = 0, hueShift = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, height, width} = useVideoConfig();

  return (
    <Solid
      width={width}
      height={height}
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
```

Options: `progress` (default `0.5`), `seed` (pattern shape, default `0`), `hueShift` in degrees 0 to 360 (default `0`, yellow-to-orange; `120` green, `240` blue), `disabled`. It also works standalone as a decorative layer in any composition. To play it over a cut between two scenes, use it inside `<TransitionSeries.Overlay>`, which does not shorten the timeline (see the `remotion-transitions` skill). It uses WebGL2, so enable `Config.setChromiumOpenGlRenderer('angle')` for renders.

## Custom effects with createEffect()

Use `createEffect()` from `remotion` for a reusable effect factory that works in the same `effects` array. Prefer it over `<HtmlInCanvas onPaint>` when the transformation should be reusable, parameterized, editable in Studio or stackable. Keep project-specific effects next to the composition, for example `src/effects/palette-map.ts`.

`createEffect()` expects:

- `type`: stable reverse-DNS identifier, for example `com.example.paletteMap`.
- `label`: Studio label, commonly `paletteMap()`.
- `documentationLink`: URL or `null`.
- `backend`: `"2d"`, `"webgl2"` or `"webgpu"`.
- `calculateKey(params)`: stable string containing every resolved parameter that changes output.
- `setup(target)`: create reusable backend state, or return `null`.
- `apply({source, target, width, height, params, state, flipSourceY})`: draw the transformed result into `target`.
- `cleanup(state)`: free resources created by `setup()`.
- `schema`: an `InteractivitySchema` for Studio controls (`disabled` is added automatically).
- `validateParams(params)`: throw on missing or invalid values.

Use `backend: "2d"` for simple pixel, filter, `drawImage` or image-data effects; use WebGL2 only when shader math or GPU performance is needed.

```ts
import {createEffect, type InteractivitySchema} from 'remotion';

type MyEffectParams = {
  readonly amount?: number;
};

const myEffectSchema = {
  amount: {type: 'number', min: 0, max: 1, step: 0.01, default: 1, description: 'Amount'},
} as const satisfies InteractivitySchema;

const resolve = (params: MyEffectParams) => ({amount: params.amount ?? 1});

export const myEffect = createEffect<MyEffectParams, null>({
  type: 'com.example.myEffect',
  label: 'myEffect()',
  documentationLink: null,
  backend: '2d',
  calculateKey: (params) => {
    const {amount} = resolve(params);
    return `my-effect-${amount}`;
  },
  setup: () => null,
  apply: ({source, target, width, height, params}) => {
    const ctx = target.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get a 2D context for myEffect().');
    }

    const {amount} = resolve(params);

    ctx.clearRect(0, 0, width, height);
    ctx.filter = `opacity(${amount * 100}%)`;
    ctx.drawImage(source, 0, 0, width, height);
    ctx.filter = 'none';
  },
  cleanup: () => undefined,
  schema: myEffectSchema,
  validateParams: ({amount = 1}) => {
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 0 || amount > 1) {
      throw new TypeError('amount must be a number between 0 and 1');
    }
  },
});
```

Use it like a built-in: `<CanvasImage src={staticFile('image.png')} effects={[myEffect({amount: 0.8})]} />`.

A WebGL2 effect compiles and links its shaders in `setup()`, keeps the program, fullscreen quad (VAO/VBO), texture and uniform locations in `state`, uploads `source` as a texture in `apply()` (honoring `flipSourceY`), and deletes those GPU resources in `cleanup()`. Create the context with `target.getContext('webgl2', {premultipliedAlpha: true, alpha: true, preserveDrawingBuffer: true})`, set `gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)`, and use a `CLAMP_TO_EDGE` RGBA texture.

Rules for generated custom effects:

- Do not put `disabled` in the custom params type or schema; the returned factory adds it.
- Validate required parameters at factory-call time with `validateParams`.
- Include all defaults in both `schema` and the `resolve()` helper.
- Reset mutable 2D context state (`filter`, `globalAlpha`, transforms, compositing) after drawing.
- Preserve alpha unless the effect intentionally changes transparency.
