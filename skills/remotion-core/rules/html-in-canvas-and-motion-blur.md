# HTML-in-canvas and motion blur

## `<HtmlInCanvas>`

Renders its children into a `<canvas>` so you can post-process them with the Canvas 2D API, WebGL or the `effects` prop. It only works in Chrome 149+ with the `chrome://flags/#canvas-draw-element` flag enabled; tell the user. Rendering needs no extra configuration for the flag.

Nest `<HtmlInCanvas>` components only when `HtmlInCanvas.isNestingSupported()` returns `true` (Chrome 157.0.8080.0 or newer with HTML-in-canvas enabled); older browsers reject nesting.

If you use WebGL during renders, enable it: `npx remotion render --gl=angle`, or set it as the default for Studio and CLI (advised):

```ts
import {Config} from '@remotion/cli/config';

Config.setChromiumOpenGlRenderer('angle');
```

Basic usage draws the children with no effect:

```tsx
import {HtmlInCanvas} from 'remotion';

export const MyComp = () => (
  <HtmlInCanvas width={1280} height={720}>
    <div style={{fontSize: 80}}>Hello</div>
  </HtmlInCanvas>
);
```

Prefer the `effects` prop on `<HtmlInCanvas>` for built-in effects ([effects.md](effects.md)). For custom 2D work use `onPaint`, which runs whenever the content updates; call `ctx.drawElementImage(elementImage, 0, 0)` to draw the captured DOM:

```tsx
import {AbsoluteFill, HtmlInCanvas, type HtmlInCanvasOnPaint, useCurrentFrame, useVideoConfig} from 'remotion';
import {useCallback} from 'react';

export const Blur = () => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();

  const onPaint: HtmlInCanvasOnPaint = useCallback(
    ({canvas, elementImage}) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to acquire 2D context');

      const blurPx = 4 + 18 * (0.5 + 0.5 * Math.sin((frame / fps) * Math.PI));

      ctx.reset();
      ctx.filter = `blur(${blurPx}px)`;
      ctx.drawElementImage(elementImage, 0, 0);
    },
    [frame, fps],
  );

  return (
    <HtmlInCanvas width={width} height={height} onPaint={onPaint}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontSize: 120}}>
        <h1>Hello</h1>
      </AbsoluteFill>
    </HtmlInCanvas>
  );
};
```

WebGL: set up the context, program and texture in `onInit` and return a cleanup function. Allocate the texture with `gl.texImage2D(..., null)` when `elementImage` changes size. In `onPaint`, upload with `gl.texElementSubImage2D(gl.TEXTURE_2D, 0, 0, 0, elementImage)` and draw; older Chromium only exposes `gl.texElementImage2D()`, so use it when the new method is absent. A working minimal example: https://github.com/remotion-dev/remotion/blob/main/packages/docs/components/demos/HtmlInCanvasDocsDemoWebGL.tsx

`onPaint` may be `async`: Remotion holds the frame open with `delayRender()` until the promise resolves, which suits multi-pass effects with `createImageBitmap`.

## Motion blur

`<HtmlInCanvasMotionBlur>` from `@remotion/motion-blur` (`npx remotion add @remotion/motion-blur`, Remotion 4.0.529+) is the state of the art for blurring animated HTML. It captures the content at fractional frames and averages the pixels in a canvas.

- Supply canvas `width` and `height`, usually from `useVideoConfig()`.
- `shutterAngle` defaults to `180` and accepts `0` to `360` (`0` disables blur).
- `samples` defaults to `8` and must be an integer from `1` to `64`; more samples smooth the blur but cost more in preview and render.
- Call `useCurrentFrame()` inside the child component so each sample gets its own frame.

```tsx
import {HtmlInCanvasMotionBlur} from '@remotion/motion-blur';
import {useCurrentFrame, useVideoConfig} from 'remotion';

const MovingBox = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        left: frame * 10,
        top: 200,
        width: 120,
        height: 120,
        backgroundColor: '#ff6b6b',
      }}
    />
  );
};

export const HtmlInCanvasBlur = () => {
  const {width, height} = useVideoConfig();

  return (
    <HtmlInCanvasMotionBlur width={width} height={height} samples={8} shutterAngle={180}>
      <MovingBox />
    </HtmlInCanvasMotionBlur>
  );
};
```

Live preview needs HTML-in-canvas enabled in Chrome 149+ (flag above); rendering needs no configuration. Nesting follows the `HtmlInCanvas.isNestingSupported()` rule above. If HTML-in-canvas is unavailable, see https://www.remotion.dev/docs/motion-blur for other options and https://www.remotion.dev/docs/motion-blur/html-in-canvas-motion-blur for the API.
