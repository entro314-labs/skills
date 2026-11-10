# skills

Agent Skills from entro314.labs. Each skill is a folder under `skills/` with a `SKILL.md`, following the [Agent Skills](https://agentskills.io) format.

## Skills

| Skill | What it does |
| --- | --- |
| [ui-declutter](skills/ui-declutter/SKILL.md) | Edits the visible text and decoration of a web page, app screen, game menu, chart or dashboard down to what its user needs. |

## Install

### Claude Code

Add the marketplace once, then install the skills you want:

```
/plugin marketplace add entro314-labs/skills
/plugin install ui-declutter@entro314-labs
```

The same from a shell:

```sh
claude plugin marketplace add entro314-labs/skills
claude plugin install ui-declutter@entro314-labs
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
2. Add an entry to `plugins` in [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json):

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
