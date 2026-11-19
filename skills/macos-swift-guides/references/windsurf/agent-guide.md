---
trigger: always_on
---

# AI Agent Workflow for macOS Development

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

## AI Code Review Strategy

### Performance Optimization

- Look for inefficient algorithms
- Check for main thread blocking
- Review resource management
- Suggest optimizations
