# Rendering transparent videos

Remotion renders transparent video in two ways: ProRes (for video editing software) or WebM with VP9 (for browsers). Both need PNG frames and an alpha-capable pixel format.

## Transparent ProRes

Ideal for importing into video editing software.

CLI:

```bash
npx remotion render --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444 MyComp out.mov
```

Default in the Studio (restart the Studio after changing):

```ts
// remotion.config.ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setPixelFormat("yuva444p10le");
Config.setCodec("prores");
Config.setProResProfile("4444");
```

Default export settings for a single composition, via `calculateMetadata`:

```tsx
import { CalculateMetadataFunction } from "remotion";

const calculateMetadata: CalculateMetadataFunction<Props> = async () => {
  return {
    defaultCodec: "prores",
    defaultVideoImageFormat: "png",
    defaultPixelFormat: "yuva444p10le",
    defaultProResProfile: "4444",
  };
};

<Composition
  id="my-video"
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
  calculateMetadata={calculateMetadata}
/>;
```

## Transparent WebM (VP9)

Ideal for playing in a browser.

CLI:

```bash
npx remotion render --image-format=png --pixel-format=yuva420p --codec=vp9 MyComp out.webm
```

Default in the Studio (restart the Studio after changing):

```ts
// remotion.config.ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");
Config.setPixelFormat("yuva420p");
Config.setCodec("vp9");
```

Default export settings for a single composition:

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async () => {
  return {
    defaultCodec: "vp9",
    defaultVideoImageFormat: "png",
    defaultPixelFormat: "yuva420p",
  };
};
```

The official plugin's WebM `calculateMetadata` example returns `defaultCodec: "vp8"` while its CLI example uses `vp9`; both are WebM codecs. This file uses `vp9` throughout so CLI, config and composition defaults agree.

## Programmatic

```ts
await renderMedia({
  composition,
  serveUrl,
  codec: "prores",
  proResProfile: "4444",
  imageFormat: "png",
  pixelFormat: "yuva444p10le",
  outputLocation: "out/overlay.mov",
});
```

## Notes

- Transparency requires `png` frames; the default `jpeg` has no alpha channel. PNG is slower, so only use it when alpha is needed.
- The composition itself must not paint an opaque background. Remove any `backgroundColor` on the root `AbsoluteFill`.
- Animated GIF transparency also needs `png` frames; see [gif](gif.md).
- Verify the result over a non-black background; a black preview hides a missing alpha channel.
