# Comprehensive Guide for AI Code Tools: macOS Development Best Practices (2025)

This guide is specifically designed for AI coding assistants, agentic AI systems, and automated code generation tools to ensure alignment with Apple's latest standards and best practices for macOS development as of May 2025.

## Foundation Principles for AI Code Generation

### Apple Platform Alignment

- Always prioritize Apple's official guidelines and documentation
- Generate code that feels "native" to the Apple ecosystem
- Follow the principle of "least surprise" for Apple platform developers

### Progressive Technology Adoption

- Default to the latest stable Swift version (Swift 6.0)
- Prefer SwiftUI 5.0 over AppKit for new projects
- Use appropriate frameworks based on specific requirements
- Consider backward compatibility needs explicitly

### Code Quality Standards

- Generate well-structured, modular code with clear separation of concerns
- Include appropriate documentation and comments
- Implement proper error handling and nil safety
- Follow Swift style guide (spaces over tabs, camelCase for variables, etc.)

## Swift Language Implementation Guide

### Swift 6.0 Best Practices

- Leverage full actor isolation for concurrent code

```swift
// Correct implementation using Swift 6.0 actor isolation
actor DataManager {
    private var data: [String: Any] = [:]
    
    func setValue(_ value: Any, forKey key: String) {
        data[key] = value
    }
    
    func value(forKey key: String) -> Any? {
        return data[key]
    }
}

// Usage
func updateData() async {
    let manager = DataManager()
    await manager.setValue("value", forKey: "key")
    let value = await manager.value(forKey: "key")
}
```

- Implement async/await with modern error handling

```swift
// Modern async/await with structured error handling
enum NetworkError: Error {
    case invalidURL
    case serverError(code: Int)
    case decodingFailed
    case noData
}

func fetchData() async throws -> [Item] {
    guard let url = URL(string: "https://api.example.com/items") else {
        throw NetworkError.invalidURL
    }
    
    let (data, response) = try await URLSession.shared.data(from: url)
    
    guard let httpResponse = response as? HTTPURLResponse, 
          (200...299).contains(httpResponse.statusCode) else {
        let code = (response as? HTTPURLResponse)?.statusCode ?? 0
        throw NetworkError.serverError(code: code)
    }
    
    do {
        return try JSONDecoder().decode([Item].self, from: data)
    } catch {
        throw NetworkError.decodingFailed
    }
}

// Usage
do {
    let items = try await fetchData()
    // Process items
} catch NetworkError.invalidURL {
    // Handle invalid URL
} catch NetworkError.serverError(let code) {
    // Handle server error with specific code
} catch NetworkError.decodingFailed {
    // Handle decoding failure
} catch {
    // Handle other errors
}
```

- Use Swift macros for repetitive patterns

```swift
// Using Swift macros for common patterns
@Observable
class UserViewModel {
    var username: String = ""
    var email: String = ""
    var isValid: Bool {
        !username.isEmpty && !email.isEmpty && email.contains("@")
    }
}
```

### Memory Management and Performance

- Use value types (structs) for data models where appropriate
- Implement proper reference management to avoid retain cycles

```swift
// Avoiding retain cycles with weak references
class DetailViewController {
    weak var delegate: DetailViewControllerDelegate?
    
    // Implementation...
}
```

- Apply the ownership model correctly

```swift
// Using borrowing and consuming parameters
func process(_ borrowedData: borrowing Data) {
    // Use the data without consuming it
}

func consume(_ consumedData: consuming Data) -> String {
    // Consume the data
    return consumedData.base64EncodedString()
}
```

## Architecture and Project Structure

### Module-Based Architecture

- Structure code into SPM modules based on features or layers

```
MyApp/
├── App/
│   ├── Package.swift
│   └── Sources/
│       └── App/
│           ├── AppDelegate.swift
│           └── Main.swift
├── Features/
│   ├── Authentication/
│   │   ├── Package.swift
│   │   └── Sources/
│   │       └── Authentication/
│   │           ├── Models/
│   │           ├── ViewModels/
│   │           └── Views/
│   └── Dashboard/
│       ├── Package.swift
│       └── Sources/
│           └── Dashboard/
│               ├── Models/
│               ├── ViewModels/
│               └── Views/
└── Core/
    ├── Package.swift
    └── Sources/
        └── Core/
            ├── Networking/
            ├── Storage/
            └── Utilities/
```

- Use clear dependency directions (Dependency Injection pattern)

```swift
// Dependency Injection example
protocol NetworkService {
    func fetchData() async throws -> Data
}

class RealNetworkService: NetworkService {
    func fetchData() async throws -> Data {
        // Implementation
    }
}

class ViewModel {
    private let networkService: NetworkService
    
    init(networkService: NetworkService) {
        self.networkService = networkService
    }
    
    func loadData() async throws {
        let data = try await networkService.fetchData()
        // Process data
    }
}

// Usage
let viewModel = ViewModel(networkService: RealNetworkService())
```

### App Sandboxing and Entitlements

- Always include proper entitlements for required permissions

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.files.user-selected.read-only</key>
    <true/>
</dict>
</plist>
```

- Verify entitlements correspond to app capabilities

```swift
// Check for permissions and handle gracefully
func requestMicrophoneAccess() async -> Bool {
    switch AVAudioSession.sharedInstance().recordPermission {
    case .granted:
        return true
    case .denied:
        // Handle denied state
        return false
    case .undetermined:
        do {
            return await withCheckedContinuation { continuation in
                AVAudioSession.sharedInstance().requestRecordPermission { granted in
                    continuation.resume(returning: granted)
                }
            }
        }
    @unknown default:
        return false
    }
}
```

## User Interface Implementation

### SwiftUI 5.0 Best Practices

- Use SwiftUI modifiers in order from most to least specific

```swift
// Proper modifier order
Text("Hello World")
    .font(.headline)            // Text-specific
    .foregroundColor(.primary)  // Text-specific
    .padding()                  // Layout
    .background(Color.blue)     // View
    .cornerRadius(8)            // View
    .shadow(radius: 3)          // Effect
```

- Implement responsive layouts using GeometryReader and flexible spacing

```swift
// Responsive layout example
struct ResponsiveView: View {
    var body: some View {
        GeometryReader { geometry in
            if geometry.size.width > 500 {
                HStack {
                    ContentView()
                    SidebarView()
                }
            } else {
                VStack {
                    ContentView()
                    SidebarView()
                }
            }
        }
    }
}
```

- Use ViewBuilder for complex view composition

```swift
// Using ViewBuilder for conditional content
struct ConditionalView<Content: View>: View {
    var condition: Bool
    var contentIfTrue: Content
    var contentIfFalse: Content
    
    init(if condition: Bool, @ViewBuilder then contentIfTrue: () -> Content, @ViewBuilder else contentIfFalse: () -> Content) {
        self.condition = condition
        self.contentIfTrue = contentIfTrue()
        self.contentIfFalse = contentIfFalse()
    }
    
    var body: some View {
        if condition {
            contentIfTrue
        } else {
            contentIfFalse
        }
    }
}
```

### Modern AppKit Implementation

- When AppKit is required, use modern APIs

```swift
// Modern AppKit window creation
func createModernWindow() -> NSWindow {
    let window = NSWindow(
        contentRect: NSRect(x: 0, y: 0, width: 800, height: 600),
        styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
        backing: .buffered,
        defer: false
    )
    window.titlebarAppearsTransparent = true
    window.titleVisibility = .hidden
    window.toolbar = NSToolbar()
    window.toolbar?.showsBaselineSeparator = false
    
    return window
}
```

- Bridge AppKit and SwiftUI properly

```swift
// AppKit hosting a SwiftUI view
func createHostingController() -> NSViewController {
    let contentView = ContentView()
    return NSHostingController(rootView: contentView)
}
```

### Human Interface Guidelines Implementation

- Use SF Symbols 6 appropriately

```swift
// SF Symbols usage
Image(systemName: "sparkles")
    .symbolRenderingMode(.multicolor)
    .symbolEffect(.pulse)
```

- Implement proper appearance for light and dark mode

```swift
// Color scheme-aware styling
Color("AccentColor") // Define in asset catalog with light/dark variants

// Or dynamic colors
Color(NSColor.controlAccentColor)

// For custom colors
Color(light: .black, dark: .white)

extension Color {
    init(light lightModeColor: Color, dark darkModeColor: Color) {
        self.init(NSColor(name: nil, dynamicProvider: { appearance in
            appearance.isDarkMode ? NSColor(darkModeColor) : NSColor(lightModeColor)
        }))
    }
}

extension NSAppearance {
    var isDarkMode: Bool {
        if self.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua {
            return true
        }
        return false
    }
}
```

- Follow macOS window and control layout patterns

```swift
// Toolbar configuration
.toolbar {
    ToolbarItem(placement: .navigation) {
        Button(action: toggleSidebar) {
            Image(systemName: "sidebar.left")
        }
    }
    
    ToolbarItem(placement: .primaryAction) {
        Button(action: createNew) {
            Image(systemName: "plus")
        }
    }
    
    ToolbarItemGroup(placement: .automatic) {
        Button(action: share) {
            Image(systemName: "square.and.arrow.up")
        }
        
        Button(action: delete) {
            Image(systemName: "trash")
        }
    }
}
```

## Data Management and Persistence

### SwiftData Implementation

- Use code-first Swift data models

```swift
// SwiftData model
@Model
final class Item {
    var title: String
    var dateCreated: Date
    var isCompleted: Bool
    
    init(title: String, dateCreated: Date = Date(), isCompleted: Bool = false) {
        self.title = title
        self.dateCreated = dateCreated
        self.isCompleted = isCompleted
    }
}
```

- Create custom model containers

```swift
// SwiftData configuration
struct PersistenceController {
    static let shared = PersistenceController()
    
    let container: ModelContainer
    
    init() {
        do {
            let schema = Schema([Item.self])
            let modelConfiguration = ModelConfiguration("MyApp", schema: schema)
            container = try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Failed to create ModelContainer: \(error)")
        }
    }
}
```

- Use proper SwiftData queries

```swift
// SwiftData CRUD operations
struct ItemList: View {
    @Query(sort: \Item.dateCreated, order: .reverse) private var items: [Item]
    @Environment(\.modelContext) private var modelContext
    
    var body: some View {
        List {
            ForEach(items) { item in
                ItemRow(item: item)
            }
            .onDelete(perform: deleteItems)
        }
        .toolbar {
            Button("Add Item", action: addItem)
        }
    }
    
    private func addItem() {
        withAnimation {
            let newItem = Item(title: "New Item")
            modelContext.insert(newItem)
        }
    }
    
    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(items[index])
            }
        }
    }
}
```

### Core Data for Complex Requirements

- For more complex persistence needs, implement proper Core Data stack

```swift
// Modern Core Data stack
struct PersistenceController {
    static let shared = PersistenceController()
    
    let container: NSPersistentContainer
    
    init(inMemory: Bool = false) {
        container = NSPersistentContainer(name: "MyApp")
        
        if inMemory {
            container.persistentStoreDescriptions.first?.url = URL(fileURLWithPath: "/dev/null")
        }
        
        container.loadPersistentStores { description, error in
            if let error = error {
                fatalError("Error: \(error.localizedDescription)")
            }
        }
        
        container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
        container.viewContext.automaticallyMergesChangesFromParent = true
    }
}
```

## Integration with System Services

### App Intents Integration

- Implement App Intents for Spotlight, Siri, and Shortcuts integration

```swift
// App Intent definition
struct FindItemIntent: AppIntent {
    static var title: LocalizedStringResource = "Find Item"
    
    @Parameter(title: "Search Query")
    var query: String
    
    @MainActor
    func perform() async throws -> some IntentResult {
        // Search for items with the query
        let results = try await searchItems(matching: query)
        return .result(value: results)
    }
}
```

### Spotlight Integration

- Index app content for Spotlight search

```swift
// Core Spotlight indexing
func indexItem(_ item: Item) {
    let attributeSet = CSSearchableItemAttributeSet(contentType: .text)
    attributeSet.title = item.title
    attributeSet.contentDescription = item.description
    attributeSet.keywords = item.tags
    
    let searchableItem = CSSearchableItem(
        uniqueIdentifier: item.id.uuidString,
        domainIdentifier: "com.example.myapp",
        attributeSet: attributeSet
    )
    
    CSSearchableIndex.default().indexSearchableItems([searchableItem]) { error in
        if let error = error {
            print("Indexing error: \(error.localizedDescription)")
        }
    }
}
```

### System Extension Implementation

- Create proper system extensions with clear separation

```swift
// Network Extension example
class PacketTunnelProvider: NEPacketTunnelProvider {
    override func startTunnel(options: [String: NSObject]?, completionHandler: @escaping (Error?) -> Void) {
        // Network Extension setup
        let settings = NEPacketTunnelNetworkSettings(tunnelRemoteAddress: "192.168.1.1")
        settings.ipv4Settings = NEIPv4Settings(addresses: ["192.168.1.2"], subnetMasks: ["255.255.255.0"])
        
        setTunnelNetworkSettings(settings) { error in
            if let error = error {
                completionHandler(error)
                return
            }
            
            // Successfully started
            completionHandler(nil)
        }
    }
}
```

## Security and Privacy

### Secure Storage Implementation

- Use Keychain for sensitive data

```swift
// Secure Keychain storage
class KeychainManager {
    static func save(password: String, for account: String) throws {
        let passwordData = password.data(using: .utf8)!
        
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: account,
            kSecValueData as String: passwordData,
            kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlocked
        ]
        
        let status = SecItemAdd(query as CFDictionary, nil)
        
        if status == errSecDuplicateItem {
            let updateQuery: [String: Any] = [
                kSecClass as String: kSecClassGenericPassword,
                kSecAttrAccount as String: account
            ]
            
            let attributesToUpdate: [String: Any] = [
                kSecValueData as String: passwordData
            ]
            
            SecItemUpdate(updateQuery as CFDictionary, attributesToUpdate as CFDictionary)
        } else if status != errSecSuccess {
            throw NSError(domain: "KeychainError", code: Int(status), userInfo: nil)
        }
    }
    
    static func getPassword(for account: String) throws -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: account,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var item: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &item)
        
        guard status == errSecSuccess, let passwordData = item as? Data else {
            if status == errSecItemNotFound {
                return nil
            }
            throw NSError(domain: "KeychainError", code: Int(status), userInfo: nil)
        }
        
        return String(data: passwordData, encoding: .utf8)
    }
}
```

### Privacy and Permissions

- Implement proper permission requests with explanation

```swift
// Info.plist keys
/*
<key>NSCameraUsageDescription</key>
<string>We need camera access to scan documents</string>
<key>NSMicrophoneUsageDescription</key>
<string>We need microphone access for voice notes</string>
*/

// Permission request in code
func requestCameraAccess() async -> Bool {
    switch AVCaptureDevice.authorizationStatus(for: .video) {
    case .authorized:
        return true
    case .notDetermined:
        return await AVCaptureDevice.requestAccess(for: .video)
    case .denied, .restricted:
        // Show UI to direct user to Settings
        return false
    @unknown default:
        return false
    }
}
```

## Testing and Quality Assurance

### Swift Testing Framework

- Implement proper test structure

```swift
// Modern Swift testing
import XCTest
@testable import MyApp

final class ItemModelTests: XCTestCase {
    func testItemCreation() {
        let title = "Test Item"
        let item = Item(title: title)
        
        XCTAssertEqual(item.title, title)
        XCTAssertFalse(item.isCompleted)
        XCTAssertNotNil(item.dateCreated)
    }
    
    func testItemCompletion() async {
        let item = Item(title: "Test Item")
        XCTAssertFalse(item.isCompleted)
        
        item.isCompleted = true
        XCTAssertTrue(item.isCompleted)
    }
}
```

- Use async testing for asynchronous code

```swift
// Async testing
func testAsyncDataFetching() async throws {
    let expectation = XCTestExpectation(description: "Fetch data")
    
    let service = MockNetworkService()
    let viewModel = ViewModel(networkService: service)
    
    do {
        let data = try await viewModel.fetchData()
        XCTAssertNotNil(data)
        XCTAssertGreaterThan(data.count, 0)
        expectation.fulfill()
    } catch {
        XCTFail("Fetch failed with error: \(error)")
    }
    
    await fulfillment(of: [expectation], timeout: 5.0)
}
```

### UI Testing

- Implement proper UI testing with accessibility identifiers

```swift
// Setting accessibility identifiers
TextField("Username", text: $username)
    .accessibilityIdentifier("usernameTextField")

Button("Login") {
    login()
}
.accessibilityIdentifier("loginButton")

// UI test example
func testLoginFlow() {
    let app = XCUIApplication()
    app.launch()
    
    let usernameField = app.textFields["usernameTextField"]
    let passwordField = app.secureTextFields["passwordTextField"]
    let loginButton = app.buttons["loginButton"]
    
    XCTAssertTrue(usernameField.exists)
    XCTAssertTrue(passwordField.exists)
    XCTAssertTrue(loginButton.exists)
    
    usernameField.tap()
    usernameField.typeText("testuser")
    
    passwordField.tap()
    passwordField.typeText("password123")
    
    loginButton.tap()
    
    // Assert that login succeeded
    let welcomeText = app.staticTexts["welcomeText"]
    XCTAssertTrue(welcomeText.waitForExistence(timeout: 2))
}
```

## Apple Intelligence Integration

### System Intelligence Features

- Integrate with Writing Tools API

```swift
// Writing Tools integration
import AppleIntelligence

struct ContentEditView: View {
    @State private var content: String = ""
    @State private var presentingToolPicker = false
    
    var body: some View {
        TextEditor(text: $content)
            .toolbar {
                Button("Enhance") {
                    presentingToolPicker = true
                }
            }
            .intelligenceWritingTools(presenting: $presentingToolPicker, text: $content)
    }
}
```

### App Intent Integration

- Make features available to Apple Intelligence

```swift
// App Intent for Apple Intelligence
struct GenerateReportIntent: AppIntent {
    static var title: LocalizedStringResource = "Generate Report"
    
    @Parameter(title: "Report Type")
    var reportType: ReportType
    
    @Parameter(title: "Start Date")
    var startDate: Date
    
    @Parameter(title: "End Date")
    var endDate: Date
    
    @MainActor
    func perform() async throws -> some IntentResult {
        let report = try await generateReport(type: reportType, from: startDate, to: endDate)
        return .result(value: report)
    }
}

enum ReportType: String, AppEnum {
    case sales
    case expenses
    case summary
    
    static var typeDisplayRepresentation: TypeDisplayRepresentation {
        TypeDisplayRepresentation(name: "Report Type")
    }
    
    static var caseDisplayRepresentations: [Self: DisplayRepresentation] = [
        .sales: DisplayRepresentation(title: "Sales Report"),
        .expenses: DisplayRepresentation(title: "Expense Report"),
        .summary: DisplayRepresentation(title: "Summary Report")
    ]
}
```

## Refactoring Guidelines for Legacy Apps

### AppKit to SwiftUI Migration Strategy

- Incremental approach with hybrid solutions

```swift
// Hybrid approach: AppKit window with SwiftUI content
class AppDelegate: NSObject, NSApplicationDelegate {
    var window: NSWindow!

    func applicationDidFinishLaunching(_ notification: Notification) {
        let contentView = ContentView()
            .environment(\.managedObjectContext, persistenceController.container.viewContext)
        
        window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 800, height: 600),
            styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
            backing: .buffered,
            defer: false
        )
        window.center()
        window.setFrameAutosaveName("Main Window")
        window.contentView = NSHostingView(rootView: contentView)
        window.makeKeyAndOrderFront(nil)
    }
}
```

- Use NSViewRepresentable to wrap existing NSViews

```swift
// Wrapping NSView in SwiftUI
struct NSTableViewRepresentable: NSViewRepresentable {
    var items: [Item]
    var onSelect: (Item) -> Void
    
    func makeNSView(context: Context) -> NSScrollView {
        let tableView = NSTableView()
        let column = NSTableColumn(identifier: NSUserInterfaceItemIdentifier("item"))
        column.title = "Items"
        tableView.addTableColumn(column)
        tableView.delegate = context.coordinator
        tableView.dataSource = context.coordinator
        
        let scrollView = NSScrollView()
        scrollView.documentView = tableView
        return scrollView
    }
    
    func updateNSView(_ nsView: NSScrollView, context: Context) {
        guard let tableView = nsView.documentView as? NSTableView else { return }
        context.coordinator.items = items
        tableView.reloadData()
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, NSTableViewDelegate, NSTableViewDataSource {
        var parent: NSTableViewRepresentable
        var items: [Item]
        
        init(_ parent: NSTableViewRepresentable) {
            self.parent = parent
            self.items = parent.items
        }
        
        func numberOfRows(in tableView: NSTableView) -> Int {
            return items.count
        }
        
        func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {
            let cell = tableView.makeView(withIdentifier: NSUserInterfaceItemIdentifier("ItemCell"), owner: nil) as? NSTableCellView ?? NSTableCellView()
            cell.textField = NSTextField(labelWithString: items[row].title)
            return cell
        }
        
        func tableViewSelectionDidChange(_ notification: Notification) {
            guard let tableView = notification.object as? NSTableView else { return }
            let selectedRow = tableView.selectedRow
            
            if selectedRow >= 0 && selectedRow < items.count {
                parent.onSelect(items[selectedRow])
            }
        }
    }
}
```

### Core Data to SwiftData Migration

- Implement proper migration path

```swift
// Core Data to SwiftData migration
class DataMigrator {
    static func migrate(from coreDataContainer: NSPersistentContainer, to swiftDataContainer: ModelContainer) async throws {
        // Get Core Data entities
        let context = coreDataContainer.viewContext
        let fetchRequest: NSFetchRequest<CDItem> = CDItem.fetchRequest()
        let coreDataItems = try context.fetch(fetchRequest)
        
        // Create SwiftData entities
        let modelContext = swiftDataContainer.mainContext
        
        for cdItem in coreDataItems {
            let newItem = Item(
                title: cdItem.title ?? "Unknown",
                dateCreated: cdItem.dateCreated ?? Date(),
                isCompleted: cdItem.isCompleted
            )
            
            modelContext.insert(newItem)
        }
        
        // Save SwiftData changes
        try modelContext.save()
    }
}
```

## Optimization and Performance

### Resource Management and Efficiency

- Implement proper background task handling

```swift
// Background task handling
class BackgroundTaskManager {
    private var backgroundTask: UIBackgroundTaskIdentifier = .invalid
    
    func beginBackgroundTask() {
        backgroundTask = ProcessInfo.processInfo.beginActivity(options: [.background, .userInitiated], reason: "Completing important task")
    }
    
    func endBackgroundTask() {
        ProcessInfo.processInfo.endActivity(backgroundTask)
        backgroundTask = .invalid
    }
}

// Usage
let taskManager = BackgroundTaskManager()
taskManager.beginBackgroundTask()

// Perform work
try await performLongRunningTask()

taskManager.endBackgroundTask()
```

- Implement efficient background refreshing

```swift
// Background app refresh
func scheduleAppRefresh() {
    let request = BGAppRefreshTaskRequest(identifier: "com.example.myapp.refresh")
    request.earliestBeginDate = Calendar.current.date(byAdding: .hour, value: 1, to: Date())
    
    try? BGTaskScheduler.shared.submit(request)
}

// Register background tasks in AppDelegate
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.example.myapp.refresh", using: nil) { task in
        self.handleAppRefresh(task: task as! BGAppRefreshTask)
    }
    
    return true
}

func handleAppRefresh(task: BGAppRefreshTask) {
    scheduleAppRefresh() // Schedule next refresh
    
    let operation = RefreshOperation()
    
    task.expirationHandler = {
        operation.cancel()
    }
    
    operation.completionBlock = {
        task.setTaskCompleted(success: !operation.isCancelled)
    }
    
    operationQueue.addOperation(operation)
}
```

### Apple Silicon Optimization

- Use relevant Metal optimizations for graphics

```swift
// Metal shader for performance-critical graphics
let metalDevice = MTLCreateSystemDefaultDevice()!
let metalLibrary = metalDevice.makeDefaultLibrary()!
let metalFunction = metalLibrary.makeFunction(name: "processImage")!

let pipelineDescriptor = MTLComputePipelineDescriptor()
pipelineDescriptor.computeFunction = metalFunction

let pipeline = try! metalDevice.makeComputePipelineState(descriptor: pipelineDescriptor, options: [], reflection: nil)

// Usage in processing
func processImage(sourceTexture: MTLTexture, destinationTexture: MTLTexture) {
    guard let commandBuffer = metalCommandQueue.makeCommandBuffer(),
          let computeEncoder = commandBuffer.makeComputeCommandEncoder() else {
        return
    }
    
    computeEncoder.setComputePipelineState(pipeline)
    computeEncoder.setTexture(sourceTexture, index: 0)
    computeEncoder.setTexture(destinationTexture, index: 1)
    
    let threadgroupSize = MTLSize(width: 16, height: 16, depth: 1)
    let threadgroupCount = MTLSize(
        width: (destinationTexture.width + threadgroupSize.width - 1) / threadgroupSize.width,
        height: (destinationTexture.height + threadgroupSize.height - 1) / threadgroupSize.height,
        depth: 1
    )
    
    computeEncoder.dispatchThreadgroups(threadgroupCount, threadsPerThreadgroup: threadgroupSize)
    computeEncoder.endEncoding()
    
    commandBuffer.commit()
}
```

- Use Accelerate framework for vector and matrix operations

```swift
// Accelerate framework for image processing
import Accelerate

func adjustImageBrightness(pixels: UnsafeMutablePointer<UInt8>, count: Int, factor: Float) {
    var factor = factor
    var pixelCount = vDSP_Length(count)
    
    // Convert to float for processing
    var floatPixels = [Float](repeating: 0, count: count)
    vDSP_vfltu8(pixels, 1, &floatPixels, 1, pixelCount)
    
    // Multiply by factor
    vDSP_vsmul(floatPixels, 1, &factor, &floatPixels, 1, pixelCount)
    
    // Clamp values to 0-255 range
    var min: Float = 0
    var max: Float = 255
    vDSP_vclip(floatPixels, 1, &min, &max, &floatPixels, 1, pixelCount)
    
    // Convert back to UInt8
    vDSP_vfixu8(floatPixels, 1, pixels, 1, pixelCount)
}
```

### Memory Management

- Implement proper caching strategies

```swift
// Image caching
actor ImageCache {
    private var cache: [URL: (Data, Date)] = [:]
    private let maxCacheSize = 100
    private let cacheExpirationInterval: TimeInterval = 3600 // 1 hour
    
    func store(imageData: Data, for url: URL) {
        if cache.count >= maxCacheSize {
            // Remove oldest entries if cache is full
            let sortedItems = cache.sorted { $0.value.1 < $1.value.1 }
            if let oldestKey = sortedItems.first?.key {
                cache.removeValue(forKey: oldestKey)
            }
        }
        
        cache[url] = (imageData, Date())
        }
    }
    
    func retrieveImageData(for url: URL) -> Data? {
        guard let (imageData, timestamp) = cache[url] else {
            return nil
        }
        
        // Check if cached data is expired
        if Date().timeIntervalSince(timestamp) > cacheExpirationInterval {
            cache.removeValue(forKey: url)
            return nil
        }
        
        return imageData
    }
    
    func clearExpiredCache() {
        let now = Date()
        let keysToRemove = cache.filter { now.timeIntervalSince($0.value.1) > cacheExpirationInterval }.keys
        for key in keysToRemove {
            cache.removeValue(forKey: key)
        }
    }
}
