---
name: quality-debug
description: "Guides systematic root cause debugging for errors, stack traces, logs, memory leaks, race conditions, and performance symptoms, with Java, Go, Rust, and Deno specific strategies and prevention steps. Use when asked to debug, diagnose a crash, or trace an error."
disable-model-invocation: true
---

# Multi-Language Debugging Assistant

## Purpose

Comprehensive debugging support for multi-language applications with systematic root cause analysis,
language-specific debugging strategies, and prevention techniques. Handles everything from simple
errors to complex distributed system issues.

## Claude Code Integration

### Slash Command Usage

```
/quality-debug <issue> [--mode] [--language]
```

**Issue Types:**

- **Error Description**: "NullPointerException in UserService"
- **Log File**: "@logs/error.log" or "@path/to/logfile"
- **Symptom**: "memory leak", "goroutine leak", "performance degradation"
- **Stack Trace**: Paste full stack trace for analysis

**Debug Modes:**

- `--trace` - Distributed tracing and system-wide analysis
- `--perf` - Performance-focused debugging with profiling
- `--concurrency` - Focus on race conditions and threading issues
- `--memory` - Memory leak detection and heap analysis
- `--network` - Network-related debugging and connectivity issues

**Language Hints:**

- `--java` - Java-specific debugging tools and strategies
- `--go` - Go debugging with race detection and pprof
- `--rust` - Rust debugging with backtrace and cargo tools
- `--deno` - Deno/TypeScript debugging with Chrome DevTools

### Automatic Context Discovery

The command intelligently detects debugging context:

**Project Language**:
!`find . -name "*.java" -o -name "*.go" -o -name "*.rs" -o -name "*.ts" | head -5 || true`

**Build Tools**:
!`find . -name "pom.xml" -o -name "go.mod" -o -name "Cargo.toml" -o -name "deno.json" | head -3 || true`

**Recent Logs**: !`find . -name "*.log" -type f -mtime -1 | head -5 || true`

**Running Processes**: !`ps aux | grep -E "java|go|deno" | head -5 || true`

## Usage Examples

### Java Exception Debugging

```
/quality-debug NullPointerException in UserService.authenticate
```

**Debugging Process:**

1. **Stack Trace Analysis**: Examines full stack trace including caused-by chains
2. **Code Path Investigation**: Traces execution flow to identify null source
3. **Variable State Analysis**: Checks method parameters and field initialization
4. **Recent Changes Review**: Identifies commits that might have introduced the bug
5. **Solution Implementation**: Provides specific defensive coding fixes

**Expected Output:**

````markdown
# Debug Analysis: NullPointerException in UserService

## Root Cause Analysis

### Stack Trace Breakdown

```java
java.lang.NullPointerException: Cannot invoke "User.getEmail()" because "user" is null
    at UserService.authenticate(UserService.java:45)
    at AuthController.login(AuthController.java:23)
    at AuthController$$FastClassBySpringCGLIB$\$123.invoke(<generated>)
```
````

**Critical Path**: `AuthController.login()` → `UserService.authenticate()` → `user.getEmail()`

### Code Analysis

**Problem Location**: `UserService.java:45`

```java
// Current code (line 45)
public boolean authenticate(String username, String password) {
    User user = userRepository.findByUsername(username);  // Can return null
    return user.getEmail().equals(password);  // ← NPE here
}
```

**Issue**: `userRepository.findByUsername()` returns `null` when user not found

### Variable State Investigation

- `username`: "<nonexistent@example.com>" (valid string)
- `user`: `null` (user not found in database)
- `password`: Valid string parameter

## Debugging Strategy

### Immediate Investigation

```bash
# Check database for user
!grep -r "findByUsername" src/ --include="*.java"

# Review recent authentication attempts
!grep "authenticate" logs/application.log | tail -20

# Check user creation patterns
!grep "User.*save" src/ --include="*.java" -A 2 -B 2
```

### Advanced Debugging

```java
// Enable JDWP for remote debugging
// JVM args: -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005

// Add logging for better visibility
log.debug("Attempting authentication for user: {}", username);
User user = userRepository.findByUsername(username);
if (user == null) {
    log.warn("User not found: {}", username);
    return false;
}
```

## Solution Implementation

### Defensive Programming Fix

```java
public boolean authenticate(String username, String password) {
    // Input validation
    if (username == null || username.trim().isEmpty()) {
        log.warn("Authentication attempted with invalid username");
        return false;
    }

    // Safe user lookup with Optional
    Optional<User> userOpt = userRepository.findByUsernameOptional(username);
    if (!userOpt.isPresent()) {
        log.info("Authentication failed: user not found - {}", username);
        return false;
    }

    User user = userOpt.get();

    // Use proper password hashing comparison
    return passwordEncoder.matches(password, user.getPasswordHash());
}
```

### Repository Interface Update

```java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameOptional(String username);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> findByUsername(@Param("username") String username);
}
```

## Prevention Strategies

### Code Review Checklist

- [ ] All database queries use Optional return types
- [ ] Null checks before method calls on objects
- [ ] Input validation at service boundaries
- [ ] Proper error logging for debugging
- [ ] Unit tests cover null/empty input scenarios

### Static Analysis Rules

```xml
<!-- PMD rule for null pointer prevention -->
<rule ref="category/java/errorprone.xml/AvoidCatchingNPE" />
<rule ref="category/java/design.xml/AvoidDeeplyNestedIfStmts" />
```

### Monitoring and Alerting

```java
// Add metrics for authentication failures
@EventListener
public void onAuthenticationFailure(AuthenticationFailureEvent event) {
    meterRegistry.counter("auth.failure",
        "reason", event.getException().getClass().getSimpleName()
    ).increment();
}
```

## Test Cases

```java
@Test
void authenticate_withNonExistentUser_returnsFalse() {
    // Given
    when(userRepository.findByUsernameOptional("nonexistent@example.com"))
        .thenReturn(Optional.empty());

    // When
    boolean result = userService.authenticate("nonexistent@example.com", "password");

    // Then
    assertFalse(result);
    verify(logger).info(contains("user not found"));
}

@Test
void authenticate_withNullUsername_returnsFalse() {
    // When/Then
    assertFalse(userService.authenticate(null, "password"));
    verify(logger).warn(contains("invalid username"));
}
```

```

### Go Concurrency Debugging
```

/quality-debug goroutine leak in payment processor --concurrency

```

**Go-Specific Process:**
1. **Goroutine Analysis**: Uses `go tool trace` and pprof for leak detection
2. **Channel Inspection**: Identifies blocking channel operations
3. **Race Detection**: Runs with `-race` flag to find data races
4. **Memory Profiling**: Analyzes heap growth and GC pressure
5. **Context Cancellation**: Ensures proper context propagation

### Rust Panic Debugging
```

/quality-debug panic in async handler --rust

```

**Rust-Specific Approach:**
1. **Backtrace Analysis**: Uses `RUST_BACKTRACE=full` for detailed traces
2. **Ownership Investigation**: Identifies borrow checker violations
3. **Error Propagation**: Reviews `Result<T, E>` handling patterns
4. **Async Context**: Debugs Future and async/await issues
5. **Memory Safety**: Ensures safe concurrent access patterns

### Deno/Fresh Debugging
```

/quality-debug Island hydration mismatch --deno

````

**Deno/Fresh Process:**
1. **Island Analysis**: Checks server/client boundary issues
2. **SSR Debugging**: Investigates server-side rendering problems
3. **Route Inspection**: Validates middleware and route handler logic
4. **Permission Issues**: Debugs Deno security permission errors
5. **Module Resolution**: Traces import/export dependency issues

## Advanced Debugging Features

### Distributed System Debugging

```markdown
## Microservice Debugging Strategy

### Request Tracing
- **Correlation IDs**: Track requests across service boundaries
- **Distributed Tracing**: Use Jaeger/Zipkin for request visualization
- **Log Aggregation**: Centralized logging with ELK stack

### Service Health Monitoring
```bash
# Check service health endpoints
!curl -s http://service-a/health | jq
!curl -s http://service-b/health | jq

# Monitor service discovery
!kubectl get pods -l app=payment-service
````

````

### Performance Debugging

```markdown
## Performance Analysis Toolkit

### Java Performance
```bash
# Heap dump analysis
!jcmd <pid> GC.run_finalization
!jcmd <pid> VM.gc
!jmap -dump:format=b,file=heap.hprof <pid>

# Thread dump analysis
!jstack <pid> > threads.dump
````

### Go Performance

```bash
# CPU profiling
!go tool pprof http://localhost:6060/debug/pprof/profile

# Memory profiling
!go tool pprof http://localhost:6060/debug/pprof/heap

# Race detection
!go test -race ./...
```

### Rust Performance

```bash
# Benchmark profiling
!cargo bench

# Memory usage analysis
!valgrind --tool=massif target/debug/myapp

# CPU profiling
!perf record target/release/myapp
!perf report
```

````

## Integration with Claude Code Features

### Memory System Integration
Automatically updates debugging knowledge:
```markdown
# Added to CLAUDE.md

## Debugging History
- **2025-01-27**: NPE in UserService - Fixed with Optional pattern
- **2025-01-25**: Goroutine leak - Added context cancellation
- **2025-01-20**: Memory leak - Improved resource cleanup

## Common Patterns
- Prefer Optional over null returns in Java
- Always use context.WithCancel for Go goroutines
- Implement proper Drop traits in Rust
- Use try/catch with specific error types in Deno

## Debug Tools Configuration
- Java: JDWP port 5005, JVM args documented
- Go: pprof enabled on :6060/debug/pprof
- Rust: RUST_BACKTRACE=full in development
- Deno: --inspect-brk for Chrome DevTools
````

### File Reference Integration

Seamless integration with error logs and code:

- Automatic log file analysis with `@logs/error.log`
- Code context from stack traces
- Configuration file inspection for environment issues

### Collaborative Debugging

- Share debugging sessions via reproducible commands
- Document debugging procedures in project memory
- Create debugging runbooks for common issues

## Best Practices

### When to Use Different Modes

- **Standard Debug**: Single application errors, exceptions, simple bugs
- **Trace Mode**: Distributed systems, microservice communication issues
- **Performance Mode**: Slow responses, memory leaks, resource exhaustion
- **Concurrency Mode**: Race conditions, deadlocks, threading issues

### Debugging Workflow

1. **Reproduce**: Create minimal reproduction case
2. **Isolate**: Narrow down to specific component/function
3. **Analyze**: Use appropriate tools for the language/framework
4. **Fix**: Implement defensive programming solutions
5. **Prevent**: Add tests, monitoring, and documentation
6. **Review**: Update debugging procedures and team knowledge

## Related Commands

- `/test` - Add comprehensive tests after debugging
- `/workflow-monitor` - Set up monitoring for debugged issues
- `/quality-review` - Code review focusing on debugging improvements
- `/quality-refactor` - Clean up code revealed during debugging

The goal is to provide systematic, language-aware debugging that not only fixes immediate issues but
also prevents future occurrences through better practices and tooling.
