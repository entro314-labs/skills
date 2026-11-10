# Script, chapters and timing

Write the script before any component. A script is a list of scenes; each scene is one idea with exact words, a visual and a duration.

## Brief

Collect these fields; defaults in brackets.

| Field | Meaning |
|---|---|
| `goal` | What the viewer can do or understands after watching, in one sentence |
| `audience` | Developers, end users, stakeholders, or mixed; decides vocabulary and depth |
| `source` | Path to the codebase, screenshots folder, recordings or `.excalidraw` file |
| `videoType` | `project-explainer`, `coding-tutorial`, `product-demo`, `data-visualization`, `diagram-explainer`, `social-clip` |
| `duration` | Target seconds [tutorial 120-300, demo under 90, social 10-60] |
| `aspect` | `16:9` 1920x1080 [default], `1:1` 1080x1080, `9:16` 1080x1920 |
| `narration` | `none`, `local-tts`, or `recorded` [none] |
| `style` | Theme tokens from the project's own branding when it has any (`references/visual-style.md`) |

## Discovery checklist (project explainer)

1. Read README, CLAUDE.md/AGENTS.md or other docs; note purpose, tech stack, main dependencies.
2. Read the directory structure and entry points; identify the core components, services and data flows.
3. Map the user journeys end to end; these become the feature chapters.
4. List demo-worthy features, rank by importance and visual appeal for the stated audience.
5. For anything you will draw (architecture, data flow, sequence), confirm it against the code. A diagram that disagrees with the implementation is worse than none.
6. Get real visuals where possible: run the app and capture screens (`references/walkthrough.md`), or show real code excerpts. Use mock-ups only when labelled as such.

## Chapter structure

A tutorial or introduction video typically uses these chapters. Drop what the brief does not need.

| Chapter | Length | Content |
|---|---|---|
| Intro | 5-10 s | Name, tagline, branding |
| Overview | 10-20 s | Purpose and value proposition |
| Key features | 30-60 s each | One feature per chapter, shown, not described |
| Architecture | 20-40 s | One diagram, built up in the order the narration explains it |
| Getting started | 20-30 s | The minimum commands or clicks to a first result |
| Call to action | 5-10 s | Link, how to contribute or get help |

Total 2-5 minutes for tutorials. Walkthroughs of screens work best under 90 seconds; social clips 10-60 seconds with 4-6 scenes. Longer than five minutes: split into several videos.

## Script format

Keep the script as JSON next to the project (`script.json`) so scenes, narration and timing have one source of truth. The fields below are the working set; add fields only when a scene needs them.

```json
{
  "title": "Acme tasks: first project in two minutes",
  "videoType": "product-demo",
  "fps": 30,
  "width": 1920,
  "height": 1080,
  "scenes": [
    {
      "id": "intro",
      "chapter": "Intro",
      "narration": "Acme Tasks keeps a small team's work in one board.",
      "onScreenText": ["Acme Tasks", "One board for the whole team"],
      "visual": "Title card, accent colour wipe, logo from public/logo.svg",
      "assets": ["logo.svg"],
      "durationSeconds": 6,
      "transition": "fade"
    },
    {
      "id": "board",
      "chapter": "Key features",
      "narration": "Drag a card between columns and everyone sees the change at once.",
      "onScreenText": ["Drag cards between columns"],
      "visual": "Screenshot screens/02-board.png, zoom into the middle column at 2 s, callout on the dragged card",
      "assets": ["screens/02-board.png"],
      "durationSeconds": 7,
      "transition": "slide-left"
    }
  ],
  "audio": {"music": null, "narration": "local-tts"},
  "packages": ["@remotion/transitions", "@remotion/media"]
}
```

Rules for scenes:

- One idea per scene. If you need "and" to describe it, split it.
- Write the exact on-screen text in the script; do not leave wording to the build step.
- Name the first thing the viewer should notice.
- List every asset the scene needs so missing files are found before building.
- A `transition` describes how the scene enters; the first scene has none.
- With narration, `durationSeconds` is only an estimate; the build replaces it by measured audio length (`references/diagram-narration.md`).

## Video types

| Type | Shape | Route |
|---|---|---|
| `project-explainer`, `coding-tutorial` | Chapters of animated scenes, code excerpts, one architecture diagram | `references/scene-patterns.md` |
| `product-demo` | Real screens with zoom and callouts | `references/walkthrough.md` |
| `diagram-explainer` | Camera moving over one diagram while narration explains | `references/diagram-narration.md` |
| `data-visualization` | Numbers revealed in the order the narration argues | `references/scene-patterns.md` for staging; chart code in `remotion-core` |
| `social-clip` | 10-60 s, vertical or square, large type, 4-6 scenes | `references/visual-style.md` for sizes |

## Writing narration

- Write for the ear: short sentences, one point each, contractions allowed.
- Say what the viewer is looking at, then why it matters. Do not read code symbol by symbol; name what the code does.
- Spell out numbers, versions and abbreviations the way they should be spoken, because a TTS voice reads the text literally.
- Plan with roughly 2.5 spoken words per second as a first estimate; real durations come from the audio.
- Keep a scene's narration to one or two sentences (about 5-15 seconds). Longer passages make a scene that is hard to keep visually alive.
- Add pauses by splitting into scenes, not by padding text with punctuation.

## Timing math

```ts
const frames = (seconds: number, fps: number) => Math.round(seconds * fps);

// Scenes in a TransitionSeries: transitions overlap, overlays do not.
const total = sceneFrames.reduce((a, b) => a + b, 0) - transitionFrames.reduce((a, b) => a + b, 0);
```

- Silent video: scene length = reading time of the on-screen text plus settle time; use the table in `references/visual-style.md`.
- Narrated video: scene length = lead-in + audio length + tail pause (for example 0.2 s + audio + 0.6 s). If the scene follows a transition, the lead-in must be at least as long as the transition so narration does not start while the previous scene is still visible.
- Compute the total in `calculateMetadata` when it depends on audio or fetched data, and inline it on `<Composition>` otherwise.

## Pre-build review

Read the narration aloud once. Check: every scene has one idea; the chapter order matches the real user journey; the total fits the target; every asset exists; every on-screen fact is true of the source. Only then build.
