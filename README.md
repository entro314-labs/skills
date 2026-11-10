# skills

Agent Skills from entro314.labs. Each skill is a folder under `skills/` with a `SKILL.md`, following the [Agent Skills](https://agentskills.io) format.

## Skills

| Skill | What it does |
| --- | --- |
| [ui-declutter](skills/ui-declutter/SKILL.md) | Edits the visible text and decoration of a web page, app screen, game menu, chart or dashboard down to what its user needs. |

### brand-writing

Six writing skills that install together as the `brand-writing` plugin. Intended flow: `positioning-messaging` → `brand-voice` → `copywriting` / `landing-page-copy` → `copy-editing`, with `ux-writing` for in-product text.

| Skill | What it does |
| --- | --- |
| [positioning-messaging](skills/positioning-messaging/SKILL.md) | Positioning, messaging hierarchy, value propositions, taglines and brand or founder stories. |
| [brand-voice](skills/brand-voice/SKILL.md) | Develops and documents a brand voice, and keeps it intact in AI-assisted writing. |
| [copywriting](skills/copywriting/SKILL.md) | Persuasive copy for single assets: ads, emails, headlines, product descriptions and CTAs. |
| [landing-page-copy](skills/landing-page-copy/SKILL.md) | Whole-page copy for landing, home, pricing and sales pages, section by section. |
| [copy-editing](skills/copy-editing/SKILL.md) | Improves existing copy in seven focused passes, with a readability scorer. |
| [ux-writing](skills/ux-writing/SKILL.md) | Interface microcopy: buttons, labels, errors, empty states, forms and notifications. |

### remotion

Eight skills for making videos in React with [Remotion](https://www.remotion.dev) (v4+), installed together as the `remotion` plugin. `remotion-core` is the core; the others build on it. Remotion has its own license terms for company use.

| Skill | What it does |
| --- | --- |
| [remotion-core](skills/remotion-core/SKILL.md) | Core Remotion guidance: compositions, frame-driven animation, timing, media, fonts, 3D and effects. |
| [remotion-project-conventions](skills/remotion-project-conventions/SKILL.md) | Naming, file organisation, theming, accessibility and testing for a Remotion codebase. |
| [remotion-transitions](skills/remotion-transitions/SKILL.md) | Scene transitions, light leaks and custom presentations with `@remotion/transitions`. |
| [remotion-maplibre-maps](skills/remotion-maplibre-maps/SKILL.md) | Animated maps with MapLibre and Turf, with no account, API key or token. |
| [remotion-explainer-videos](skills/remotion-explainer-videos/SKILL.md) | Workflow for explainer, tutorial, walkthrough and diagram-narrated videos. |
| [remotion-promo-videos](skills/remotion-promo-videos/SKILL.md) | Planning and building promo, launch and short-form social videos, with templates. |
| [remotion-product-film](skills/remotion-product-film/SKILL.md) | Writes a product video brief from the codebase, then builds a cinematic film from the real interface: perspective camera, lifted components, checks and delivery package. |
| [remotion-rendering](skills/remotion-rendering/SKILL.md) | Rendering to video, stills, GIF and transparent video from the CLI or Node.js. |

### crete

[Athens to Crete](https://github.com/entro314-labs/athens-to-crete), an integration-first engineering methodology: understand the real problem, reuse what exists, verify the path end to end. It is a full Claude Code plugin with ten `/crete:*` commands, four subagents, a session-start reminder and the `athens-to-crete` skill. It lives in [`plugins/crete/`](plugins/crete/README.md).

## Install

### Claude Code

Add the marketplace once, then install the plugins you want:

```
/plugin marketplace add entro314-labs/skills
/plugin install ui-declutter@entro314-labs
/plugin install brand-writing@entro314-labs
/plugin install remotion@entro314-labs
/plugin install crete@entro314-labs
```

The same from a shell:

```sh
claude plugin marketplace add entro314-labs/skills
claude plugin install ui-declutter@entro314-labs
claude plugin install brand-writing@entro314-labs
claude plugin install remotion@entro314-labs
claude plugin install crete@entro314-labs
```

### Other agents

The [`skills`](https://github.com/vercel-labs/skills) CLI installs into Claude Code, Cursor, Codex and other agents:

```sh
npx skills add entro314-labs/skills --list            # see what is available
npx skills add entro314-labs/skills -s ui-declutter   # install one skill
```

### By hand

Copy a skill folder into your agent's skills directory, for example `~/.claude/skills/ui-declutter/`.

## Adding a skill

1. Create `skills/<name>/SKILL.md`. The frontmatter needs `name` (matching the folder name) and `description` (what the skill does and when to use it). Put supporting files next to it in `references/`, `scripts/` and `evals/`.
2. Add an entry to `plugins` in [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json). To ship several skills as one plugin, list them all in `skills`:

   ```json
   {
     "name": "<name>",
     "description": "<one sentence>",
     "source": "./",
     "strict": false,
     "skills": ["./skills/<name>"]
   }
   ```

3. Add a row to the table above and a line to [CHANGELOG.md](CHANGELOG.md).
4. Run `claude plugin validate . --strict`.

Pull requests with new skills or fixes are welcome. Keep a skill free of secrets, personal paths and client material.

## License

[MIT](LICENSE)
