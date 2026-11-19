---
name: development-bug-fix
description: "Runs a git-based bug fix workflow: creates a GitHub issue, creates a bugfix branch, fixes the bug, commits, pushes, and opens a PR linked to the issue with gh. Use when asked to fix a bug end to end with an issue, branch, and pull request."
disable-model-invocation: true
---

# Bug Fix Workflow

## Purpose

Understand the bug: $ARG

## Before Starting

- **GITHUB**: create a issue with the a short descriptive title:
  `gh issue create --title "Issue Title" --body "Issue description"`
- **GIT**: checkout a branch and switch to it. `git checkout -b bugfix/$ARG`

## Fix the Bug

## On Completion

- **GIT**: commit with a descriptive message.
- **GIT**: push the branch to the remote repository.
- **GITHUB**: create a PR and link the issue:
  `gh pr create --title "PR Title" --body "PR description" --base main --head bugfix/$ARG`
