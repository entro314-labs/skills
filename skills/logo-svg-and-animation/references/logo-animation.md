# Logo animation: brief, structure, motion

Target: a standalone Lottie JSON, GIF or MP4 made from a PNG/SVG/JPG logo.

## 1. Motion brief (ask or infer)

| Question | Options |
|---|---|
| Brand personality | playful, professional, bold, elegant, innovative, trustworthy |
| Target emotion | excitement, trust, creativity, confidence, curiosity |
| Motion metaphor | organic growth, mechanical precision, energetic burst, elegant reveal, rhythmic pulse |

Then choose the preset (profile table below). Also decide: one-shot reveal vs seamless loop, background (transparent vs solid), destination (web, social, video, email).

## 2. Analyze the asset

- Text present? Use the text path in section 5.
- Multiple elements (icon + wordmark)? Animate separately; decide simultaneous (both start at frame 0) or staggered (15 / 30 / 45 frame offset).
- Source SVG: elements extractable, can animate parts. PNG: whole logo is one unit; only transform/opacity animation is possible.
- Prefer a transparent-background logo; if the source has a baked-in background, remove it before animating.

## 3. Asset sizing

| Element | Size |
|---|---|
| Full single logo | 500-600 px |
| Icon element | 100-200 px |
| Text element | 200-300 px |

Do not use 1000px for small elements (400KB+ files, memory problems).

## 4. Easing and timing

Never linear. Easing as cubic-bezier(x1, y1, x2, y2):

| Name | Curve | Use |
|---|---|---|
| Standard ease-in-out | (0.42, 0, 0.58, 1) | Corporate, subtle |
| Organic | (0.25, 0, 0.75, 1) | Continuous, waveforms |
| Bounce / overshoot | (0.34, 1.56, 0.64, 1) | Playful, bold (y above 1 overshoots) |
| Back (anticipation) | around (0.6, -0.28, 0.735, 0.045) for ease-in with pull-back | Wind-up before a move |

Brand shorthand: corporate/B2B = sparse keyframes, standard ease, 1.5-2 s; startup = overshoot, ~1.2 s; luxury = slow fade, minimal scale, ~3 s; tech = short digital-glitch, ~1 s.

Keyframe density: subtle 8-12, bold 15-25, playful 12-20, organic 25-45 (at 60 fps; fewer looks choppy).

Patterns:

| Pattern | Duration | Properties |
|---|---|---|
| Fade + gentle scale | 1.5 s | opacity 0 to 100, scale 95 to 100 |
| Bounce entrance | 1.2 s | position, scale, opacity |
| Scale pulse (loop) | 3 s | scale 100 to 103 to 100 |
| Rotation (loop) | 10 s | rotation 0 to 360, linear (loaders) |
| Wiggle / jello | 0.8 s | rotation +-5 deg (notifications) |

Linear is right for constant-speed loops (spin, marquee) because easing causes a velocity discontinuity at the seam; ease-in-out is fine when the motion rests at the seam. Rotation 0 to 360 needs the keyframe values set deliberately to 0 and 360. Seed or bake any random wiggle/expression so each play matches.

Reveal order: icon first, then wordmark, unless the wordmark is the hero. Confirm any overshoot or back curve in a preview render: small control-point changes alter the feel a lot.

Keep scale swings within the preset (+-10-20% for bold, a few percent for subtle). Hold the final logo still for 0.5-1 s on one-shot reveals so it can be read.

Profiles (heuristic starting points, not measured):

| Profile | Keyframes | Easing | FPS | Duration | Use |
|---|---|---|---|---|---|
| Static / corporate | 8-12 | 0.42 / 0.58 | 30 | 1.5-2 s | B2B, finance, legal |
| Organic / continuous | 25-45 | 0.25 / 0.75 | 60 | ~3 s loop | audio, speech, waveforms |
| Bold / attention | 15-25 | bounce or back | 60 | 0.8-1.5 s | startups, social intros |
| Cinematic | 50-120 | custom | 60-120 | 3-5 s | luxury, film |

Frame math: seconds = frames / fps; at 60 fps 15 / 30 / 45 frames = 0.25 / 0.5 / 0.75 s. Keep the stagger under about a third of the total duration so the finished logo holds long enough to read. Overshoot curves (y outside 0-1) suit scale, position and rotation, never opacity.

## 5. Text in animated logos

- Never rebuild text with a drawing library (e.g. an imaging library's text call): glyph shapes, kerning and weight differ from the brand wordmark.
- Extract outlines (paths) from the source SVG and animate them as shapes or rasterize them from the SVG.
- Methods: fade, stroke draw-on, or transform (slide/scale/mask reveal). Sync with the icon timing; wordmark typically follows the icon by the stagger offset.
- Stroke draw-on needs the outline converted to stroked paths with trim paths; filled outlines cannot be draw-on without a mask.

## 6. Workflow order

1. Brief, analyze, size assets.
2. Build with external asset references.
3. Preview render (first ~60 frames, or small low-fps test).
4. Adjust, then full render.
5. Validate structure and loop (reference file next door).
6. Optimize and, for Lottie distribution, embed assets as base64 only at the end.
7. Keep the external-asset version as the source of truth.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Visible jump at loop | Last keyframe differs from first; match values and drop the duplicate end frame |
| Choppy motion | More keyframes, 60 fps |
| Huge file | Smaller asset dimensions, fewer frames, lower GIF palette/fps, use MP4 or Lottie |
| Memory error on render | Reference assets externally while developing; reduce asset size |
| Output under ~1KB | Render failed; check asset paths (relative to the JSON) |
| Text looks different | Text was redrawn; use extracted outlines |
