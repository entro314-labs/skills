# Cropping

Prefer the `cropLeft`, `cropRight`, `cropTop` and `cropBottom` props to crop content: they let the user drag the component interactively and adapt the canvas outline to the crop.

Components that support `crop*` props:

- `<Sequence>` from `remotion`, when `layout="absolute-fill"`
- `<Interactive.*>` HTML and SVG elements from `remotion`
- Custom components made with `Interactive.create()`, using a managed `layout: 'absolute-fill'` root or forwarding `style` to their own visual root
- `<CanvasImage>`, `<Img>`, `<AnimatedImage>`, `<HtmlInCanvas>`, `<Solid>` from `remotion`
- `<Video>` from `@remotion/media`
- `<Gif>` from `@remotion/gif`
- `<RemotionRiveCanvas>` from `@remotion/rive`

Values are ratios from `0` (no crop on that edge) to `1` (fully cropped). Keep the values inline, and keyframable with an inline `interpolate()`:

```tsx
<CanvasImage
  src={staticFile('photo.png')}
  cropLeft={interpolate(frame, [0, 30], [0, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })}
  cropBottom={0.1}
/>
```

Do not use `clipPath` together with crop props.
