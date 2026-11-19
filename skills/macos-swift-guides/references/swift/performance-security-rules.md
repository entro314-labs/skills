# Performance & Security Rules

## Memory Management

### Value Types

- Prefer struct over class when possible
- Implement copy-on-write for large structs
- Use value semantics for model data
- Avoid unnecessary reference types

```swift
// Implement copy-on-write for large data structures
struct LargeDataStore {
    private class Storage {
        var data: [String: [Double]]
        
        init(data: [String: [Double]]) {
            self.data = data
        }
    }
    
    private var storage: Storage
    
    init(data: [String: [Double]]) {
        self.storage = Storage(data: data)
    }
    
    // Copy-on-write implementation
    private mutating func ensureUniqueCopy() {
        if !isKnownUniquelyReferenced(&storage) {
            storage = Storage(data: storage.data)
        }
    }
}
```

### Reference Types

- Use weak/unowned references to break retain cycles
- Implement proper resource cleanup
- Close/cancel operations when objects deinitialize
- Audit for memory leaks regularly

### Resource Handling

- Implement proper loading/unloading cycles
- Release resources when entering background
- Respond to memory pressure events
- Use size classes for asset loading

## Concurrency

### Structured Concurrency

- Use Task hierarchies for related work
- Implement proper cancellation handling
- Apply task priorities appropriately
- Handle errors in async contexts

```swift
func loadDashboard() async throws -> Dashboard {
    async let userTask = fetchUser()
    async let statsTask = fetchStatistics()
    async let notificationsTask = fetchNotifications()
    
    do {
        let user = try await userTask
        let stats = try await statsTask
        let notifications = try await notificationsTask
        
        return Dashboard(
            user: user,
            statistics: stats,
            notifications: notifications
        )
    } catch {
        throw DashboardError.loadFailed(error)
    }
}
```

### Actor System

- Implement actors for shared mutable state
- Design message-passing interfaces
- Avoid data races with proper isolation
- Use MainActor for UI updates

### Background Processing

- Implement cooperative yielding for long tasks
- Use background tasks with expiration handlers
- Report progress for long-running operations
- Support cancellation at logical points

## UI Performance

### SwiftUI Optimization

- Keep view hierarchy flat
- Use lazy loading containers
- Leverage identity for stable diffing
- Extract complex views into subviews

### Rendering

- Use Metal for performance-critical graphics
- Implement progressive loading for large assets
- Apply caching for expensive renderings
- Monitor frame rates with Instruments

### Responsiveness

- Keep main thread free
- Move parsing/processing to background
- Debounce frequent user inputs
- Implement pre-fetching for anticipated data

## Security

### Data Protection

- Store sensitive data in Keychain
- Use proper file protection levels
- Implement secure data wiping when needed
- Apply encryption for sensitive persistence

```swift
func storeAPIKey(_ key: String) throws {
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrAccount as String: "APIKeyIdentifier",
        kSecValueData as String: key.data(using: .utf8)!,
        kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
    ]
    
    SecItemDelete(query as CFDictionary)
    let status = SecItemAdd(query as CFDictionary, nil)
    
    guard status == errSecSuccess else {
        throw SecurityError.keychainSaveFailed(status)
    }
}
```

### Networking

- Use certificate pinning for sensitive operations
- Implement proper TLS validation
- Avoid URL request tampering
- Sanitize all API inputs/outputs

### App Sandboxing

- Request minimum necessary entitlements
- Use security-scoped resources properly
- Document required permissions with rationale
- Implement proper error handling for denied permissions

## Diagnostics & Monitoring

### Logging

- Use structured logging with OSLog
- Define subsystems and categories
- Apply appropriate log levels
- Include contextual information

```swift
import OSLog

extension Logger {
    static let networking = Logger(subsystem: "com.company.app", category: "networking")
    static let database = Logger(subsystem: "com.company.app", category: "database")
    static let ui = Logger(subsystem: "com.company.app", category: "ui")
}

// Usage
Logger.networking.debug("Starting request to \(url.host, privacy: .public)")
```

### Performance Metrics

- Add instrumentation points
- Track key user interactions
- Monitor resource usage
- Implement performance tests

### Crash Reporting

- Implement symbolication
- Include device context
- Capture relevant state
- Use breadcrumbs for context
