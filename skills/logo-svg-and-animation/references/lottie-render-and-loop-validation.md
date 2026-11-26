# Lottie structure, rendering, loop validation

## Lottie JSON essentials

Root keys: `v` version string (an example value, not a requirement), `fr` frame rate, `ip`/`op` in and out frame, `w`/`h` size in px, `layers`, `assets`.

Layer types: `ty: 2` image layer (most common for raster logos); `ty: 4` shape layer (vector geometry).

Asset entry for an image layer:

```json
{"id": "image_0", "w": 512, "h": 512, "p": "logo.png", "u": "", "e": 0}
```

`e: 0` = external file (path resolved relative to the JSON location); `e: 1` = embedded data URI in `p`.

Transform (`ks`) properties: opacity `o` is 0 to 100 (not 0 to 1), position `p` `[x, y]`, scale `s` in percent `[x, y]` (not 0 to 1), rotation `r` in degrees, anchor `a`. Static value: `{"a": 0, "k": value}`; animated: `{"a": 1, "k": [keyframes]}`. Example:

```json
"o": {"a": 1, "k": [
  {"t": 0,  "s": [0],   "i": {"x": [0.58], "y": [1]}, "o": {"x": [0.42], "y": [0]}},
  {"t": 45, "s": [100]}
]}
```

Notes: `o` handle on a keyframe is its outgoing tangent, `i` is the incoming tangent of the next keyframe, both in 0-1 normalized space. Older exporters also write an end value `e` on each keyframe; newer ones omit it and read the next keyframe's `s`. Be consistent with what the target player expects. Set the anchor point to the logo center (or the intended pivot) before scaling or rotating, or it will scale about the top-left.

Minimal shape-layer skeleton (scale 95 to 100 over 90 frames):

```json
{"fr": 60, "ip": 0, "op": 90, "w": 512, "h": 512, "assets": [],
 "layers": [{"ty": 4, "ind": 1, "ip": 0, "op": 90, "st": 0,
  "ks": {"o": {"a": 0, "k": 100}, "p": {"a": 0, "k": [256, 256, 0]},
         "a": {"a": 0, "k": [0, 0, 0]}, "r": {"a": 0, "k": 0},
         "s": {"a": 1, "k": [
           {"t": 0,  "s": [95, 95, 100], "i": {"x": [0.58], "y": [1]}, "o": {"x": [0.42], "y": [0]}},
           {"t": 90, "s": [100, 100, 100]}]}},
  "shapes": []}]}
```

Prefer generating from a library or exporting from an animation tool over hand-writing large files; hand-edit only small changes. Validate by loading in an open-source Lottie player and scrubbing.

## Dependencies for a script-based pipeline

A Python Lottie library with cairo-based rendering, an imaging library (Pillow), pycairo, and ffmpeg for MP4/GIF. On macOS: `brew install cairo pkg-config ffmpeg`, then `pip install lottie[all] Pillow pycairo`. Verify: `python3 -c "import cairo"`. If the toolchain is not installed or not allowed, say so rather than faking output.

## Render order

1. Test render: small (about 200x200, 15 fps) to confirm structure.
2. Preview: first ~60 frames at target size.
3. Full render.
4. Encode.

## Encoding

MP4 (best compression, wide support; dimensions must be even; no alpha in H.264):

```bash
ffmpeg -framerate 60 -i frames/%04d.png -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart out.mp4
```

GIF (palette pass is what keeps quality and size reasonable; `-loop 0` loops forever):

```bash
ffmpeg -framerate 30 -i frames/%04d.png -vf "fps=30,scale=480:-1:flags=lanczos,palettegen=stats_mode=diff" palette.png
ffmpeg -framerate 30 -i frames/%04d.png -i palette.png -lavfi "fps=30,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" -loop 0 out.gif
```

GIF limits: 256 colors, 1-bit transparency (edges halo on varying backgrounds), frame delay in 1/100 s so 30 fps rounds to 3 or 4 cs and timing drifts: use 25 or 50 fps for exact timing. Flat-color logos compress well; gradients and glows balloon size and band. Render on the intended background, or export transparency and test on light and dark.

Transparent video alternatives: WebM VP9 with alpha, animated WebP, APNG. MP4 has no alpha and does not loop by itself (the player must set loop, and the last frame must not duplicate the first). For smooth or large animations prefer MP4/WebM or Lottie.

## Loop validation

Seamless loop rule: the frame after the last must look like the frame after the first would. Practically:

- Animated property values at `ip` equal values at `op`.
- Convention: Lottie `op` is the out point (exclusive), so set it to the frame whose state equals frame 0 and do not render frame `op`. For GIF/MP4 render N frames where frame N would equal frame 0. If both first and last keyframe frames are rendered, the pose holds two frames and stutters.
- One-shot reveals are not loops; validate only that the final frame is the intended resting logo.

Automated check: compare last frame to first, and compare that distance to a normal adjacent-frame distance.

```python
from PIL import Image, ImageChops
import numpy as np, glob

frames = sorted(glob.glob("frames/*.png"))
def dist(a, b):
    return np.asarray(ImageChops.difference(Image.open(a).convert("RGBA"),
                                            Image.open(b).convert("RGBA"))).mean()

wrap = dist(frames[-1], frames[0])                       # last -> first (the loop seam)
step = np.mean([dist(frames[i], frames[i+1]) for i in range(len(frames)-1)])
print(f"seam={wrap:.3f} typical_step={step:.3f}")
assert wrap <= 2 * step, "loop seam is a jump: end state does not return to start"
```

For a hard-equality check on a Lottie file, compare the keyframe values of every animated property at the first and last keyframe (expect equal) and confirm `op - ip` matches the intended duration times `fr`.

## Structure and keyframe-equality validator

Run the equality check only on animations meant to loop; entrance-only animations legitimately differ.

```python
import json, sys, pathlib

path = pathlib.Path(sys.argv[1])
doc = json.loads(path.read_text())
for key in ("v", "fr", "ip", "op", "w", "h", "layers"):
    assert key in doc, f"missing {key}"
assert doc["op"] > doc["ip"], "op must exceed ip"
assets = {a["id"]: a for a in doc.get("assets", [])}
for a in assets.values():
    if a.get("e", 0) == 0:
        f = path.parent / a.get("u", "") / a["p"]
        assert f.exists(), f"missing asset file {f}"
for layer in doc["layers"]:
    ref = layer.get("refId")
    assert ref is None or ref in assets, f"refId {ref} not in assets"

def walk(node, where=""):
    if isinstance(node, dict):
        k = node.get("k")
        if node.get("a") == 1 and isinstance(k, list) and k and isinstance(k[0], dict) and "t" in k[0]:
            first = k[0].get("s")
            last = k[-1].get("s") or (k[-2].get("e") if len(k) > 1 else None)
            if first != last:
                print(f"LOOP MISMATCH {where}: first={first} last={last}")
        for name, child in node.items():
            walk(child, f"{where}/{name}")
    elif isinstance(node, list):
        for i, child in enumerate(node):
            walk(child, f"{where}[{i}]")

walk(doc["layers"])
```

Pixel check interpretation: a seam distance near zero means the last frame duplicates the first (stall each cycle: drop the last frame or pull the final keyframe one frame earlier); a seam much larger than a typical step means the end state does not return to the start.

## Destination notes

- Email: many clients (notably some desktop Outlook versions) show only the first GIF frame and do not play video; make frame 1 a complete, readable logo.
- Web: honor `prefers-reduced-motion` with a static SVG fallback; prefer Lottie or MP4 over GIF where size matters; loop video with `<video autoplay loop muted playsinline>`.
- Size targets (JSON / GIF / MP4): email signature 20-50 KB / 0.5-1 MB / 0.2-0.5 MB; website hero 30-80 KB / 1-3 MB / 0.5-1.5 MB; social 50-150 KB / 3-8 MB / 1-3 MB. To shrink a GIF: reduce dimensions, then frame rate, then duration, then colors.

## Output checks

- JSON parses; `ip < op`; `w`/`h` set; every `refId` on image layers matches an `assets[].id`; asset paths exist relative to the JSON.
- File under ~1KB means a failed render.
- Individual image assets inside a Lottie: under 30-80KB each depending on use.
- Embedding: convert assets to base64 (`e: 1`, `p: "data:image/png;base64,..."`) only after a successful external-asset render. Very large embedded images (about 100KB+) were reported to exhaust memory in a cairo-based renderer; treat as a caution, not a hard limit.
- Play the result in a real player (browser Lottie player, video player) before delivering; check transparent background over both light and dark.
