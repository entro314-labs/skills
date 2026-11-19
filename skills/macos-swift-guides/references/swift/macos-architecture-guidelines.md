# Modern macOS Architecture & AI Agent Workflow Guidelines (2025)

## Overview

This unified guide establishes best practices for AI code agents (Claude, Cursor, GitHub Copilot, etc.) when generating macOS application code. It combines modern Apple architecture patterns with an effective AI agent workflow to create high-quality, maintainable Swift code.

## Foundation Principles

### 1. Codebase-First Mentality

- Thoroughly analyze existing codebase before creating new components
- Match existing patterns, naming conventions, and architecture
- Never create redundant functionality that already exists
- Respect established interfaces and abstractions

### 2. Modern Platform Approach

- Target Swift 6.1+, macOS 15+, SwiftUI-first development
- Use latest stable APIs (SwiftUI, SwiftData, structured concurrency)
- Apply modern property wrappers and type-safe approaches
- Embrace Apple Silicon optimizations

### 3. Clean Architecture Enforcement

- Maintain consistent architecture within features (MVVM, Clean, TCA)
- Use dependency injection instead of global state
- Keep domain logic free from UI/framework dependencies
- Design for testability and maintainability

### 4. Incremental Refinement

- Generate one component at a time, building from core domain outward
- Adapt based on user feedback for continuous improvement
- Document architectural decisions and rationales
- Prioritize readability and maintainability over cleverness

## AI Agent Workflow

### Initial Analysis Phase

1. **Codebase Understanding**
   - Parse project structure and architecture patterns
   - Identify existing conventions and naming patterns
   - Map relationships between components
   - Note platform-specific requirements (macOS version)

2. **Context Building**
   - Scan for key files (AppDelegate, SceneDelegate, main models)
   - Map dependencies between components
   - Identify third-party dependencies and their usage
   - Understand domain language and terminology

3. **Feature Requirements Analysis**
   - Match requirements to architectural components
   - Identify entities, use cases, and boundaries
   - Define required interfaces and protocols
   - Plan the implementation sequence

### Code Generation Sequence

```yaml
generation_order:
  - domain_models
  - repositories_interfaces
  - services_implementations
  - view_models
  - views
  - tests
```

1. **Domain Models First**
   - Create core business entities
   - Define value types and immutable structures
   - Implement domain-specific validation logic
   - Keep models independent of frameworks

2. **Services and Repositories**
   - Define protocol interfaces before implementations
   - Implement repository patterns for data access
   - Create service layer for business operations
   - Apply proper error handling and diagnostics

3. **ViewModels and State**
   - Implement `@Observable` ViewModels
   - Define clear state management
   - Handle side effects and asynchronous operations
   - Apply unidirectional data flow principles

4. **UI Components Last**
   - Build SwiftUI views based on ViewModels
   - Extract reusable components
   - Apply consistent styling and layout
   - Implement proper accessibility support

5. **Tests Throughout**
   - Generate tests alongside implementation
   - Focus on behavior-driven testing
   - Test happy paths and error conditions
   - Create UI tests for critical flows

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

## Architecture Patterns

### MVVM Pattern

- **Models**: Core domain entities and business logic
- **Views**: SwiftUI declarative UI components
- **ViewModels**: State containers using `@Observable`
- **Rules**:
  - ViewModels must be `@Observable`
  - Inject all dependencies via constructor
  - No direct UI references in ViewModels
  - Models should be independent of UI frameworks

```swift
@Observable class ProfileViewModel {
    var user: User
    private let userService: UserServiceProtocol
    
    init(user: User, userService: UserServiceProtocol) {
        self.user = user
        self.userService = userService
    }
    
    func updateProfile() async throws {
        do {
            user = try await userService.updateProfile(user)
        } catch {
            // Error handling
        }
    }
}
```

### Clean Architecture

- **Entities**: Core business objects
- **Use Cases**: Application-specific business rules
- **Interface Adapters**: Presenters, controllers, gateways
- **Frameworks**: External tools and libraries
- **Rules**:
  - Dependencies always point inward
  - Inner layers know nothing about outer layers
  - Domain logic free from UI/framework dependencies
  - Each layer has its own models/DTOs

### The Composable Architecture (TCA)

- **State**: Complete representation of domain
- **Actions**: All possible events
- **Reducers**: Pure functions that modify state
- **Effects**: Async operations and side effects
- **Rules**:
  - State mutations only occur in reducers
  - Side effects return to the reducer via actions
  - State is the single source of truth
  - Features compose via reducer composition

## Module Organization

### Swift Package Manager Structure

- **Core**: Domain entities, business logic
- **Features**: Individual app features
- **Data**: Repositories, networking, persistence
- **UI**: Reusable UI components
- **App**: Entry point, coordination

```
MyApp/
├── App/
│   ├── AppDelegate.swift
│   ├── SceneDelegate.swift
│   └── AppCoordinator.swift
├── Core/
│   ├── Models/
│   ├── Extensions/
│   └── Protocols/
├── Features/
│   ├── Authentication/
│   │   ├── Models/
│   │   ├── ViewModels/
│   │   ├── Views/
│   │   └── Services/
│   └── Profile/
│       ├── Models/
│       ├── ViewModels/
│       ├── Views/
│       └── Services/
├── Data/
│   ├── Network/
│   ├── Persistence/
│   └── Repositories/
└── UI/
    ├── Components/
    ├── Styles/
    └── Resources/
```

### Dependencies

- Constructor injection for ViewModels and services
- Environment for SwiftUI dependency injection
- No global singletons
- Explicit dependency protocols

## Documentation Standards

### Code Documentation

- Document public APIs with DocC comments
- Include parameter and return descriptions
- Note threading/performance considerations
- Document architectural decisions

```swift
/// Authenticates a user with the provided credentials
/// - Parameters:
///   - username: The user's username or email
///   - password: The user's password
/// - Returns: Authenticated user object
/// - Throws: `AuthenticationError` if authentication fails
/// - Note: This operation is performed on a background thread
func authenticate(username: String, password: String) async throws -> User
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

## Error Handling and Diagnostics

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

- Use OSLog for logging with defined subsystems
- Include context for debugging
- Implement proper crash reporting
- Add performance metrics

```swift
import OSLog

extension Logger {
    static let network = Logger(subsystem: "com.example.myapp", category: "network")
    static let database = Logger(subsystem: "com.example.myapp", category: "database")
    static let ui = Logger(subsystem: "com.example.myapp", category: "ui")
}

// Usage
Logger.network.debug("Request started: \(request.url?.absoluteString ?? "")")
```

## Testing Strategy

### Unit Tests

- Generate tests alongside implementation
- Focus on behavior, not implementation details
- Include happy and error paths
- Use dependency injection for testability

```swift
func testAuthentication_ValidCredentials_ReturnsUser() async throws {
    // Given
    let mockService = MockAuthService()
    mockService.stubbedUser = User(id: "123", name: "Test User")
    let viewModel = AuthViewModel(service: mockService)
    
    // When
    try await viewModel.login(username: "test", password: "password")
    
    // Then
    XCTAssertEqual(viewModel.user?.id, "123")
    XCTAssertEqual(viewModel.user?.name, "Test User")
    XCTAssertFalse(viewModel.isLoading)
    XCTAssertNil(viewModel.error)
}
```

### UI Tests

- Generate critical path UI tests
- Focus on user interactions
- Include accessibility testing
- Test platform-specific features

## AI Code Review Checklist

### Code Quality

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

## Prohibited Practices

### Never

- Create duplicate utilities
- Mix architectural patterns within a feature
- Implement compatibility layers for old versions
- Force-unwrap in production code
- Create global state or singletons
- Write code without proper error handling
- Hardcode credentials or sensitive information
- Generate code without documentation

By following these guidelines, AI code agents can maintain code quality and consistency while minimizing redundancy and technical debt in modern macOS applications.
