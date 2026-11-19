# Modern macOS Architecture Guidelines (2025)

## Guide Purpose

- **For**: AI code agents (Claude, Cursor, GitHub Copilot, etc.)
- **Scope**: Swift 6.1+, macOS 15+, SwiftUI-first development
- **Goal**: Generate code aligned with modern Apple architecture patterns

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

### Swift Package Manager

- **Core**: Domain entities, business logic
- **Features**: Individual app features
- **Data**: Repositories, networking, persistence
- **UI**: Reusable UI components
- **App**: Entry point, coordination

### Dependencies

- Constructor injection for ViewModels and services
- Environment for SwiftUI dependency injection
- No global singletons
- Explicit dependency protocols

## Error Handling and Diagnostics

- Use structured error types with context
- OSLog for logging with defined subsystems
- Task-based cancellation handling
- Error translation at boundaries

## State Management Principles

- Values over references when possible
- Immutable state with explicit mutations
- Unidirectional data flow
- State hoisting to appropriate level

## Project Structure

- Organize by feature, not type
- Co-locate related files (view/viewmodel)
- Tests alongside implementation
- Resources grouped by feature when possible
