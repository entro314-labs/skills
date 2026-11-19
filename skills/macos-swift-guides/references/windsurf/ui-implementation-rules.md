---
trigger: model_decision
description: guides and rules for when working with ui, gui, swiftui, view architecture, state management, layout, appearance, window management
---

# Modern macOS UI Implementation Rules

## SwiftUI Fundamentals

### App Structure

- Use `App` protocol with `WindowGroup`
- Organize windows by function/document type
- Implement proper scene lifecycle handling
- Use `.commands` modifier for menu customization

```swift
@main
struct MyApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
        .commands {
            CommandMenu("Actions") {
                Button("Custom Action") { /* action */ }
                    .keyboardShortcut("a", modifiers: [.command])
            }
        }
        
        Settings {
            SettingsView()
        }
    }
}
```

### View Architecture

- Small, focused view components
- Extract complex logic to ViewModels
- Use container/presentational pattern
- Avoid large monolithic views

### State Management

- `@Observable` for ViewModel state
- `@State` for view-local state
- `@Environment` for dependencies
- `@Query` for SwiftData integration
- No `@ObservedObject` or `@Published` (legacy)

### Layout System

- Use modern layout containers (Grid, Stack)
- Build custom layouts with layout protocol
- Implement responsive designs with GeometryReader
- Use safe areas and layout margins

## AppKit Integration

### Interoperability

- `NSHostingView` for SwiftUI in AppKit
- `NSViewRepresentable` for AppKit in SwiftUI
- Maintain consistent styling across boundaries
- Bridge delegate patterns between frameworks

### Legacy Integration

- Incremental migration path
- Wrap AppKit components before replacement
- Maintain state consistency across frameworks
- Document migration strategy for future work

## Input Handling

### Keyboard

- Implement keyboard shortcuts with `.keyboardShortcut`
- Support keyboard navigation
- Create custom keyboard handling when needed
- Support key repeat rates

### Mouse/Trackpad

- Implement hover effects with `.onHover`
- Support trackpad gestures
- Context menus with `.contextMenu`
- Drag and drop with `.onDrag` and `.onDrop`

### Accessibility

- Provide clear accessibility labels
- Support VoiceOver navigation
- Implement proper focus management
- Test with Accessibility Inspector

## Platform Adaptation

### Appearance

- Support light/dark mode
- Use semantic colors
- Adapt to accent color changes
- Implement system materials/vibrancy

### Displays

- Support multiple displays
- Handle screen resolution changes
- Respect display properties (P3, HDR)
- Implement proper scaling

### Window Management

- Support Stage Manager
- Implement proper window restoration
- Save window position/size preferences
- Support full-screen mode

## Specific Controls

### Lists and Tables

- Use SwiftUI `List` with identifiable data
- Apply proper list styling
- Implement selection handling
- Support keyboard navigation

### Document Handling

- Implement `FileDocument` protocol
- Support autosave and versioning
- Handle file coordination
- Implement security-scoped bookmarks
