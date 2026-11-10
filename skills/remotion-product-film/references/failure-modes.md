# Recurring technical failure modes

Treat these as recurring failures and verify the applicable ones. Apply the relevant fixes in the production pipeline and record actual observations in the handoff. Do not copy this checklist into a product's on-screen messaging.

## Depth, lifts and light

| Issue | Required handling |
| --- | --- |
| 3D layers look flat despite `translateZ` | Keep perspective/transform-style coherent. Opacity below 1, filters, clipping, isolation, and some compositing properties on the 3D ancestor can flatten its children. Apply focus to leaf planes and place wipes/fades outside the camera hierarchy. Verify visible depth in rendered playback. |
| Lifted UI leaves an accidental duplicate | Register the isolated component with its original region; replace, mask, or intentionally recess that region as the component separates. Use relative movement and changing shadows to make the lift legible. |
| A lifted element looks like a cut-out: square corners, a hard edge through its content, a different fill from the surface it left | The lifted region was taken from a text node or an arbitrary rectangle instead of the component's own container. Lift the whole component at its real outline: its container box, corner radius, border, fill and padding, read from the source or DOM. Render it from the real component or photograph it alone on transparency. Never lift a line of text out of a card. |
| A grey bar, blurred patch or dark slab sits where a lifted element came from | The original was covered instead of removed. Produce the base without the element (render or capture it with the element hidden while its layout space is kept), so the surface shows what is really under it. Do not blur, tint or box over the original; it reads as a redaction. |
| Shadows look like extruded slabs, or point different ways | Shadows were drawn as offset copies of the box with too little blur, per element. Define one light for the film (direction, softness, colour) and derive every shadow from it and the element's height: a tight contact shadow plus a wide soft one whose blur grows faster than its offset. Match the corner radius. Keep the product's own shadow on elements that have one (popovers, menus). |
| Lifted and base content disagree in perspective or overlap neighbouring text | The lifted plane was placed or scaled separately from the surface, or its box covers adjacent labels once raised. Keep lifted planes parallel to the surface in the same 3D space, raise them along the surface normal only, and check at full resolution that no neighbouring label, heading or control is covered or cut. |
| Depth of field smears text into noise | Blur radius too large for the text size, or applied to content the viewer still needs. Keep defocus subtle (text stays legible as shapes), apply it only to secondary surfaces, and never to the element the message refers to. |

## Framing and coverage

| Issue | Required handling |
| --- | --- |
| Tilted surfaces expose empty frame edges | Overscan the base plane and check the whole camera trajectory, including transitions. Fit foreground elements separately so readable content stays in frame. |
| The carried-on surface beyond a page edge shows streaks or bands | Edge pixels were stretched outward. Extend the surface with the page's real background (its colour, gradient or image rendered larger), or frame the camera so the page edge never enters the frame. |
| Tilted/lifted content crosses the frame or collides | Measure the full projected camera path after fonts and responsive content settle, reserve caption clearance, and fail rendering on clipping, sibling intersection or panel overflow. Overscan the decorative base only; reflow foreground layouts and use in-frame transitions. |
| Portrait editions become tiny or clipped | Recompose scenes, reduce density, adjust line breaks, and establish placement-specific safe areas. Check every scene at phone viewing size, including covers and CTA frames. |

## Stability and determinism

| Issue | Required handling |
| --- | --- |
| Elements or the whole frame flash; text is double-exposed during a change | Two states with text were cross-dissolved, several states were cut in quick succession, or large areas changed brightness within a few frames. Change one thing per beat. Animate the element that changed, in place; never dissolve one full screen of text through another. Ease large brightness or palette changes over at least 0.8 s and hold each state long enough to read. Measure it: see the stability check in [production.md](production.md#non-negotiable-shape-light-and-stability). |
| CSS, SVG, charts, or native animations vary between renders | Drive controllable effects from frame time. Disable wall-clock loops and transitions in imported components; seed random data, fix locale/timezone, and control timestamps. Preserve the original artwork while adapting its animation clock. |
| Fonts, styles, charts, or video render before they are ready | Gate capture on font/style/asset loading and chart layout readiness. Fail clearly on missing assets. Wait for responsive dimensions rather than relying on arbitrary sleeps. |
| SVG IDs, gradients, masks, or global styles collide | Scope IDs/styles, preserve viewBox proportions, and inspect repeated components and themes in the actual render. |

## Sources and project setup

| Issue | Required handling |
| --- | --- |
| App components require auth, routing, network, or framework context | Reuse pure renderable components with minimal providers and fixtures, or capture an authorized real flow. Isolate browser-only modules and dependency aliases. Match the source CSS and design tokens; a screenshot of a re-created panel is not proof of a live workflow. |
| Multiple React copies or mismatched dependencies break imports | Resolve shared runtime dependencies to one compatible instance; preserve the host project's intentional versions. Keep media-project dependency changes isolated and inspect lockfile diffs. |
| CLI text wraps badly or leaks private data | Use a controlled terminal viewport and demo identities. Preserve verified command syntax. Re-typeset selected captured output when needed for readability, recording the adaptation and avoiding invented success states or timing claims. |
| 2× output still looks soft | Capture at sufficient native detail or use vectors/real components. Scale the logical composition consistently. Verify text at maximum zoom and after delivery downsampling; increasing bitrate cannot recover missing source detail. |
| Render exceeds memory, storage or time | Measure a short representative render first; adjust concurrency and temp storage; reuse bundles; derive delivery files from finished masters; keep the requested quality and document any fallback. |

## Audio, encoding and delivery

| Issue | Required handling |
| --- | --- |
| Audio clips, ends abruptly or detaches in short edits | Check loudness, peaks, duration, channel layout and fades; build music per edit instead of concatenating fragments; confirm rights; check muted comprehension. |
| FFmpeg lacks a subtitle/text filter | Inspect available filters first. Fall back to compositor-rendered text or transparent typography plates with timed overlays, and still ship SRT/WebVTT. Verify wrapping, contrast, timing and placement. |
| Encoding, color, or playback differs across viewers | Set color conversion, range, and metadata coherently; inspect the decoded pixel format, matrix, and range with ffprobe. A renderer may still produce full-range BT.601 even when yuv420p was requested. Use explicit renderer settings and, if needed, a correctly converted BT.709 delivery pass. PNG frame intermediates can avoid JPEG color/range ambiguities. Verify browser playback and decode complete files; metadata alone is insufficient. |
| A web loop jumps or auto-plays sound | Match first and last states and smooth the seam; ship silent lightweight video, a poster or reduced-motion still, and a fallback. |
