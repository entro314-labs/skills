# Programmatic (server-side) rendering with Node.js or Bun

Use the Node.js APIs when rendering is triggered by your own code: a render server, a queue worker, a batch script. For one-off renders, `npx remotion render` or the Studio is simpler.

Packages: `@remotion/bundler` (create a bundle) and `@remotion/renderer` (render it). Both must match the version of `remotion`.

References: https://www.remotion.dev/docs/ssr.md, https://www.remotion.dev/docs/ssr-node.md, https://www.remotion.dev/docs/renderer.md

## Video

```ts
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

// Create the bundle once; reuse the returned location for many renders.
const serveUrl = await bundle({
  entryPoint: path.resolve("./src/index.ts"),
  // If remotion.config.ts has a webpack override, pass it here as well.
  webpackOverride: (config) => config,
});

const inputProps = { title: "Hello World" };

// Resolves duration, size and fps (calculateMetadata runs here).
const composition = await selectComposition({
  serveUrl,
  id: "MyComp",
  inputProps,
});

const { slowestFrames } = await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: "out/MyComp.mp4",
  inputProps,
  onProgress: ({ progress, renderedFrames, encodedFrames, stitchStage }) => {
    console.log(`${(progress * 100).toFixed(1)}% rendered=${renderedFrames} encoded=${encodedFrames} ${stitchStage}`);
  },
});
```

Rules:

- Pass the same `inputProps` to `selectComposition()` and `renderMedia()`. They must be a JSON object.
- `serveUrl` is the local bundle path returned by `bundle()` or a hosted URL.
- `codec` is required. Every option from the CLI has a camelCase counterpart: `crf`, `imageFormat`, `jpegQuality`, `pixelFormat`, `proResProfile`, `frameRange`, `scale`, `concurrency`, `muted`, `videoBitrate`, `audioBitrate`, `x264Preset`, `everyNthFrame`, `numberOfGifLoops`, `hardwareAcceleration`, `timeoutInMilliseconds`, `logLevel`, `chromiumOptions`.
- `concurrency` accepts a number, a percentage string such as `"50%"`, or `null` (Remotion decides; default is half the CPU threads).
- `frameRange` accepts a number, `[start, end]`, `[start, null]`, or (v4.0.502+) an array of ordered, non-overlapping inclusive ranges.
- `onProgress` receives `progress` (0-1), `renderedFrames`, `encodedFrames`, `renderedDoneIn`, `encodedDoneIn` (ms, may be `null`) and `stitchStage` (`"encoding"` or `"muxing"`).
- Return value (v4+): `{ buffer, slowestFrames, contentType }`. `slowestFrames` lists the 10 slowest `{ frame, time }`.

## Still

```ts
import { renderStill } from "@remotion/renderer";

await renderStill({
  composition,
  serveUrl,
  output: "out/thumbnail.png",
  frame: 0, // zero-based; -1 is the last frame
  inputProps,
});
```

`imageFormat` is `png` (default), `jpeg`, `webp` or `pdf`; `jpegQuality` is only valid for `jpeg`.

## Output to a buffer

With `outputLocation: null` (or omitted) the video is returned in memory:

```ts
const { buffer, contentType } = await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: null,
  inputProps,
});
```

Buffers hold the whole file in RAM. For long or high-resolution videos prefer a file path.

## Cancelling

```ts
import { makeCancelSignal, renderMedia } from "@remotion/renderer";

const { cancelSignal, cancel } = makeCancelSignal();

const render = renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  outputLocation: "out/render.mp4",
  cancelSignal,
});

setTimeout(cancel, 10_000);
await render; // rejects with "renderMedia() got cancelled" if cancelled first
```

## Reusing the browser

Opening and closing Chrome for each render costs time. Open one browser, pass it to every call, close it when finished. The browser is passed as `puppeteerInstance`. If an instance is passed, the call's own `chromiumOptions` are ignored; set flags in `openBrowser()` instead.

```ts
import { openBrowser, renderMedia, selectComposition } from "@remotion/renderer";

const browser = await openBrowser("chrome");
const composition = await selectComposition({ serveUrl, id: "MyComp", inputProps, puppeteerInstance: browser });
await renderMedia({ composition, serveUrl, codec: "h264", outputLocation: "out/a.mp4", inputProps, puppeteerInstance: browser });
await browser.close({ silent: true });
```

## Ensure the browser at startup

`ensureBrowser()` (API) and `npx remotion browser ensure` (CLI) download Chrome Headless Shell if missing. Call one of them at server start so the first request does not pay the download. See [headless-linux](headless-linux.md).

```ts
import { ensureBrowser } from "@remotion/renderer";

await ensureBrowser();
```

## Render server pattern

Bundle and prepare the browser before accepting requests, and surface failures as HTTP errors. A reference server with render, progress and cancel endpoints: https://github.com/remotion-dev/template-render-server

```ts
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import express from "express";
import { bundle } from "@remotion/bundler";
import { ensureBrowser, renderMedia, selectComposition } from "@remotion/renderer";

const app = express();
app.use(express.json());

await ensureBrowser();
const serveUrl = await bundle({ entryPoint: path.resolve("./src/index.ts") });

app.post("/render", async (req, res) => {
  const { compositionId, props } = req.body;
  const output = path.join(os.tmpdir(), `${randomUUID()}.mp4`);
  try {
    const composition = await selectComposition({ serveUrl, id: compositionId, inputProps: props });
    await renderMedia({ composition, serveUrl, codec: "h264", outputLocation: output, inputProps: props });
    res.sendFile(output, () => fs.rm(output, { force: true }));
  } catch (err) {
    await fs.rm(output, { force: true });
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

app.listen(3000);
```

Before production, handle: authentication and rate limiting, a render queue (each render launches many browser tabs, see `concurrency`), output privacy and cleanup of old files, and progress and error reporting (store `onProgress` values per job id and expose them to clients).
