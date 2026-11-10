---
name: remotion-product-film
description: "Plan and produce a cinematic product film from a product's real interface: research the codebase and write a product video brief (by default 7 signed-in app demonstrations and 8 public website demonstrations, each traced to frontend and backend sources), then build the film with full-frame real surfaces, a perspective camera, whole UI components lifted off the page, designed message cards, a motion proof, geometry and stability checks, 2x masters and a multi-placement delivery package. Use when the user asks for a product video, launch film, product demo film, a product video brief or shot list, a Linear-style or cinematic UI video with tilted screens and lifted components, a full media stack (launch film, teasers, Reels/TikTok/Shorts, feed edits, website hero loop), or when a product video looks flat, flashes, shows cut-out or redacted-looking elements, hard shadows or clipped content. For quick AIDA ads, chat mockups and other template-driven social videos use remotion-promo-videos instead."
compatibility: "Node.js with Remotion 4+, FFmpeg and ffprobe for the film. The brief needs only read access to the codebase."
---

# Remotion product film

A product film shows the real product doing real things, staged like a film: the interface fills the frame, the camera sees it in perspective, the component that matters rises off the page and performs its action, and a designed message says what the viewer just saw.

The visual brief is visibly cinematic product motion: full-frame surfaces, perspective camera movement, independently elevated UI elements, animated product behavior, selective focus, and designed messaging cards. Treat these as production requirements. Adapt their execution and scene placement to the product's identity; preserve them unless the user changes the brief.

This skill has two jobs. Work out which one the user asked for.

| The user asks for | Do | Stop when |
| --- | --- | --- |
| A brief, a shot list, "what should the video show", or planning before any filming | [references/brief.md](references/brief.md) | `PRODUCT_VIDEO_BRIEF.md` is saved and summarised. The brief is the whole task; start no video work. |
| The film, a launch video, the media stack | Read `PRODUCT_VIDEO_BRIEF.md` if the project has one. If it has none, write it first with [references/brief.md](references/brief.md), then follow [references/production.md](references/production.md). | The authorized package is rendered, checked and presented. |
| A fix for a film that looks flat, flashes, clips or shows cut-out lifts | Find the symptom in [references/failure-modes.md](references/failure-modes.md), fix the technique, re-run the proof checks. | The defect is gone in rendered playback. |

## Why the brief comes first

The film is built from what the product does today. A demonstration taken from the README or from marketing copy may be a feature that only looks finished, and filming it puts a false claim on screen. The brief traces every demonstration to its frontend files and, for app items, to the API route, server function or database write behind it, and records what is a preview, behind a plan or flag, or not demonstrable. The film then inherits those facts: its source manifest, its on-screen labels ("demo account, example data") and the list of things it must not show.

## The film in outline

Evidence to film: discover the product, map real sources, design independently controllable layers, render a representative motion proof, correct it from playback, render aspect-specific masters, derive delivery files, validate and package. Each step is in [references/production.md](references/production.md).

1. **Understand the product and choose delivery.** Two to four real product moments carry the story. If placements are unspecified, ask once: specific placements or the full media stack.
2. **Treatment and scene plan.** One central idea, a few visible demonstrations, a closing action, in the product's own character and brand.
3. **Shots from real surfaces.** Real components with deterministic fixtures, or authentic captures, built as separate layers: base surface, the components to lift, their content, messaging.
4. **Animate with purpose.** Perspective and elevation that are visible at normal playback, with each state change shown the way the product makes it.
5. **Music and sound.** Rights confirmed; the film is understandable muted.
6. **Render at 2x**, one composition per aspect ratio.
7. **Deliver** the selected package with its manifests.
8. **Verify and present.** Proof first, then the package, judged from rendered frames and playback.

## What cannot be traded away

These are the requirements that get dropped under time pressure and that make a film look generated when they are. The full wording, with the checks that enforce them, is in [references/production.md](references/production.md).

- **Lift components, not regions.** The unit of elevation is a whole component as the product draws it, at its real outline, radius, border, fill and padding. If the thing worth showing is a line inside a card, lift the card. A rectangle cut from a picture of the UI reads as a cut-out.
- **Leave a true surface behind.** The base is rendered without the lifted element, its space kept. A blurred copy, grey panel or tint in its place reads as a redaction.
- **One light.** One direction, softness and shadow colour for the whole film; every shadow derives from it and the element's height.
- **One 3D space.** Every plane under one camera; lifted planes stay parallel to their surface and move only along its normal. Legibility wins over drama.
- **No flashing.** One state change per beat, animated in place. Never cross-dissolve two screens of text. Ease large brightness or palette changes over 0.8 s or longer.
- **Nothing cut off or covered.** No foreground element is clipped, overlapped by unrelated content or hidden on any frame, in any edition. Overscan only the base surface.
- **Proof before package.** Render one representative hero sequence, inspect it at full resolution and frame by frame, and fix the technique before building more scenes on it. A defect in the proof repeats in every scene.
- **Only what the product does.** No invented metrics, quotes, superiority claims or capabilities. Previews and fixtures are labelled as such.
- **Ask before publishing or posting** anything externally unless the user has authorized it.

A slow zoom on a screenshot with fading captions does not meet this brief. If the motion cannot be identified in playback, revise it before presenting it as finished.

## Related skills

- `remotion-core`: compositions, frame-driven animation, fonts, assets, Studio.
- `remotion-transitions`: `TransitionSeries` and custom presentations.
- `remotion-rendering`: render flags, `--scale`, codecs, stills, Node.js rendering.
- `remotion-promo-videos`: placement canvases and safe zones (`references/formats-and-safe-zones.md`), audio and pacing (`references/motion-and-pacing.md`), and quicker template-driven promo videos.
- `remotion-project-conventions`: code conventions, accessibility and tests for the media project.

Remotion has its own license terms for company use; check them for commercial work.

## References

- [references/brief.md](references/brief.md): researching the codebase and writing `PRODUCT_VIDEO_BRIEF.md`.
- [references/production.md](references/production.md): method and stack, steps 1 to 8, the non-negotiable rules, the geometry and stability checks, and the production notes to keep.
- [references/failure-modes.md](references/failure-modes.md): recurring technical failures with their required handling. Read it before the proof and whenever a render looks wrong.
