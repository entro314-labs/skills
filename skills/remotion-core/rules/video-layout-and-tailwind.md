# Video layout rules and Tailwind

You are designing a video, not a webpage.

- Decide what the viewer should notice first in each scene and build the frame around that one thing.
- Keep important content inside a generous safe area. For 1080px-wide videos, keep key text at least 80px from the sides and 100px from the top and bottom.
- Do not add redundant elements.
- Rough minimums for 1080px-wide compositions: main headline 84px, important supporting text 44px. Scale these with composition width.
- Never use emoji characters as visual elements. Use inline SVG, a lightweight icon set, or an icon font loaded explicitly (see [fonts.md](fonts.md)); prefer geometric CSS/SVG primitives for decorative motion.
- Limit how many properties animate at once for readability. Scale + opacity + position is the default set before reaching for complex effects.

## Tailwind

Use TailwindCSS if it is installed in the project. It must be installed and enabled first in a Remotion project (the scaffold flag `--no-tailwind` is used by default, so enable it deliberately; see https://www.remotion.dev/docs/tailwind).

Never use `transition-*` or `animate-*` classes; animate with `useCurrentFrame()` (see [animation-timing.md](animation-timing.md)). Static utility classes for layout, spacing and color are fine.
