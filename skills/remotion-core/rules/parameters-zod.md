# Parameterized videos with a Zod schema

A Zod schema on a composition lets the user edit its props visually in the Studio sidebar and validates props passed at render time.

Install `zod` with `npx remotion add zod` (use `bunx`, `yarn` or `pnpm exec` for those package managers) so the version matches what the installed Remotion expects.

Define the schema next to the component and derive the prop type from it:

```tsx title="src/MyComposition.tsx"
import {z} from 'zod';

export const MyCompositionSchema = z.object({
  title: z.string(),
});

export const MyComponent: React.FC<z.infer<typeof MyCompositionSchema>> = ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
```

Pass it to the composition (keep `defaultProps` an inline literal, see [compositions.md](compositions.md)):

```tsx title="src/Root.tsx"
import {Composition} from 'remotion';
import {MyComponent, MyCompositionSchema} from './MyComposition';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComponent}
      durationInFrames={100}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{title: 'Hello World'}}
      schema={MyCompositionSchema}
    />
  );
};
```

Every schema Zod supports works, but the top level must be `z.object()`, because a React component's props are always an object.

## Color picker

Use `zColor()` from `@remotion/zod-types` (`npx remotion add @remotion/zod-types`):

```tsx
import {zColor} from '@remotion/zod-types';

export const MyCompositionSchema = z.object({
  color: zColor(),
});
```
