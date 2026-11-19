---
trigger: always_on
---

# Modern macOS Architecture Guidelines (2025)

## Guide Purpose

- **For**: AI code agents (Codeium, Windsurf, Claude, Cursor, GitHub Copilot, etc.)
- **Scope**: Swift 6.1+, macOS 15+, SwiftUI-first development
- **Goal**: Generate code aligned with modern Apple architecture patterns

## Core Approach Principles

### 1. Codebase-First Mentality

- Thoroughly analyze existing codebase before creating new components
- Match existing patterns, naming conventions, and architecture
- Never create redundant functionality that already exists
- Respect established interfaces and abstractions

### 2. No Backward Compatibility Layers

- Always update code to new implementations directly
- Remove obsolete files and references completely
- Update all imports, exports, and dependencies to match new implementations

### 3. Modern Platform Approach

- Target Swift 6.1+, macOS 15+, SwiftUI-first development
- Use latest stable APIs (SwiftUI, SwiftData, structured concurrency)
- Apply modern property wrappers and type-safe approaches
- Embrace Apple Silicon optimizations

### 4. Clean Architecture Enforcement

- Maintain consistent architecture within features (MVVM, Clean, TCA)
- Use dependency injection instead of global state
- Keep domain logic free from UI/framework dependencies
- Design for testability and maintainability

### 5. Incremental Refinement

- Generate one component at a time, building from core domain outward
- Adapt based on user feedback for continuous improvement
- Document architectural decisions and rationales
- Prioritize readability and maintainability over cleverness

## AI Agent Workflow

### Initial Analysis Phase

1. **File and Component Assessment**
   - Verify existing function/class/view names before creating new ones
   - Search thoroughly for similar functionality before implementation
   - Ensure tight integration with existing patterns and structures
   - Parse project structure and architecture patterns
   - Identify existing conventions and naming patterns
   - Map relationships between components
   - Note platform-specific requirements (macOS version)

3. **Context Building**
   - Map dependencies between components
   - Identify third-party dependencies and their usage

4. **Feature Requirements Analysis**
   - Match requirements to architectural components
   - Identify entities, use cases, and boundaries
   - Define required interfaces and protocols

5. **Legacy Code Handling**
   - Identify and follow existing patterns when editing legacy code
   - Add modernization TODOs when appropriate
   - Transition completely to new patterns rather than creating compatibility layers

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

## Prohibited Practices

### Never

- Create duplicate utilities
- Mix architectural patterns within a feature
- Implement compatibility layers for old versions
- Force-unwrap in production code
- Create global state or singletons
- Write code without proper error handling
- Generate code without documentation
