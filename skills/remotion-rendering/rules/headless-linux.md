# Headless rendering on Linux servers, containers and CI

Remotion renders in Chrome Headless Shell, which it downloads itself. No display server, GUI or system Chrome install is needed, but the browser needs a set of shared libraries.

Sources: https://www.remotion.dev/docs/miscellaneous/linux-dependencies.md, https://www.remotion.dev/docs/docker.md, https://www.remotion.dev/docs/miscellaneous/chrome-headless-shell.md

## System libraries

Ubuntu 22.04 and 24.04:

```bash
apt install -y \
  libnss3 libdbus-1-3 libatk1.0-0 libasound2t64 libxrandr2 libxkbcommon-dev \
  libxfixes3 libxcomposite1 libxdamage1 libgbm-dev libcups2 libcairo2 \
  libpango-1.0-0 libatk-bridge2.0-0
```

Older Ubuntu: same list with `libasound2` instead of `libasound2t64`.

Debian:

```bash
apt install -y \
  libnss3 libdbus-1-3 libatk1.0-0 libgbm-dev libasound2 libxrandr2 \
  libxkbcommon-dev libxfixes3 libxcomposite1 libxdamage1 libpango-1.0-0 \
  libcairo2 libcups2 libatk-bridge2.0-0
```

Not supported: Alpine Linux (unsupported libc symbols, slow Rust components) and nixOS (Remotion ships its own Chrome and FFmpeg binaries).

Remotion v4+ bundles FFmpeg; no separate FFmpeg install is needed (below v4.0.0 it is). Use Node.js 18 or newer.

## Browser download

Remotion downloads Chrome Headless Shell into `node_modules/.remotion/chrome-headless-shell/<platform>/` the first time it is needed. Supported platforms: macOS (x64, arm64), Windows (x64), Linux (x64, arm64).

Pre-download it so the first render does not pay for it:

```bash
npx remotion browser ensure
```

or call `ensureBrowser()` from `@remotion/renderer` at server startup.

Notes:

- Remotion pins a tested Chrome version per release and re-downloads on mismatch (v4.0.415+ writes a `VERSION` file).
- Do not install a system Chrome through apt in your image; install the libraries above and let Remotion fetch Headless Shell. Use `browserExecutable` only if you must supply your own binary: a full Chrome may render differently and less deterministically.
- **Chrome Headless Shell** (default) is faster for CPU-bound rendering and needs fewer dependencies. **Chrome for Testing** (`--chrome-mode=chrome-for-testing`, `chromeMode: "chrome-for-testing"`) is faster for GPU-bound rendering on a GPU Linux box but needs more dependencies and resources.

## Docker

```dockerfile
FROM node:22-bookworm-slim

RUN apt-get update
RUN apt-get install -y libnss3 libdbus-1-3 libatk1.0-0 libgbm-dev libasound2 \
  libxrandr2 libxkbcommon-dev libxfixes3 libxcomposite1 libxdamage1 \
  libatk-bridge2.0-0 libpango-1.0-0 libcairo2 libcups2

COPY package.json package*.json yarn.lock* pnpm-lock.yaml* bun.lockb* bun.lock* tsconfig.json* remotion.config.* ./
COPY src ./src
COPY public ./public

RUN npm i
RUN npx remotion browser ensure

COPY render.mjs render.mjs
CMD ["node", "render.mjs"]
```

```bash
docker build -t remotion-app .
docker run remotion-app
```

`render.mjs` is a script like the one in [programmatic-rendering](programmatic-rendering.md); it must be ESM for top-level `await`.

- Remove `COPY` lines for files your project does not have; each `COPY` needs at least one match.
- For pnpm or yarn add a `packageManager` field to `package.json`, drop `npm i`, and run `corepack enable` first.
- Leave package versions unpinned in `apt-get install`; Debian removes old versions and pinned builds break.
- Docker may not use all CPUs by default; set `--cpus` / `--cpuset-cpus` on `docker run` or raise Docker Desktop limits.
- Emoji need `fonts-noto-color-emoji`; Chinese, Japanese and Korean text needs `fonts-noto-cjk`.- In Node render scripts on Linux, `chromiumOptions: { enableMultiProcessOnLinux: true }` (default `true` since v4.0.42) keeps Chrome multi-process.

## GL backend (`--gl`, `chromiumOptions.gl`)

Values: `angle`, `egl`, `swiftshader`, `vulkan`, `angle-egl`, `swangle`.

| Situation | Setting |
|-----------|---------|
| No WebGL, WebGPU or three.js content | leave the default |
| WebGL / three.js on a desktop | `angle` |
| WebGL / three.js on a Linux machine with a GPU | `angle-egl` |
| WebGL / three.js on a machine without a GPU | `swangle` (software, can be slow) |

- The default is `null` locally in Remotion 4.x. In Remotion 5.0 the local default becomes `angle` (GPU if available, falling back to SwiftShader).
- `angle` has known memory leaks; split very long renders into parts.
- In Remotion 4.x `angle` fails on CI runners without a GPU; use `swangle` there.

## CPU and memory

- Concurrency defaults to half the CPU threads. Run `npx remotion benchmark` on the target machine to find the best value, or set `--concurrency` explicitly.
- High concurrency raises memory use; see [performance-and-troubleshooting](performance-and-troubleshooting.md) for out-of-memory and missing-video symptoms.
