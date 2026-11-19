# macOS System Integration Rules

## Apple Services Integration

### Apple Intelligence

- Integrate with Writing Tools API
- Implement text completion enhancements
- Support image generation capabilities
- Use live text interactions

### iCloud Integration

- Implement document synchronization
- Use key-value store for preferences
- Support CloudKit for database sync
- Implement proper error handling

### Shortcuts & Automation

- Use App Intents framework
- Support parameterized shortcuts
- Create custom intents for app actions
- Implement widget companion shortcuts

```swift
struct ViewTaskIntent: AppIntent {
    static var title: LocalizedStringResource = "View Task"
    
    @Parameter(title: "Task ID")
    var taskID: String
    
    func perform() async throws -> some IntentResult {
        // Implementation to open the task
        return .result()
    }
}
```

## Platform Features

### Notifications

- Use the UserNotifications framework
- Implement notification content extensions
- Support scheduled notifications
- Handle notification interactions

### System Extensions

- Implement Finder extensions
- Support share extensions
- Create today extensions
- Build action extensions

### Spotlight Integration

- Index app content for search
- Implement Core Spotlight indexing
- Use custom thumbnail providers
- Support deep linking from search results

```swift
func indexItems() {
    let attributeSet = CSSearchableItemAttributeSet(contentType: .text)
    attributeSet.title = "Project Report"
    attributeSet.contentDescription = "Annual performance review"
    attributeSet.keywords = ["report", "annual", "performance"]
    
    let item = CSSearchableItem(
        uniqueIdentifier: "doc-123",
        domainIdentifier: "com.company.app.documents",
        attributeSet: attributeSet
    )
    
    CSSearchableIndex.default().indexSearchableItems([item]) { error in
        if let error = error {
            Logger.spotlight.error("Indexing error: \(error.localizedDescription)")
        }
    }
}
```

### XPC Services

- Design XPC service interfaces
- Implement proper error handling
- Support background processing
- Handle service lifecycle

## Window Management

### Window Types

- Implement standard windows
- Support panels and sheets
- Create HUD windows when appropriate
- Use popovers for contextual UI

### State Restoration

- Save window state between sessions
- Restore documents and views
- Support macOS state restoration API
- Implement custom state persistence

```swift
class AppState: NSObject, NSWindowRestoration {
    static func restoreWindow(withIdentifier identifier: NSUserInterfaceItemIdentifier, 
                             state: NSCoder, 
                             completionHandler: @escaping (NSWindow?, Error?) -> Void) {
        // Window restoration implementation
        let window = NSWindow()
        // Configure window from saved state
        completionHandler(window, nil)
    }
}
```

### Stage Manager

- Support Stage Manager window grouping
- Implement proper window identifiers
- Use scene-based window management
- Support window organization hints

### Multi-Display

- Handle window positioning across displays
- Support display removal/addition
- Implement display preferences
- Remember window positions by display

## Input Handling

### Keyboard

- Implement keyboard shortcut customization
- Support complete keyboard navigation
- Use proper key equivalents
- Implement mnemonics for accessibility

```swift
Menu("File") {
    Button("New Project") {
        // Action
    }
    .keyboardShortcut("n", modifiers: [.command])
    
    Button("Open Recent") {
        // Action
    }
    .keyboardShortcut("o", modifiers: [.command, .shift])
}
```

### Trackpad & Mouse

- Support multi-touch trackpad gestures
- Implement magnification gestures
- Support rotation gestures
- Provide hover feedback

### Context Menus

- Implement contextual menus
- Support dynamic menu items
- Use contextual actions framework
- Implement keyboard shortcuts for menu items

## macOS User Experience

### Menu Bar Integration

- Create menu bar extras
- Implement dynamic menu structure
- Support menu customization
- Use standard menu conventions

### Dock Integration

- Customize dock tile appearance
- Implement progress indicators
- Support badge notifications
- Implement dock menu actions

```swift
func updateDockTile(progress: Double) {
    let dockTile = NSApplication.shared.dockTile
    dockTile.badgeLabel = "\(Int(progress * 100))%"
    
    // Custom dock tile image
    if let image = createProgressImage(progress: progress) {
        dockTile.contentView = NSImageView(image: image)
    }
    
    dockTile.display()
}
```

### System Appearance

- Support light/dark mode
- Implement accent color adaptation
- Use proper vibrancy and materials
- Support system appearance changes
