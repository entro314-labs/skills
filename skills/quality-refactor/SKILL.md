---
name: quality-refactor
description: "Refactors code safely with code smell detection, design pattern application (extract method, strategy, builder, factory), test verification, and incremental commits, with safe, dry-run, and aggressive modes. Use when asked to refactor, restructure, or reduce code smells in a file or module."
disable-model-invocation: true
---

# Code Refactoring Assistant

## Purpose

Systematic code refactoring with automated pattern detection, language-specific improvements, and
comprehensive safety measures. Transforms legacy code into maintainable, testable, and performant
solutions while preserving existing functionality.

## Claude Code Integration

### Slash Command Usage

```
/quality-refactor <target> [--pattern] [--mode]
```

**Target Types:**

- `@filename` - Refactor specific file or class
- `directory/` - Refactor entire directory or module
- `pattern-name` - Apply specific refactoring pattern (extract-method, strategy, etc.)
- `smell-type` - Target specific code smells (long-method, duplicate-code)

**Refactoring Patterns:**

- `--pattern=extract-method` - Extract long methods into smaller functions
- `--pattern=strategy` - Replace conditionals with strategy pattern
- `--pattern=builder` - Implement builder pattern for complex constructors
- `--pattern=factory` - Create factory methods for object creation
- `--pattern=null-object` - Replace null checks with null object pattern

**Safety Modes:**

- `--safe` - Maximum safety with extensive testing and validation
- `--incremental` - Step-by-step refactoring with commit points
- `--dry-run` - Analysis only, no code changes
- `--aggressive` - Comprehensive refactoring including risky changes

### Automatic Code Analysis

The command performs intelligent code smell detection:

**Complexity Metrics**: !`find . -name "*.java" -exec wc -l {} + | sort -n | tail -10 || true`

**Code Duplication**: !`grep -r "public.*{" src/ --include="*.java" | head -10 || true`

**Test Coverage**: !`find . -name "*Test.java" | wc -l || true`

**Static Analysis**: !`find . -name "pom.xml" -o -name "go.mod" -o -name "Cargo.toml" | head -3 || true`

## Usage Examples

### Java Service Refactoring

```
/quality-refactor @src/services/UserService.java
```

**Refactoring Process:**

1. **Code Smell Detection**: Identifies long methods, complex conditionals, and code duplication
2. **Pattern Recognition**: Suggests appropriate design patterns for improvement
3. **Test Analysis**: Ensures existing test coverage before making changes
4. **Incremental Transformation**: Applies changes step-by-step with validation
5. **Performance Verification**: Benchmarks critical paths to ensure no regression

**Expected Output:**

````markdown
# Refactoring Analysis: UserService.java

## Code Smells Detected

### High Priority

- **Long Method**: `authenticateUser()` - 45 lines (recommended: <20)
- **Complex Conditional**: 4-level nested if statements in `validatePermissions()`
- **Data Clump**: User validation parameters repeated 6 times
- **Feature Envy**: `UserService` directly accessing `Database` internals

### Medium Priority

- **Magic Numbers**: Hard-coded timeout values (5000, 30000)
- **Primitive Obsession**: String-based role checking instead of enum
- **Duplicate Code**: Similar validation logic in 3 methods

## Refactoring Plan

### Phase 1: Extract Methods (Low Risk)

```java
// Before: Long authenticateUser method
public boolean authenticateUser(String username, String password, String role) {
    // 45 lines of mixed concerns
}

// After: Extracted methods
public boolean authenticateUser(String username, String password, String role) {
    User user = findAndValidateUser(username);
    if (!isPasswordValid(user, password)) {
        return false;
    }
    return hasRequiredRole(user, Role.valueOf(role));
}

private User findAndValidateUser(String username) {
    validateUsername(username);
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new UserNotFoundException(username));
}

private boolean isPasswordValid(User user, String password) {
    return passwordEncoder.matches(password, user.getPasswordHash());
}

private boolean hasRequiredRole(User user, Role requiredRole) {
    return user.getRoles().contains(requiredRole);
}
```
````

### Phase 2: Introduce Parameter Objects (Medium Risk)

```java
// Replace data clumps with dedicated objects
public class AuthenticationRequest {
    private final String username;
    private final String password;
    private final Role requiredRole;

    // Constructor, getters, validation
}

public boolean authenticateUser(AuthenticationRequest request) {
    request.validate();
    User user = findAndValidateUser(request.getUsername());
    // ... rest of logic
}
```

### Phase 3: Strategy Pattern for Validation (Higher Risk)

```java
// Replace complex conditionals with strategy pattern
public interface ValidationStrategy {
    ValidationResult validate(User user, AuthenticationRequest request);
}

@Component
public class StandardValidationStrategy implements ValidationStrategy {
    @Override
    public ValidationResult validate(User user, AuthenticationRequest request) {
        // Standard validation logic
    }
}

@Component
public class AdminValidationStrategy implements ValidationStrategy {
    @Override
    public ValidationResult validate(User user, AuthenticationRequest request) {
        // Admin-specific validation
    }
}
```

## Implementation Steps

### Step 1: Pre-Refactoring Safety

```bash
# Verify test coverage
!mvn jacoco:report
!grep -c "@Test" src/test/java/UserServiceTest.java

# Run full test suite
!mvn clean test

# Create refactoring branch
!git checkout -b refactor/user-service-cleanup
```

### Step 2: Extract Methods Refactoring

```java
// Apply extract method refactoring
// Test after each extraction
// Commit working state
```

### Step 3: Validation and Testing

```bash
# Run tests after each change
!mvn test -Dtest=UserServiceTest

# Verify performance hasn't regressed
!mvn test -Dtest=UserServicePerformanceTest

# Static analysis check
!mvn pmd:check spotbugs:check
```

## Risk Assessment: MEDIUM

- **Breaking Changes**: Low (preserving public API)
- **Performance Impact**: Minimal (method extraction overhead negligible)
- **Test Coverage**: 89% (sufficient for safe refactoring)
- **Team Familiarity**: High (standard Java patterns)

```

### Go Interface Refactoring
```

/quality-refactor @internal/payment/processor.go --pattern=interface-segregation

```

**Go-Specific Refactoring:**
1. **Interface Segregation**: Breaks large interfaces into focused contracts
2. **Error Wrapping**: Improves error context and debugging
3. **Functional Options**: Replaces config structs with option functions
4. **Table-Driven Tests**: Consolidates test cases for better coverage
5. **Context Propagation**: Ensures proper cancellation and timeouts

### Rust Pattern Refactoring
```

/quality-refactor @src/lib.rs --pattern=result-chains --safe

````

**Rust-Specific Improvements:**
1. **Result Chains**: Replaces unwrap() with proper error propagation
2. **Iterator Usage**: Converts loops to functional iterator patterns
3. **Newtype Pattern**: Adds type safety for primitive values
4. **Trait Implementation**: Extracts common behavior into reusable traits
5. **Lifetime Optimization**: Improves memory efficiency and safety

## Advanced Refactoring Features

### Automated Pattern Detection

```markdown
## Anti-Pattern Scanner

### Java Detection Rules
- **God Class**: Classes >500 lines or >20 methods
- **Long Parameter List**: Methods with >5 parameters
- **Cyclomatic Complexity**: Methods with complexity >10
- **Coupling**: Classes with >7 dependencies

### Go Detection Rules
- **Large Interface**: Interfaces with >5 methods
- **Missing Context**: Functions without context.Context parameter
- **Error Ignorance**: Unhandled error returns
- **Goroutine Leaks**: Missing context cancellation

### Rust Detection Rules
- **Unwrap Abuse**: >3 unwrap() calls in single function
- **Clone Overuse**: Unnecessary .clone() operations
- **Large Enums**: Enums with >10 variants
- **Missing Traits**: Structs that should implement common traits
````

### Safety Validation Framework

```markdown
## Refactoring Safety Checks

### Pre-Refactoring

- [ ] **Test Coverage**: Minimum 80% line coverage
- [ ] **Integration Tests**: All critical paths covered
- [ ] **Performance Baseline**: Current benchmarks recorded
- [ ] **API Contracts**: Public interfaces documented

### During Refactoring

- [ ] **Incremental Changes**: One pattern per commit
- [ ] **Test Execution**: Full test suite after each change
- [ ] **Static Analysis**: No new warnings introduced
- [ ] **Code Review**: Pair programming or review required

### Post-Refactoring

- [ ] **Regression Testing**: All tests pass
- [ ] **Performance Validation**: No performance degradation
- [ ] **Documentation Update**: Architecture docs updated
- [ ] **Team Knowledge**: Refactoring rationale documented
```

### Language-Specific Optimization

````markdown
## Java Optimizations

### Performance Patterns

```java
// Stream API optimization
list.stream()
    .filter(predicate)
    .collect(Collectors.toList());

// Builder pattern for immutability
public final class User {
    private final String name;
    private final Set<Role> roles;

    public static Builder builder() {
        return new Builder();
    }
}
```
````

### Go Optimizations

```go
// Functional options pattern
type ServerOption func(*Server)

func WithTimeout(timeout time.Duration) ServerOption {
    return func(s *Server) {
        s.timeout = timeout
    }
}

// Interface segregation
type Reader interface {
    Read([]byte) (int, error)
}

type Writer interface {
    Write([]byte) (int, error)
}
```

### Rust Optimizations

```rust
// Iterator chains instead of loops
let result: Vec<_> = items
    .iter()
    .filter(|item| item.is_valid())
    .map(|item| item.process())
    .collect();

// Newtype for type safety
#[derive(Debug, Clone, PartialEq)]
pub struct UserId(u64);

impl From<u64> for UserId {
    fn from(id: u64) -> Self {
        UserId(id)
    }
}
```

````

## Integration with Claude Code Features

### Memory System Integration
Tracks refactoring decisions and patterns:
```markdown
# Added to CLAUDE.md

## Refactoring History
- **2025-01-27**: UserService - Extracted methods, added strategy pattern
- **2025-01-25**: PaymentProcessor - Interface segregation, error wrapping
- **2025-01-20**: DataValidator - Result chains, iterator patterns

## Preferred Patterns
- **Java**: Strategy pattern for complex conditionals, builder for immutable objects
- **Go**: Functional options, interface segregation, context propagation
- **Rust**: Result chaining, iterator usage, newtype pattern

## Quality Standards
- Maximum method length: 20 lines
- Cyclomatic complexity: <10
- Test coverage: >80%
- No static analysis warnings
````

### File Reference Integration

Seamlessly works with file system:

- Automatic detection of related test files
- Configuration file analysis for build tools
- Integration with existing code review workflows

### Collaborative Refactoring

```markdown
## Team Coordination

### Refactoring Sessions

- **Pair Refactoring**: Real-time collaboration on complex changes
- **Review Points**: Mandatory reviews for structural changes
- **Knowledge Sharing**: Document patterns and decisions

### Communication Protocol

- **RFC Process**: Major refactoring requires team RFC
- **Progress Updates**: Daily standup refactoring status
- **Rollback Plan**: Clear rollback procedures for each phase
```

## Best Practices

### When to Refactor

- **Before Adding Features**: Clean code before extending
- **During Bug Fixes**: Improve structure while fixing issues
- **Code Reviews**: Address smells identified during review
- **Performance Issues**: Optimize structure for better performance
- **Team Onboarding**: Improve code clarity for new team members

### Refactoring Priorities

1. **Safety First**: Never break existing functionality
2. **Test Coverage**: Maintain or improve test coverage
3. **Incremental Changes**: Small, reviewable changes
4. **Performance Awareness**: Monitor performance impact
5. **Team Consensus**: Ensure team agreement on patterns

### Risk Management

- **Feature Flags**: Isolate refactored code paths
- **Canary Deployments**: Gradual rollout of refactored code
- **Monitoring**: Enhanced monitoring during refactoring periods
- **Rollback Procedures**: Quick rollback for critical issues

## Related Commands

- `/quality-review` - Code review focusing on refactoring opportunities
- `/test` - Comprehensive testing after refactoring
- `/quality-debug` - Debug issues that arise during refactoring
- `/meta-document` - Update documentation after structural changes

The goal is to continuously improve code quality through systematic, safe refactoring that enhances
maintainability, testability, and performance while preserving existing functionality.
