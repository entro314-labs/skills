# AI Agent Workflow for macOS Development

## Understanding Requirements

### Initial Analysis

- Parse project structure and architecture
- Identify existing patterns and conventions
- Understand domain language and models
- Match requirements to architectural components

### Context Building

- Scan for key files (AppDelegate, SceneDelegate, main models)
- Map dependencies between components
- Note platform-specific requirements (macOS version)
- Identify third-party dependencies

## Code Generation Workflow

### Incremental Development

- Generate one component at a time
- Start with models, then services, then UI
- Build from core domain outward
- Test each component before moving to the next

```yaml
generation_order:
  - domain_models
  - repositories_interfaces
  - services_implementations
  - view_models
  - views
  - tests
```

### Context Awareness

- Maintain memory of previous generations
- Reference existing components by name
- Match coding style of existing codebase
- Use consistent naming conventions

### Feedback Integration

- Adapt based on user feedback
- Improve or modify previous generations
- Remember common preferences
- Document changes between iterations

## Documentation Best Practices

### Inline Documentation

- Document public APIs with DocC comments
- Include parameter and return descriptions
- Note threading/performance considerations
- Document architectural decisions

```swift
/// Authenticates a user with the provided credentials
/// - Parameters:
///   - username: The user's username or email
///   - password: The user's password
///   - completion: Callback invoked on completion
/// - Note: This operation is performed on a background thread
func authenticate(username: String, password: String, completion: @escaping (Result<User, AuthError>) -> Void)
```

### AI-Specific Comments

- Add agent directives in comments
- Mark areas that need human review
- Include reasoning behind design choices
- Reference architectural patterns

```swift
// @agent: Following MVVM pattern here
// @rationale: Using async/await for better readability over completion handlers
// @human-review: Security implementation may need review
async func authenticateUser(credentials: Credentials) throws -> User {
    // Implementation
}
```

## Testing Generation

### Unit Tests

- Generate tests alongside implementation
- Focus on behavior, not implementation details
- Include happy and error paths
- Use dependency injection for testability

### UI Tests

- Generate critical path UI tests
- Focus on user interactions
- Include accessibility testing
- Test platform-specific features

## Error Handling

### Structured Errors

- Use enum-based error types
- Include context in error messages
- Design for localization
- Implement proper error recovery

```swift
enum NetworkError: Error {
    case connectionFailed
    case timeout(seconds: Int)
    case serverError(code: Int, message: String)
    case parsing(description: String)
    
    var localizedDescription: String {
        switch self {
        case .connectionFailed:
            return "Could not connect to the server"
        case .timeout(let seconds):
            return "Connection timed out after \(seconds) seconds"
        case .serverError(let code, let message):
            return "Server error \(code): \(message)"
        case .parsing(let description):
            return "Failed to parse response: \(description)"
        }
    }
}
```

### Diagnostics

- Log errors with appropriate levels
- Include context for debugging
- Implement crash reporting
- Add performance metrics

## AI Code Review Strategy

### Code Quality Checks

- Verify architecture consistency
- Check for memory leaks and retain cycles
- Validate thread safety
- Review error handling completeness

### Security Review

- Check for hardcoded credentials
- Verify proper encryption
- Review permission usage
- Validate input sanitization

### Performance Optimization

- Look for inefficient algorithms
- Check for main thread blocking
- Review resource management
- Suggest optimizations
