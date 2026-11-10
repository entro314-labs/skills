# Codecs, quality and output formats

Source: https://www.remotion.dev/docs/encoding.md

The default codec is `h264`; the output file extension selects a default codec, and `--codec` overrides it when the combination is valid.

## Codecs

| Codec | Extensions | File size | Encode speed | Browser support | Hardware acceleration |
|-------|-----------|-----------|--------------|-----------------|------------------------|
| `h264` | .mp4, .mov, .mkv | medium | very fast | very good | macOS, Linux, Windows (NVIDIA) |
| `h265` | .mp4, .hevc | medium | fast | very poor | macOS, Linux, Windows (NVIDIA) |
| `vp8` | .webm | small | slow | okay | no |
| `vp9` | .webm | very small | very slow | okay | no |
| `av1` | .mp4, .webm, .mkv | very small | very slow | okay | no |
| `prores` | .mov | large | fast | none (editing software) | macOS |

Other values: `h264-mkv`, `gif`, `png` (image sequence), and audio-only `mp3`, `aac`, `wav`. `av1` is not available on Linux ARM64 GNU. GIFs have no audio.

Use cases:

- General delivery, YouTube, social: `h264` in `.mp4`.
- Editing software, alpha channel: `prores` (see [transparent-videos](transparent-videos.md)).
- Browser playback with alpha: `vp9` in `.webm`.
- Short loops: `gif` (see [gif](gif.md)).

## CRF (constant rate factor)

Applies to `h264`, `h265`, `vp8`, `vp9`, `av1`. Lower value = better quality, larger file.

| Codec | Best quality | Best compression | Default |
|-------|--------------|------------------|---------|
| h264 | 1 | 51 | 18 |
| h265 | 0 | 51 | 23 |
| vp8 | 4 | 63 | 9 |
| vp9 | 0 | 63 | 28 |
| av1 | 0 | 63 | 30 |

```bash
# Smaller file than the default
npx remotion render MyComp out.mp4 --crf=23
# Higher quality than the default
npx remotion render MyComp out.mp4 --crf=15
```

`--crf` cannot be combined with `--video-bitrate` or with hardware acceleration. ProRes has no CRF; choose a profile with `--prores-profile`.

## Bitrate

```bash
npx remotion render MyComp out.mp4 --video-bitrate=8M --audio-bitrate=512K
```

Bitrate options cannot be combined with other quality options.

## Hardware acceleration

Available from v4.0.228 for `h264` and `h265` on supported platforms (table above). When enabled, set `videoBitrate` instead of `crf`. In `renderMedia()` the option is `hardwareAcceleration`.

## Frame image format

Chrome captures each frame as an image before encoding.

- `jpeg` (default): faster. `--jpeg-quality` (0-100, default decided by the browser, currently 80) controls it.
- `png`: slower, lossless, required for any transparent output.
- On Apple Silicon and Linux with Headless Shell, Remotion v4.0.534+ may capture frames without JPEG compression even when `jpeg` is selected.

## Audio

- `--muted` renders no audio. `--enforce-audio-track` always writes an audio track.
- ProRes defaults to `pcm-16` audio (it was `aac` before v4.0.0).
- `--audio-codec` selects the audio codec (v3.3.42+), subject to the codec/extension table in the encoding docs.

## Image sequences and stills

```bash
# Every frame as a PNG
npx remotion render MyComp out/frames --sequence --image-format=png
# A single frame
npx remotion still MyComp out/thumb.png --frame=0
```

Still formats from the Node.js API: `png` (default), `jpeg`, `webp`, `pdf`.

## Platform output sizes

Remotion renders whatever the composition's `width` x `height` is; `--scale` multiplies it. Pick the composition size for the target platform (for example 1920x1080 for landscape, 1080x1920 for vertical short-form) rather than rescaling at render time.
