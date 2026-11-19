---
name: clean
description: "Cleans up a codebase by removing dead code, duplicates, unused dependencies and misplaced or temporary files, with dry-run default, confirmation before deletions and test validation afterwards. Use when asked to clean up, remove dead code or prune unused dependencies."
allowed-tools: Read, Write, Edit, Bash(npm run lint), Bash(npm test)
disable-model-invocation: true
---

# Codebase Cleanup

Clean up codebase by removing technical debt and optimizing code quality:

## Cleanup Types

### Dead Code Removal

- Identify unused imports
- Remove unreachable code paths
- Clean up commented code blocks
- Remove unused variables/functions
- Eliminate orphaned files

### Duplicate Code Elimination

- Find duplicated logic patterns
- Extract common functionality
- Consolidate similar components
- Merge redundant utilities
- Create reusable abstractions

### Dependency Cleanup

- Remove unused dependencies
- Consolidate similar packages
- Update deprecated packages
- Optimize bundle size

### File Organization

- Remove empty directories
- Consolidate related files
- Fix misplaced components
- Clean up temporary files

## Usage

- `/clean` - Full cleanup (safe operations only)
- `/clean --dead-code` - Remove dead code
- `/clean --duplicates` - Eliminate duplicates
- `/clean --dependencies` - Clean up dependencies
- `/clean --aggressive` - Include potentially risky cleanup

## Safety Features

- Dry-run mode by default
- Confirmation before deletions
- Backup of removed code
- Test validation after cleanup
- Rollback capability

## Output

Cleanup report showing:

- 📁 Files removed/modified
- 📦 Dependencies cleaned
- 💾 Space/complexity saved
- ⚠️ Potential issues identified
