---
name: standardize
description: "Standardizes code to patterns defined in PROJECT_MANIFEST.md: Result<T, E> API calls, React component structure, type safety, file naming, import style and formatting, with backups and diff preview. Use when asked to standardize or normalize code. Requires a PROJECT_MANIFEST.md in the project."
allowed-tools: Read, Write, Edit, Bash(npm run lint), Bash(npm run format)
disable-model-invocation: true
---

# Code Standardization

Automatically standardize code to match established patterns in PROJECT_MANIFEST.md:

## Standardization Areas

### API Patterns

- Convert API calls to Result<T, E> pattern
- Standardize error handling
- Ensure consistent response formats

### Component Structure

- Standardize React component format
- Add missing TypeScript interfaces
- Ensure proper hook usage order

### Type Safety

- Replace 'any' types with proper types
- Add missing return type annotations
- Define missing interface definitions

### File Organization

- Fix naming conventions (kebab-case/PascalCase)
- Standardize import patterns (absolute vs relative)
- Organize file structure

### Code Style

- Apply consistent formatting
- Standardize naming conventions
- Apply linting rules

## Usage

- `/standardize` - Standardize everything
- `/standardize --aspect api` - API patterns only
- `/standardize --aspect naming` - File/variable naming
- `/standardize --aspect types` - TypeScript types
- `/standardize --aspect imports` - Import statements

## Safety

- Creates backup of modified files
- Shows diff before applying changes
- Allows selective application
- Runs tests after changes to verify
