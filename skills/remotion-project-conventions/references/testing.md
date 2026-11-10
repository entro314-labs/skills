# Testing Remotion code with Vitest

## Principles

- Vitest for all tests (native ESM and TypeScript). Place tests in `__tests__/` or colocate as `*.test.ts(x)`.
- Test behavior, not implementation: "returns the right frame count", not "sets internal state to done". Descriptive names: `returns 404 when video not found`.
- Unit tests run in milliseconds. Never render real video in a unit test; mock the bundler/renderer and Remotion hooks.
- During development finish the feature first, then add tests at logical completion points covering the critical paths: animation math, frame/duration calculations, `calculateMetadata`, schema validation, and any render orchestration code.
- For a bug fix, write the reproducing test first.
- Visual correctness is checked in Studio or with `npx remotion still` (see `remotion-rendering`), not in unit tests.

## 1. Pure helpers (best value)

Animation helpers and frame calculations are plain functions; test them directly.

```ts
import {describe, expect, test} from 'vitest';
import {fadeIn} from '@/lib/animations';

describe('fadeIn', () => {
  test('is 0 before the animation starts and clamps at 1 after it ends', () => {
    expect(fadeIn(-5, 15)).toBe(0);
    expect(fadeIn(0, 15)).toBe(0);
    expect(fadeIn(15, 15)).toBe(1);
    expect(fadeIn(100, 15)).toBe(1);
  });
});
```

Use real `remotion` for `interpolate`, `spring` and `Easing`; they are pure and need no mock. `spring()` needs `fps` and `frame` arguments, so pass them explicitly in tests.

## 2. Components: mock the hooks

`useCurrentFrame()` and `useVideoConfig()` need a Remotion context. Mock only those and keep the rest of the module real, then render with `react-dom/server` (no DOM environment needed).

```tsx
import {renderToStaticMarkup} from 'react-dom/server';
import {beforeEach, describe, expect, test, vi} from 'vitest';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {IntroSequence} from '@/components/IntroSequence';

vi.mock('remotion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('remotion')>();
  return {...actual, useCurrentFrame: vi.fn(), useVideoConfig: vi.fn()};
});

describe('IntroSequence', () => {
  beforeEach(() => {
    // Return only the fields the component reads.
    vi.mocked(useVideoConfig).mockReturnValue({
      fps: 30,
      width: 1080,
      height: 1920,
      durationInFrames: 150,
    } as ReturnType<typeof useVideoConfig>);
  });

  test('is transparent on the first frame and opaque after the fade', () => {
    vi.mocked(useCurrentFrame).mockReturnValue(0);
    expect(renderToStaticMarkup(<IntroSequence title="Hi" />)).toContain('opacity:0');

    vi.mocked(useCurrentFrame).mockReturnValue(60);
    expect(renderToStaticMarkup(<IntroSequence title="Hi" />)).toContain('opacity:1');
  });
});
```

The `as ReturnType<...>` cast is acceptable only in test mocks. Components that use `<Sequence>` or media components may need Remotion's internal contexts; test the inner scene component instead, or check the result in Studio.

## 3. calculateMetadata and schemas

`calculateMetadata` is an async pure function of props: call it directly and assert the returned `durationInFrames`, `width`, `height` and `props`. Mock `fetch` or media-metadata helpers with `vi.fn()`/`vi.stubGlobal`. Test Zod schemas with `safeParse` for valid and invalid props.

## 4. Render orchestration (server code)

For code that calls `@remotion/bundler` and `@remotion/renderer` (for example an API endpoint that renders on request), mock both packages and assert on arguments and results. Verify the API names against the installed Remotion version before writing the mocks.

```ts
import {describe, expect, test, vi} from 'vitest';
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import {renderVideo} from '../render';

vi.mock('@remotion/bundler');
vi.mock('@remotion/renderer');

describe('renderVideo', () => {
  test('renders the requested composition to the output path', async () => {
    vi.mocked(bundle).mockResolvedValue('/tmp/bundle');
    vi.mocked(selectComposition).mockResolvedValue({durationInFrames: 150} as never);
    vi.mocked(renderMedia).mockResolvedValue(undefined as never);

    const result = await renderVideo({month: 1, year: 2024}, '/tmp/out.mp4');

    expect(renderMedia).toHaveBeenCalledWith(
      expect.objectContaining({serveUrl: '/tmp/bundle', outputLocation: '/tmp/out.mp4'}),
    );
    expect(result.outputPath).toBe('/tmp/out.mp4');
  });

  test('rejects an invalid month before rendering', async () => {
    await expect(renderVideo({month: 13, year: 2024}, '/tmp/out.mp4')).rejects.toThrow('Invalid month');
    expect(renderMedia).not.toHaveBeenCalled();
  });
});
```

The `as never` casts above are acceptable only in test mocks of third-party return types; keep them out of production code. For HTTP endpoints, assert status codes and response bodies (`404` for unknown resources, `400` for invalid input) with the framework's own test client.

## Bad examples

```ts
test('it works', () => {          // vague name
  const r = render();
  expect(r.internal.state).toBe('done'); // asserts implementation detail
});
```
