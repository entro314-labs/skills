# calculateMetadata: dynamic duration, dimensions and props

Use `calculateMetadata` on a `<Composition>` to set duration, dimensions and transformed props before rendering, when they depend on input props, fetched data or asset metadata. For static values, inline them on `<Composition>` instead. The function runs outside the component (it cannot call `useVideoConfig()`), once before rendering begins, and Studio re-runs it when props change.

```tsx
<Composition
  id="MyComp"
  component={MyComponent}
  durationInFrames={300} // placeholder, overridden by calculateMetadata
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{videoSrc: 'https://remotion.media/video.mp4'}}
  calculateMetadata={calculateMetadata}
/>
```

Media helpers (`getVideoDuration`, `getVideoDimensions`, `getAudioDuration`) are in [mediabunny-and-ffmpeg.md](mediabunny-and-ffmpeg.md). Duration is `Math.ceil(seconds * fps)`; use the composition's fps.

## Duration from a video

```tsx
import {CalculateMetadataFunction} from 'remotion';
import {getVideoDuration} from './get-video-duration';

const calculateMetadata: CalculateMetadataFunction<Props> = async ({props}) => {
  const durationInSeconds = await getVideoDuration(props.videoSrc);
  return {durationInFrames: Math.ceil(durationInSeconds * 30)};
};
```

## Match a video's dimensions

```tsx
import {getVideoDimensions} from './get-video-dimensions';

const calculateMetadata: CalculateMetadataFunction<Props> = async ({props}) => {
  const dimensions = await getVideoDimensions(props.videoSrc);
  return {width: dimensions.width, height: dimensions.height};
};
```

## Duration from several files

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({props}) => {
  const durations = await Promise.all(props.videos.map((video) => getVideoDuration(video.src)));
  const total = durations.reduce((sum, seconds) => sum + seconds, 0);
  return {durationInFrames: Math.ceil(total * 30)};
};
```

If the composition uses `TransitionSeries`, subtract the transition overlaps from the total (see the `remotion-transitions` skill).

## Sizing the timeline from pre-generated audio

For per-scene narration files in `public/`, measure each with `getAudioDuration(staticFile(file))` (see [mediabunny-and-ffmpeg.md](mediabunny-and-ffmpeg.md)), convert with `Math.ceil(seconds * fps)` (use a constant equal to the composition's fps; `calculateMetadata` cannot call hooks), and return the sum as `durationInFrames`. Pass the per-scene durations to the component as a prop. Subtract transition overlaps when using `TransitionSeries`.

## Match an image or animated GIF

`getImageDimensions()` from `@remotion/media-utils` gives an image's width and height; `getGifDurationInSeconds()` from `@remotion/gif` gives a GIF's duration. See [assets-and-images.md](assets-and-images.md).

## Default output name

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({props}) => {
  return {defaultOutName: `video-${props.id}`}; // the file extension is added automatically
};
```

## Fetch or transform props

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({props, abortSignal}) => {
  const response = await fetch(props.dataUrl, {signal: abortSignal});
  const data = await response.json();
  return {props: {...props, fetchedData: data}};
};
```

`abortSignal` cancels stale requests when props change in Studio.

## Return value

All fields are optional; returned values override the `<Composition>` props:

- `durationInFrames`, `width`, `height`, `fps`
- `props`: transformed props passed to the component
- `defaultOutName`: default output filename
- `defaultCodec`: default render codec (transparent-video defaults such as `defaultVideoImageFormat` and `defaultPixelFormat` are covered by the `remotion-rendering` skill)
