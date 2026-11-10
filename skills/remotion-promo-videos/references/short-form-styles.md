# Short-form style presets

Three proven vertical or feed formats. Each has a ready template under `templates/`; copy it into `src/` of a Remotion project and register its `RemotionRoot` contents in your own `Root.tsx`.

## A. Text on b-roll

Bold on-screen text over one looping clip. No narration, no music required. One clip yields several videos because only the text changes.

Template: `templates/text-on-broll/` (`TextOnBroll.tsx`, `Root.tsx`, one composition per text variant). Put the clip at `public/bg-video.mp4`.

### The clip

Your own footage or licensed stock, 9:16, 1080p, 6-10 s, no dialogue, no baked-in text or logos. It loops, so avoid a visible start/end jump. A strong clip is:

- An extreme close-up or tight shot with shallow depth of field
- One simple, slow, deliberate action (hands doing something, a single motion)
- Tactile and sensory (texture, light, material), with one focal point
- Natural-looking, not chaotic

If the first clip has artifacts, replace the clip; do not rework it with overlays.

### The copy

Write 8-12 options, let the user pick 2-4, one composition per pick. The text must work with no audio. Patterns (examples are placeholders for your topic):

| Pattern | Shape | Example |
| --- | --- | --- |
| Stop + complaint | "Stop [universal frustration]" | "Stop measuring progress by how busy everyone looks." |
| Everyday observation | a simple truth nobody says | "Nobody remembers the status meeting." |
| Existential question | a question that exposes an absurdity | "Who decided a spreadsheet could run a team?" |
| Normalize | "Normalize [guilty thing]" | "Normalize deleting the process nobody follows." |
| Core belief | one-line worldview | "Good work does not fit in a status column." |
| Mock instruction | absurdly specific command | "Instructions unclear. Shipped it anyway." |
| Polarizing statement | challenges an assumption | "Busy is not the same as useful." |
| Full quote | long conversational text that fills the screen | two sentences, 15+ words |
| Two-part reveal | setup, hard cut, punchline | "They said the old way was good enough." then "Then we shipped it in one afternoon." |
| Permission | "This is your sign to [permission]" | "This is your sign to cancel the recurring meeting." |

Copy rules: the first three words do most of the work, so front-load the punch; mix lengths (2-5 words, 5-8, 9-15, 15+); plain language a stranger gets at once; specific beats vague; write the way you would text a friend; no filler vocabulary ("delve", "comprehensive", "crucial", "landscape") and no "X is not just Y, it is Z" constructions.

### Size and style

Sizes below are for a 1080 px wide canvas; the template scales by width.

| Text length | Font size | Notes |
| --- | --- | --- |
| 2-5 words | 84 px | Big, dominant, centered |
| 5-8 words | 72 px | Bold, may wrap to 2 lines |
| 9-15 words | 60 px | 3-4 lines, still readable |
| 15+ words | 52 px | Reads like a paragraph |

Style: white, weight 800, thin dark stroke (`WebkitTextStroke` 2.5 px with `paintOrder: 'stroke fill'` so the stroke does not thin the letters) plus a soft shadow, letter spacing -0.02em, line height 1.15, width 85% of the frame, no entrance animation (text is simply there). Keep it within the vertical safe zone (`formats-and-safe-zones.md`). Two-part reveals use a hard cut at the midpoint, with the setup slightly larger than the punchline.

### Batch workflow

1. Prepare one clip. 2. Write 10 options across several patterns. 3. User picks 3-4. 4. Register one `<Composition>` per pick (the template maps over a list). 5. Preview all in Studio: readable at every moment, no clipping at the edges, size fits the length, reveal timing feels natural. 6. Render each:

```bash
npx remotion render stop-complaint out/stop-complaint.mp4 --crf=18
```

7. Pair each video with a platform-specific caption. Timing: 8 s at 30 fps is 240 frames; Stories may need trimming to about 15 s or less.

## B. Chat-conversation mockup

An animated messenger-style chat in a phone frame: bubbles pop in, a typing indicator precedes replies, the list scrolls itself. Works for showing an assistant, support exchange, customer story or "ask it anything" demo.

Template: `templates/chat-mockup/` (`ChatVideo.tsx`, `Root.tsx`). The video is an array of events:

```tsx
events: [
	{kind: 'message', from: 'me', text: 'Can you summarize this week?', time: '9:18 AM', atSec: 0.7},
	{kind: 'typing', atSec: 2.4, durationSec: 1.6},
	{kind: 'message', from: 'them', text: 'Sure. **42 tickets** came in.', time: '9:18 AM', atSec: 4.2},
]
```

How it works and how to adapt it:

- Times are in seconds; the template multiplies by `fps`. `getChatDuration(events, fps)` sets the composition length (last event plus a 2 s tail) through `calculateMetadata`.
- Auto-scroll is built in: the list is bottom-anchored and each new row grows from `0fr` to `1fr`, so older messages glide up. No hand-tuned scroll keyframes.
- Text supports `**bold**`, `` `code` `` and `\n` line breaks.
- Timing flow that reads well: first message at about 0.7 s; typing indicator 1.5-2 s; reply when the typing row ends; 1-2 s between turns; 2 s tail after the last message.
- Contact name, status and avatar letter are props. Colors are in the `THEME` constant at the top of the file; the defaults are a dark messenger look, so retheme for the brand.
- Defaults: 4:5 (1080 x 1350), 30 fps, no intro or outro, large fonts for mobile. For Reels/TikTok/Shorts use 1080 x 1920, for square 1080 x 1080, for landscape 1920 x 1080; the phone scales to the canvas.
- Optional sounds: incoming and outgoing messages trigger `<Audio>` from `@remotion/media` at the message frame (`https://remotion.media/ding.wav`, `mouse-click.wav` by default). Set `sound: false` for silent output, or swap in local files with `staticFile()`.
- Keep messages concise; long ones need more height. Check readability at actual phone size.
- Render: `npx remotion render ChatDemo out/chat.mp4 --concurrency=4`, add `--crf=18` for higher quality. Use clearly fictional contacts and conversations unless the real ones are supplied and approved.

## C. Narrated illustrated short

A spoken story over full-bleed images (illustrations, product stills, photos), one image per beat, with a slow push-in. The writing structure is in `story-structures.md` (curiosity-hook narrated short).

Template: `templates/narrated-slides/` (`NarratedSlides.tsx`, `Root.tsx`), using `KenBurnsImage` from `templates/components/promo-components.tsx`.

- Slide times come from the narration: get word timestamps by transcribing the narration locally and start each slide at the beginning of its sentence.
- Generate or draw images in portrait, matching the canvas (for example 1080 x 1920). Square images get cropped in a vertical frame.
- Each slide gets its own image; alternate push-in and pull-out. `KenBurnsImage` clips the zoom at the frame edge; if you animate transparent illustrations instead, check that the scaled artwork is not cut off by its container.
- End on a quiet closing image that leads back to slide 1 and skip the end card when the video should loop.
- Text overlays are optional. The source style used none (the platform caption and music carried the stimulation); add captions when sound-off viewing matters.
