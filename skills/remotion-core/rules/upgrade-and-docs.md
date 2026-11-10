# Upgrading Remotion and looking up the docs

## Upgrade Remotion

1. Inspect the project manifests and lockfile to identify the package manager and workspaces. Preserve unrelated changes.
2. If `@remotion/cli` is available locally, run:

   ```bash
   npx remotion upgrade
   ```

   It also updates project-local Remotion skills. Skip the manual steps.

3. Otherwise upgrade manually:
   - Get the latest stable version: `npm view remotion version`.
   - Find every installed `remotion` and `@remotion/*` dependency across the project and upgrade them all to that exact version, preserving their dependency sections and the project's workspace or catalog conventions.
   - Read the `@remotion/studio` dependencies for the target version with `npm view @remotion/studio@<version> dependencies --json`. Align installed auxiliary packages such as `zod`, `mediabunny` and `@huggingface/transformers` with the versions listed there; use the `mediabunny` version for installed `@mediabunny/*` packages.
   - Run the package manager to update the lockfile.
4. Review the manifest and lockfile diff. All Remotion packages must use one version (never update a single `@remotion/*` package alone; mixed versions cause build failures and subtle render bugs), and auxiliary packages must use their recommended versions. With the CLI available, `npx remotion versions` is an extra check.

The [Remotion releases](https://github.com/remotion-dev/remotion/releases) contain the changelog and are useful for summarizing relevant changes after the upgrade. Some features need a minimum version (light leaks 4.0.500, `<HtmlInCanvasMotionBlur>` 4.0.529).

## Look up current API documentation

Prefer current documentation over memorized API knowledge, especially for props that changed between versions.

Append `.md` to any Remotion docs URL to fetch its Markdown source (cheaper in tokens):

```
https://www.remotion.dev/docs/use-video-config.md
https://www.remotion.dev/docs/sequence.md
https://www.remotion.dev/docs/cli/render.md
```

To find the right page, guess the URL from the API name (for example `https://www.remotion.dev/docs/<api-name>.md`) or start from `https://www.remotion.dev/docs/api.md`.

Workflow: pick the most relevant pages, fetch each with the `.md` suffix, then implement from that documentation.
