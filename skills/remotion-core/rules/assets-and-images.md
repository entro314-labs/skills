# Assets, images and animated images

## Assets

Place assets in the `public/` folder at the project root and reference them with `staticFile()`, which returns an encoded URL that also works when the site is deployed to a subdirectory (special characters such as `#`, `?`, `&` in file names are encoded). Remote URLs can be passed directly; they must have CORS enabled.

```tsx
import {AnimatedImage, CanvasImage, staticFile} from 'remotion';
import {Audio, Video} from '@remotion/media';

export const MyComposition = () => {
  return (
    <>
      <Video src={staticFile('video.mp4')} style={{opacity: 0.5}} />
      <Audio src={staticFile('audio.mp3')} />
      <CanvasImage src={staticFile('logo.png')} style={{width: 100, height: 100}} />
      <Video src="https://remotion.media/video.mp4" />
      <AnimatedImage src={staticFile('nyancat.gif')} />
    </>
  );
};
```

Video and audio: `<Video>` and `<Audio>` from `@remotion/media` ([embedding-video-and-audio.md](embedding-video-and-audio.md)). Remotion's media components wait for the asset to load before the frame is captured; plain HTML `<img>`, Next.js `<Image>` and CSS `background-image` do not, and cause blank or flickering frames.

## Images

- `<Img>` from `remotion` is the HTML-image component; it supports `effects`, timing props and `crop*` props.
- `<CanvasImage>` from `remotion` draws the image on a canvas and is the recommended default for new images; it also accepts `effects`, timing and crop props.

Size and position with `style`:

```tsx
<Img
  src={staticFile('photo.png')}
  style={{width: 500, height: 300, position: 'absolute', top: 100, left: 50, objectFit: 'cover'}}
/>
```

Dynamic paths with template literals cover image sequences, per-user avatars, theme icons and state-dependent graphics:

```tsx
import {Img, staticFile, useCurrentFrame} from 'remotion';

const frame = useCurrentFrame();

<Img src={staticFile(`frames/frame${frame}.png`)} />; // image sequence
<Img src={staticFile(`avatars/${props.userId}.png`)} />; // chosen by props
<Img src={staticFile(`icons/${isActive ? 'active' : 'inactive'}.svg`)} />; // conditional
```

Image dimensions (for aspect ratios or sizing a composition) come from `@remotion/media-utils`:

```tsx
import {getImageDimensions} from '@remotion/media-utils';
import {CalculateMetadataFunction, staticFile} from 'remotion';

const calculateMetadata: CalculateMetadataFunction = async () => {
  const {width, height} = await getImageDimensions(staticFile('photo.png'));
  return {width, height};
};
```

Cropping and effects on images: [cropping.md](cropping.md), [effects.md](effects.md).

## Animated images: GIF, APNG, AVIF, WebP

`<AnimatedImage>` from `remotion` plays them in sync with the timeline. It works in Chrome and Firefox only; elsewhere use `<Gif>` from `@remotion/gif` (same props, GIF files only).

```tsx
import {AnimatedImage, staticFile} from 'remotion';

<AnimatedImage src={staticFile('animation.gif')} width={500} height={300} fit="contain" />;
```

- `fit`: `"fill"` (default, stretches), `"contain"` (keeps aspect ratio, fits inside), `"cover"` (fills, crops).
- `playbackRate`: `2` for double speed, `0.5` for half.
- `loopBehavior`: `"loop"` (default), `"pause-after-finish"` (play once, hold the last frame), `"clear-after-finish"` (play once, then clear).
- Size with the `width` and `height` props; use `style` for other CSS (`borderRadius`, `position`, ...).

Match the composition to a GIF's length with `getGifDurationInSeconds()` (`npx remotion add @remotion/gif`):

```tsx
import {getGifDurationInSeconds} from '@remotion/gif';
import {CalculateMetadataFunction, staticFile} from 'remotion';

const calculateMetadata: CalculateMetadataFunction = async () => {
  const duration = await getGifDurationInSeconds(staticFile('animation.gif'));
  return {durationInFrames: Math.ceil(duration * 30)};
};
```

Pre-resize large images to the dimensions they are shown at; oversized images slow rendering.
