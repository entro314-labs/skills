---
name: review
description: "Performs a code review covering architecture, quality and drift, checking pattern compliance, style, performance, security and naming against PROJECT_MANIFEST standards using git diff and log. Use when asked to review code or recent changes. Requires a PROJECT_MANIFEST file for drift checks."
allowed-tools: Read, Grep, Bash(git diff), Bash(git log)
disable-model-invocation: true
---

# Code Review

Comprehensive code review focusing on pattern compliance and drift prevention:

## Review Types

### Architecture Review

- Verify adherence to established patterns
- Check component structure compliance
- Validate API design consistency
- Review error handling patterns

### Quality Review

- Code style and conventions
- Performance considerations
- Security best practices
- Maintainability assessment

### Drift Review

- Compare against PROJECT_MANIFEST standards
- Identify pattern deviations
- Check for new anti-patterns
- Validate naming conventions

## Usage

- `/review` - Full code review
- `/review architecture` - Architecture focus
- `/review --quick` - Quick review (key patterns only)
- `/review latest` - Review recent changes only

## Scope Options

- `$ARGUMENTS` - Review specific files/directories
- `--since=<commit>` - Review changes since commit
- `--branch=<name>` - Review specific branch

## Output

Provides detailed review with:

- ✅ Compliant patterns found
- ❌ Issues and violations
- 💡 Improvement suggestions
- 📋 Checklist for fixes
