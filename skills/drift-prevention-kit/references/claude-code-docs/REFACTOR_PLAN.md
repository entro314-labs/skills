---
title: 'Refactor Plan - Large Codebase Cleanup'
description: 'Issues that cause bugs or prevent development.'
category: 'Claude Code'
---

# Refactor Plan - Large Codebase Cleanup

## 🔴 Breaking Issues (Fix First)

_Issues that cause bugs or prevent development_

- [ ] **Type Safety Critical**: UserService.authenticate() returns 'any' (src/services/auth.ts:45)
- [ ] **Runtime Errors**: Missing error handling in API calls (src/components/UserDashboard.tsx)
- [ ] **Security Issue**: Raw user input in SQL query (src/api/users.ts:23)
- [ ] **Build Breaking**: Circular dependency between auth.ts and user.ts

## 🟡 Consistency Issues (Fix Second)

_Patterns that don't follow established standards_

- [ ] **Type Definitions**: 23 'any' types across components/ folder
- [ ] **API Patterns**: 8 files not using Result<T, E> pattern
- [ ] **Component Structure**: 12 components missing proper interface definitions
- [ ] **Error Handling**: Inconsistent error handling across API services
- [ ] **File Naming**: 5 files not following kebab-case convention
- [ ] **Import Patterns**: Relative imports instead of absolute paths

## 🟢 Code Quality (Fix Last)

_Improvements that enhance maintainability_

- [ ] **Duplicate Code**: Extract common form validation logic (3 instances)
- [ ] **Performance**: Memoize expensive calculations in dashboard
- [ ] **Accessibility**: Add proper ARIA labels to form components
- [ ] **Testing**: Missing unit tests for critical auth flows
- [ ] **Documentation**: Add JSDoc to complex utility functions
- [ ] **Bundle Size**: Remove unused dependencies (lodash, moment)

## 📊 Current State Analysis

### Type Safety Status

- **Total 'any' types**: 31 instances
- **Untyped functions**: 15 async functions missing return types
- **Missing interfaces**: 8 API response types not defined

### Code Pattern Compliance

- **API calls following pattern**: 60% (15/25 services)
- **Components with proper structure**: 70% (42/60 components)
- **Error handling consistency**: 45% (low - needs attention)

### File Organization

- **Correctly named files**: 85% (mostly good)
- **Proper folder placement**: 90% (a few misplaced utils)
- **Import consistency**: 65% (mix of relative/absolute)

## 🔧 Systematic Refactor Strategy

### Phase 1: Critical Issues (Week 1)

```typescript
// Focus on files causing immediate problems
1. Fix src/services/auth.ts type issues
2. Add error handling to UserDashboard.tsx
3. Secure SQL query in users.ts
4. Resolve circular dependency
```

### Phase 2: Type Safety (Weeks 2-3)

```typescript
// Eliminate 'any' types systematically
1. Define missing interfaces in /types
2. Update component props with proper types
3. Add return types to all async functions
4. Convert API responses to typed interfaces
```

### Phase 3: Pattern Consistency (Week 4)

```typescript
// Standardize established patterns
1. Convert all API calls to Result<T, E> pattern
2. Restructure components to follow standard format
3. Standardize error handling across services
4. Fix file naming and import patterns
```

## 📋 Validation Commands for Claude Code

### Daily Drift Check

```bash
# Check for new 'any' types
/audit security --focus=types
# Validate current patterns
/review architecture --quick
```

### Weekly Pattern Validation

```bash
# Comprehensive analysis
/technical-debt --full
# Check dependencies and structure
/dependencies analyze
/standardize --aspect naming
```

### Monthly Deep Clean

```bash
# Full codebase analysis
/refactor --pattern=api-consistency
/clean --dead-code --duplicates
/benchmark --performance
```

## 🎯 Specific File Targets

### High Priority Files

1. **src/services/auth.ts** - Critical type issues
2. **src/components/UserDashboard.tsx** - Missing error handling
3. **src/api/users.ts** - Security vulnerability
4. **src/types/user.ts** - Needs consolidation

### Pattern Standardization Targets

1. **src/components/forms/** - Inconsistent validation patterns
2. **src/services/** - API call pattern standardization
3. **src/hooks/** - Error handling consistency
4. **src/utils/** - Function typing and documentation

## 📈 Success Metrics

### Type Safety Goals

- **Target**: Zero 'any' types in production code
- **Current**: 31 instances
- **Progress tracking**: Weekly count reduction

### Pattern Compliance Goals

- **API calls**: 100% using Result<T, E> pattern
- **Components**: 100% with proper interfaces
- **Error handling**: 100% consistent across services

### Code Quality Goals

- **Test coverage**: >80% for critical paths
- **Performance**: <200ms page load times
- **Bundle size**: <500KB initial load

## 🚨 Drift Prevention Rules

### Before Any Major Change

1. Check PROJECT_MANIFEST.md for established patterns
2. Verify change doesn't introduce 'any' types
3. Ensure error handling follows Result<T, E> pattern
4. Confirm file naming and structure compliance

### After Implementation

1. Update type definitions if new interfaces created
2. Add to established patterns if new pattern emerges
3. Update this refactor plan with any new issues identified
4. Run validation commands to check compliance

## 📝 Completed Refactors

_Track what's been fixed_

- [x] 2024-01-20: Fixed authentication hook typing
- [x] 2024-01-19: Standardized form validation in login component
- [x] 2024-01-18: Removed 5 'any' types from user components

## 🔄 Next Sprint Planning

### Sprint Goals (Next 2 Weeks)

1. **Eliminate critical type issues** (🔴 items)
2. **Standardize API call patterns** (50% of 🟡 items)
3. **Set up automated drift detection** (validation commands)

### Definition of Done

- All 🔴 issues resolved
- Zero new 'any' types introduced
- All new code follows established patterns
- Validation commands pass without warnings
