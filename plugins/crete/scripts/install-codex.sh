#!/usr/bin/env bash
# Install Athens to Crete prompts for OpenAI Codex CLI.
#
# - Copies each commands/*.md into ~/.codex/prompts/ as crete-<name>.md,
#   rewriting cross-references from the Claude Code form (/crete:<name>) to
#   the Codex form (/prompts:crete-<name>). Re-run after updating the repo.
# - Codex has no subagents: AGENTS.md (repo root) maps each agent reference
#   to an inline phase. Copy AGENTS.md into your project root (or merge it
#   into your existing AGENTS.md) for the methodology itself.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROMPTS_DIR="${CODEX_HOME:-$HOME/.codex}/prompts"

mkdir -p "$PROMPTS_DIR"

installed=0
for cmd in "$REPO_ROOT"/commands/*.md; do
  name="crete-$(basename "$cmd")"
  sed 's#/crete:#/prompts:crete-#g' "$cmd" > "$PROMPTS_DIR/$name"
  installed=$((installed + 1))
  echo "installed $PROMPTS_DIR/$name"
done

echo
echo "Installed $installed prompts. In Codex, invoke them as /prompts:crete-<name> (e.g. /prompts:crete-think-first)."
echo "For the methodology itself, copy AGENTS.md into your project:"
echo "  cp \"$REPO_ROOT/AGENTS.md\" <your-project>/AGENTS.md"
