# Tooling

**Bleeding edge is a feature, not a bug.** In the AI landscape, software development moves fast - stay ahead of the curve even if it means hitting new issues first. Never downgrade versions of languages, tools, or libraries. Continuously evaluate more modern alternatives.

- For dev tooling (linters, formatters, bundlers, test runners), prefer the latest including prereleases when they're the project's chosen stack; apply the same logic to production dependencies and runtimes
- Don't upgrade or downgrade dependencies as a side effect of an unrelated task - propose upgrades separately
- When an upgrade brings breaking API changes, adapt the code in place - no compatibility shims

## General

- Use mise for package and library management
- Use homebrew when appropriate for system-level dependencies

## Node.js/TypeScript

- oxlint, oxfmt, and oxlint-tsgolint for linting/formatting
- tsgo instead of tsc for faster incremental builds and better error reporting
- viteplus ecosystem and its satellite tools for linting, building, formatting, bundling, and testing
- Knip for dependency analysis and dead code detection
- Syncpack for consistent dependency versions across packages
- tsdown (or more modern bundlers) for library bundling
- vite for non-Next.js projects; Next.js for React projects with SSR needs
- pnpm for package and script management
- turborepo for monorepo management and task orchestration

## Go

- golangci-lint for comprehensive linting
- goimports for formatting and organizing imports
- go mod for dependency management
- go test with coverage

## Tauri

- vite for frontend development and bundling
- cargo for backend development and dependency management
- tauri's built-in tooling for building and packaging

## Python

- ruff for linting and formatting (replaces black, isort, flake8, mypy)
- pytest for testing
- uv for dependency management and task running
- Python 3.13.11+ for best performance and features
- Highest compatible package versions, including prereleases

## Docker / Compose

- Latest base OS and application images
- Multi-stage builds to optimize image size
- .dockerignore to exclude unnecessary files
- Environment variables for configuration and secrets
- Latest versions of CI/CD actions and tools
