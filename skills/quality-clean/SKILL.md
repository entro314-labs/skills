---
name: quality-clean
description: "Cleans up technical debt in a target: removes dead code, unused imports and commented-out blocks, fixes lint issues, consolidates duplication, updates deprecated usage, and commits per cleanup type with tests. Use when asked to clean up, remove dead code, or tidy a codebase."
disable-model-invocation: true
---

# Technical Debt Cleanup

## Purpose

Clean up technical debt in $ARGUMENTS.

Steps:

1. Identify cleanup targets:
   - Scan for TODO, FIXME, HACK, XXX comments
   - Find commented-out code blocks
   - Locate unused imports and variables
   - Detect unreachable/dead code
   - Identify deprecated API usage
   - Find console.log/print debug statements

2. Code quality improvements:
   - Fix linting errors and warnings
   - Apply consistent code formatting
   - Standardize naming conventions
   - Convert var to let/const (JavaScript)
   - Update to modern syntax (arrow functions, destructuring)
   - Remove unnecessary type assertions

3. Remove dead code:
   - Delete commented-out code older than 3 months
   - Remove unused functions and methods
   - Clean up unreferenced files
   - Delete obsolete configuration
   - Remove feature flags for shipped features
   - Clean up A/B test code for completed experiments

4. Consolidate duplication:
   - Identify duplicate code blocks
   - Extract common functionality to utilities
   - Merge similar functions with parameters
   - Consolidate redundant type definitions
   - Unify error handling patterns

5. Update deprecated usage:
   - Replace deprecated library methods
   - Update to current API versions
   - Migrate from legacy patterns
   - Update outdated documentation references
   - Fix deprecated test patterns

6. File organization:
   - Remove empty files and directories
   - Organize imports (grouped and sorted)
   - Move files to appropriate directories
   - Update incorrect file extensions
   - Fix circular dependencies

7. Documentation cleanup:
   - Remove outdated comments
   - Update incorrect documentation
   - Add missing JSDoc/docstrings
   - Fix broken links in docs
   - Update example code

Safety measures:

- Create git commit before each cleanup type
- Run tests after each change
- Keep refactoring commits separate
- Document why code was removed
- Preserve git history for deleted files

Output:

- Summary of cleaned items by category
- Lines of code removed
- Performance impact (if any)
- Risk assessment for changes
- Follow-up tasks identified
