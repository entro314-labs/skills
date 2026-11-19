# macOS Data & Persistence Rules

## SwiftData Implementation

### Model Definition

- Use `@Model` for persistent types
- Define relationships with proper attributes
- Implement value transformers for custom types
- Follow naming conventions

```swift
@Model final class Project {
    var title: String
    var createdDate: Date
    @Relationship(.cascade) var tasks: [Task]
    
    init(title: String, createdDate: Date = .now) {
        self.title = title
        self.createdDate = createdDate
        self.tasks = []
    }
}

@Model final class Task {
    var title: String
    var isComplete: Bool
    var priority: Int
    var project: Project?
    
    init(title: String, isComplete: Bool = false, priority: Int = 0) {
        self.title = title
        self.isComplete = isComplete
        self.priority = priority
    }
}
```

### Query Design

- Use `#Predicate` for type-safe queries
- Implement proper sorting with SortDescriptor
- Design efficient fetch descriptors
- Implement pagination when needed

```swift
let predicate = #Predicate<Task> { task in
    task.isComplete == false && task.priority > 1
}

let sortDescriptors = [SortDescriptor(\Task.priority, order: .reverse)]

@Query(filter: predicate, sort: sortDescriptors) var tasks: [Task]
```

### Schema Migration

- Design with migration in mind
- Implement lightweight migrations
- Document schema versions
- Add schema migration unit tests

### SwiftUI Integration

- Use `@Query` property wrapper
- Apply modifiers for fetch control
- Handle fetch errors properly
- Implement proper update animations

## CloudKit Integration

### Container Setup

- Configure container identifiers
- Separate public/private databases
- Implement proper IAM permissions
- Set up subscription handling

### Synchronization

- Implement change tracking
- Handle conflict resolution
- Implement retry/backoff strategies
- Support offline operation

### Security

- Apply record-level security
- Implement proper authentication
- Encrypt sensitive fields
- Follow privacy best practices

## File Management

### Security-Scoped Bookmarks

- Store bookmarks securely
- Implement proper start/stop access
- Handle URL resource values
- Respect sandbox limitations

```swift
func storeSecurityScopedBookmark(for url: URL) throws -> Data {
    let bookmarkData = try url.bookmarkData(
        options: .withSecurityScope,
        includingResourceValuesForKeys: nil,
        relativeTo: nil
    )
    return bookmarkData
}

func resolveBookmark(data: Data) throws -> URL {
    var isStale = false
    let url = try URL(
        resolvingBookmarkData: data,
        options: .withSecurityScope,
        relativeTo: nil,
        bookmarkDataIsStale: &isStale
    )
    
    if isStale {
        // Handle stale bookmark
    }
    
    return url
}
```

### File Coordination

- Use NSFileCoordinator for access
- Implement proper intents
- Handle coordination failures
- Support background coordination

### Import/Export

- Support standard file formats
- Implement UTType declarations
- Use system file pickers
- Support drag and drop

## Local Storage

### UserDefaults

- Store only small preference data
- Use property wrappers for access
- Define clear preference keys
- Support defaults reset

```swift
@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T

    var wrappedValue: T {
        get { UserDefaults.standard.object(forKey: key) as? T ?? defaultValue }
        set { UserDefaults.standard.set(newValue, forKey: key) }
    }
}
```

### Keychain

- Store sensitive information only
- Implement proper access control
- Handle keychain errors
- Support biometric authentication

### Cache Management

- Implement proper cache invalidation
- Respect system pressure warnings
- Use appropriate cache directory
- Implement size limiting

## Data Migration

- Support one-way migrations
- Implement data validation
- Provide fallback mechanisms
- Test migration paths thoroughly
