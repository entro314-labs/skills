# Legacy Code Migration Rules

## Mindset & Approach

### Evolutionary Strategy

- Respect existing architectural decisions
- Prefer incremental modernization over rewrites
- Follow local patterns when editing existing files
- Document technical debt instead of silently patching

### Migration Assessment

- Only propose migration when justified by:
  - Simplification
  - Security improvements
  - Performance gains
  - Better tooling support
  - Maintenance cost reduction

## Compatibility & Transitions

### Hybrid Approaches

- Wrap older APIs with Swift-friendly layers during transition
- Use feature flags for gradual adoption
- Implement "strangler pattern": build new alongside old
- Mark transitional code with deprecation notices

```swift
// TRANSITIONAL CODE: Bridging AppKit table to SwiftUI
// Migration target: Q3 2025
@available(*, deprecated, message: "Use TaskListView instead")
class TaskTableViewController: NSViewController {
    // Implementation
}
```

### Clean Boundaries

- Create clean interfaces between old and new code
- Use adapters to translate between paradigms
- Maintain separate test suites during transition
- Implement clear feature flags

## Migration Patterns

### AppKit to SwiftUI

- Start with leaf components
- Use NSHostingView for gradual integration
- Create parallel implementations before switching
- Focus on state management differences

### Core Data to SwiftData

- Analyze schema complexity first
- Create parallel models during transition
- Implement synchronization during migration
- Use SwiftData exclusively for new features

### Combine to Structured Concurrency

- Replace publishers with async functions
- Rewrite subscription chains as async sequences
- Convert CurrentValueSubject to observable properties
- Implement adapter patterns for transition

### MVC to MVVM/Clean/TCA

- Extract business logic from controllers first
- Create ViewModels that mirror controller state
- Refactor view bindings incrementally
- Add tests before significant refactoring

## Common Migration Challenges

### State Management

- Convert `@Published` to `@Observable`
- Replace ObservableObject protocol
- Update binding mechanisms
- Preserve state during transitions

### Navigation

- Replace coordinator patterns with SwiftUI navigation
- Update deep linking implementations
- Maintain navigation state during transitions
- Preserve custom transitions

### Persistence

- Handle schema migrations carefully
- Test data migration thoroughly
- Maintain backward compatibility
- Support rollback paths

## Migration Planning

### Phased Approach

- Identify independent components for migration
- Define clear exit criteria for each phase
- Implement automated testing before migration
- Monitor performance and stability metrics

### Risk Mitigation

- Create feature flags for quick rollback
- Implement parallel implementations
- Add comprehensive logging
- Deploy to internal users first

## AI Migration Helpers

### Static Analysis

- Generate usage reports for outdated APIs
- Create dependency graphs to identify migration order
- Detect architectural inconsistencies
- Identify test coverage gaps

### Migration Scripts

- Generate migration plans for common patterns
- Create boilerplate for modern equivalents
- Document before/after examples
- Generate test cases for validation

### Documentation Generation

- Create migration guides for specific patterns
- Document rationale for architectural changes
- Record known issues and workarounds
- Update API documentation during migration
