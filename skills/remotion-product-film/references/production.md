# Producing the film

## Contents

- [Method and stack](#method-and-stack)
- [1. Understand the product and choose delivery](#1-understand-the-product-and-choose-delivery)
- [2. Develop a product-specific treatment](#2-develop-a-product-specific-treatment)
- [3. Build shots from real product surfaces](#3-build-shots-from-real-product-surfaces)
- [4. Animate with purpose](#4-animate-with-purpose)
  - [Non-negotiable framing and separation](#non-negotiable-framing-and-separation)
  - [Non-negotiable shape, light and stability](#non-negotiable-shape-light-and-stability)
- [5. Music and sound](#5-music-and-sound)
- [6. Render at 2x and export for each placement](#6-render-at-2x-and-export-for-each-placement)
- [7. Deliver the selected package](#7-deliver-the-selected-package)
- [8. Verify and present the result](#8-verify-and-present-the-result)
- [Production notes for the product](#production-notes-for-the-product)

## Method and stack

Use an evidence-to-film workflow: discover the product → map real sources → design independently controllable layers → render a representative motion proof → correct it from playback → render aspect-specific masters → derive delivery files → validate and package. Keep a treatment, source manifest, export manifest, and a short production-notes file alongside editable sources. Record reusable issues and their verified fixes as you encounter them.

For web or component-heavy products, prefer React + TypeScript + Remotion when that stack is available and suitable. Import actual pure UI components and brand assets into an isolated composition project, supplying deterministic fixtures and any required locale/theme providers. Use a composition per aspect ratio, a shared scene system, frame-based interpolation/easing, and a perspective stage with independently transformed UI planes. Preserve the host project's toolchain and pin new dependencies consistently. A capture-first or native-animation workflow is fine when it represents the product better (browser or simulator capture for native apps); say briefly why. Reconstruct UI only from verified source and mark adaptations. Check renderer licensing and asset provenance for the intended use.

Use FFmpeg for trimming, re-encoding, soundtrack assembly, format derivatives, web loops, and image extraction; use ffprobe and full decoding to validate outputs. Create a local HTML gallery with native video controls for comparing editions and downloading files. Keep capture, rendering, and export commands reproducible. Use high-quality masters as the source for derivatives, avoiding repeated lossy encoding. Independently inspect stills and normal-speed video; a contact sheet alone cannot verify motion or pacing.

The recurring technical failure modes and their required handling are in [failure-modes.md](failure-modes.md). Verify the applicable ones.

## 1. Understand the product and choose delivery

- Read project instructions and `PRODUCT_VIDEO_BRIEF.md`; inspect the implementation, brand assets, typography, tokens, flows, existing captures and docs. Keep media work in an isolated local directory; follow the project's Git and changelog rules.
- Identify what users come to do, which working interaction shows it best, and what gives the product its character. Separate implemented behavior from planned features and stale claims. Build the story on two to four real product moments.
- If placements are unspecified, ask one concise question: specific placements or the full media stack (YouTube landscape or Shorts, Facebook feed/Reels/Stories, Instagram feed/Reels/Stories, TikTok, X, Threads, website hero loop)? Do not ask again once chosen. Keep discovering while waiting.
- For chosen placements, check the current official requirements (ratio, dimensions, duration, size, codecs, audio, covers, captions, safe areas), separating organic posts from ads and account limits, and record source URLs and the date. The canvases in step 6 are working canvases, not platform limits.

## 2. Develop a product-specific treatment

Write a short treatment connecting the product's central idea, a few visible demonstrations, and a closing action. Select an appropriate pace and duration. Let the product determine whether the piece feels precise, playful, calm, technical, expressive, or something else. Match its actual brand rather than defaulting to a generic dark SaaS aesthetic.

Present individual messages as designed elements: an animated card, an anchored callout, a typographic overlay, or a dedicated full-frame message card between demonstrations. Give them art direction through typography, scale, material, composition, and motion drawn from this project's visual identity. Choose a treatment for each narrative beat rather than repeating the same caption box throughout. A card may emerge from the interaction, take over the frame for one statement, then reveal the next surface through a matched transition. Give each message a clear entrance, readable hold, and exit. Keep messaging separate from captured UI text and position it so the demonstrated action remains visible. Prefer concrete statements supported by the product. Avoid invented metrics, superiority claims, customer quotes, and unexplained slogans. Show useful behavior rather than listing every feature.

Create a scene plan with the message, its card/overlay treatment, source surface, interaction, framing, camera movement, independently animated layers, focus change, audio cue, and transition for each scene. Name the real elements being elevated and describe their visible action. Product shots use the whole frame; messaging joins them as a designed layer or gets its own scene. Fit cuts to both the action and the music. A title card is optional; the opening may be a strong interaction or result. Use an existing mascot, animated SVG, logo motion, or other recognizable brand signature for the ending when it suits this project. Otherwise choose a closing treatment grounded in its identity.

## 3. Build shots from real product surfaces

Use authentic UI captures or the project's actual components with controlled demo data wherever possible. Choose the sources that convey the product:

- Marketing site: focused sections, interactive examples, visual explanations, and product-specific artwork.
- Dashboard or web app: the working interaction and its visible result, with enough context to understand the flow.
- Backend, API, or CLI product: verified commands, request/response examples, developer workflows, and clearly identified conceptual diagrams when useful.
- Desktop app: actual native windows, panels, document content, and interactions.
- Mobile app: actual device or simulator UI, touch-driven flows, and native transitions.

Make website and dashboard components fill the entire video view, edge to edge. Compose focused sections and close-ups at a scale that makes their content readable; use responsive layouts and reflow to fit each aspect ratio while preserving the components' proportions. Keep every presented component complete; cropping the source page to select a section is permitted only when no selected element is cut off. The product surface is the scene's full-frame stage, with selected elements elevated above it. Build the stage from independently controllable layers: the base surface, selected real UI components, their content, and messaging. Extract components from actual source/DOM, vector assets, or precisely registered capture regions. Prepare enough separation to animate the selected parts independently; a single screenshot moving as one flat plane is insufficient for the hero demonstrations. Frame website shots without the global site header/navigation so they feel composed for the film. Crop incidental browser chrome, desktop clutter, notifications, and personal information. Retain in-product navigation or native controls when they are necessary to understand the interaction.

Use a clean demo account or fixtures. Keep credentials and private or customer data out of captures, terminals, URLs, logs and exported assets. Mark synthetic data, illustrative panels and conceptual sequences in the source manifest, and label them in the film where omission would imply a real measurement. Never imply a fabricated screen is the live product.

Capture text at sufficient source resolution for the largest planned close-up. Prefer vectors, real DOM/components, and native-resolution captures for text-heavy shots. Avoid generated images of UI text and enlarged low-resolution screenshots. Verify fonts, icons, color themes, loading states, and layout against the product.

## 4. Animate with purpose

Make perspective and elevation visibly present in the hero product sequences. Use a coherent perspective camera or equivalent 3D composition with an angled surface, a moving camera, and real foreground/background depth separation. Choose angles and movement large enough to be perceptible at normal playback while keeping the focal content readable. For full-frame website and dashboard shots, overscan the surface enough that camera tilts, pans, and zooms keep every frame edge covered throughout the shot. Full-frame coverage and perspective must coexist. Use at least two distinct, deliberate camera attitudes across the product sequences: for example, an oblique three-quarter view of the primary surface and an opposing or more overhead view that reveals independent layer depth. A reference such as Linear's landing-page artwork can inform the geometry, restrained lighting, and layered presentation when the user requests it; inspect the current reference and adapt the treatment to this project's own typography, colors, and interfaces. Do not copy another product's UI or assume that every project needs the same angles.

Build a meaningful elevation sequence: a real component separates from the surface, casts a changing shadow, becomes the focus, performs its product action, and settles or connects into the next shot. Animate multiple relevant elements independently across the film. For example, a chart panel can rise while its series draws and its values update; a native inspector can open while the document behind it recedes; a command can type and produce a result that carries into the next scene. Choose actions supported by this product. Set offsets, stagger, easing, and timing intentionally rather than giving every element the same entrance.

Preserve the relationship between elevated elements and their source surface. Maintain registration with the original UI, handle the base copy deliberately when a component lifts, and use shared perspective so parts move as one coherent scene. Check that the rendering pipeline actually preserves depth; filters or compositing wrappers must not flatten the intended layers. Avoid distracting duplicate cards or floating pieces with no understandable origin. Keep key text sharp while secondary surfaces recede or blur. Include visible, restrained focus changes around the selected action; hold readable views long enough to understand them.

Animate graphs using valid product data or consistent fixtures. Keep axes, units, scales, and displayed values coherent. Emphasize the workflow rather than implying unverified performance or growth.

Show a state change the way the product makes it. Where the product moves a control, grows a list or swaps a value, animate that change on the element itself, at a pace that can be followed, with the rest of the screen still. Where the product changes its whole appearance (a theme, a mode, a density), make it one eased change that the viewer is prepared for by the action that causes it, then hold. Prefer fewer, clearer changes over a rapid run through every state.

Combine smooth cuts, matched movement, restrained wipes, or brief dissolves according to the story. Design transitions around the subject: a lifted panel can fill the frame and reveal the next surface, a chart stroke can connect into a message card, or a camera movement can continue across a cut. Vary framing, depth, and rhythm, including clear readable holds between more active sequences. Recompose vertical and feed editions around fewer, larger elements; choose new close-ups and rewrite line breaks as needed. Do not rely on an automatic center crop of a dense desktop dashboard.

For code-driven video, make animations deterministic and tied to the composition frame, including SVG blinks, typing, charts, counters, camera motion, and transitions. Ensure assets and fonts are ready before rendering. Avoid wall-clock timers and uncontrolled CSS animations that change between exports.

### Non-negotiable framing and separation

No foreground element may be cut off, overlap an unrelated content element, or be obscured during any frame, including entrances, exits, camera rotations, component lifts, reverse angles, and short derivatives. Keep complete cards, graphs, axes, legends, controls, text, SVG artwork, disclosures, logos, and captions inside the composition and their own containers. Reserve a clear caption band in captioned editions. Essential in-product content must not disappear beneath the messaging. Decorative shadows, background grids and empty recessed registration regions may sit behind their associated element; duplicate visible text/cards and unrelated foreground collisions are not acceptable.

Overscan only the background/product base surface to maintain full-bleed coverage. Plan safe margins for the most extreme projected corners of foreground elements, not just their untransformed coordinates or a static midpoint. Reflow crowded layouts, increase gutters, change the shot's composition, or adjust the camera/lift amplitude before sacrificing readable size. Preserve visibly angled surfaces and meaningful elevation. Use fades or in-frame transformations for cards whose full content must remain visible; do not slide cards through the frame boundary or use wipes that cut through their text.

Add a repeatable geometry check to the production pipeline where possible: after fonts, responsive charts and assets are ready, measure actual projected DOM/component bounds at every rendered frame and edition, normalize measurements to the logical canvas, reject out-of-bounds content, sibling intersections, text escaping its panel, and intrinsic overflow. Use conservative bounding boxes or projected polygons, and scope checks to independent content groups so deliberate parent/child containment is not mistaken for collision. A passing geometry check supplements visual inspection; it cannot establish contrast, legibility, internal chart clipping, shadow clearance, or correct semantics by itself. Inspect actual rendered pixels and normal-speed playback too. Do not export a failed layout or accept clipping as a cinematic exception without an explicit user instruction.

### Non-negotiable shape, light and stability

A lifted element must look like the product's own component picked up off the page, not like a rectangle cut out of a picture of it.

- **Lift components, not regions.** The unit of elevation is a whole component as the product draws it: a card, a panel, a row, a button, a chip, a field with its label. Its outline is its real container: the same corner radius, border, fill, padding and internal layout. If the thing worth showing is a line inside a card, lift the card. List, before building, each element to be lifted with the component it is and where its box comes from; reject any entry that is a text node, a partial row, or a box narrower than its content.
- **Leave a true surface behind.** When a component rises, the base shows the surface without it: the element is absent from the base render or capture and its space is kept. No blurred copy, grey panel, tint or inset box in its place, and nothing left behind from it (underlines, icons, outlines).
- **One light.** Choose a light direction, softness and shadow colour once, suited to the product's palette, and derive every shadow from it. Height sets the shadow: a contact shadow that stays close and a soft ambient one that spreads and fades as the element rises. Shadows are never hard-edged slabs and never darker than the product's own deepest shadow. Dark and light themes each get a shadow that is visible but quiet on that surface.
- **Coherent perspective.** Every plane lives in one 3D space under one camera. Lifted planes stay parallel to their surface and move only along its normal. Text on a lifted plane and on the surface foreshortens the same way. Keep tilt modest where text must be read; legibility wins over drama.
- **No flashing.** A viewer should never see a blink, a pop or a double exposure. One state change per beat; the changed element animates in place while everything else holds. Never cross-dissolve two screens of text. Changes of theme, palette or overall brightness are eased (0.8 s or longer) and are not chained faster than one every two seconds. Indicators (press rings, highlights) fade in and out; they do not appear on one frame and vanish on the next. Avoid more than three large luminance changes in any one second.
- **Messages stay whole.** Every message card is fully inside the frame for its entire life, including its entrance and exit, and clear of player or platform chrome.

Add a repeatable stability check beside the geometry check: for every rendered edition, measure frame-to-frame change (mean absolute luminance difference over the whole frame and per foreground element) and report any frame where the change spikes outside a planned cut or transition, any run of alternating bright and dark frames, and any element visible for fewer frames than it takes to read. Fail the render on unplanned spikes.

## 5. Music and sound

Use supplied music with confirmed rights, a licensed track covering the destinations, or an original composition; record provenance and mark temporary preview tracks. Do not buy assets without authorization. Use restrained interaction sounds and transition accents, and leave space around key copy and the ending. Narration, if any, is factual and synchronized with captions. The film must be understandable muted. Provide a silent website edition when requested. For audio levels, sound effects and narration timing see the `remotion-promo-videos` skill (`references/motion-and-pacing.md`).

## 6. Render at 2x and export for each placement

Default to these logical layouts and 2× master dimensions:

| Layout | Logical canvas | 2× master |
| --- | --- | --- |
| Landscape 16:9 | 1920 × 1080 | 3840 × 2160 |
| Portrait 9:16 | 1080 × 1920 | 2160 × 3840 |
| Feed 4:5 | 1080 × 1350 | 2160 × 2700 |
| Square 1:1 | 1080 × 1080 | 2160 × 2160 |

Two times each dimension means four times the pixel count. Capture or render the underlying material with enough detail to support it; an upscaled 1080p recording does not become a native 4K source. Scale the whole logical composition consistently (`--scale=2`, see `remotion-rendering`) rather than enlarging the canvas around unchanged elements. Check close-ups and tilted surfaces at their maximum magnification.

Use 30 fps by default; choose 60 fps when the motion and source material justify it and the pipeline supports it. Resolution and frame rate are separate decisions. Produce high-quality masters and derive upload files within the verified placement limits. Use broadly compatible codecs, such as H.264/AAC, where accepted. Platforms may downsample and recompress uploads, so inspect the actual delivery file rather than assuming a large master guarantees sharp playback.

Keep captions, branding, and essential UI inside each placement's safe areas. Check the final text at typical phone viewing size. Prepare covers separately if the placement crops them differently from the video.

## 7. Deliver the selected package

For specific placements, produce the requested editions and their necessary supporting files. For the full media stack, prepare:

- A landscape launch film, with a shorter teaser derived from its strongest moments.
- A recomposed vertical edition for compatible Reels, TikTok, and Shorts placements, plus a short vertical teaser.
- Story-ready clips or a coherent sequence, respecting each selected placement's current duration and safe-area rules.
- Feed editions in 4:5 and/or square where useful and supported.
- A lightweight, silent website hero loop with a poster image; supply appropriate web formats and a reduced-motion still.
- Placement-appropriate covers/thumbnails, caption files where supported, and a captioned video variant for destinations that need embedded captions.
- Brief factual post copy and suggested ordering for each destination.

Choose duration and content per edition; do not stretch a simple product into an arbitrary long film or remove the core interaction just to make a teaser. Share one upload file across destinations when the composition and verified specifications match, and document that mapping. Render separate editions when framing, pacing, captions, or requirements differ.

Provide the editable source project, capture/render/export commands, assets, font references, audio provenance, and a source manifest mapping scenes to real surfaces and fixtures. Include a delivery table listing placement, local path, duration, dimensions, aspect ratio, frame rate, codec, audio/caption status, and file size.

## 8. Verify and present the result

Render and inspect a representative hero sequence before committing the same technique across the package. It must combine an edge-to-edge real product surface, clearly visible perspective, an independently elevated component performing a meaningful action, a readable focus change, and a designed message or transition. Refine weak motion and layering, then continue through the authorized deliverables.

Before the proof, write the lift list (each elevated element, the component it is, the source of its outline) and the state-change list (each change, what animates, how long it holds). After the proof, inspect every lifted element at full resolution at its highest point: its outline matches the product's component, the surface behind it is clean, its shadow is soft and consistent with the film's one light, and no neighbouring content is covered or cut. Step through every state change frame by frame and confirm nothing flashes, pops or double-exposes. Fix the technique before building further scenes on it; a defect in the proof repeats in every scene.

Judge the rendered frames and normal-speed playback, not the presence of animation code. Perspective must be visible in foreshortening and relative movement; elevation must be visible through layer separation, parallax, and shadows; the product interaction must visibly progress. A slow zoom on a screenshot with fading captions does not meet this brief. If the result looks flat or the promised motion cannot be identified in playback, revise it before presenting it as finished. Include a short contact sheet or preview excerpt demonstrating the camera angle, lifted element, message treatment, and transition.

Run the relevant source checks, inspect representative frames and transitions, run the full-motion bounds/collision checks and the stability check for every aspect ratio, and play the complete film with sound. If the film cannot be watched at normal speed in the working environment, say so plainly, hand over a short proof for the user to watch before the full package is rendered, and do not describe unwatched motion as verified. Verify each export's dimensions, duration, frame rate, codecs, decoding, and audio. Check that website/dashboard surfaces cover the whole view throughout camera movement and that each message card or overlay is readable without obscuring the demonstrated action. Check all content at the maximum tilt and elevation and throughout the path for cutoffs or overlaps, including caption variants. Check for missing fonts/assets, unintended chrome, clipped copy, unreadable UI, animation jumps, flashing, cut-out or redacted-looking lifts, hard or inconsistent shadows, streaked surface extensions, inconsistent fixtures, unsafe framing, and long blank endings. Review portrait/feed compositions separately from landscape.

Complete the authorized package and show usable local previews or downloadable files. Report which surfaces are authentic, which use demo data, any illustrative scenes, and any unresolved limitations. If a style proof helps, use it to refine the work and continue through the requested deliverables. Follow project instructions for changelog updates and commits. Ask before publishing or posting externally unless the user has explicitly authorized that action.

## Production notes for the product

The rules above are general. Each product also has facts of its own that the next cut needs, and they are learned from the first one. Keep them in the production-notes file beside the sources, written as findings with their cause, and read them before starting another cut. Record at least:

- **How signed-in scenes are fed.** The harness, fixture mode or demo account used, how to reach each view, and what it does not do: whether anything writes to a real database or calls a live service, and which replies or results are scripted. State the on-screen label that follows from it (for example "demo account, example data").
- **Components to lift, whole.** The product-specific lift list: each component named as the product draws it, with the parts that belong to it (its header, list, buttons, label, shadow, all four corners), so nobody lifts a line from inside one.
- **The product's largest visual changes.** Themes, modes or levels that change brightness or palette across the whole screen, with the limits that kept them from flashing: how many changes per scene, the easing time, the hold.
- **States that must match the running product.** Any state rendered inside the film (a theme, a level, a selected item) checked against the real app's colours and marks before rendering.
- **The surface beyond the page.** What each page sits on (a colour, a gradient, an image) and how it was extended for overscan.
- **Not demonstrable as built.** Behaviour the brief lists that the harness or fixtures cannot show. Add fixtures first, or leave it out and say so; do not show or claim it.

Do not copy production notes, the brief or the failure checklist into the product's on-screen messaging. If a new broadly applicable issue is found, add its symptom, cause, confirmed fix and verification evidence to the project's reusable notes.
