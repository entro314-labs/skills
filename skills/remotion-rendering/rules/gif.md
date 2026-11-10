# Rendering GIFs

Source: https://www.remotion.dev/docs/render-as-gif.md

```bash
npx remotion render MyComp out/loop.gif --codec=gif
```

Programmatic: `renderMedia({ ..., codec: "gif" })`.

## Frame rate: `--every-nth-frame`

GIFs normally use a lower frame rate than video.

| Value | Result |
|-------|--------|
| `1` (default) | every frame |
| `2` | every second frame (a 30 fps composition becomes a 15 fps GIF) |
| `3` | every third frame |

The first frame is always included. With a custom frame range the count starts at the beginning of that range, not at frame 0. Option names: `--every-nth-frame`, `everyNthFrame` (in `renderMedia()`), `Config.setEveryNthFrame()`.

## Looping: `--number-of-gif-loops`

| Value | Result |
|-------|--------|
| omitted / `null` | loops forever |
| `0` | no looping |
| `1` | plays twice in total |
| `2` | plays three times |

Option names: `--number-of-gif-loops`, `numberOfGifLoops`, `Config.setNumberOfGifLoops()`.

```bash
npx remotion render MyComp out/loop.gif --codec=gif --every-nth-frame=2 --number-of-gif-loops=0
```

## Other notes

- GIFs have no audio.
- For a transparent GIF set the image format to `png` (`--image-format=png`).
- GIF files are large; for a short web loop, a `vp9` WebM or `h264` MP4 is usually much smaller.
- Showing an existing GIF inside a composition (`<AnimatedImage>`, `<Gif>`) is an asset topic, covered in `remotion-core`.
