---
name: validate
description: "Validates the codebase against patterns recorded in PROJECT_MANIFEST.md: type safety (no any), Result<T, E> API patterns, component structure, error handling, naming, and imports, with a compliance report. Requires PROJECT_MANIFEST.md in the project. Use when asked to validate against project patterns."
disable-model-invocation: true
---

# Codebase Validation

Run comprehensive validation against established patterns in PROJECT_MANIFEST.md:

## Validation Checks

1. **Type Safety**: Check for 'any' types and untyped functions
2. **Pattern Compliance**: Verify API calls follow Result<T, E> pattern
3. **Component Structure**: Ensure components follow established format
4. **Error Handling**: Check for proper error handling patterns
5. **File Naming**: Verify naming conventions (kebab-case, PascalCase)
6. **Import Patterns**: Check for absolute vs relative imports

## Usage

- `/validate` - Run all validations
- `/validate --focus=types` - Focus on type safety only
- `/validate --quick` - Quick validation (essential checks only)

## Output

Generates validation report with:

- ✅ Compliant patterns
- ❌ Violations found
- 📊 Compliance percentages
- 🔧 Suggested fixes
