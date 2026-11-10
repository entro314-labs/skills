# Timing props and sequencing: delay, trim, speed, loop

In the component that renders the items, take `fps` from `useVideoConfig()` and write seconds-to-frames expressions on the JSX node (`from={1 * fps}`, `trimBefore={4 * fps}`), not through a fixed FPS constant. Studio can then edit the timing, and it stays correct if the composition frame rate changes. Literal frame counts are fine when an edit is already specified in frames.

## Timing props

Supported directly by built-in components: `<AbsoluteFill>`, `<Interactive.*>`, `<Img>`, `<AnimatedImage>`, `<CanvasImage>`, `<HtmlInCanvas>`, `<Solid>`, `<Sequence>`, `<Track>` (from `remotion`), `<Video>` and `<Audio>` (from `@remotion/media`), `<Gif>`, and others. Custom components made with `Interactive.create()` accept them too.

| Prop               | Meaning                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `from`             | When the item starts appearing in the parent timeline. Its children start at frame `0` when it appears.   |
| `trimBefore`       | First frame of the item's own timeline. Children's `useCurrentFrame()` starts at `trimBefore`.            |
| `durationInFrames` | How many frames of the item's own timeline are shown, starting at `trimBefore`. Ends media early.         |
| `playbackRate`     | Speed. Children advance `playbackRate` frames per parent frame; the item occupies `durationInFrames / playbackRate` parent frames. |
| `loop`             | Repeats the range chosen by `trimBefore` and `durationInFrames` until the parent ends.                    |

```tsx
<Img src={staticFile('photo.png')} from={1 * fps} />
{/* plays seconds 2 to 5 of the footage */}
<Video src={staticFile('footage.mp4')} trimBefore={2 * fps} durationInFrames={3 * fps} />
<Video src={staticFile('footage.mp4')} playbackRate={2} />
<Interactive.Div name="Badge" durationInFrames={2 * fps} loop>
  New
</Interactive.Div>
```

- `<Video>`, `<Audio>`, `<Gif>` and `<AnimatedImage>` may omit `durationInFrames` with `loop`: the media's own duration after `trimBefore` defines the loop range. Other items need `durationInFrames` to loop.
- `<Img>`, `<CanvasImage>`, `<Solid>` and shapes do not support `loop` (their output does not change over time).
- Put volume and timing directly on `<Audio>`.

Order of operations: (1) `from` positions the item in the parent timeline; (2) `trimBefore` sets the first frame of its own timeline; (3) `durationInFrames` selects the range; (4) `playbackRate` stretches or compresses it; (5) `loop` repeats it until the parent ends. Children calling `useCurrentFrame()` get `trimBefore + (frame - from) * playbackRate`.

Older snippets use `startFrom`, `endAt`, `trimAfter` or negative `<Sequence from>` to trim; prefer `trimBefore` plus `durationInFrames`.

Fallback: if a component does not support these props, wrap it in `<Sequence>`. `layout="absolute-fill"` (default) makes it behave like `AbsoluteFill`; `layout="none"` adds no wrapper element. Docs: https://www.remotion.dev/docs/timing

## Choose the timing boundary

- Put timing directly on a built-in or `Interactive.create()` component when that item is edited independently. Avoid a `<Sequence>` around one timing-capable child just to name it.
- Use a shared `<Sequence>` when several layers must inherit the same trim, speed or start time, when overriding dimensions (`width`, `height`) for descendants, or when the child accepts no timing props. Use `layout="none"` when it should not add a layout element.
- Use a named `Track` for non-overlapping items with independent positions (scenes, music segments, cutaways, stickers, sound effects). Items that stay visible together need separate tracks.
- Use `TransitionSeries` for consecutive items that should shift together when a duration changes; keep its own `TransitionSeries.Sequence` boundaries even if the child accepts timing props (details in `remotion-transitions`).
- `<Series>` with `<Series.Sequence durationInFrames>` also plays children back to back (`offset={-15}` overlaps one with the previous), but prefer `Track` or `TransitionSeries`, which Studio can edit.

Inside a `<Sequence from={60}>`, `useCurrentFrame()` returns the local frame (0 at the sequence start). Sequences nest; use `layout="none"` on inner ones that should not add layout. `premountFor={1 * fps}` on a `<Sequence>` mounts its content before it plays, which helps heavy components and media start without a hitch:

```tsx
<Sequence from={1 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Title />
</Sequence>
```

## Multi-scene videos

Give each substantial scene its own component and keep each instance's name, timing and props inline in the parent. Choose the parent structure by editing behavior:

- Independent scene start times: a named `Track` with explicit `from` and `durationInFrames` on each scene; items must not overlap.
- Scenes that stay adjacent as durations change: `TransitionSeries`, each scene inside its own `TransitionSeries.Sequence` carrying duration and source trim; account for transition overlaps in the total composition duration.

Scenes that need their own editable timeline become connected compositions: [video-editing-and-connected-compositions.md](video-editing-and-connected-compositions.md). Per-scene guidance on what to put in a frame: [video-layout-and-tailwind.md](video-layout-and-tailwind.md).

Driving scenes from a typed plan object (`scenes.map(scene => <Sequence from={scene.from} durationInFrames={scene.durationInFrames}>...)`) is fine when the timeline is intentionally one data-controlled template; it gives up per-clip editing in Studio.
