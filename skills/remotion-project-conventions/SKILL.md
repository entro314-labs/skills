---
name: remotion-project-conventions
description: House conventions for writing and maintaining a Remotion (v4+) TypeScript video codebase - naming and file organization, frame-based timing, purely frame-driven functional components, inline styles with shared theme constants (or Tailwind without CSS animation classes), accessibility rules for video (contrast, text size, safe area, reading time, flashing), and Vitest testing with mocked Remotion hooks and renderer packages. Use when creating or refactoring .ts/.tsx files in a Remotion project, designing scene components, styling compositions, reviewing a video for readability, or writing tests for animation helpers, components, calculateMetadata or render code.
---

# Remotion project conventions

Defaults for a Remotion codebase. Remotion API details (hooks, `interpolate`, `Sequence`, fonts, assets) live in `remotion-core`; rendering in `remotion-rendering`. If the project already has its own convention, follow it and use this as the fallback.

## Naming and organization

- camelCase for variables and functions (`frameCount`), PascalCase for components, types and interfaces (`IntroSequence`), UPPER_SNAKE_CASE for module constants (`INTRO_DURATION`, `VIDEO_CONFIG`).
- Descriptive, intent-revealing names. Abbreviate only standard video terms (`fps`, `codec`).
- Two-space indentation, ESLint with TypeScript rules.
- Small, focused functions. One scene per component file; the composition file only assembles scenes.
- Suggested layout: `src/Root.tsx` (registrations), `src/compositions/<Name>/index.tsx` (assembles scenes), `src/components/` (reusable visuals), `src/lib/animations.ts` (pure animation helpers), `src/lib/theme.ts` (design tokens).
- Import through the `@/` alias only if the project already configures it for both TypeScript and the Remotion bundler; otherwise use relative imports. Never mix the two styles in one project.
- Delete dead code, commented-out blocks and unused imports. Do not add backward-compatibility shims unless asked.
- Extract an animation to `src/lib/animations.ts` or a visual to `src/components/` when a second use appears, not before.

## Timing: frames, derived from fps

- Never use milliseconds in timing logic. Durations and offsets are frames.
- Inside components, read `fps` from `useVideoConfig()` and write `Math.round(seconds * fps)` (or `2 * fps`), so timing stays correct if the frame rate changes. Do not hardcode `30`.
- Module-level constants are allowed when the frame rate is also a constant:

```ts
// src/lib/config.ts
export const VIDEO_CONFIG = {fps: 30, width: 1080, height: 1920} as const;
export const INTRO_DURATION = 2.5 * VIDEO_CONFIG.fps; // 75 frames
```

- Do not pass `startFrame` props to children for timing. Place children in `<Sequence from={...}>`; inside it `useCurrentFrame()` is already relative to the sequence start, so scenes animate from frame 0 and are reusable.
- Animation helpers are pure functions of numbers (frame in, number out) so they can be unit-tested:

```ts
// src/lib/animations.ts
import {interpolate} from 'remotion';

export const fadeIn = (frame: number, durationInFrames: number): number =>
  interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
```

Always pass `extrapolateLeft`/`extrapolateRight: 'clamp'` unless overshoot is intended.

## Component patterns

- Functional components whose output is a pure function of `useCurrentFrame()`, `useVideoConfig()` and props. CSS `transition`/`animation` and Tailwind `transition-*`/`animate-*` classes do not render correctly; animate with `interpolate()`/`spring()`.
- Do not hold animation state in `useState`/`useEffect`; frames can be rendered independently and out of order, so derive everything from the frame. Asynchronous data belongs in `calculateMetadata` or `delayRender`/`continueRender`, not ad-hoc state.
- Explicit prop types for every component. Use `type` aliases (not `interface`) for composition props so `defaultProps` stay type-safe; mark props `readonly`.
- Single responsibility: one scene component per video segment (`IntroSequence`, `StatsReveal`); compose them in the composition file.
- Props must be JSON-serializable when they come from `defaultProps`/`inputProps`; no functions or class instances.

```tsx
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '@/lib/theme';

type IntroSequenceProps = {
  readonly title: string;
};

export const IntroSequence: React.FC<IntroSequenceProps> = ({title}) => {
  const frame = useCurrentFrame(); // relative to the enclosing <Sequence>
  const {fps} = useVideoConfig();

  return (
    <h1
      style={{
        color: theme.colors.text,
        fontFamily: theme.fonts.primary,
        opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}
    >
      {title}
    </h1>
  );
};

// Composition: <Sequence from={0} durationInFrames={INTRO_DURATION}><IntroSequence title="..." /></Sequence>
```

Bad: `useState` toggled in an effect, time-based props (`start={2500}`), untyped props (`({start, data}) =>`).

## Styling: inline styles and theme constants

- Default to React inline style objects with camelCase properties; no external CSS files and no CSS classes for visuals. If the project has Tailwind installed, using it is fine (never its transition/animation classes).
- Put colors, fonts, spacing and type scale in one `src/lib/theme.ts`; components import tokens instead of literals.
- Lay out with `AbsoluteFill` / absolute positioning or flex; derive sizes from `useVideoConfig()` (`width`, `height`) rather than hardcoding a canvas size, so a composition survives a format change.
- Keep `interpolate()` calls inline in the `style` prop and prefer the individual `scale`, `translate`, `rotate` properties over a `transform` string (keeps values editable in Studio). Use `transform` only for `skew()`, `perspective()` or order-sensitive chains. For scale animations add `output: 'perceptual-scale'`.
- Load fonts explicitly (`@remotion/google-fonts` or local fonts); see `remotion-core`. A missing font silently falls back on the render machine.

```ts
// src/lib/theme.ts
export const theme = {
  colors: {background: '#0b0f1a', text: '#f5f7fa', accent: '#ffb347'},
  fonts: {primary: 'Inter, system-ui, sans-serif'},
  spacing: {sm: 16, md: 32, lg: 64},
} as const;
```

```tsx
// Good: tokens + size derived from the composition
const {width, height} = useVideoConfig();
<div style={{position: 'absolute', top: height * 0.2, left: width * 0.1, width: width * 0.8,
  backgroundColor: theme.colors.background, color: theme.colors.text, fontSize: 48}} />

// Bad: class names, literal colors, fixed pixel canvas
<div className="cover" style={{color: '#666', top: 384}} />
```

## Accessibility and readability

Short rules; rationale, numbers and examples in [references/accessibility.md](references/accessibility.md): contrast at least 4.5:1, text sized relative to composition width, key content inside a safe area, enough on-screen time to read, text paired with every icon or emoji, no flashing, captions for speech.

## Testing

Vitest, colocated `*.test.ts(x)` or `__tests__/`. Test pure helpers, `calculateMetadata`, schemas and server/render orchestration; mock Remotion hooks and the bundler/renderer instead of rendering video. Setup, mocking recipes and examples: [references/testing.md](references/testing.md).

Before declaring work done: run the project's typecheck/lint and tests, then check the result visually in Studio or with `npx remotion still` (see `remotion-rendering`).
