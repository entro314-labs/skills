# Project setup, Studio preview and visual checks

## Scaffold a project

Skip this if a Remotion project already exists (look for `remotion` in `package.json`). Check that Node.js and Git are installed and inspect the current folder, including hidden files, before choosing where to scaffold.

Empty folder (or only disposable OS metadata such as `.DS_Store`; remove only those first, because `create-video` rejects non-empty folders; never treat `.env` or `.git` as disposable):

```bash
npx create-video@latest --yes --blank --no-tailwind .
npm i
```

Folder with meaningful contents: scaffold into a subfolder.

```bash
npx create-video@latest --yes --blank --no-tailwind my-video
cd my-video
npm i
```

Keep the scaffold and add React markup to it. Entry file registers the root (`registerRoot(RemotionRoot)` in `src/index.ts`); compositions are registered in `src/Root.tsx` (see [compositions.md](compositions.md)).

Add packages with `npx remotion add <package>` so the version matches the installed Remotion. This applies to `@remotion/*`, `mediabunny`, `@mediabunny/*`, `zod` and `@huggingface/transformers`:

```bash
npx remotion add @remotion/media
```

Use `bunx`, `yarn` or `pnpm exec` instead of `npx` when the project uses that package manager.

## Open the preview first

When asked to make, create or build a video, do not render by default. Start Studio as soon as the project can run, before writing or changing the composition, and keep it open so the user can watch progress and steer. Render only when the user is explicit ("render", "export", "give me the MP4"); see the `remotion-rendering` skill.

Let Studio open the browser itself (always correct in Cursor):

```bash
npx remotion studio
```

With an in-app browser, you may instead run:

```bash
npx remotion studio --no-open
```

If Studio is already running, the command prints the URL and exits; otherwise it starts a long-running process and prints the URL. With `--no-open`, open the exact printed URL in the in-app browser and verify that Studio loads and, once a composition exists, that its preview loads. If you cannot open it there, run Studio without `--no-open`. Open a specific composition at `/<composition-id>`, for example `http://localhost:3000/MapAnimation`.

| Flag              | Purpose                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `--log=<level>`   | `error`, `warn`, `info` (default) or `verbose` logging.                                       |
| `--port=<number>` | Request a port; otherwise Remotion finds a free one.                                          |
| `--force-new`     | Start another Studio instance even if one already runs for the same project and port.         |

Studio supports WebMCP tools.

## Preserve user changes

Users edit code outside the conversation, and Studio can write edits back to source. If you notice a surprising change, do not overwrite it: assume it was intentional or ask.

## Visual checks

- Check visual changes in Studio. After changing timeline structure, inspect the full composition and any connected components; verify visible layers, cut timing and synchronized content.
- For a quick frame sanity check without a full render, render one frame at reduced size (`--frame` is zero-based; at 30 fps, `--frame=30` is the one-second mark). Skip it for trivial edits or pure refactors.

```bash
npx remotion still [composition-id] --scale=0.25 --frame=30
```

- Several frames as images in one call: `npx remotion render [composition-id] out/frames --frames=0,30,90 --image-format=png`.

## Common resolutions

| Format           | Width x Height | Use                        |
| ---------------- | -------------- | -------------------------- |
| 1080p landscape  | 1920 x 1080    | YouTube, general video     |
| 1080p vertical   | 1080 x 1920    | Reels, TikTok, Shorts      |
| 1080p square     | 1080 x 1080    | Feed posts                 |
| 4K landscape     | 3840 x 2160    | High-resolution production |
| 720p landscape   | 1280 x 720     | Fast previews              |
