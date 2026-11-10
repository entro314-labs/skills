# Media metadata with Mediabunny, and FFmpeg

Mediabunny is a multimedia library for audio and video in the browser, Node.js and Bun. A compact overview of its capabilities: https://mediabunny.dev/llms.txt. Install or align it with `npx remotion add mediabunny`. The helpers below are plain functions to copy into the project (they are what [calculate-metadata.md](calculate-metadata.md) calls).

For `public/` files wrap the path in `staticFile()`; remote URLs work as they are. In Node.js and Bun read from disk with `FilePathSource` and call `input.dispose()` afterwards; for a `File` from an input or drag-and-drop use `BlobSource`.

## Duration of a video or audio file

`getVideoDuration` and `getAudioDuration` are the same function (duration in seconds):

```tsx
import {ALL_FORMATS, Input, UrlSource} from 'mediabunny';

export const getVideoDuration = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src),
  });

  const durationInSeconds = await input.computeDuration();
  return durationInSeconds;
};

// const duration = await getVideoDuration(staticFile('video.mp4')); // e.g. 10.5
```

Node.js / Bun:

```tsx
import {ALL_FORMATS, FilePathSource, Input} from 'mediabunny';

const input = new Input({formats: ALL_FORMATS, source: new FilePathSource('video.mp4')});
const durationInSeconds = await input.computeDuration();
input.dispose(); // closes the file handle
```

## Video dimensions

```tsx
import {ALL_FORMATS, Input, UrlSource} from 'mediabunny';

export const getVideoDimensions = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src),
  });

  const videoTrack = await input.getPrimaryVideoTrack();
  if (!videoTrack) {
    throw new Error('No video track found');
  }

  return {width: videoTrack.displayWidth, height: videoTrack.displayHeight};
};
```

With a `File`: `new Input({formats: ALL_FORMATS, source: new BlobSource(file)})`, then the same `getPrimaryVideoTrack()` calls.

## Can the browser decode this file?

```tsx
import {ALL_FORMATS, Input, UrlSource} from 'mediabunny';

export const canDecode = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {getRetryDelay: () => null}),
  });

  try {
    await input.getFormat();
  } catch {
    return false;
  }

  const videoTrack = await input.getPrimaryVideoTrack();
  if (videoTrack && !(await videoTrack.canDecode())) {
    return false;
  }

  const audioTrack = await input.getPrimaryAudioTrack();
  if (audioTrack && !(await audioTrack.canDecode())) {
    return false;
  }

  return true;
};
```

For a `File` or `Blob` upload swap `UrlSource` for `BlobSource` and keep the same checks.

## Extract frames at timestamps (thumbnails, filmstrips)

Browser-side. Calls `onVideoSample` for each requested timestamp; supports a computed timestamp list and an `AbortSignal`. The `using` declarations need a TypeScript/runtime that supports explicit resource management; otherwise dispose the input yourself with `input.dispose()`.

```tsx
import {ALL_FORMATS, Input, UrlSource, VideoSample, VideoSampleSink} from 'mediabunny';

type Options = {
  track: {width: number; height: number};
  container: string;
  durationInSeconds: number | null;
};

export type ExtractFramesTimestampsInSecondsFn = (options: Options) => Promise<number[]> | number[];

export type ExtractFramesProps = {
  src: string;
  timestampsInSeconds: number[] | ExtractFramesTimestampsInSecondsFn;
  onVideoSample: (sample: VideoSample) => void;
  signal?: AbortSignal;
};

export async function extractFrames({src, timestampsInSeconds, onVideoSample, signal}: ExtractFramesProps): Promise<void> {
  using input = new Input({formats: ALL_FORMATS, source: new UrlSource(src)});

  const [durationInSeconds, format, videoTrack] = await Promise.all([
    input.computeDuration(),
    input.getFormat(),
    input.getPrimaryVideoTrack(),
  ]);

  if (!videoTrack) {
    throw new Error('No video track found in the input');
  }
  if (signal?.aborted) {
    throw new Error('Aborted');
  }

  const timestamps =
    typeof timestampsInSeconds === 'function'
      ? await timestampsInSeconds({
          track: {width: videoTrack.displayWidth, height: videoTrack.displayHeight},
          container: format.name,
          durationInSeconds,
        })
      : timestampsInSeconds;

  if (timestamps.length === 0) {
    return;
  }
  if (signal?.aborted) {
    throw new Error('Aborted');
  }

  const sink = new VideoSampleSink(videoTrack);

  for await (using videoSample of sink.samplesAtTimestamps(timestamps)) {
    if (signal?.aborted) {
      break;
    }
    if (!videoSample) {
      continue;
    }
    onVideoSample(videoSample);
  }
}
```

Usage: draw each sample to a canvas with `sample.draw(ctx, 0, 0)` after sizing the canvas to `sample.displayWidth` x `sample.displayHeight`.

```tsx
await extractFrames({
  src: 'https://remotion.media/video.mp4',
  timestampsInSeconds: [0, 1, 2, 3, 4],
  onVideoSample: (sample) => {
    const canvas = document.createElement('canvas');
    canvas.width = sample.displayWidth;
    canvas.height = sample.displayHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2D context');
    sample.draw(ctx, 0, 0);
  },
});
```

For a filmstrip pass a function as `timestampsInSeconds` that spreads `n` timestamps across the wanted range, where `n = Math.ceil(canvasWidth / (canvasHeight * (track.width / track.height)))` and each timestamp is `from + ((to - from) / n) * (i + 0.5)`. To bound the work, pass an `AbortController` signal and abort it from a timeout.

## FFmpeg

`ffmpeg` and `ffprobe` need no separate install; use them through the Remotion CLI:

```bash
npx remotion ffmpeg -i input.mp4 output.mp3
npx remotion ffprobe input.mp4
```

Trimming a video, in order of preference:

1. Use the `trimBefore` and `durationInFrames` props of `<Video>`. Non-destructive, no re-encoding, adjustable any time (see [embedding-video-and-audio.md](embedding-video-and-audio.md)).
2. Only when a standalone trimmed file is needed (upload or external use), cut with FFmpeg and re-encode to avoid frozen frames at the start:

```bash
# Re-encodes from the exact frame: start at 5 s, keep 5 s.
# With -ss before -i, -to would be an output timestamp relative to the new start, so use -t (duration).
npx remotion ffmpeg -ss 00:00:05 -i public/input.mp4 -t 00:00:05 -c:v libx264 -c:a aac public/output.mp4
```
