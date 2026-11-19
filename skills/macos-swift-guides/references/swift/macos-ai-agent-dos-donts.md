# macOS AI Agent Dos and Don'ts

## API Usage

### ✅ DO

- Use the latest stable APIs (Swift 6.1+, SwiftUI, SwiftData)
- Implement modern property wrappers (`@Observable`, `@Model`, `@Query`)
- Use structured concurrency (`async`/`await`, `Task`, actors)
- Apply type-safe predicates (`#Predicate`)

### ❌ DON'T

- Use deprecated APIs (Combine, `@ObservedObject`, `NSPredicate`)
- Create compatibility abstractions for older macOS versions
- Wrap `DispatchQueue` when native async/await is available
- Use force-unwrapping (`!`) in production code

## Architecture Patterns

### ✅ DO

- Follow a consistent architecture pattern (MVVM, Clean, TCA)
- Inject dependencies via constructors or environment
- Use value types for models when appropriate
- Design for testability with protocols

### ❌ DON'T

- Mix architectural patterns within a feature
- Create global state or singletons
- Access services directly from views
- Bypass architecture for "quick fixes"

## Swift Best Practices

### ✅ DO

- Use Swift 6.1+ features (function builders, result builders)
- Implement proper error handling with structured errors
- Design with value semantics in mind
- Use Swift Package Manager for modularity

### ❌ DON'T

- Write Objective-C style code in Swift
- Overuse class inheritance
- Implement custom solutions for standard library features
- Write unnecessarily complex generic code

## Code Generation

### ✅ DO

- Add inline documentation for generated code
- Provide usage examples in comments
- Include architecture context in comments
- Generate tests alongside implementation

### ❌ DON'T

- Generate monolithic files
- Create complex dependencies without explanation
- Generate "magic" code without documentation
- Create duplicate utilities that already exist

## Project Organization

### ✅ DO

- Organize by feature/domain
- Co-locate related files
- Use nested modules for complex features
- Include README files for complex modules

### ❌ DON'T

- Organize globally by type (/Views, /Models, /Utils)
- Place unrelated code in utility/helper modules
- Create deep folder hierarchies
- Mix framework boundaries

## When Handling Existing Code

### ✅ DO

- Identify and follow existing patterns
- Document tech debt or inconsistencies
- Propose incremental modernization
- Respect the local style

### ❌ DON'T

- Force modern APIs into legacy areas
- Mix styles within a module
- Automatically refactor across boundaries
- Assume newer is always better

## Testing Approach

### ✅ DO

- Write unit tests for business logic
- Create UI tests for critical flows
- Use dependency injection for testability
- Write snapshot tests for UI components

### ❌ DON'T

- Skip tests for generated code
- Write tests that depend on order
- Use force-unwrapping in tests
- Create tests with external dependencies

## Performance Considerations

### ✅ DO

- Use struct/enum for value semantics
- Implement proper caching strategies
- Optimize SwiftUI view hierarchies
- Use background tasks for heavy operations

### ❌ DON'T

- Copy large objects unnecessarily
- Block the main thread
- Create hidden performance bottlenecks
- Over-optimize prematurely

## Security and Privacy

### ✅ DO

- Store secrets securely in Keychain
- Use security-scoped bookmarks
- Implement proper error handling
- Respect user privacy

### ❌ DON'T

- Hardcode credentials or API keys
- Store sensitive data in UserDefaults
- Ignore permission requirements
- Make unnecessary network requests

## Documentation Generation

### ✅ DO

- Document public APIs with DocC syntax
- Include parameter descriptions
- Document architecture decisions
- Provide usage examples

### ❌ DON'T

- Write generic unhelpful documentation
- Document only class names without context
- Skip documentation for complex logic
- Use outdated documentation formats
