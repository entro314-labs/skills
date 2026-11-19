---
name: quality-review
description: "Performs a code and project review of latest git changes, a file, architecture, security, or performance with quick, standard, or deep modes and focus areas, producing a structured findings report. Use when asked to review code, review latest changes, or audit a component."
disable-model-invocation: true
---

# Code & Project Review

## Purpose

Comprehensive review system for code changes, architecture, and project components. Combines
high-level strategic analysis with detailed security, quality, and performance reviews. Adapts
review depth and focus based on target and context.

## Claude Code Integration

### Slash Command Usage

```
/quality-review <target> [--mode] [--focus]
```

**Target Types:**

- `latest` - Review most recent git changes (commits, staged, unstaged)
- `@filename` - Review specific file or component
- `architecture` - High-level architectural review
- `security` - Security-focused audit
- `performance` - Performance analysis
- `<concept>` - Review any project aspect

**Review Modes:**

- `--quick` - High-level strategic analysis (5-10 minutes)
- `--standard` - Comprehensive review with actionable findings (15-20 minutes)
- `--deep` - Thorough audit with detailed recommendations (30+ minutes)

**Focus Areas:**

- `--security` - Prioritize security vulnerabilities and risks
- `--performance` - Focus on performance and optimization
- `--quality` - Emphasize code quality and maintainability
- `--testing` - Test coverage and testing strategy

### Automatic Context Gathering

The command intelligently analyzes the review target:

**Git Changes Analysis**: !`git status && git diff --staged && git diff || true`

**Recent History**: !`git log -3 --oneline --stat || true`

**Project Structure**: !`find . -type f -name "*.{js,ts,py,rs,go,java}" | head -20 || true`

**Configuration Files**: !`find . -maxdepth 2 -name "*.{json,yaml,toml,md}" -type f || true`

## Usage Examples

### Git Changes Review

```
/quality-review latest
```

**Review Process:**

1. **Change Detection**: Analyzes staged, unstaged, and recent commit changes
2. **Security Scan**: Checks for credentials, injection vulnerabilities, data exposure
3. **Quality Assessment**: Evaluates coding standards, error handling, conventions
4. **Test Coverage**: Ensures new code has appropriate tests
5. **Performance Review**: Identifies algorithmic issues and inefficiencies
6. **Documentation Check**: Verifies comments and documentation updates

**Expected Output:**

````markdown
# Code Review: Latest Changes

## Change Summary

- **Files Modified**: 5 files (3 source, 2 tests)
- **Lines Added/Removed**: +127/-43
- **Commit**: feat: add user authentication middleware

## Security Review ✅

### Critical Issues (0)

_No critical security issues found_

### Medium Issues (1)

- **src/auth/middleware.ts:23**: Password comparison should use constant-time function

  ```typescript
  // Current (timing attack vulnerable)
  if (password === storedPassword) {

  // Recommended
  if (crypto.timingSafeEqual(Buffer.from(password), Buffer.from(storedPassword))) {
  ```
````

### Low Issues (2)

- **src/config/database.ts:15**: Consider using environment-specific connection pools
- **src/utils/logger.ts:8**: Log sanitization could be improved for PII data

## Code Quality Review ✅

### Strengths

- ✅ Consistent TypeScript usage and strict mode enabled
- ✅ Proper error handling with custom error classes
- ✅ Follows project naming conventions from CLAUDE.md
- ✅ Good separation of concerns in middleware design

### Issues Found

- **src/auth/middleware.ts:45-52**: Complex conditional could be extracted to utility function
- **src/services/userService.ts:89**: Missing JSDoc for complex algorithm
- **src/types/auth.ts:12**: Interface could extend base types for consistency

## Test Coverage Review ⚠️

### Coverage Analysis

- **New Code Coverage**: 78% (target: 85%)
- **Missing Tests**: Authentication edge cases, error scenarios
- **Test Quality**: Good unit tests, needs integration tests

### Recommendations

- Add tests for invalid token scenarios
- Test middleware with malformed requests
- Add integration test for full auth flow

## Performance Review ✅

### No Performance Issues Found

- Async/await properly used
- No N+1 query patterns detected
- Efficient data structures chosen

## Action Items

### High Priority

1. **Fix timing attack vulnerability** (src/auth/middleware.ts:23)
2. **Add missing test coverage** for authentication edge cases
3. **Update API documentation** for new auth endpoints

### Medium Priority

1. Extract complex conditional to utility function
2. Add JSDoc for complex algorithms
3. Improve log sanitization for PII data

### Low Priority

1. Consider connection pool optimization
2. Standardize interface inheritance patterns

## Overall Assessment: ✅ APPROVED WITH MINOR CHANGES

**Strengths**: Well-structured authentication implementation with good error handling **Concerns**:
Timing attack vulnerability needs immediate attention **Recommendation**: Fix security issue and add
tests before merging

```

### File-Specific Review
```

/quality-review @src/auth/middleware.ts --security

```

**Security-Focused Analysis:**
1. **Vulnerability Scanning**: Automated detection of common security issues
2. **Code Pattern Analysis**: Reviews for security anti-patterns
3. **Dependency Security**: Checks imports for known vulnerabilities
4. **Data Flow Analysis**: Traces sensitive data handling
5. **Access Control Review**: Evaluates authorization logic

### Architectural Review
```

/quality-review architecture --quick

````

**High-Level Analysis:**
```markdown
# Architecture Review: Project Structure

## Strengths ✅
- **Clear separation**: Well-defined layers (controllers, services, data)
- **Consistent patterns**: Uniform approach to error handling and validation
- **Dependency management**: Clean dependency injection without circular references
- **Configuration**: Environment-based config with proper defaults

## Weaknesses ⚠️
- **Monolithic structure**: Single large service could benefit from modularization
- **Database coupling**: Direct SQL queries scattered across services
- **Missing abstractions**: No clear interface for external API calls

## Key Recommendations
1. **Introduce Repository Pattern**: Abstract database operations behind interfaces
2. **Extract Core Modules**: Split user management and auth into separate bounded contexts
3. **Add API Client Layer**: Centralize external service calls with retry/circuit breaker patterns

## Risk Assessment: MEDIUM
**Technical Debt**: Manageable but growing
**Scalability**: Current structure supports 10x growth with minimal changes
**Maintainability**: Good foundation, needs better abstractions for long-term health
````

## Advanced Review Features

### Multi-Language Support

Adapts review criteria based on detected languages:

```markdown
## Language-Specific Checks

### TypeScript/JavaScript

- ESLint rule compliance
- Type safety and strict mode usage
- Async/await vs Promise patterns
- Package.json security audit

### Python

- PEP 8 compliance
- Type hints coverage
- Virtual environment usage
- requirements.txt security scan

### Rust

- Clippy lint warnings
- Unsafe code review
- Error handling patterns
- Cargo.toml dependency audit
```

### Security Vulnerability Database

Integrates with known vulnerability patterns:

```markdown
## Security Pattern Detection

### SQL Injection

- String concatenation in queries: ❌
- Parameterized queries: ✅
- ORM usage validation: ✅

### XSS Prevention

- Output encoding: ✅
- Content Security Policy: ⚠️ Missing
- Input validation: ✅

### Authentication

- Password hashing: ✅ (bcrypt)
- Session management: ✅
- JWT handling: ⚠️ Consider refresh tokens
```

### Performance Profiling

Identifies common performance anti-patterns:

```markdown
## Performance Analysis

### Algorithmic Complexity

- O(n²) operations: 1 found (line 45-52)
- Database query efficiency: ✅
- Memory usage patterns: ✅

### I/O Operations

- Async file operations: ✅
- Concurrent request handling: ✅
- Resource cleanup: ✅
```

## Integration with Claude Code Features

### Memory System Integration

Updates project knowledge base:

```markdown
# Updated in CLAUDE.md

## Code Review History

- **2025-01-27**: Authentication middleware review - Security improvements needed
- **2025-01-25**: Architecture review - Repository pattern recommended
- **2025-01-20**: Performance review - Optimization completed

## Quality Standards

- Minimum test coverage: 85%
- Security: No critical vulnerabilities tolerated
- Performance: Sub-100ms API response times
- Documentation: JSDoc required for complex functions
```

### Git Integration

Seamless integration with git workflows:

```bash
# Pre-commit hook integration
/quality-review latest --quick

# PR review automation
/quality-review $(git diff --name-only HEAD~1)

# Security audit scheduling
/quality-review security --deep
```

### File Reference System

Automatic context from file references:

- `@filename:line` for specific code sections
- Automatic inclusion of related files (tests, configs)
- Cross-reference analysis for impact assessment

## Review Checklists

### Standard Code Review Checklist

- [ ] **Security**: No hardcoded secrets, proper input validation
- [ ] **Quality**: Follows coding standards, meaningful names
- [ ] **Tests**: Adequate coverage, meaningful assertions
- [ ] **Performance**: No obvious bottlenecks, efficient algorithms
- [ ] **Documentation**: Complex logic documented, API changes noted
- [ ] **Compatibility**: Cross-platform considerations, dependency updates

### Security-Focused Checklist

- [ ] **Authentication**: Proper credential handling, session management
- [ ] **Authorization**: Correct access controls, privilege escalation prevention
- [ ] **Input Validation**: SQL injection, XSS, command injection prevention
- [ ] **Data Exposure**: No sensitive data in logs, proper encryption
- [ ] **Dependencies**: Known vulnerability scanning, update strategy

### Architecture Review Checklist

- [ ] **Modularity**: Clear separation of concerns, bounded contexts
- [ ] **Coupling**: Loose coupling between modules, clean interfaces
- [ ] **Scalability**: Performance under load, horizontal scaling capability
- [ ] **Maintainability**: Code organization, technical debt assessment
- [ ] **Reliability**: Error handling, fault tolerance, recovery procedures

## Best Practices

### When to Use Each Mode

- **Quick Review**: Daily development, minor changes, architecture discussions
- **Standard Review**: Feature implementation, bug fixes, regular code reviews
- **Deep Review**: Security audits, performance optimization, major refactoring

### Review Timing

- **Pre-commit**: Quick review for immediate feedback
- **Pre-PR**: Standard review for comprehensive analysis
- **Pre-release**: Deep review for security and performance validation
- **Periodic**: Monthly architecture and security audits

## Related Commands

- `/security` - Dedicated security analysis and penetration testing
- `/performance` - Comprehensive performance profiling and optimization
- `/test` - Test coverage analysis and improvement recommendations
- `/quality-refactor` - Code quality improvement and technical debt reduction

The goal is to maintain high code quality, security, and performance standards through systematic
and automated review processes.
