# Visual style

Design a video, not a web page: decide what the viewer should notice first in each scene and build the frame around it. Remove anything redundant.

## Safe area and type sizes

- Keep key text at least 80 px from the sides and 100 px from the top and bottom of a 1080 px composition; scale with the composition.
- Video compression and small screens destroy detail. Text that looks fine in Studio is often illegible on a phone. Go larger than feels natural.

Minimum sizes, with the reference unit `S = min(width, height)` (1080 for 1920x1080, 1080x1080 and 1080x1920):

| Element | At S = 1080 | Ratio to S |
|---|---|---|
| Main headline | 84 px | 0.078 |
| Important supporting text, skill/feature names | 44 px | 0.041 |
| Labels, captions, UI text | 28 px | 0.026 |
| Annotations (never smaller) | 24 px | 0.022 |

The official guidance states these for a 1080 px-wide composition and says to scale with width. For 1920x1080 landscape this document uses the 1080 short side as the floor; community walkthroughs shipped 72-96 px headlines and 32-36 px body text at 1920 wide, which is the lower bound for desktop viewing. If the video will be watched on phones, scale with width instead (headline about 150 px at 1920).

Write sizes as fractions of `width` or `height` from `useVideoConfig()` instead of fixed pixels when the same scene must work in several aspect ratios.

## Pacing

Too fast is the most common mistake. Viewers need time to notice a change, read, understand, and prepare for the next change. Estimate, then lengthen.

| Scene type | Minimum | Comfortable |
|---|---|---|
| Typewriter text | 3-4 s | 5-6 s |
| List appearing item by item | 4-5 s | 6-8 s |
| Selection or highlight | 3-4 s | 5 s |
| Technical diagram | 4-5 s | 6-8 s |
| Screenshot with title | 3-5 s | 5-7 s |
| Closing line or call to action | 2-3 s | 3-4 s |

- Transitions: 0.5-1 s (15-30 frames at 30 fps), one or two kinds per video, used to signal a topic change. Fade is the safe default; reserve slide and wipe for emphasis or direction ("next page", "drill down").
- Do not hard-cut between unrelated scenes. Use `TransitionSeries` (`references/walkthrough.md`) instead of overlapping `Sequence`s by hand.
- 30 fps is enough for explainers; use 60 only for fast screen motion.
- Annotations: appear when the thing they point at appears, 5-10 words, never covering what they explain, animated in with an eased `interpolate()`.

## Theme tokens

Keep colours and fonts in one module and import it everywhere. Take the palette from the project being explained when it has branding; otherwise pick one accent on a dark or light neutral. Contrast matters more than taste: body text on its background must stay readable when compressed. Fonts use `@remotion/google-fonts` (`npx remotion add @remotion/google-fonts`), which blocks rendering until the font is loaded; request only the weights and subsets you use. Use a monospace face for code and technical names and one body face for everything else; add a separate heading face only when the design needs one.

```tsx
import {loadFont as loadBody} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

const body = loadBody('normal', {weights: ['400', '600', '700'], subsets: ['latin']});
const mono = loadMono('normal', {weights: ['400', '500'], subsets: ['latin']});

/** One place for every colour and font; scenes import this and never hardcode values. */
export const theme = {
  color: {
    bg: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    muted: '#cbd5e1',
    accent: '#fbbf24',
  },
  font: {
    body: body.fontFamily,
    mono: mono.fontFamily,
  },
} as const;

/** Optional film grain. The seed changes every 4 frames so the noise moves but stays deterministic. */
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.04}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity, mixBlendMode: 'multiply'}}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={4} seed={Math.floor(frame / 4)} />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
```

## Layout

Centre content with `AbsoluteFill` and flexbox, not `position: absolute; left: 50%; top: 50%`:

```tsx
<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>{children}</AbsoluteFill>
```

Absolute positioning is still right for overlays, callouts and cameras; compute those from `useVideoConfig()` values.

## Aspect ratios

Build one component per scene that reads `width` and `height` from `useVideoConfig()` and lays out from those. Register one `<Composition>` per delivery format only when the user needs several (1920x1080 for desktop players, 1080x1080 for square feeds, 1080x1920 for vertical); do not create all three by default. Check each format in Studio: vertical needs stacked layouts, not a shrunken landscape frame.

## Common mistakes

| Mistake | Fix |
|---|---|
| Content in the top-left corner | Wrap in `AbsoluteFill` with flexbox centring |
| Tiny text | Use the table above; verify on a phone-size preview |
| Scenes vanish before they can be read | Double the first estimate; use the pacing table |
| Hard cuts everywhere | `TransitionSeries` with 0.5 s transitions |
| Screenshots of different sizes | Capture or resize everything to one size first |
| Too many transition styles | Pick one or two and stay consistent |
| Text over busy images without contrast | Gradient scrim or semi-transparent panel behind text |
| Missing assets at render time | Everything in `public/`, referenced with `staticFile()` |
| No intro or outro | A title card and a closing card make the video feel finished |
