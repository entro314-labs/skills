---
name: drift-prevention-kit
description: "Templates and scripts for the drift-prevention workflow: DRIFT_PREVENTION_GUIDE, PROJECT_MANIFEST and REFACTOR_PLAN templates (two variants each), pre and post edit hook scripts, and the original settings example. Use when setting up drift prevention in a project, or when the audit, refactor-plan, review, standardize, validate or technical-debt skills need these files."
disable-model-invocation: true
---

# drift-prevention-kit

Templates and scripts for the drift-prevention workflow: DRIFT_PREVENTION_GUIDE, PROJECT_MANIFEST and REFACTOR_PLAN templates (two variants each), pre and post edit hook scripts, and the original settings example.

Read only the files relevant to the task; do not load the whole library. These files date from 2025. Where they conflict with current official documentation or the project's installed versions, the official docs and the project win.

Variants: files under `references/myroomie/` are the MyRoomie-specific versions; files under `references/claude-code-docs/` are the versions written for the Claude Code documentation project. The hook scripts are in `scripts/`.

The `settings.json` example uses a hooks format (`pre-tool-use` arrays of shell lines) that Claude Code does not read. To use the scripts, register them in the project's `.claude/settings.json` under `hooks.PreToolUse` / `hooks.PostToolUse` with a `matcher` of `Edit|Write`, and confirm with the user before changing any settings file.

| File | Title | Lines |
|---|---|---|
| [references/myroomie/DRIFT_PREVENTION_GUIDE.md](references/myroomie/DRIFT_PREVENTION_GUIDE.md) | 🛡️ Drift Prevention Guide - Claude Code Documentation | 201 |
| [references/myroomie/PROJECT_MANIFEST.md](references/myroomie/PROJECT_MANIFEST.md) | Project Manifest - MyRoomie Platform Architecture | 397 |
| [references/myroomie/REFACTOR_PLAN.md](references/myroomie/REFACTOR_PLAN.md) | Refactor Plan - MyRoomie Platform Cleanup | 295 |
| [references/claude-code-docs/DRIFT_PREVENTION_GUIDE.md](references/claude-code-docs/DRIFT_PREVENTION_GUIDE.md) | 🛡️ Drift Prevention Guide - Claude Code Documentation | 201 |
| [references/claude-code-docs/PROJECT_MANIFEST.md](references/claude-code-docs/PROJECT_MANIFEST.md) | Project Manifest - Large Codebase Management | 156 |
| [references/claude-code-docs/REFACTOR_PLAN.md](references/claude-code-docs/REFACTOR_PLAN.md) | Refactor Plan - Large Codebase Cleanup | 195 |
| [scripts/pre-edit-validation.sh](scripts/pre-edit-validation.sh) | pre-edit-validation.sh | 82 |
| [scripts/post-edit-update.sh](scripts/post-edit-update.sh) | post-edit-update.sh | 100 |
| [references/settings.json](references/settings.json) | settings.json | 87 |
| [references/settings.local.json](references/settings.local.json) | settings.local.json | 6 |
