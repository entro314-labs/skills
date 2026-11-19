---
name: refactor-plan
description: "Executes systematic refactoring from a REFACTOR_PLAN.md in priority order (critical, consistency, quality phases), validating with tests and updating the plan after each item. Use when asked to work through the refactor plan. Requires a REFACTOR_PLAN.md in the project, typically produced by technical-debt."
allowed-tools: Read, Write, Edit, Bash(npm test), Bash(npm run lint)
disable-model-invocation: true
---

# Systematic Refactoring

Execute refactoring tasks from REFACTOR_PLAN.md in priority order:

## Refactoring Phases

### Phase 1: Critical Issues (🔴)

Fix breaking issues that prevent development:

- Runtime errors and build failures
- Security vulnerabilities
- Type safety critical issues
- Circular dependencies

### Phase 2: Consistency Issues (🟡)

Address pattern inconsistencies:

- API pattern standardization
- Component structure alignment
- Error handling consistency
- File naming conventions

### Phase 3: Quality Improvements (🟢)

Enhance maintainability and performance:

- Code deduplication
- Performance optimizations
- Accessibility improvements
- Documentation updates

## Usage

- `/refactor-plan` - Work on next priority item
- `/refactor-plan --phase=1` - Focus on critical issues only
- `/refactor-plan --pattern=api-consistency` - Specific pattern focus
- `/refactor-plan $ARGUMENTS` - Refactor specific files/components

## Execution Flow

1. **Select Target**: Choose highest priority item from REFACTOR_PLAN.md
2. **Plan Approach**: Create step-by-step refactoring plan
3. **Execute Changes**: Make systematic modifications
4. **Validate**: Run tests and verify functionality
5. **Update Plan**: Mark completed, add any new issues discovered

## Safety Measures

- Incremental changes with test validation
- Backup critical files before modification
- Rollback capability if tests fail
- Progress tracking in REFACTOR_PLAN.md
