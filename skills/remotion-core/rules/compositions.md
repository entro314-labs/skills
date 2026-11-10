# Compositions, stills, folders and default props

A `<Composition>` defines the component, width, height, fps and duration of a renderable video. Registrations live in the root component (`src/Root.tsx`).

## Source-editable registrations

Give each composition or still that should be edited independently in Studio its own authored JSX node. Use a string literal for `id`, and keep its metadata and editable default values directly on that node. Generating registrations programmatically is fine only when they are intentionally controlled as one template and do not need to be reordered, duplicated, deleted or edited individually in Studio.

```tsx title="src/MyComposition.tsx"
type Props = {
  readonly title: string;
};

export const MyComposition = ({title}: Props) => <h1>{title}</h1>;
```

```tsx title="src/Root.tsx"
import {Composition} from 'remotion';
import {MyComposition} from './MyComposition';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Launch"
        component={MyComposition}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{title: 'Launch'}}
      />
      <Composition
        id="Recap"
        component={MyComposition}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{title: 'Recap'}}
      />
    </>
  );
};
```

Both registrations reuse one component; separate JSX nodes give each its own editing target.

## Default props

`defaultProps` provides initial values. They must be JSON-serializable (`Date`, `Map`, `Set` and `staticFile()` are supported). Use them for composition-wide values that should be visible and editable before rendering.

- Keep data owned by a child editor on that child's JSX node (for example a captions array belongs inline on the caption component, not in composition `defaultProps`).
- For Studio write-back, `defaultProps` must be an inline object literal on `<Composition>` or `<Still>`: no variable, import, spread, helper call or `satisfies` wrapper, and no values derived from a loop variable.
- Declare props with `type`, not `interface`, to keep `defaultProps` type-safe.
- Static `width`, `height`, `fps` and `durationInFrames` stay inline on the node; use [`calculateMetadata`](calculate-metadata.md) only for what is dynamic.

```tsx
// Inline metadata and defaults: Studio can save edits back.
<Composition
  id="MyComposition"
  component={MyComposition}
  durationInFrames={100}
  fps={30}
  width={1080}
  height={1080}
  defaultProps={{title: 'Hello World'}}
/>

// Hidden defaults cannot be saved back by Studio.
const defaultProps = {title: 'Hello World'};
<Composition id="Other" component={MyComposition} durationInFrames={100} fps={30} width={1080} height={1080} defaultProps={defaultProps} />
```

To make props editable with typed controls in Studio, add a Zod schema: [parameters-zod.md](parameters-zod.md).

## Folders

`<Folder>` organizes compositions in the Studio sidebar. Names may contain only letters, numbers and hyphens. Folders nest.

```tsx
import {Composition, Folder} from 'remotion';

export const RemotionRoot = () => (
  <>
    <Folder name="Marketing">
      <Composition id="Promo" /* ... */ />
      <Composition id="Ad" /* ... */ />
    </Folder>
    <Folder name="Social">
      <Folder name="Instagram">
        <Composition id="Story" /* ... */ />
        <Composition id="Reel" /* ... */ />
      </Folder>
    </Folder>
  </>
);
```

## Stills

`<Still>` is a single-frame image; it needs no `durationInFrames` or `fps`.

```tsx
import {Still} from 'remotion';
import {Thumbnail} from './Thumbnail';

<Still id="Thumbnail" component={Thumbnail} width={1280} height={720} />;
```

## Dynamic duration, dimensions and props

Use [calculate-metadata.md](calculate-metadata.md).

## Nesting one composition inside another

Render the component inside a `<Sequence>`; pass `width` and `height` when the nested content needs its own dimensions.

```tsx
<>
  <Video src="https://remotion.media/video.mp4" />
  <Sequence width={1920} height={1080}>
    <OverlayComponent />
  </Sequence>
</>
```

When a nested scene should have its own editable Studio timeline, use [connected compositions](video-editing-and-connected-compositions.md).
