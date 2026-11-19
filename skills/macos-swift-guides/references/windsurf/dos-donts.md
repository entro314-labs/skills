---
trigger: always_on
---

# Definitive macOS Development Dos and Don'ts (2025)

## API Usage

### ✅ DO

- Use the latest stable APIs (Swift 6.1+, SwiftUI, SwiftData)
- Implement modern property wrappers (`@Observable`, `@Model`, `@Query`)
- Use structured concurrency (`async`/`await`, `Task`, actors)
- Apply type-safe predicates (`#Predicate`)
- Design for optimal performance on Apple Silicon
- Use SwiftUI previews for rapid development feedback
- Leverage Swift Macros for compile-time code generation
- Implement proper memory management with ARC

### ❌ DON'T

- Use deprecated APIs (Combine, `@ObservedObject`, `NSPredicate`)
- Create compatibility abstractions for older macOS versions
- Wrap `DispatchQueue` when native async/await is available
- Use force-unwrapping (`!`) in production code
- Mix UIKit/AppKit with SwiftUI without clear boundaries
- Create brittle layouts with hardcoded dimensions
- Implement custom solutions for standard library features
- Block the main thread with synchronous operations

## Architecture Patterns

### ✅ DO

- Follow a consistent architecture pattern (MVVM, Clean, TCA)
- Inject dependencies via constructors or environment
- Use value types for models when appropriate
- Design for testability with protocols
- Create clear boundaries between layers
- Separate business logic from UI concerns
- Define interfaces before implementations
- Apply unidirectional data flow principles

### ❌ DON'T

- Mix architectural patterns within a feature
- Create global state or singletons
- Access services directly from views
- Bypass architecture for "quick fixes"
- Allow circular dependencies between components
- Create "god objects" that handle too many responsibilities
- Tightly couple UI components to specific data sources
- Implement persistence logic in view models

## Swift Best Practices

### ✅ DO

- Use Swift 6.1+ features (function builders, result builders)
- Implement proper error handling with structured errors
- Design with value semantics in mind
- Use Swift Package Manager for modularity
- Leverage protocol extensions for shared behavior
- Use enums with associated values for state management
- Apply access control modifiers appropriately
- Write self-documenting code with clear naming

### ❌ DON'T

- Write Objective-C style code in Swift
- Overuse class inheritance
- Implement custom solutions for standard library features
- Write unnecessarily complex generic code
- Force-cast types without proper validation
- Create deep inheritance hierarchies
- Use stringly-typed APIs when type-safe alternatives exist
- Ignore compiler warnings

## Code Generation

### ✅ DO

- Add inline documentation for generated code
- Include architecture context in comments
- Use Swift DocC syntax for documentation
- Include parameter and return descriptions
- Add context for architectural decisions

### ❌ DON'T

- Generate monolithic files
- Create complex dependencies without explanation
- Generate "magic" code without documentation
- Create duplicate utilities that already exist
- Produce undocumented public APIs
- Generate code that violates project conventions
- Create tightly coupled components

## Project Organization

### ✅ DO

- Organize by feature/domain
- Co-locate related files
- Use nested modules for complex features
- Include README files for complex modules
- Separate interface from implementation
- Define clear module boundaries
- Create feature-specific subfolders
- Use consistent naming conventions

### ❌ DON'T

- Organize globally by type (/Views, /Models, /Utils)
- Place unrelated code in utility/helper modules
- Create deep folder hierarchies
- Mix framework boundaries
- Place business logic in UI layer files
- Create ambiguous folder structures
- Use inconsistent naming patterns
- Tightly couple features to one another

## When Handling Existing Code

### ✅ DO

- Identify and follow existing patterns
- Propose incremental modernization
- Respect the local style
- Update documentation when modifying code
- Follow the principle of least surprise

### ❌ DON'T

- Force modern APIs into legacy areas
- Mix styles within a module
- Automatically refactor across boundaries
- Break existing functionality during refactoring
- Change architecture patterns without discussion
- Reimplement existing functionality

## Performance Considerations

### ✅ DO

- Use struct/enum for value semantics
- Implement proper caching strategies
- Optimize SwiftUI view hierarchies
- Use background tasks for heavy operations
- Profile and measure before optimizing
- Use appropriate data structures for operations
- Optimize memory usage for large datasets
- Consider battery impact for background tasks

### ❌ DON'T

- Copy large objects unnecessarily
- Block the main thread
- Create hidden performance bottlenecks
- Over-optimize prematurely
- Ignore memory warnings
- Create retain cycles
- Use inefficient algorithms for frequent operations
- Overuse property observers that trigger UI updates

## Security and Privacy

### ✅ DO

- Store secrets securely in Keychain
- Use security-scoped bookmarks
- Implement proper error handling
- Respect user privacy
- Validate all user input
- Use HTTPS for network requests
- Follow least privilege principle
- Implement proper authentication flows

### ❌ DON'T

- Store sensitive data in UserDefaults
- Ignore permission requirements
- Make unnecessary network requests
- Log sensitive information
- Transmit unencrypted data
- Cache sensitive data insecurely
- Ignore app transport security

## SwiftUI Best Practices

### ✅ DO

- Break complex views into smaller components
- Use ViewBuilder for conditional content
- Apply view modifiers in a consistent order
- Extract reusable styles into extensions
- Use LazyVGrid/LazyHGrid for efficient layouts
- Use @Environment for dependency injection
- Implement proper keyboard navigation support

### ❌ DON'T

- Create deeply nested view hierarchies
- Mix imperative and declarative UI code
- Apply state changes outside of proper lifecycle events
- Ignore dark mode
