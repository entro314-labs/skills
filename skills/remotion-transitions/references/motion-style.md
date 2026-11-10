# Motion style principles

Generic rules for a consistent, branded motion look in short vertical videos (stories, reels, shorts). Replace every value with the production's own tokens.

## Tokens in one file

Keep palette and fonts in a single module and import them everywhere. Use one dominant accent color against a near-black or near-white background; a muted gray for secondary text. Do not use colors outside the palette.

```ts
import {loadFont as loadBody} from '@remotion/google-fonts/DMSans';
import {loadFont as loadHeading} from '@remotion/google-fonts/InstrumentSerif';

const {fontFamily: body} = loadBody();
const {fontFamily: heading} = loadHeading('italic');

export const colors = {accent: '#cdff3d', background: '#050508', text: '#ffffff', muted: '#888888'};
export const fonts = {heading: `${heading}, serif`, body: `${body}, sans-serif`};
```

Load web fonts through `@remotion/google-fonts` (not system fonts) so renders are reproducible. Pick one display face for headings and one text face for body, and apply the heading style (e.g. italic) consistently.

## Format

Vertical story: 1080x1920, 30 fps, about 5 seconds (150 frames) per story, solid background from the palette.

## Entrance choreography

Reveal elements in a fixed top-to-bottom order with a stagger, each starting after the previous one has begun:

1. Tag or label (frames 0-15): fade in and slide down from slightly above.
2. Hero graphic (from frame 15): scale in with a spring from 0.
3. Title (frames 30-50): fade in and slide up from slightly below.
4. Supporting lines (frames 60, 90, 120): fade in one by one, about 20 frames each.

Use springs for position and scale, `interpolate()` with clamping for opacity:

```tsx
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const tagOpacity = interpolate(frame, [0, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const tagY = spring({frame, fps, from: -50, to: 0, config: {damping: 15}});
const heroScale = spring({frame, fps, delay: 15, config: {damping: 10}});
const titleY = spring({frame, fps, delay: 30, from: 30, to: 0, config: {damping: 15}});
```

`damping: 15` is a good default for UI-like motion (settles with a small overshoot); lower damping (about 10) for playful pops; `damping: 200` for no overshoot.

## Idle pulse

Loop a gentle pulse on a hero graphic once it has landed, driven by the frame (never by CSS animation):

```tsx
const pulse = interpolate(frame % 60, [0, 30, 60], [1, 1.1, 1]);
// style={{scale: heroScale * pulse}}
```

## Icons and emoji

Remotion renders in a headless browser, so system emoji and icon fonts are unreliable. Use inline SVG paths for brand/glyph icons and image assets bundled in `public/` (loaded with `staticFile()`) for emoji or illustrations, so renders do not depend on the network.

## Guardrails

- No CSS transitions or animations; all motion derives from `useCurrentFrame()`.
- Always clamp `interpolate()`.
- Keep text large enough for a phone (headings around 68 px, supporting lines around 38 px on a 1080-wide canvas) and inside the platform's safe area.
- Use the accent color sparingly for emphasis words, tags, and highlights.
