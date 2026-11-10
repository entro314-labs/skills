# Cinematic product launch film

Use this for a high-production launch video built from the product's real surfaces: full-frame UI, perspective camera, independently lifted components, designed message cards, multi-placement exports. It is the folded-in essence of a self-contained, high-quality source prompt; the method, requirements and failure table below are kept in full, the wording is condensed. For a quicker AIDA video use `templates/aida-product-video/` instead.

## Method

Evidence to film: discover the product, map real sources, design independently controllable layers, render a representative motion proof, correct it from playback, render aspect-specific masters, derive delivery files, validate and package.

Keep alongside the editable sources: a treatment, a source manifest (scene to real surface or fixture), an export manifest, and short production notes. Record each reusable issue with its verified fix.

Stack: for web or component-heavy products prefer React + TypeScript + Remotion. Import the actual pure UI components and brand assets into an isolated composition project with deterministic fixtures and any locale/theme providers. One composition per aspect ratio, a shared scene system, frame-based interpolation and easing, and a perspective stage with independently transformed UI planes. Preserve the host project's toolchain and pin new dependencies consistently. A capture-first or native-animation workflow is fine when it represents the product better (browser or simulator capture for native apps); say briefly why. Reconstruct UI only from verified source and mark adaptations. Check renderer licensing and asset provenance for the intended use.

Use FFmpeg for trimming, re-encoding, soundtrack assembly, derivatives, web loops and frame extraction; use `ffprobe` plus a full decode to validate outputs. Build a local HTML gallery with native video controls to compare editions. Keep capture, render and export commands reproducible. Derive delivery files from high-quality masters. Judge stills and normal-speed video; a contact sheet cannot verify motion or pacing.

## 1. Understand the product and choose delivery

- Read project instructions; inspect the implementation, brand assets, typography, tokens, flows, existing captures and docs. Keep media work in an isolated local directory; follow the project's Git and changelog rules.
- Identify what users come to do, which working interaction shows it best, and what gives the product its character. Separate implemented behavior from planned features and stale claims. Build the story on two to four real product moments.
- If placements are unspecified, ask one concise question: specific placements or the full media stack (YouTube landscape or Shorts, Facebook feed/Reels/Stories, Instagram feed/Reels/Stories, TikTok, X, Threads, website hero loop)? Do not ask again once chosen. Keep discovering while waiting.
- For chosen placements, check the current official requirements (ratio, dimensions, duration, size, codecs, audio, covers, captions, safe areas), separating organic posts from ads and account limits, and record source URLs and the date. The canvases below are working canvases, not platform limits.

## 2. Treatment

- Write a short treatment: central idea, a few visible demonstrations, a closing action. Let the product decide whether it feels precise, playful, calm, technical or expressive; match its real brand, not a generic dark SaaS look.
- Messages are designed elements: animated card, anchored callout, typographic overlay, or a full-frame message card between demonstrations. Vary the treatment per beat. Each has a clear entrance, a readable hold and an exit, and never covers the demonstrated action.
- Prefer concrete statements the product supports. No invented metrics, superiority claims, customer quotes or unexplained slogans.
- Scene plan fields: message and its card treatment, source surface, interaction, framing, camera movement, independently animated layers (name the real elements being lifted), focus change, audio cue, transition. Fit cuts to the action and the music. A title card is optional. End with the product's own signature (mascot, logo motion, animated SVG) or a closing treatment grounded in its identity.

## 3. Shots from real surfaces

- Sources by product type: marketing site (focused sections, interactive examples), dashboard or web app (the working interaction and result), backend/API/CLI (verified commands, request/response, clearly labeled diagrams), desktop (native windows and panels), mobile (device or simulator UI and touch flows).
- Website and dashboard components fill the whole frame edge to edge. Presented components stay complete: crop to a section only if no selected element is cut off. The surface is the full-frame stage; selected elements rise above it. Build the stage from separate layers (base surface, selected real components, their content, messaging) by extracting from the source DOM, vector assets or precisely registered capture regions. A single flat screenshot moving as one plane does not meet this brief for hero shots.
- Frame website shots without the global header or navigation; crop browser chrome, desktop clutter, notifications and personal data. Keep in-product navigation or native controls when the interaction needs them.
- Use a clean demo account or fixtures. No credentials, private or customer data in captures, terminals, URLs, logs or exported assets. Mark synthetic data, illustrative panels and conceptual sequences in the manifest, and label them in the film where omission would imply a real measurement. Never imply a fabricated screen is the live product.
- Capture text at the resolution the largest close-up needs. Prefer vectors, real DOM/components and native-resolution captures; avoid generated images of UI text and enlarged screenshots. Verify fonts, icons, themes, loading states and layout against the product.

## 4. Animate with purpose

- Make perspective and elevation visibly present in the hero sequences: a coherent perspective camera with an angled surface, a moving camera and real foreground/background separation, with angles large enough to see at normal playback while content stays readable. Use at least two distinct camera attitudes across the film (for example an oblique three-quarter view and an opposing or more overhead one that reveals layer depth).
- Overscan the base surface so every frame edge stays covered through every tilt, pan and zoom; full-frame coverage and perspective must coexist.
- Elevation sequence: a real component separates from the surface, casts a changing shadow, becomes the focus, performs its product action, then settles or connects to the next shot. Animate several elements independently across the film with deliberate offsets, stagger and easing (a chart panel rises while its series draws; an inspector opens while the document recedes; a typed command produces a result that carries into the next scene).
- Keep registration between lifted elements and their source surface; handle the base copy deliberately when a component lifts (replace, mask or recess it); use shared perspective so parts move as one scene; avoid floating pieces with no origin. Key text stays sharp while secondary surfaces recede or blur. Hold readable views long enough to understand them.
- Charts use valid product data or consistent fixtures with coherent axes, units and values; emphasize the workflow, not unverified growth.
- Combine smooth cuts, matched movement, restrained wipes and brief dissolves; design transitions around the subject (a lifted panel fills the frame and reveals the next surface; a chart stroke connects to a message card). Vary framing, depth and rhythm, with readable holds between active sequences. Recompose portrait and feed editions around fewer, larger elements; never rely on a center crop of a dense desktop dashboard.
- Everything is deterministic and frame-driven: SVG blinks, typing, charts, counters, camera, transitions. No wall-clock timers or uncontrolled CSS animations.

### Non-negotiable framing and separation

- No foreground element may be cut off, overlap an unrelated element, or be obscured on any frame: entrances, exits, camera rotations, lifts, reverse angles and short derivatives included. Cards, graphs, axes, legends, controls, text, SVG artwork, disclosures, logos and captions stay inside the frame and their own containers. Reserve a caption band in captioned editions; essential UI never disappears under messaging.
- Decorative shadows, background grids and empty recessed registration regions may sit behind their element. Duplicate visible text or cards, and unrelated foreground collisions, are not acceptable.
- Overscan only the background base. Plan safe margins from the most extreme projected corners of foreground elements, not their untransformed coordinates. Reflow, widen gutters, change the composition or reduce camera/lift amplitude before shrinking readable text. Use fades or in-frame transforms for cards that must stay fully visible; no slides through the frame edge and no wipes through text.
- Add a repeatable geometry check: after fonts, responsive charts and assets are ready, measure the projected DOM/component bounds at every rendered frame and edition, normalized to the logical canvas; reject out-of-bounds content, sibling intersections, text escaping its panel and intrinsic overflow. Use conservative boxes or projected polygons and scope checks to independent groups so parent/child containment is not flagged. It supplements visual inspection (contrast, legibility, chart clipping, shadow clearance and semantics still need eyes). Do not export a failed layout.

## 5. Music and sound

Use supplied music with confirmed rights, a licensed track covering the destinations, or an original composition; record provenance and mark temporary preview tracks. Do not buy assets without authorization. Use restrained interaction sounds and transition accents, leave space around key copy and the ending. Narration, if any, is factual and synchronized with captions. The film must be understandable muted. Provide a silent website edition when requested. See `motion-and-pacing.md` (audio).

## 6. Render at 2x and export

| Layout | Logical canvas | 2x master |
| --- | --- | --- |
| Landscape 16:9 | 1920 x 1080 | 3840 x 2160 |
| Portrait 9:16 | 1080 x 1920 | 2160 x 3840 |
| Feed 4:5 | 1080 x 1350 | 2160 x 2700 |
| Square 1:1 | 1080 x 1080 | 2160 x 2160 |

2x is four times the pixels; the material must hold that detail (vectors, real components, native captures). Scale the whole logical composition consistently (`--scale=2`, see `remotion-rendering`) instead of enlarging the canvas around unchanged elements, and check close-ups and tilted surfaces at maximum magnification. Default 30 fps; 60 fps only when the motion and pipeline justify it. Produce masters, derive uploads within the verified placement limits with H.264/AAC where accepted, and inspect the actual delivery file. Keep captions, branding and essential UI inside each placement's safe area, check final text at phone size, and prepare covers separately where a placement crops them differently.

## 7. Delivery package

For specific placements make the requested editions plus supporting files. For the full stack:

- Landscape launch film plus a shorter teaser from its strongest moments
- Recomposed vertical edition for Reels, TikTok and Shorts plus a short vertical teaser
- Story-ready clips or a coherent sequence within each placement's duration and safe-area rules
- Feed editions in 4:5 and/or square where supported
- A lightweight silent website hero loop with poster image, web formats and a reduced-motion still
- Covers/thumbnails, caption files (SRT/WebVTT) and a captioned variant where embedded captions are needed
- Brief factual post copy and suggested posting order per destination

Choose duration and content per edition; do not stretch a simple product into a long film or cut the core interaction to make a teaser. Share one file across destinations only when the composition and verified specs match, and document the mapping. Hand over the editable source project, capture/render/export commands, assets, font references, audio provenance, the source manifest and a delivery table (placement, path, duration, dimensions, ratio, fps, codec, audio/caption status, size).

## 8. Verify and present

- First render and inspect one representative hero sequence: edge-to-edge real surface, visible perspective, an independently lifted component doing a meaningful action, a readable focus change, a designed message or transition. Refine weak motion and layering before committing the technique to the whole package.
- Judge rendered frames and playback, not animation code. Perspective must show in foreshortening and relative movement; elevation in layer separation, parallax and shadow; the interaction must visibly progress. A slow zoom on a screenshot with fading captions fails the brief. Include a contact sheet or preview excerpt showing camera angle, lifted element, message treatment and transition.
- Run source checks, the full-motion bounds/collision checks for every aspect ratio, and play the complete film with sound. Verify each export's dimensions, duration, frame rate, codec, decode and audio; full-bleed coverage through camera moves; message readability; max-tilt clearance; missing fonts or assets; stray chrome; clipped copy; unreadable UI; jumps; inconsistent fixtures; unsafe framing; long blank endings; portrait and feed edited separately.
- Report which surfaces are authentic, which use demo data, which scenes are illustrative, and any open limitations. Follow project instructions for changelog and commits. Ask before publishing or posting anywhere unless explicitly authorized.

## Recurring failure modes

Apply the relevant fixes in the pipeline and record real observations in the handoff; do not put this checklist on screen.

| Issue | Required handling |
| --- | --- |
| 3D layers look flat despite `translateZ` | Keep perspective and `transform-style` coherent. Opacity below 1, filters, clipping, isolation and some compositing properties on the 3D ancestor flatten children. Apply focus to leaf planes and put wipes/fades outside the camera hierarchy. Verify depth in rendered playback. |
| Lifted UI leaves an accidental duplicate | Register the isolated component with its original region; replace, mask or intentionally recess it as it separates; show the lift with relative movement and changing shadows. |
| Tilted surfaces expose empty frame edges | Overscan the base plane and check the whole camera path including transitions; fit foreground elements separately so readable content stays in frame. |
| CSS, SVG, charts or native animations differ between renders | Drive effects from frame time; disable wall-clock loops and transitions in imported components; seed random data, fix locale and timezone, control timestamps; keep the original artwork and adapt only its clock. |
| Components need auth, routing, network or framework context | Reuse pure components with minimal providers and fixtures, or capture an authorized real flow. Isolate browser-only modules and aliases. Match source CSS and tokens; a screenshot of a re-created panel is not proof of a live workflow. |
| Multiple React copies or mismatched dependencies | Resolve shared runtime dependencies to one compatible instance, keep the host's intended versions, keep media-project dependency changes isolated, inspect lockfile diffs. |
| Fonts, styles, charts or video render before ready | Gate capture on font, style, asset and chart-layout readiness; fail clearly on missing assets; wait for responsive dimensions instead of arbitrary sleeps. |
| 2x output still looks soft | Capture at enough native detail or use vectors/real components; scale the logical composition consistently; check text at maximum zoom and after delivery downsampling. Bitrate cannot recover missing detail. |
| Tilted or lifted content crosses the frame or collides | Measure the full projected path after fonts and responsive content settle, reserve caption clearance, fail the render on clipping, sibling intersection or panel overflow. Overscan only the decorative base; reflow foreground layouts; use in-frame transitions. |
| Portrait editions become tiny or clipped | Recompose, reduce density, adjust line breaks, set placement-specific safe areas; check each scene at phone size including covers and CTA. |
| CLI text wraps badly or leaks private data | Use a controlled terminal viewport and demo identities; keep verified command syntax; re-typeset captured output for readability and record it; never invent success states or timing claims. |
| SVG ids, gradients, masks or global styles collide | Scope ids and styles, preserve viewBox proportions, inspect repeated components and themes in the real render. |
| Render exceeds memory, storage or time | Measure a short representative render first; adjust concurrency and temp storage; reuse bundles; derive delivery files from finished masters; keep the requested quality and document any fallback. |
| Audio clips, ends abruptly or detaches in short edits | Check loudness, peaks, duration, channel layout and fades; build music per edit instead of concatenating fragments; confirm rights; check muted comprehension. |
| FFmpeg lacks a subtitle/text filter | Inspect available filters first. Fall back to compositor-rendered text or transparent typography plates with timed overlays, and still ship SRT/WebVTT. Verify wrapping, contrast, timing, placement. |
| Encoding, color or playback differs across viewers | Set conversion, range and metadata coherently and inspect pixel format, matrix and range with `ffprobe`. A renderer may emit full-range BT.601 even when yuv420p was requested; use explicit settings and, if needed, a converted BT.709 delivery pass. PNG frame intermediates avoid JPEG range ambiguity. Verify browser playback and decode the full file. |
| A web loop jumps or auto-plays sound | Match first and last states and smooth the seam; ship silent lightweight video, a poster or reduced-motion still, and a fallback. |
