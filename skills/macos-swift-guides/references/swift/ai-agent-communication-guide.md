# AI Agent Communication Guide

## Document Structure

### Guide Organization

- Use explicit nested bullet lists or headings
- Apply consistent heading levels (##, ###)
- Add short titles to each section
- Avoid compressed information blocks

```markdown
## Window Management
- **Standard Windows**: Primary content containers
- **Panels**: Utility and auxiliary content
- **Sheets**: Modal dialogs attached to windows
- **Why It Matters**: Consistent user experience
```

### Rule Format

- Mark rules with clear signifiers (Rules, Constraints)
- Use imperative language for directives
- Include rationale with each rule
- Group related rules together

```markdown
### Rules for ViewModels
- Must be `@Observable`
- Inject all dependencies via constructor
- No direct UI references
- *Rationale*: Ensures testability and separation of concerns
```

### Configuration Blocks

- Use YAML frontmatter or JSON for configuration
- Place at the beginning of sections
- Include all relevant metadata
- Make keys self-descriptive

```yaml
# Configuration
scope: macOS 15+
architecture: MVVM
ui_framework: SwiftUI
state_management: TCA
persistence: SwiftData
```

## Code Example Patterns

### Inline Examples

- Provide short, focused code snippets
- Include complete, compilable examples
- Add comments for key lines
- Separate setup from core concept

```swift
// Complete, focused example
@Observable class ProfileViewModel {
    var user: User  // Model data
    private let userService: UserServiceProtocol  // Injected dependency
    
    // Constructor injection
    init(user: User, userService: UserServiceProtocol) {
        self.user = user
        self.userService = userService
    }
    
    // Core action with error handling
    func updateProfile() async throws {
        try await userService.updateProfile(user)
    }
}
```

### Agent Directives

- Add special comments to guide agents
- Include intent and purpose information
- Mark areas needing special attention
- Provide usage guidance

```swift
// @agent: Data access layer - Follow repository pattern
// @intent: Abstract database operations from business logic
// @attention: Handle CloudKit sync conflicts
protocol UserRepository {
    func fetchUser(id: String) async throws -> User
    func saveUser(_ user: User) async throws
    func deleteUser(id: String) async throws
}
```

## Communication Clarity

### Precise Language

- Avoid ambiguity in instructions
- Use specific terms and definitions
- Replace vague phrases with concrete examples
- Provide measurement criteria when possible

```markdown
❌ "Optimize for performance when needed"
✅ "Use lazy loading for collections with >100 items"

❌ "Implement good error handling"
✅ "Return structured errors with context and recovery suggestions"
```

### Intent Explanation

- Describe why choices are made
- Explain architectural decisions
- Clarify benefits of patterns
- Include trade-offs considered

```markdown
### Composable Architecture
- **State**: All app state lives in a single source of truth
- **Intent**: Enables time-travel debugging and predictable mutations
- **Trade-offs**: More boilerplate but better testability
- **When to use**: Complex state flows with side effects
```

## Agent Context Setting

### Operating Context

- Define audience and purpose
- Specify technical scope
- List expected outputs
- Clarify constraints

```markdown
---
guide_for: AI code agents (Claude, Cursor, Copilot)
audience: Assistants helping with Swift macOS development
objective: Generate code aligned with architecture patterns
scope: Swift 6.1+, macOS 15+, SwiftUI, TCA
constraints: Accessibility, performance, testability
---
```

### Expected Workflow

- Document the standard process
- Include common use cases
- Note expected agent behavior
- Provide troubleshooting guidance

```markdown
## Workflow for Feature Development
1. Create domain models first
2. Implement repositories and services
3. Build view models with business logic
4. Create SwiftUI views last
5. Add tests at each stage
```

## Feedback Integration

### Iteration Format

- Define how to handle feedback
- Encourage incremental improvements
- Establish common terminology
- Support continuous refinement

```markdown
## Iteration Process
1. Generate initial implementation
2. Address specific feedback points
3. Refactor with specific changes
4. Validate against requirements
```

### Learning Mechanism

- Provide guidance on improving responses
- Encourage knowledge persistence
- Support preference adaptation
- Build on previous interactions
