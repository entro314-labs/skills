# Editable video timelines and connected compositions

Use this when the composition is mostly a timeline of video or audio clips, when a scene or group needs its own Studio timeline, or when handling a Studio "pre-compose" request. It builds on the `Track` / `Sequence` / `TransitionSeries` choices in [timing-props-and-sequencing.md](timing-props-and-sequencing.md).

## Structure around editing units

Choose what the user edits together first (a captioned shot, a set of cutaways, an independently timed music segment), then the tracks or shared timing boundaries they need. Write every independently editable clip as its own JSX node with a literal `name` and inline props. Reuse a component for repeated units rather than copying it or generating all instances from one `.map()`; use loops only for output intentionally controlled as one template (particles, chart bars). Layout-only containers and decoration stay plain HTML.

## Choose the cut behavior

- A named `Track` for non-overlapping clips with independent start times. Keep `from`, `trimBefore`, `durationInFrames` and `playbackRate` on each clip; moving or resizing one clip leaves the others' start times unchanged.
- `TransitionSeries` when consecutive clips stay adjacent. Put `durationInFrames` on each `TransitionSeries.Sequence`; the series computes start times, repositions later clips after a duration change and handles overlapping transitions. Preserve these boundaries when refactoring.

## Keep synchronized layers on one clock

Put a shot's video, captions and source-synchronized overlays under one timing boundary and apply `trimBefore`, `durationInFrames` and `playbackRate` to it once. For an independently placed group also set `from`. For consecutive shots, the `TransitionSeries.Sequence` is that boundary:

```tsx
import {Video} from '@remotion/media';
import {TransitionSeries} from '@remotion/transitions';
import {staticFile, useVideoConfig} from 'remotion';
import {BasicCaptions} from './basic-captions';

export const Interview = () => {
  const {fps} = useVideoConfig();
  return (
    <TransitionSeries name="Interview shots">
      <TransitionSeries.Sequence name="Opening" trimBefore={4 * fps} durationInFrames={3 * fps}>
        <Video name="Opening footage" src={staticFile('interview.mp4')} />
        <BasicCaptions
          name="Opening captions"
          width={900}
          style={{position: 'absolute', bottom: 80, translate: '510px 0px'}}
          captions={[
            {text: 'Hello', startMs: 4500, endMs: 4900, timestampMs: 4700, confidence: null},
            {text: ' world', startMs: 4900, endMs: 5400, timestampMs: 5150, confidence: null},
          ]}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence name="Next shot" trimBefore={10 * fps} durationInFrames={2 * fps}>
        <Video name="Next footage" src={staticFile('interview.mp4')} />
        <BasicCaptions
          name="Next captions"
          width={900}
          style={{position: 'absolute', bottom: 80, translate: '510px 0px'}}
          captions={[{text: 'Next', startMs: 10500, endMs: 11000, timestampMs: 10750, confidence: null}]}
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

Each caption array stays inline on its own caption node with timestamps relative to the original media file; passing the array through a generic shot prop removes the source the caption editor needs.

## Place overlays at the scope they span

- A source-synchronized HUD lives inside its shot. A sticker that continues across several cuts lives in the enclosing scene, so the end of the first cut does not unmount it; use that scene's frame coordinates.
- Successive cutaways go on a named `Cutaways` track; simultaneous visuals need separate tracks. If cutaways cover a speaking video, keep the underlying speech or deliberately separate its audio: removing an obscured video can also remove the voice.
- Group a sticker with its sound when they should move or be deleted together, keep local offsets inside the group, and give both their intended durations so the group neither cuts a sound tail nor stretches the visual over it.
- Music clips with gaps or adjacent boundaries can share one named track and stay separately editable. An item may end exactly where the next begins, but overlapping tails need separate tracks. Check natural audio durations, and do not shorten sounds just to make them fit.

## Preserve the edit when restructuring

Keep source trims, cut lengths, playback rates, caption arrays, volume envelopes and stacking order unchanged unless the user asked to change them. Moving content under a new timing boundary can change what `useCurrentFrame()` returns; preserve the source clock or adjust local offsets deliberately. Verify the full composition and connected views (not only a standalone scene), checking visuals and audio around cuts, overlay boundaries and sound tails.

## Connected compositions

A connected composition lets the user open a scene or element in its own Studio timeline while editing the implementation the parent uses. Use it for a substantial scene, a reusable card, or a group that moves together (a sticker with its sound, a summary graphic). Layout containers and decorative details stay plain HTML inside it.

1. Export the component with `Interactive.create()`: `layout: 'absolute-fill'` for a scene (return a fragment; background and alignment styles go on the instance), `layout: 'none'` for a bounded element (forward `style` to its plain root).
2. Render that exported component in the parent with its instance props inline. Put timing on it, or on the shared `Sequence` / `TransitionSeries.Sequence` that governs its layers.
3. Register the exact same exported reference in `<Composition component={...}>` with a unique literal `id`, inline metadata and representative inline `defaultProps`. Registering an inner component or an inline wrapper does not connect the instance the user sees.

```tsx
import type React from 'react';
import {Interactive} from 'remotion';

const TitleInner = ({children, style}: {readonly children: React.ReactNode; readonly style: React.CSSProperties}) => (
  <h1 style={{margin: 0, ...style}}>{children}</h1>
);

export const Title = Interactive.create({
  Component: TitleInner,
  layout: 'none',
  schema: {...Interactive.textSchema, ...Interactive.childrenSchema},
});
```

The parent is not mounted when the standalone composition opens, so load fonts inside the component (or a shared imported module), keep typography there, and supply representative content, background and alignment in the registration's defaults (they do not apply to parent instances). Match the parent's fps and dimensions unless intended. Preserve the source-time offset (not just duration) when captions or overlays read original-media frames; the instance's placement in the parent timeline normally does not belong in standalone defaults.

Pre-compose request: move the selected markup into a named component and register it. If the selection already has a meaningful timing wrapper, keep that wrapper and its props in place and extract its contents. Preserve trim, speed, stacking order, inherited styles and the duration needed by sound tails. A new component file without its registration does not complete the connection.

Verify both views: open the full composition and the standalone one, check that the group looks and sounds the same, that its timeline has useful editing units, and that double-clicking the parent instance opens the intended composition. For a refactor compare representative frames, cut boundaries, captions, entrance animations and audio tails. A connection gives editing boundaries, not fewer timeline rows; do not add wrappers or hide editable layers just to force a compact view.
