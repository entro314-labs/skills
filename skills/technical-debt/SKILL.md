---
name: technical-debt
description: "Analyzes the codebase for technical debt, categorizing issues as breaking, consistency or quality with file locations, effort estimates and fix suggestions, and writes them to REFACTOR_PLAN.md. Use when asked to assess technical debt. Creates or updates REFACTOR_PLAN.md in the project."
allowed-tools: Read, Grep, Edit
disable-model-invocation: true
---

# Technical Debt Analysis

Analyze codebase for technical debt and update REFACTOR_PLAN.md:

## Analysis Types

### Full Analysis

Comprehensive scan for all types of technical debt:

- 🔴 Breaking issues (bugs, security, build failures)
- 🟡 Consistency issues (pattern violations, naming)
- 🟢 Quality improvements (performance, maintainability)

### Focused Analysis

Target specific areas:

- `--dependencies` - Analyze dependency issues
- `--security` - Focus on security vulnerabilities
- `--performance` - Performance bottlenecks
- `--types` - TypeScript type issues

## Usage

- `/technical-debt` - Quick analysis
- `/technical-debt --full` - Comprehensive analysis
- `/technical-debt --dependencies` - Dependency analysis only

## Output

Updates REFACTOR_PLAN.md with:

- Categorized issues by priority
- Specific file locations
- Estimated effort levels
- Suggested fix approaches
