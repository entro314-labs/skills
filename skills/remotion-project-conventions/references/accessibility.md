# Accessibility and readability for video

Video has no tab order or screen-reader tree, so accessibility means legibility, pacing and alternatives. Apply these when choosing colors, type sizes and durations.

## Rules

- **Contrast**: at least 4.5:1 for normal text against its actual background (3:1 for large text, WCAG AA). Check against the busiest part of the background (gradients, footage, images), not just the average. Over footage, add a scrim, shadow or solid panel.
- **Type size**: scale with composition width. Rough minimums for a 1080px-wide composition: headline 84px, important supporting text 44px; body text should not go below about 48px on a vertical 1080x1920 canvas. Multiply by `width / 1080` for other widths. Prefer heavier weights for small text.
- **Safe area**: keep key text at least 80px from the sides and 100px from the top and bottom (for 1080px width), scaled with composition width. Platform UI overlays (captions, buttons) cover edges on social formats.
- **Reading time**: give short text at least 3 seconds on screen after its animation finishes; longer text needs proportionally longer. Do not stack several new text blocks at once; one thing to notice per scene.
- **Text alternatives**: every fact conveyed only visually also appears as text. Pair icons, emoji and star glyphs with a label or number (`4.5` next to the stars, not stars alone).
- **Emoji rendering**: make sure an emoji-capable font (for example Noto Color Emoji) is available to the render machine, otherwise glyphs render as boxes or differ per OS. Never rely on emoji alone.
- **Motion**: use smooth easing (`Easing.bezier`, `spring` with damping) from your shared animation helpers; avoid abrupt jumps and large fast-moving elements. Never flash more than three times per second (photosensitive seizure risk) and avoid full-screen strobing effects.
- **Hierarchy**: communicate importance with size, color and position, not color alone (do not rely on red vs green to carry meaning).
- **Speech**: add captions for any spoken audio.
- **Do not use color as the only differentiator** in charts: add labels, patterns or direct value annotations.

## Example

```tsx
import {theme} from '@/lib/theme';

// Good: high contrast, large text, icon plus numeric value
export const Rating: React.FC<{readonly rating: number}> = ({rating}) => (
  <div
    style={{
      backgroundColor: theme.colors.background, // dark
      color: theme.colors.text, // light
      fontSize: 64,
      padding: 40,
    }}
  >
    ⭐ {rating.toFixed(1)}
  </div>
);

// Bad: low contrast, small text, emoji only
<div style={{color: '#666', fontSize: 24}}>⭐⭐⭐⭐</div>
```

Verify contrast numerically when picking theme tokens (any WCAG contrast calculator), and review at least one still per scene at final output size before rendering the full video.
