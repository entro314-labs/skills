# Comprehensive Guide: Developing Agentic AI Assistants for macOS (2025)

This guide provides specialized knowledge for developing modern agentic AI assistant applications for macOS, similar to successful applications like Cursor, Windsurf, and other AI-augmented tools. It leverages the latest Apple technologies available as of May 2025, focusing on SwiftUI 6.0, Swift 6.2, and macOS 15+.

## Table of Contents

1. [Foundation Architecture for AI Assistants](#foundation-architecture-for-ai-assistants)
2. [AI Integration Frameworks](#ai-integration-frameworks)
3. [System-Level Integration](#system-level-integration)
4. [User Interface Patterns for AI Assistants](#user-interface-patterns-for-ai-assistants)
5. [Performance Optimization for AI Processing](#performance-optimization-for-ai-processing)
6. [Privacy and Security for AI Applications](#privacy-and-security-for-ai-applications)
7. [macOS-Specific Capabilities](#macos-specific-capabilities)
8. [Testing AI-Driven Applications](#testing-ai-driven-applications)
9. [Deployment and Continuous Improvement](#deployment-and-continuous-improvement)
10. [Example: Building a Basic Agentic Assistant](#example-building-a-basic-agentic-assistant)

## Foundation Architecture for AI Assistants

### Core Application Structure

```swift
// MVVM architecture optimized for AI processing
struct AIMacAppStructure {
    // Root app structure
    @main
    struct AIAssistantApp: App {
        // App-wide state container
        @StateObject private var appState = AppState()
        // AI service manager
        @StateObject private var aiManager = AIManager()
        
        var body: some Scene {
            // Main window
            WindowGroup {
                ContentView()
                    .environmentObject(appState)
                    .environmentObject(aiManager)
            }
            // Commands for universal keyboard shortcuts
            .commands {
                CommandGroup(after: .textEditing) {
                    Button("Process with AI") {
                        aiManager.processSelectedText()
                    }
                    .keyboardShortcut("P", modifiers: [.command, .shift])
                }
            }
            
            // Optional: Secondary window for AI interactions
            WindowGroup("AI Assistant", id: "assistant") {
                AIAssistantView()
                    .environmentObject(appState)
                    .environmentObject(aiManager)
            }
        }
    }
}
```

### State Management

For AI assistants, a robust state management system is crucial to maintain context across interactions and handle asynchronous AI processing:

```swift
// App-wide state using the new @Observable macro
@Observable final class AppState {
    // User session state
    var isAuthenticated = false
    var currentUser: User?
    
    // AI interaction state
    var conversations: [Conversation] = []
    var currentConversation: Conversation?
    var processingRequests: [AIRequest] = []
    
    // Application context
    var activeDocument: Document?
    var selectedText: String?
    var clipboardContent: String?
    
    // System integration state
    var focusMode: FocusMode = .standard
    var systemResourcesAvailable = true
    
    // Methods for state transitions
    func startNewConversation() {
        currentConversation = Conversation(id: UUID(), startTime: Date())
        conversations.append(currentConversation!)
    }
    
    func trackRequest(_ request: AIRequest) {
        processingRequests.append(request)
    }
    
    func completeRequest(_ request: AIRequest, with result: AIResponse) {
        if let index = processingRequests.firstIndex(where: { $0.id == request.id }) {
            processingRequests.remove(at: index)
        }
        // Add response to conversation
        currentConversation?.messages.append(AIMessage(role: .assistant, content: result.content))
    }
}
```

### AI Manager Service

A dedicated manager class to handle all AI operations:

```swift
@Observable final class AIManager {
    // AI model configuration
    private var modelConfiguration: AIModelConfig
    
    // Streaming state
    var isStreaming = false
    var streamingContent = ""
    
    // Processing state
    var isProcessing = false
    var processingProgress: Double = 0
    
    // Provider options
    enum Provider {
        case localModel
        case anthropic
        case openAI
        case apple
    }
    var currentProvider: Provider = .apple
    
    // Task management for async processing
    private var currentTasks: [UUID: Task<Void, Never>] = [:]
    
    init(configuration: AIModelConfig = .default) {
        self.modelConfiguration = configuration
    }
    
    // Process text with AI
    func processText(_ text: String) async throws -> AIResponse {
        isProcessing = true
        defer { isProcessing = false }
        
        // Choose provider based on current settings
        switch currentProvider {
        case .apple:
            return try await processWithAppleIntelligence(text)
        case .anthropic:
            return try await processWithAnthropic(text)
        case .openAI:
            return try await processWithOpenAI(text)
        case .localModel:
            return try await processWithLocalModel(text)
        }
    }
    
    // Process with streaming support
    func processTextWithStreaming(_ text: String) {
        isStreaming = true
        streamingContent = ""
        
        let taskID = UUID()
        let task = Task {
            do {
                // Set up streaming
                for await chunk in try await streamFromProvider(text) {
                    streamingContent += chunk
                }
            } catch {
                // Handle errors
                print("Streaming error: \(error)")
            }
            isStreaming = false
            currentTasks[taskID] = nil
        }
        
        currentTasks[taskID] = task
    }
    
    // Cancel ongoing processes
    func cancelProcessing() {
        for task in currentTasks.values {
            task.cancel()
        }
        currentTasks.removeAll()
        isProcessing = false
        isStreaming = false
    }
    
    // Private methods for specific providers
    private func processWithAppleIntelligence(_ text: String) async throws -> AIResponse {
        // Use Apple Intelligence API when available
        // This is a placeholder for future implementation
        throw AIError.notImplemented
    }
    
    // Additional private methods for other providers...
}
```

## AI Integration Frameworks

### Local Models Integration

For on-device processing with CoreML:

```swift
class LocalModelService {
    private var models: [ModelType: MLModel] = [:]
    
    enum ModelType {
        case text
        case image
        case code
    }
    
    init() {
        // Load models at initialization
        do {
            models[.text] = try TextProcessor()
            models[.code] = try CodeAnalyzer()
        } catch {
            print("Failed to load ML models: \(error)")
        }
    }
    
    func processText(_ text: String, type: ModelType = .text) async throws -> String {
        guard let model = models[type] else {
            throw AIError.modelNotAvailable
        }
        
        // Process with model
        let input = TextProcessorInput(text: text)
        let output = try model.prediction(from: input)
        
        return output.processedText
    }
}
```

### API Integration for Cloud Models

```swift
class CloudModelService {
    enum Provider {
        case anthropic
        case openAI
    }
    
    private var apiKeys: [Provider: String] = [:]
    private let session = URLSession.shared
    
    func configure(apiKey: String, for provider: Provider) {
        apiKeys[provider] = apiKey
    }
    
    func processWithAnthropic(prompt: String) async throws -> AIResponse {
        guard let apiKey = apiKeys[.anthropic] else {
            throw AIError.missingAPIKey
        }
        
        // Set up request
        var request = URLRequest(url: URL(string: "https://api.anthropic.com/v1/messages")!)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("anthropic-version-2023-06-01", forHTTPHeaderField: "anthropic-version")
        request.addValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        
        // Prepare request body
        let requestBody: [String: Any] = [
            "model": "claude-3-7-sonnet-20250219",
            "messages": [
                ["role": "user", "content": prompt]
            ],
            "max_tokens": 1024
        ]
        
        request.httpBody = try JSONSerialization.data(withJSONObject: requestBody)
        
        // Send request
        let (data, _) = try await session.data(for: request)
        
        // Parse response
        let responseObject = try JSONDecoder().decode(AnthropicResponse.self, from: data)
        
        return AIResponse(
            content: responseObject.content.first?.text ?? "",
            metadata: ["provider": "anthropic"]
        )
    }
    
    // Similar methods for other providers...
}
```

### Apple Intelligence Integration (macOS 15+)

```swift
class AppleIntelligenceService {
    // This is a placeholder for the eventual Apple Intelligence API
    // Based on available documentation and patterns as of 2025
    
    func generateText(prompt: String) async throws -> String {
        // Use the Writing Tools API when available
        return "Apple Intelligence response placeholder"
    }
    
    func analyzeImage(_ image: NSImage) async throws -> [String: Any] {
        // Use Vision and image understanding APIs
        return ["description": "Image analysis placeholder"]
    }
    
    func processDocumentContent(_ fileURL: URL) async throws -> String {
        // Use document understanding capabilities
        return "Document content analysis placeholder"
    }
    
    func generateSuggestions(for context: String) async throws -> [String] {
        // Generate contextual suggestions
        return ["Suggestion 1", "Suggestion 2"]
    }
}
```

## System-Level Integration

### File System and Document Integration

```swift
class DocumentManager {
    private let fileManager = FileManager.default
    
    // Access security-scoped bookmarks and documents
    func accessSecurityScopedResource(_ url: URL) -> Bool {
        return url.startAccessingSecurityScopedResource()
    }
    
    func stopAccessingResource(_ url: URL) {
        url.stopAccessingSecurityScopedResource()
    }
    
    // Work with document directories
    func documentsDirectory() -> URL {
        fileManager.urls(for: .documentDirectory, in: .userDomainMask)[0]
    }
    
    // Read document content
    func readDocument(at url: URL) throws -> String {
        guard accessSecurityScopedResource(url) else {
            throw DocumentError.accessDenied
        }
        defer { stopAccessingResource(url) }
        
        return try String(contentsOf: url)
    }
    
    // Write document content
    func writeDocument(content: String, to url: URL) throws {
        guard accessSecurityScopedResource(url) else {
            throw DocumentError.accessDenied
        }
        defer { stopAccessingResource(url) }
        
        try content.write(to: url, atomically: true, encoding: .utf8)
    }
    
    // Monitor document changes
    func monitorDocument(at url: URL, onChange: @escaping () -> Void) {
        // Set up document monitoring
    }
}
```

### Services Integration

For AI assistants that offer services to other applications:

```swift
class MacOSServicesProvider {
    // Register services with the system
    func registerServices() {
        NSApplication.shared.servicesProvider = self
    }
    
    // Text processing service
    @objc func processSelectedText(_ pboard: NSPasteboard, userData: String, error: AutoreleasingUnsafeMutablePointer<NSString>) {
        guard let text = pboard.string(forType: .string) else { return }
        
        // Process with AI
        Task {
            do {
                let processedText = try await AIManager.shared.processText(text)
                
                // Return result via pasteboard
                pboard.clearContents()
                pboard.setString(processedText.content, forType: .string)
            } catch {
                error.pointee = error.localizedDescription as NSString
            }
        }
    }
    
    // Image analysis service
    @objc func analyzeSelectedImage(_ pboard: NSPasteboard, userData: String, error: AutoreleasingUnsafeMutablePointer<NSString>) {
        guard let image = NSImage(pasteboard: pboard) else { return }
        
        // Process with AI image analysis
        // ...
    }
}
```

### Focus Mode and System Status Integration

```swift
class SystemIntegrationManager {
    // Observe system focus modes
    func observeFocusModes() {
        // Register for focus mode changes when APIs are available
    }
    
    // Adapt app behavior based on focus mode
    func adaptToFocusMode(_ mode: FocusMode) {
        switch mode {
        case .work:
            // Adjust AI to focus on productivity
            AIManager.shared.setProfile(.productivity)
        case .personal:
            // Adjust AI to personal context
            AIManager.shared.setProfile(.creativity)
        default:
            // Default AI behavior
            AIManager.shared.setProfile(.balanced)
        }
    }
    
    // System resource monitoring
    func monitorSystemResources() {
        Timer.scheduledTimer(withTimeInterval: 30, repeats: true) { _ in
            self.checkAvailableResources()
        }
    }
    
    private func checkAvailableResources() {
        // Check CPU, memory, network status
        // Adjust AI processing accordingly
    }
}
```

## User Interface Patterns for AI Assistants

### Conversational UI Components

```swift
struct ConversationView: View {
    @EnvironmentObject var aiManager: AIManager
    @State private var messageText = ""
    @State private var messages: [Message] = []
    
    var body: some View {
        VStack {
            // Messages list
            ScrollViewReader { scrollView in
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 12) {
                        ForEach(messages) { message in
                            MessageRow(message: message)
                                .id(message.id)
                        }
                        
                        // Show streaming response if active
                        if aiManager.isStreaming {
                            MessageRow(message: Message(
                                id: UUID(),
                                content: aiManager.streamingContent,
                                isUser: false,
                                timestamp: Date()
                            ))
                            .id("streaming")
                        }
                    }
                    .padding()
                }
                .onChange(of: messages.count) { _ in
                    scrollToBottom(scrollView)
                }
                .onChange(of: aiManager.streamingContent) { _ in
                    scrollToBottom(scrollView)
                }
            }
            
            // Input area
            HStack {
                TextField("Ask me anything...", text: $messageText)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .frame(minHeight: 36)
                
                Button {
                    sendMessage()
                } label: {
                    Image(systemName: "paperplane.fill")
                }
                .disabled(messageText.isEmpty || aiManager.isProcessing)
            }
            .padding()
        }
    }
    
    private func sendMessage() {
        let userMessage = Message(
            id: UUID(),
            content: messageText,
            isUser: true,
            timestamp: Date()
        )
        messages.append(userMessage)
        
        let userContent = messageText
        messageText = ""
        
        // Process with AI and stream response
        aiManager.processTextWithStreaming(userContent)
        
        // Add final message when streaming completes
        Task {
            do {
                let response = try await aiManager.processText(userContent)
                messages.append(Message(
                    id: UUID(),
                    content: response.content,
                    isUser: false,
                    timestamp: Date()
                ))
            } catch {
                messages.append(Message(
                    id: UUID(),
                    content: "Sorry, I encountered an error: \(error.localizedDescription)",
                    isUser: false,
                    timestamp: Date()
                ))
            }
        }
    }
    
    private func scrollToBottom(_ scrollView: ScrollViewProxy) {
        if let lastID = messages.last?.id {
            withAnimation {
                scrollView.scrollTo(aiManager.isStreaming ? "streaming" : lastID, anchor: .bottom)
            }
        }
    }
}

struct MessageRow: View {
    let message: Message
    
    var body: some View {
        HStack {
            if message.isUser {
                Spacer()
            }
            
            VStack(alignment: message.isUser ? .trailing : .leading) {
                Text(message.content)
                    .padding()
                    .background(message.isUser ? Color.blue.opacity(0.2) : Color.gray.opacity(0.2))
                    .cornerRadius(12)
                
                Text(message.formattedTime)
                    .font(.caption2)
                    .foregroundColor(.secondary)
                    .padding(.horizontal, 4)
            }
            
            if !message.isUser {
                Spacer()
            }
        }
    }
}
```

### Inline Assistant in Documents

```swift
struct InlineAssistantView: View {
    @ObservedObject var documentEditor: DocumentEditor
    @EnvironmentObject var aiManager: AIManager
    @State private var isShowingAssistant = false
    @State private var assistantPrompt = ""
    
    var body: some View {
        VStack {
            // Document editing area
            TextEditor(text: $documentEditor.content)
                .font(.system(.body, design: .monospaced))
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            // Inline AI assistant (expandable)
            if isShowingAssistant {
                VStack {
                    // Assistant header
                    HStack {
                        Text("AI Assistant")
                            .font(.headline)
                        
                        Spacer()
                        
                        Button("Dismiss") {
                            withAnimation {
                                isShowingAssistant = false
                            }
                        }
                    }
                    .padding([.horizontal, .top])
                    
                    // Input area
                    HStack {
                        TextField("Ask about this document...", text: $assistantPrompt)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        
                        Button {
                            processDocumentRequest()
                        } label: {
                            Text("Ask")
                        }
                        .disabled(assistantPrompt.isEmpty || aiManager.isProcessing)
                    }
                    .padding()
                    
                    // Response area (shows when processing or has response)
                    if aiManager.isProcessing || !aiManager.streamingContent.isEmpty {
                        ScrollView {
                            Text(aiManager.streamingContent.isEmpty ? "Processing..." : aiManager.streamingContent)
                                .padding()
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .frame(height: 200)
                        .background(Color.gray.opacity(0.1))
                        .cornerRadius(8)
                        .padding(.horizontal)
                    }
                }
                .frame(height: 300)
                .background(Color(NSColor.windowBackgroundColor))
                .cornerRadius(12)
                .padding()
                .transition(.move(edge: .bottom))
            }
            
            // Button to show assistant
            if !isShowingAssistant {
                Button {
                    withAnimation {
                        isShowingAssistant = true
                    }
                } label: {
                    HStack {
                        Image(systemName: "sparkles")
                        Text("Ask AI Assistant")
                    }
                    .padding(8)
                    .background(Color.blue.opacity(0.2))
                    .cornerRadius(8)
                }
                .buttonStyle(PlainButtonStyle())
                .padding()
            }
        }
    }
    
    private func processDocumentRequest() {
        // Add document context to the prompt
        let documentContext = documentEditor.getSelectedTextOrAll()
        let fullPrompt = """
        Document context:
        \(documentContext)
        
        User question:
        \(assistantPrompt)
        """
        
        // Process with streaming response
        aiManager.processTextWithStreaming(fullPrompt)
        assistantPrompt = ""
    }
}
```

### Sidebar AI Assistant

```swift
struct SidebarAssistantView: View {
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var aiManager: AIManager
    @State private var suggestions: [Suggestion] = []
    
    var body: some View {
        VStack {
            // Top actions
            HStack {
                Text("AI Assistant")
                    .font(.headline)
                
                Spacer()
                
                Menu {
                    Button("New Conversation") {
                        appState.startNewConversation()
                    }
                    
                    Menu("AI Model") {
                        Button("Apple Intelligence") {
                            aiManager.currentProvider = .apple
                        }
                        
                        Button("Claude") {
                            aiManager.currentProvider = .anthropic
                        }
                        
                        Button("GPT-4o") {
                            aiManager.currentProvider = .openAI
                        }
                        
                        Button("Local Model") {
                            aiManager.currentProvider = .localModel
                        }
                    }
                } label: {
                    Image(systemName: "ellipsis.circle")
                }
            }
            .padding()
            
            // Context-aware suggestions
            if !suggestions.isEmpty {
                VStack(alignment: .leading) {
                    Text("Suggestions")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                    
                    ForEach(suggestions) { suggestion in
                        Button {
                            applySuggestion(suggestion)
                        } label: {
                            Text(suggestion.title)
                                .lineLimit(2)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .buttonStyle(SuggestionButtonStyle())
                    }
                }
                .padding(.horizontal)
            }
            
            Divider()
            
            // Conversation view
            ConversationView()
                .environmentObject(aiManager)
        }
        .frame(width: 320)
        .onAppear {
            generateSuggestions()
        }
        .onChange(of: appState.activeDocument) { _ in
            generateSuggestions()
        }
    }
    
    private func generateSuggestions() {
        Task {
            if let document = appState.activeDocument {
                // Generate document-specific suggestions
                do {
                    let contextSuggestions = try await aiManager.generateSuggestions(for: document.content)
                    suggestions = contextSuggestions.map { Suggestion(id: UUID(), title: $0) }
                } catch {
                    print("Failed to generate suggestions: \(error)")
                }
            } else {
                // Generate general suggestions
                suggestions = [
                    Suggestion(id: UUID(), title: "Summarize this document"),
                    Suggestion(id: UUID(), title: "Fix grammar and spelling"),
                    Suggestion(id: UUID(), title: "Generate code from description"),
                    Suggestion(id: UUID(), title: "Extract key points")
                ]
            }
        }
    }
    
    private func applySuggestion(_ suggestion: Suggestion) {
        // Apply the selected suggestion
        if let document = appState.activeDocument {
            let content = document.content
            aiManager.processTextWithStreaming("\(suggestion.title):\n\n\(content)")
        }
    }
}

struct SuggestionButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(8)
            .background(configuration.isPressed ? Color.blue.opacity(0.2) : Color.blue.opacity(0.1))
            .cornerRadius(8)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}
```

## Performance Optimization for AI Processing

### Neural Engine Utilization

```swift
class NeuralEngineOptimizer {
    // Configure ML models to use the Neural Engine effectively
    func configureModelForNeuralEngine(_ model: MLModel) -> MLModel? {
        let config = MLModelConfiguration()
        config.computeUnits = .all  // Use Neural Engine when available
        
        do {
            return try MLModel(contentsOf: model.modelURL, configuration: config)
        } catch {
            print("Failed to configure model for Neural Engine: \(error)")
            return nil
        }
    }
    
    // Optimize batch processing for Neural Engine
    func optimizeBatchSize(for modelType: String) -> Int {
        // Different models have different optimal batch sizes
        switch modelType {
        case "text":
            return 4
        case "image":
            return 1
        default:
            return 2
        }
    }
}
```

### Background Processing

```swift
class BackgroundTaskManager {
    private var backgroundTasks: [String: NSBackgroundActivityScheduler] = [:]
    
    // Schedule a background task for AI processing
    func scheduleBackgroundTask(identifier: String, interval: TimeInterval, task: @escaping () -> Void) {
        let scheduler = NSBackgroundActivityScheduler(identifier: "com.myapp.ai.\(identifier)")
        scheduler.repeats = true
        scheduler.interval = interval
        scheduler.tolerance = interval * 0.1
        
        scheduler.schedule { completion in
            task()
            completion(.finished)
        }
        
        backgroundTasks[identifier] = scheduler
    }
    
    // Cancel a background task
    func cancelBackgroundTask(identifier: String) {
        backgroundTasks[identifier]?.invalidate()
        backgroundTasks.removeValue(forKey: identifier)
    }
    
    // Handle app going to background
    func applicationDidEnterBackground() {
        // Pause non-essential tasks
        for (identifier, task) in backgroundTasks {
            if !identifier.contains("critical") {
                task.invalidate()
            }
        }
    }
    
    // Handle app coming to foreground
    func applicationWillEnterForeground() {
        // Resume tasks
        for (identifier, _) in backgroundTasks {
            if !backgroundTasks[identifier]!.isValid {
                scheduleBackgroundTask(identifier: identifier, interval: 30) { 
                    // Re-implement the task
                }
            }
        }
    }
}
```

### Resource-Aware Processing

```swift
class ResourceMonitor {
    // Monitor system resources
    private var cpuUsage: Double = 0
    private var memoryUsage: Double = 0
    private var thermalState: ProcessInfo.ThermalState = .nominal
    
    // Start monitoring
    func startMonitoring() {
        // Set up timer to check resources
        Timer.scheduledTimer(withTimeInterval: 5, repeats: true) { [weak self] _ in
            self?.updateResourceMetrics()
        }
        
        // Observe thermal state changes
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(thermalStateChanged),
            name: ProcessInfo.thermalStateDidChangeNotification,
            object: nil
        )
    }
    
    @objc private func thermalStateChanged() {
        thermalState = ProcessInfo.processInfo.thermalState
        adjustProcessingBasedOnResources()
    }
    
    private func updateResourceMetrics() {
        // Update CPU and memory usage metrics
        // (Implementation details omitted for brevity)
        
        adjustProcessingBasedOnResources()
    }
    
    private func adjustProcessingBasedOnResources() {
        // Adjust AI processing based on available resources
        let aiManager = AIManager.shared
        
        switch thermalState {
        case .nominal, .fair:
            // Full capability
            aiManager.setQualityLevel(.high)
        case .serious:
            // Reduce processing
            aiManager.setQualityLevel(.medium)
        case .critical:
            // Minimal processing
            aiManager.setQualityLevel(.low)
            aiManager.pauseNonEssentialTasks()
        @unknown default:
            aiManager.setQualityLevel(.medium)
        }
        
        // Adjust based on CPU/memory
        if cpuUsage > 80 || memoryUsage > 85 {
            aiManager.setQualityLevel(.low)
        }
    }
}
```

## Privacy and Security for AI Applications

### On-Device Processing Prioritization

```swift
class PrivacyManager {
    enum PrivacyLevel {
        case highestPrivacy    // On-device only
        case balanced          // Prefer on-device, use cloud when necessary
        case performanceFocused // Prefer cloud, use on-device for sensitive data
    }
    
    private var privacyLevel: PrivacyLevel = .balanced
    
    // Configure privacy level
    func setPrivacyLevel(_ level: PrivacyLevel) {
        privacyLevel = level
        applyPrivacySettings()
    }
    
    // Determine if content can be processed in cloud
    func canProcessInCloud(_ content: String, contentType: ContentType) -> Bool {
        switch privacyLevel {
        case .highestPrivacy:
            return false
        case .balanced:
            // Check for sensitive content
            if contentType == .sensitive || containsPersonalData(content) {
                return false
            }
            return true
        case .performanceFocused:
            // Only most sensitive data stays local
            return !containsHighlySensitiveData(content)
        }
    }
    
    // Sanitize content for cloud processing
    func sanitizeForCloudProcessing(_ content: String) -> String {
        var sanitized = content
        
        // Remove potential PII
        sanitized = redactEmailAddresses(sanitized)
        sanitized = redactPhoneNumbers(sanitized)
        sanitized = redactFinancialData(sanitized)
        
        return sanitized
    }
    
    // Apply privacy settings system-wide
    private func applyPrivacySettings() {
        let aiManager = AIManager.shared
        
        switch privacyLevel {
        case .highestPrivacy:
            aiManager.setDefaultProvider(.localModel)
        case .balanced:
            aiManager.setDefaultProvider(.apple) // Apple Intelligence prioritizes privacy
        case .performanceFocused:
            aiManager.setDefaultProvider(.anthropic) // Or another cloud provider
        }
    }
    
    // Helper methods to detect sensitive content
    private func containsPersonalData(_ content: String) -> Bool {
        // Check for emails, phone numbers, addresses, etc.
        // Implementation details omitted
        return false
    }
    
    private func containsHighlySensitiveData(_ content: String) -> Bool {
        // Check for financial data, health information, etc.
        // Implementation details omitted
        return false
    }
    
    // Redaction methods
    private func redactEmailAddresses(_ text: String) -> String {
        // Use regex to find and redact email addresses
        // Implementation details omitted
        return text
    }
    
    private func redactPhoneNumbers(_ text: String) -> String {
        // Implementation details omitted
        return text
    }
    
    private func redactFinancialData(_ text: String) -> String {
        // Implementation details omitted
        return text
    }
}
```

### Secure Storage for AI Context

```swift
class SecureContextStorage {
    // Store conversation context securely
    func storeConversation(_ conversation: Conversation) throws {
        // Encrypt conversation data
        guard let encryptedData = encryptData(try JSONEncoder().encode(conversation)) else {
            throw StorageError.encryptionFailed
        }
        
        // Store with secure bookmarks
        let fileURL = getSecureStorageURL().appendingPathComponent("\(conversation.id).enc")
        try encryptedData.write(to: fileURL)
    }
    
    // Retrieve conversation context securely
    func retrieveConversation(id: UUID) throws -> Conversation {
        let fileURL = getSecureStorageURL().appendingPathComponent("\(id).enc")
        
        // Read encrypted data
        let encryptedData = try Data(contentsOf: fileURL)
        
        // Decrypt data
        guard let decryptedData = decryptData(encryptedData) else {
            throw StorageError.decryptionFailed
        }
        
        // Decode conversation
        return try JSONDecoder().decode(Conversation.self, from: decryptedData)
    }
    
    // Delete conversation securely
    func deleteConversation(id: UUID) throws {
        let fileURL = getSecureStorageURL().appendingPathComponent("\(id).enc")
        try FileManager.default.removeItem(at: fileURL)
    }
    
    // Get secure storage location
    private func getSecureStorageURL() -> URL {
        let appSupportURL = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        let storageURL = appSupportURL.appendingPathComponent("SecureStorage", isDirectory: true)
        
        // Create directory if it doesn't exist
        if !FileManager.default.fileExists(atPath: storageURL.path) {
            try? FileManager.default.createDirectory(at: storageURL, withIntermediateDirectories: true)
        }
        
        return storageURL
    }
    
    // Encryption and decryption methods
    private func encryptData(_ data: Data) -> Data? {
        // Use CommonCrypto or CryptoKit for encryption
        // Implementation details omitted
        return data // Placeholder
    }
    
    private func decryptData(_ data: Data) -> Data? {
        // Use CommonCrypto or CryptoKit for decryption
        // Implementation details omitted
        return data // Placeholder
    }
}
```

### Privacy Manifests Implementation

```swift
/*
Example privacy manifest JSON:

{
  "NSPrivacyAccessedAPITypes": [
    {
      "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults",
      "NSPrivacyAccessedAPITypeReasons": ["CA92.1"]
    },
    {
      "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryFileTimestamp",
      "NSPrivacyAccessedAPITypeReasons": ["2B0D1.1"]
    }
  ],
  "NSPrivacyTracking": false,
  "NSPrivacyTrackingDomains": [],
  "NSPrivacyCollectedDataTypes": [
    {
      "NSPrivacyCollectedDataType": "NSPrivacyCollectedDataTypeOtherDataTypes",
      "NSPrivacyCollectedDataTypeLinked": false,
      "NSPrivacyCollectedDataTypeTracking": false,
      "NSPrivacyCollectedDataTypePurposes": ["CA92.1"]
    }
  ]
}
*/

// Implementation in code
func setupPrivacyManifest() {
    // Privacy manifest is included in the app bundle
    // Make sure app behavior conforms to manifest declarations
    
    // Example: Ensure proper permission requests
    func requestMicrophoneAccessWithProperPurposeString() {
        // Include proper purpose string in Info.plist
        // NSMicrophoneUsageDescription: "Audio is processed on-device to provide voice command capabilities"
        
        let audioSession = AVAudioSession.sharedInstance()
        try? audioSession.setCategory(.record, mode: .default)
        
        audioSession.requestRecordPermission { granted in
            if granted {
                // Handle microphone access granted
            } else {
                // Handle microphone access denied
            }
        }
    }
}
```

## macOS-Specific Capabilities

### Menu Bar Integration

```swift
class MenuBarManager: NSObject {
    private var statusItem: NSStatusItem?
    private var menu: NSMenu?
    
    func setupMenuBar() {
        // Create status item in menu bar
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        
        if let button = statusItem?.button {
            button.image = NSImage(systemSymbolName: "sparkles", accessibilityDescription: "AI Assistant")
        }
        
        // Create menu
        menu = NSMenu()
        
        // Add menu items
        menu?.addItem(NSMenuItem(title: "Ask AI Assistant", action: #selector(openAIAssistant), keyEquivalent: "a"))
        menu?.addItem(NSMenuItem.separator())
        menu?.addItem(NSMenuItem(title: "Process Selected Text", action: #selector(processSelectedText), keyEquivalent: "p"))
        menu?.addItem(NSMenuItem(title: "Summarize Clipboard", action: #selector(summarizeClipboard), keyEquivalent: "s"))
        menu?.addItem(NSMenuItem.separator())
        
        // Add submenu for AI models
        let modelsMenu = NSMenu()
        modelsMenu.addItem(NSMenuItem(title: "Apple Intelligence", action: #selector(selectAppleIntelligence), keyEquivalent: ""))
        modelsMenu.addItem(NSMenuItem(title: "Claude", action: #selector(selectClaude), keyEquivalent: ""))
        modelsMenu.addItem(NSMenuItem(title: "GPT-4o", action: #selector(selectGPT4), keyEquivalent: ""))
        modelsMenu.addItem(NSMenuItem(title: "Local Model", action: #selector(selectLocalModel), keyEquivalent: ""))
        
        let modelsItem = NSMenuItem(title: "AI Model", action: nil, keyEquivalent: "")
        modelsItem.submenu = modelsMenu
        menu?.addItem(modelsItem)
        
        menu?.addItem(NSMenuItem.separator())
        menu?.addItem(NSMenuItem(title: "Preferences...", action: #selector(openPreferences), keyEquivalent: ","))
        menu?.addItem(NSMenuItem(title: "Quit", action: #selector(quitApp), keyEquivalent: "q"))
        
        // Set the menu
        statusItem?.menu = menu
    }
    
    // Action methods
    @objc private func openAIAssistant() {
        // Open assistant window or sidebar
        NSApplication.shared.activate(ignoringOtherApps: true)
        NotificationCenter.default.post(name: NSNotification.Name("OpenAIAssistant"), object: nil)
    }
    
    @objc private func processSelectedText() {
        // Get selected text from current application
        if let selectedText = getSelectedTextFromFrontmostApp() {
            // Process with AI
            AIManager.shared.processTextWithStreaming(selectedText)
            // Show results in a popup or notification
            showAIResultsPopover()
        }
    }
    
    @objc private func summarizeClipboard() {
        // Get clipboard contents
        if let clipboardText = NSPasteboard.general.string(forType: .string) {
            // Process with AI
            Task {
                do {
                    let summary = try await AIManager.shared.processText("Summarize this text:\n\(clipboardText)")
                    // Show summary in a notification
                    showNotification(title: "Clipboard Summary", body: summary.content)
                } catch {
                    showNotification(title: "Error", body: "Failed to summarize clipboard contents")
                }
            }
        }
    }
    
    // AI model selection
    @objc private func selectAppleIntelligence() {
        AIManager.shared.currentProvider = .apple
    }
    
    @objc private func selectClaude() {
        AIManager.shared.currentProvider = .anthropic
    }
    
    @objc private func selectGPT4() {
        AIManager.shared.currentProvider = .openAI
    }
    
    @objc private func selectLocalModel() {
        AIManager.shared.currentProvider = .localModel
    }
    
    @objc private func openPreferences() {
        NSApplication.shared.activate(ignoringOtherApps: true)
        NotificationCenter.default.post(name: NSNotification.Name("OpenPreferences"), object: nil)
    }
    
    @objc private func quitApp() {
        NSApplication.shared.terminate(nil)
    }
    
    // Helper methods
    private func getSelectedTextFromFrontmostApp() -> String? {
        // Use Accessibility API or AppleScript to get selected text
        // Implementation details omitted
        return nil // Placeholder
    }
    
    private func showAIResultsPopover() {
        // Show results in a popover
        // Implementation details omitted
    }
    
    private func showNotification(title: String, body: String) {
        let notification = NSUserNotification()
        notification.title = title
        notification.informativeText = body
        NSUserNotificationCenter.default.deliver(notification)
    }
}
```

### Dock Icon and Badging

```swift
class DockManager {
    // Update dock icon with badge
    func updateDockBadge(count: Int) {
        if count > 0 {
            NSApplication.shared.dockTile.badgeLabel = "\(count)"
        } else {
            NSApplication.shared.dockTile.badgeLabel = nil
        }
    }
    
    // Add custom menu items to dock menu
    func setupDockMenu() -> NSMenu {
        let menu = NSMenu()
        
        menu.addItem(NSMenuItem(title: "New AI Conversation", action: #selector(AppDelegate.newAIConversation), keyEquivalent: ""))
        menu.addItem(NSMenuItem(title: "Process Clipboard", action: #selector(AppDelegate.processClipboard), keyEquivalent: ""))
        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Recent Conversations", action: nil, keyEquivalent: ""))
        
        // Add recent conversations submenu
        addRecentConversationsToMenu(menu)
        
        return menu
    }
    
    private func addRecentConversationsToMenu(_ menu: NSMenu) {
        // Get recent conversations
        let conversations = AppState.shared.conversations.prefix(5)
        
        // Add menu items for each conversation
        for conversation in conversations {
            let title = conversation.title ?? "Conversation \(conversation.id.uuidString.prefix(8))"
            let item = NSMenuItem(title: title, action: #selector(AppDelegate.openConversation(_:)), keyEquivalent: "")
            item.representedObject = conversation.id
            menu.addItem(item)
        }
    }
    
    // Update dock tile progress indicator
    func updateDockProgress(_ progress: Double) {
        if progress > 0 && progress < 1 {
            let progressIndicator = NSProgressIndicator()
            progressIndicator.minValue = 0
            progressIndicator.maxValue = 1
            progressIndicator.doubleValue = progress
            progressIndicator.isIndeterminate = false
            progressIndicator.style = .bar
            
            // Add to dock tile
            // Implementation details omitted
        } else {
            // Remove progress indicator
            NSApplication.shared.dockTile.contentView = nil
        }
        
        NSApplication.shared.dockTile.display()
    }
}
```

### Touch Bar Integration

```swift
class TouchBarManager: NSObject, NSTouchBarDelegate {
    // Touch bar identifiers
    private let touchBarIdentifier = NSTouchBarItem.Identifier("com.myapp.touchbar.main")
    private let aiButtonIdentifier = NSTouchBarItem.Identifier("com.myapp.touchbar.ai")
    private let suggestionIdentifier = NSTouchBarItem.Identifier("com.myapp.touchbar.suggestions")
    
    // Create touch bar
    func makeTouchBar() -> NSTouchBar? {
        let touchBar = NSTouchBar()
        touchBar.delegate = self
        touchBar.defaultItemIdentifiers = [aiButtonIdentifier, suggestionIdentifier]
        return touchBar
    }
    
    // Touch bar delegate method
    func touchBar(_ touchBar: NSTouchBar, makeItemForIdentifier identifier: NSTouchBarItem.Identifier) -> NSTouchBarItem? {
        switch identifier {
        case aiButtonIdentifier:
            // AI assistant button
            let button = NSButtonTouchBarItem(identifier: identifier, title: "AI Assistant", target: self, action: #selector(activateAIAssistant))
            button.customizationLabel = "AI Assistant"
            return button
            
        case suggestionIdentifier:
            // AI suggestions
            let suggestions = getSuggestions()
            let item = NSPopoverTouchBarItem(identifier: identifier)
            item.customizationLabel = "Suggestions"
            item.collapsedRepresentationLabel = "AI"
            
            // Create suggestions touch bar
            let suggestionsTouchBar = NSTouchBar()
            suggestionsTouchBar.defaultItemIdentifiers = suggestions.map { NSTouchBarItem.Identifier($0.id.uuidString) }
            
            item.popoverTouchBar = suggestionsTouchBar
            return item
            
        default:
            // Create suggestion buttons
            if let suggestion = getSuggestions().first(where: { NSTouchBarItem.Identifier($0.id.uuidString) == identifier }) {
                let button = NSButtonTouchBarItem(identifier: identifier, title: suggestion.title, target: self, action: #selector(suggestionTapped(_:)))
                button.representedObject = suggestion
                return button
            }
            
            return nil
        }
    }
    
    // Get AI suggestions
    private func getSuggestions() -> [Suggestion] {
        return AppState.shared.suggestions
    }
    
    // Action methods
    @objc private func activateAIAssistant() {
        // Activate AI assistant
        NotificationCenter.default.post(name: NSNotification.Name("OpenAIAssistant"), object: nil)
    }
    
    @objc private func suggestionTapped(_ sender: NSButtonTouchBarItem) {
        if let suggestion = sender.representedObject as? Suggestion {
            // Apply suggestion
            AIManager.shared.processTextWithStreaming(suggestion.title)
            
            // Show results
            NotificationCenter.default.post(name: NSNotification.Name("ShowAIResults"), object: nil)
        }
    }
}
```

## Testing AI-Driven Applications

### Testing for AI Consistency

```swift
class AIResponseTester: XCTestCase {
    var aiManager: AIManager!
    
    override func setUp() {
        super.setUp()
        aiManager = AIManager(configuration: .testing)
    }
    
    func testBasicResponseConsistency() async throws {
        // Define test prompts
        let prompts = [
            "Summarize this paragraph: The quick brown fox jumps over the lazy dog.",
            "Write a short poem about technology.",
            "Translate 'Hello, how are you?' to French."
        ]
        
        // Test multiple runs for consistency
        for prompt in prompts {
            let responses = try await runConsistencyTest(prompt: prompt, runs: 3)
            XCTAssertTrue(responsesAreConsistent(responses), "AI responses should be semantically consistent for prompt: \(prompt)")
        }
    }
    
    func testErrorHandling() async {
        // Test with invalid or problematic inputs
        let problematicInputs = [
            "", // Empty string
            String(repeating: "a", count: 10000), // Very long input
            "🤖👾👽🛸" // Only emojis
        ]
        
        for input in problematicInputs {
            do {
                _ = try await aiManager.processText(input)
                // Should either get a valid response or throw an error
            } catch {
                // Error is expected for some inputs
                XCTAssertTrue(error is AIError, "Should throw AIError for problematic input")
            }
        }
    }
    
    // Helper method to run multiple tests and collect responses
    private func runConsistencyTest(prompt: String, runs: Int) async throws -> [String] {
        var responses: [String] = []
        
        for _ in 0..<runs {
            let response = try await aiManager.processText(prompt)
            responses.append(response.content)
        }
        
        return responses
    }
    
    // Helper method to check if responses are semantically consistent
    private func responsesAreConsistent(_ responses: [String]) -> Bool {
        // Could use NLP techniques to check semantic similarity
        // Simple implementation might check for common keywords or length similarity
        
        // Example implementation
        let lengths = responses.map { $0.count }
        let averageLength = lengths.reduce(0, +) / lengths.count
        
        // Check if lengths are within 20% of average
        let allLengthsConsistent = lengths.allSatisfy { abs($0 - averageLength) < (averageLength * 0.2) }
        
        return allLengthsConsistent
    }
}
```

### UI Testing for AI Interactions

```swift
class AIAssistantUITests: XCTestCase {
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        app = XCUIApplication()
        app.launchArguments = ["--uitesting"]
        app.launch()
    }
    
    func testConversationFlow() {
        // Open AI assistant
        app.buttons["AI Assistant"].tap()
        
        // Enter test prompt
        let textField = app.textFields["Ask me anything..."]
        XCTAssertTrue(textField.exists, "Input field should exist")
        
        textField.tap()
        textField.typeText("Write a short greeting")
        
        // Send message
        app.buttons["Send"].tap()
        
        // Wait for response
        let expectation = XCTestExpectation(description: "Wait for AI response")
        
        // Check for response
        DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
            // Verify response exists
            let responseElements = self.app.staticTexts.matching(NSPredicate(format: "NOT label BEGINSWITH 'Write a short greeting'"))
            XCTAssertGreaterThan(responseElements.count, 0, "Should have at least one response message")
            
            expectation.fulfill()
        }
        
        wait(for: [expectation], timeout: 10)
    }
    
    func testSidebarSuggestions() {
        // Open document
        app.menuItems["Open..."].tap()
        
        // Select test document
        // (Document selection implementation omitted)
        
        // Check for suggestions in sidebar
        let sidebar = app.groups["AI Sidebar"]
        XCTAssertTrue(sidebar.exists, "AI sidebar should exist")
        
        // Verify suggestions appear
        let expectation = XCTestExpectation(description: "Wait for suggestions")
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            let suggestions = sidebar.buttons.matching(NSPredicate(format: "identifier BEGINSWITH 'suggestion'"))
            XCTAssertGreaterThan(suggestions.count, 0, "Should have suggestions in sidebar")
            
            // Test tapping a suggestion
            suggestions.element(boundBy: 0).tap()
            
            // Verify response appears
            DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
                let responseElement = sidebar.staticTexts["aiResponse"]
                XCTAssertTrue(responseElement.exists, "Response should appear after tapping suggestion")
                
                expectation.fulfill()
            }
        }
        
        wait(for: [expectation], timeout: 15)
    }
}
```

### Performance Testing

```swift
class AIPerformanceTesting: XCTestCase {
    var aiManager: AIManager!
    
    override func setUp() {
        super.setUp()
        aiManager = AIManager(configuration: .performance)
    }
    
    func testResponseLatency() async throws {
        // Test prompts of different complexity
        let prompts = [
            "Hello", // Simple
            "Write a paragraph about climate change", // Medium
            "Explain quantum computing principles in detail" // Complex
        ]
        
        for prompt in prompts {
            // Measure latency
            let start = Date()
            _ = try await aiManager.processText(prompt)
            let duration = Date().timeIntervalSince(start)
            
            // Log performance
            print("Prompt complexity: \(prompt.count) chars, Response time: \(duration) seconds")
            
            // Check against baseline
            let complexityFactor = Double(prompt.count) / 100.0
            let baselineLatency = 0.5 + (complexityFactor * 0.2) // Simplified baseline
            
            // Allow for some variation
            XCTAssertLessThanOrEqual(duration, baselineLatency * 1.5, "Response latency should be within acceptable range")
        }
    }
    
    func testMemoryUsage() async throws {
        let initialMemory = getMemoryUsage()
        
        // Process multiple prompts
        for i in 1...10 {
            let prompt = "Generate a response to question \(i): What are the benefits of AI assistants?"
            _ = try await aiManager.processText(prompt)
        }
        
        let finalMemory = getMemoryUsage()
        let memoryIncrease = finalMemory - initialMemory
        
        // Log memory usage
        print("Initial memory: \(initialMemory) MB, Final memory: \(finalMemory) MB, Increase: \(memoryIncrease) MB")
        
        // Check memory leak
        XCTAssertLessThan(memoryIncrease, 100.0, "Memory increase should be less than 100 MB after 10 prompts")
    }
    
    func testStreamingPerformance() async {
        // Test streaming performance
        let longPrompt = "Write a detailed essay about the history of computing and artificial intelligence."
        
        let expectation = XCTestExpectation(description: "Streaming completion")
        var chunkCount = 0
        var totalSize = 0
        
        // Start streaming
        aiManager.streamTextWithCallback(longPrompt) { chunk in
            chunkCount += 1
            totalSize += chunk.count
            
            // If streaming complete
            if chunk.contains("THE END") {
                expectation.fulfill()
            }
        }
        
        // Wait for streaming to complete
        wait(for: [expectation], timeout: 30)
        
        // Log statistics
        print("Received \(chunkCount) chunks with total size \(totalSize) bytes")
        
        // Check streaming metrics
        XCTAssertGreaterThan(chunkCount, 5, "Should receive multiple chunks")
        XCTAssertGreaterThan(totalSize, 1000, "Total response should be substantial")
    }
    
    // Helper to get memory usage
    private func getMemoryUsage() -> Double {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4
        
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
            }
        }
        
        if kerr == KERN_SUCCESS {
            return Double(info.resident_size) / (1024 * 1024) // Convert to MB
        } else {
            return 0
        }
    }
}
```

## Deployment and Continuous Improvement

### Telemetry and Analytics

```swift
class AITelemetry {
    // Analytics categories
    enum EventCategory {
        case interaction
        case performance
        case error
        case usage
    }
    
    // Log an analytics event
    func logEvent(category: EventCategory, name: String, parameters: [String: Any]? = nil) {
        // Only collect if user has opted in
        guard UserDefaults.standard.bool(forKey: "analyticsOptIn") else {
            return
        }
        
        // Create event data
        var eventData: [String: Any] = [
            "category": categoryString(category),
            "name": name,
            "timestamp": Date().timeIntervalSince1970
        ]
        
        // Add optional parameters
        if let parameters = parameters {
            for (key, value) in parameters {
                eventData[key] = value
            }
        }
        
        // Send analytics
        sendAnalyticsData(eventData)
    }
    
    // Log AI interaction metrics
    func logAIInteraction(promptLength: Int, responseLength: Int, duration: TimeInterval, provider: String) {
        logEvent(
            category: .interaction,
            name: "ai_response",
            parameters: [
                "prompt_length": promptLength,
                "response_length": responseLength,
                "duration_ms": Int(duration * 1000),
                "provider": provider
            ]
        )
    }
    
    // Log performance metrics
    func logPerformanceMetrics(memoryUsage: Double, cpuUsage: Double, responseTime: TimeInterval) {
        logEvent(
            category: .performance,
            name: "ai_performance",
            parameters: [
                "memory_mb": memoryUsage,
                "cpu_percent": cpuUsage,
                "response_time_ms": Int(responseTime * 1000)
            ]
        )
    }
    
    // Log errors
    func logError(code: String, message: String, context: [String: Any]? = nil) {
        var parameters: [String: Any] = [
            "error_code": code,
            "error_message": message
        ]
        
        // Add context if available
        if let context = context {
            parameters["context"] = context
        }
        
        logEvent(category: .error, name: "ai_error", parameters: parameters)
    }
    
    // Convert category to string
    private func categoryString(_ category: EventCategory) -> String {
        switch category {
        case .interaction: return "interaction"
        case .performance: return "performance"
        case .error: return "error"
        case .usage: return "usage"
        }
    }
    
    // Send analytics data to server
    private func sendAnalyticsData(_ data: [String: Any]) {
        // Implementation for sending analytics
        // Could use URLSession to post to analytics endpoint
        // Or use a third-party analytics SDK
        
        // For this example, just log to console
        print("Analytics: \(data)")
    }
}
```

### Feature Flagging System

```swift
class FeatureFlagManager {
    // Singleton instance
    static let shared = FeatureFlagManager()
    
    // Feature flags
    private var flags: [String: Bool] = [:]
    
    // User tiers
    enum UserTier {
        case free
        case pro
        case enterprise
    }
    
    // Initialize with default flags
    private init() {
        // Local default flags
        flags = [
            "advanced_ai_models": false,
            "multiple_providers": false,
            "sidebar_assistant": true,
            "document_analysis": true,
            "code_generation": false,
            "image_generation": false
        ]
        
        // Load remote flags
        Task {
            await loadRemoteFlags()
        }
    }
    
    // Check if feature is enabled
    func isEnabled(_ featureKey: String) -> Bool {
        return flags[featureKey] ?? false
    }
    
    // Check if feature is enabled for user tier
    func isEnabled(_ featureKey: String, for userTier: UserTier) -> Bool {
        // Basic feature availability by tier
        let featureAvailableForTier: Bool
        
        switch (featureKey, userTier) {
        case (_, .enterprise):
            // Enterprise tier has all features
            featureAvailableForTier = true
            
        case ("advanced_ai_models", .pro),
             ("multiple_providers", .pro),
             ("code_generation", .pro):
            // Pro features
            featureAvailableForTier = true
            
        case ("sidebar_assistant", _),
             ("document_analysis", _):
            // Features for all tiers
            featureAvailableForTier = true
            
        default:
            // Not available for this tier
            featureAvailableForTier = false
        }
        
        // Check if the feature is globally enabled
        return featureAvailableForTier && isEnabled(featureKey)
    }
    
    // Override feature flag (e.g., for testing)
    func setFeatureEnabled(_ featureKey: String, enabled: Bool) {
        flags[featureKey] = enabled
    }
    
    // Load remote flags from server
    private func loadRemoteFlags() async {
        // Implementation for loading flags from remote server
        // Could use URLSession to fetch from API
        
        do {
            if let url = URL(string: "https://api.myapp.com/feature-flags") {
                let (data, _) = try await URLSession.shared.data(from: url)
                if let remoteFlags = try JSONSerialization.jsonObject(with: data) as? [String: Bool] {
                    // Update flags with remote values
                    for (key, value) in remoteFlags {
                        flags[key] = value
                    }
                }
            }
        } catch {
            print("Failed to load remote flags: \(error)")
        }
    }
}
```

### A/B Testing Framework

```swift
class ABTestingManager {
    // Singleton instance
    static let shared = ABTestingManager()
    
    // Available tests
    enum Test: String {
        case aiModelVariant = "ai_model_variant"
        case uiLayout = "ui_layout"
        case responseStyle = "response_style"
        case suggestionCount = "suggestion_count"
    }
    
    // Test variants
    enum Variant: String {
        // AI Model variants
        case modelDefault = "model_default"
        case modelEnhanced = "model_enhanced"
        
        // UI Layout variants
        case layoutSidebar = "layout_sidebar"
        case layoutFloating = "layout_floating"
        
        // Response Style variants
        case styleConcise = "style_concise"
        case styleDetailed = "style_detailed"
        
        // Suggestion Count variants
        case suggestionsThree = "suggestions_three"
        case suggestionsFive = "suggestions_five"
    }
    
    // User's assigned variants
    private var assignedVariants: [Test: Variant] = [:]
    
    // Initialize with random assignments
    private init() {
        // Assign variants for each test
        assignVariants()
        
        // Log assigned variants for analytics
        logAssignedVariants()
    }
    
    // Get the assigned variant for a test
    func getVariant(for test: Test) -> Variant {
        return assignedVariants[test] ?? defaultVariant(for: test)
    }
    
    // Check if a specific variant is assigned
    func isVariant(_ variant: Variant, for test: Test) -> Bool {
        return getVariant(for: test) == variant
    }
    
    // Log test exposure
    func logExposure(test: Test) {
        let variant = getVariant(for: test)
        
        // Log exposure to analytics
        AITelemetry().logEvent(
            category: .usage,
            name: "ab_test_exposure",
            parameters: [
                "test": test.rawValue,
                "variant": variant.rawValue
            ]
        )
    }
    
    // Log test outcome
    func logOutcome(test: Test, outcome: String, value: Any) {
        let variant = getVariant(for: test)
        
        // Log outcome to analytics
        AITelemetry().logEvent(
            category: .usage,
            name: "ab_test_outcome",
            parameters: [
                "test": test.rawValue,
                "variant": variant.rawValue,
                "outcome": outcome,
                "value": value
            ]
        )
    }
    
    // Get default variant for a test
    private func defaultVariant(for test: Test) -> Variant {
        switch test {
        case .aiModelVariant: return .modelDefault
        case .uiLayout: return .layoutSidebar
        case .responseStyle: return .styleConcise
        case .suggestionCount: return .suggestionsThree
        }
    }
    
    // Assign variants for each test
    private func assignVariants() {
        // Deterministic assignment based on user ID
        let userId = UserDefaults.standard.string(forKey: "userId") ?? UUID().uuidString
        
        // Save user ID if it was just generated
        if UserDefaults.standard.string(forKey: "userId") == nil {
            UserDefaults.standard.set(userId, forKey: "userId")
        }
        
        // Use hash of user ID to make consistent assignments
        let hash = userId.hashValue
        
        // Assign variants based on the hash
        assignedVariants[.aiModelVariant] = hash % 2 == 0 ? .modelDefault : .modelEnhanced
        assignedVariants[.uiLayout] = hash % 3 == 0 ? .layoutFloating : .layoutSidebar
        assignedVariants[.responseStyle] = hash % 2 == 0 ? .styleConcise : .styleDetailed
        assignedVariants[.suggestionCount] = hash % 4 == 0 ? .suggestionsFive : .suggestionsThree
    }
    
    // Log assigned variants
    private func logAssignedVariants() {
        var parameters: [String: String] = [:]
        
        for (test, variant) in assignedVariants {
            parameters[test.rawValue] = variant.rawValue
        }
        
        // Log to analytics
        AITelemetry().logEvent(
            category: .usage,
            name: "ab_test_assignment",
            parameters: parameters
        )
    }
}
```

### Feedback Collection System

```swift
class FeedbackManager {
    // Feedback types
    enum FeedbackType {
        case thumbsUp
        case thumbsDown
        case detailed
        case suggestion
    }
    
    // Submit user feedback
    func submitFeedback(type: FeedbackType, message: String?, context: [String: Any]?) {
        // Create feedback object
        var feedback: [String: Any] = [
            "type": feedbackTypeString(type),
            "timestamp": Date().timeIntervalSince1970
        ]
        
        // Add message if provided
        if let message = message {
            feedback["message"] = message
        }
        
        // Add context if provided
        if let context = context {
            feedback["context"] = context
        }
        
        // Send feedback to server
        sendFeedback(feedback)
        
        // Log for analytics
        AITelemetry().logEvent(
            category: .interaction,
            name: "user_feedback",
            parameters: feedback
        )
    }
    
    // Submit feedback for AI response
    func submitResponseFeedback(responseId: String, wasHelpful: Bool, message: String?) {
        submitFeedback(
            type: wasHelpful ? .thumbsUp : .thumbsDown,
            message: message,
            context: ["response_id": responseId]
        )
    }
    
    // Show feedback prompt
    func showFeedbackPrompt(for responseId: String, in viewController: NSViewController) {
        // Create feedback alert
        let alert = NSAlert()
        alert.messageText = "Was this AI response helpful?"
        alert.informativeText = "Your feedback helps us improve the AI assistant."
        
        // Add buttons
        alert.addButton(withTitle: "Helpful")
        alert.addButton(withTitle: "Not Helpful")
        alert.addButton(withTitle: "Cancel")
        
        // Add text field for comments
        let textField = NSTextField(frame: NSRect(x: 0, y: 0, width: 300, height: 100))
        textField.placeholderString = "Optional comments..."
        alert.accessoryView = textField
        
        // Show alert and handle response
        alert.beginSheetModal(for: viewController.view.window!) { response in
            switch response {
            case .alertFirstButtonReturn: // Helpful
                self.submitResponseFeedback(responseId: responseId, wasHelpful: true, message: textField.stringValue)
                
            case .alertSecondButtonReturn: // Not Helpful
                self.submitResponseFeedback(responseId: responseId, wasHelpful: false, message: textField.stringValue)
                
            default:
                break // Cancelled
            }
        }
    }
    
    // Convert feedback type to string
    private func feedbackTypeString(_ type: FeedbackType) -> String {
        switch type {
        case .thumbsUp: return "thumbs_up"
        case .thumbsDown: return "thumbs_down"
        case .detailed: return "detailed"
        case .suggestion: return "suggestion"
        }
    }
    
    // Send feedback to server
    private func sendFeedback(_ feedback: [String: Any]) {
        // Implementation for sending feedback to server
        // Could use URLSession to post to feedback API
        
        // For this example, just log to console
        print("Feedback: \(feedback)")
    }
}
```

## Example: Building a Basic Agentic Assistant

Let's implement a simple but functional agentic assistant for macOS that can analyze text and provide intelligent responses.

### 1. Basic Project Setup

```swift
// AppDelegate.swift
import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {
    // Core services
    private var aiManager: AIManager!
    private var menuBarManager: MenuBarManager!
    private var documentManager: DocumentManager!
    
    // Windows
    private var mainWindow: NSWindow?
    private var assistantWindow: NSWindow?
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        // Initialize services
        aiManager = AIManager(configuration: .default)
        menuBarManager = MenuBarManager()
        documentManager = DocumentManager()
        
        // Set up menu bar
        menuBarManager.setupMenuBar()
        
        // Create main window
        createMainWindow()
        
        // Set up observers
        setupNotificationObservers()
    }
    
    private func createMainWindow() {
        // Create window
        let window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 800, height: 600),
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        window.title = "AI Assistant"
        window.center()
        
        // Create document view
        let documentView = DocumentView()
        window.contentView = NSHostingView(rootView: documentView)
        
        // Show window
        window.makeKeyAndOrderFront(nil)
        mainWindow = window
    }
    
    private func setupNotificationObservers() {
        // Observe notifications
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(openAIAssistant),
            name: NSNotification.Name("OpenAIAssistant"),
            object: nil
        )
    }
    
    @objc func openAIAssistant() {
        // Create assistant window if needed
        if assistantWindow == nil {
            let window = NSWindow(
                contentRect: NSRect(x: 0, y: 0, width: 320, height: 600),
                styleMask: [.titled, .closable, .miniaturizable, .resizable],
                backing: .buffered,
                defer: false
            )
            window.title = "AI Assistant"
            
            // Create assistant view
            let assistantView = SidebarAssistantView()
                .environmentObject(aiManager)
            window.contentView = NSHostingView(rootView: assistantView)
            
            // Position window next to main window
            if let mainFrame = mainWindow?.frame {
                let assistantFrame = NSRect(
                    x: mainFrame.maxX + 10,
                    y: mainFrame.minY,
                    width: 320,
                    height: mainFrame.height
                )
                window.setFrame(assistantFrame, display: true)
            }
            
            assistantWindow = window
        }
        
        // Show window
        assistantWindow?.makeKeyAndOrderFront(nil)
    }
    
    @objc func newAIConversation() {
        // Start new conversation
        aiManager.startNewConversation()
        
        // Open assistant window
        openAIAssistant()
    }
    
    @objc func processClipboard() {
        // Get clipboard contents
        if let text = NSPasteboard.general.string(forType: .string) {
            // Process with AI
            aiManager.processTextWithStreaming(text)
            
            // Open assistant to show results
            openAIAssistant()
        }
    }
    
    @objc func openConversation(_ sender: NSMenuItem) {
        // Get conversation ID
        if let conversationId = sender.representedObject as? UUID {
            // Open conversation
            aiManager.loadConversation(id: conversationId)
            
            // Open assistant window
            openAIAssistant()
        }
    }
}
```

### 2. Document Processing View

```swift
// DocumentView.swift
import SwiftUI

struct DocumentView: View {
    @StateObject private var viewModel = DocumentViewModel()
    @EnvironmentObject var aiManager: AIManager
    
    @State private var isShowingAIPanel = false
    
    var body: some View {
        HSplitView {
            // Document editor
            VStack {
                // Toolbar
                HStack {
                    Button(action: viewModel.newDocument) {
                        Image(systemName: "doc")
                    }
                    .help("New Document")
                    
                    Button(action: viewModel.openDocument) {
                        Image(systemName: "folder")
                    }
                    .help("Open Document")
                    
                    Button(action: viewModel.saveDocument) {
                        Image(systemName: "arrow.down.doc")
                    }
                    .help("Save Document")
                    
                    Spacer()
                    
                    Button(action: { isShowingAIPanel.toggle() }) {
                        Label("AI Assistant", systemImage: "sparkles")
                    }
                    .help("Toggle AI Assistant")
                }
                .padding()
                
                // Text editor
                TextEditor(text: $viewModel.documentText)
                    .font(.system(.body, design: .monospaced))
                    .padding()
            }
            
            // AI assistant panel
            if isShowingAIPanel {
                VStack {
                    Text("AI Assistant")
                        .font(.headline)
                        .padding()
                    
                    Divider()
                    
                    // Suggestions based on document content
                    if !viewModel.suggestions.isEmpty {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Suggestions")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                                .padding(.horizontal)
                            
                            ForEach(viewModel.suggestions) { suggestion in
                                Button(action: {
                                    processSuggestion(suggestion.title)
                                }) {
                                    Text(suggestion.title)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                        .padding(8)
                                }
                                .buttonStyle(PlainButtonStyle())
                                .background(Color.blue.opacity(0.1))
                                .cornerRadius(8)
                                .padding(.horizontal)
                            }
                        }
                        .padding(.vertical)
                    }
                    
                    Divider()
                    
                    // Chat interface
                    VStack {
                        ScrollView {
                            LazyVStack(alignment: .leading) {
                                ForEach(viewModel.messages) { message in
                                    ChatMessageView(message: message)
                                        .padding(.vertical, 4)
                                }
                            }
                            .padding()
                        }
                        
                        Divider()
                        
                        // Input field
                        HStack {
                            TextField("Ask about this document...", text: $viewModel.inputText)
                                .textFieldStyle(RoundedBorderTextFieldStyle())
                                .onSubmit {
                                    sendMessage()
                                }
                            
                            Button(action: sendMessage) {
                                Image(systemName: "paperplane.fill")
                            }
                            .disabled(viewModel.inputText.isEmpty)
                        }
                        .padding()
                    }
                }
                .frame(width: 300)
            }
        }
        .onAppear {
            viewModel.generateSuggestions()
        }
        .onChange(of: viewModel.documentText) { _ in
            viewModel.generateSuggestions()
        }
    }
    
    private func sendMessage() {
        guard !viewModel.inputText.isEmpty else { return }
        
        // Add message to chat
        let userMessage = Message(
            id: UUID(),
            content: viewModel.inputText,
            isUser: true,
            timestamp: Date()
        )
        viewModel.messages.append(userMessage)
        
        // Process with AI
        let prompt = """
        Document context:
        \(viewModel.documentText)
        
        User question:
        \(viewModel.inputText)
        """
        
        viewModel.inputText = ""
        
        // Process with AI
        Task {
            do {
                let response = try await aiManager.processText(prompt)
                
                // Add AI response to chat
                let aiMessage = Message(
                    id: UUID(),
                    content: response.content,
                    isUser: false,
                    timestamp: Date()
                )
                
                DispatchQueue.main.async {
                    viewModel.messages.append(aiMessage)
                }
            } catch {
                // Handle error
                print("AI processing error: \(error)")
            }
        }
    }
    
    private func processSuggestion(_ suggestion: String) {
        // Add suggestion to chat
        let userMessage = Message(
            id: UUID(),
            content: suggestion,
            isUser: true,
            timestamp: Date()
        )
        viewModel.messages.append(userMessage)
        
        // Process with AI
        let prompt = """
        Document context:
        \(viewModel.documentText)
        
        \(suggestion)
        """
        
        // Process with AI
        Task {
            do {
                let response = try await aiManager.processText(prompt)
                
                // Add AI response to chat
                let aiMessage = Message(
                    id: UUID(),
                    content: response.content,
                    isUser: false,
                    timestamp: Date()
                )
                
                DispatchQueue.main.async {
                    viewModel.messages.append(aiMessage)
                }
            } catch {
                // Handle error
                print("AI processing error: \(error)")
            }
        }
    }
}

// Chat message view
struct ChatMessageView: View {
    let message: Message
    
    var body: some View {
        HStack {
            if message.isUser {
                Spacer()
            }
            
            VStack(alignment: message.isUser ? .trailing : .leading) {
                Text(message.content)
                    .padding()
                    .background(message.isUser ? Color.blue.opacity(0.2) : Color.gray.opacity(0.2))
                    .cornerRadius(12)
                
                Text(message.formattedTime)
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
            
            if !message.isUser {
                Spacer()
            }
        }
    }
}

// Document view model
class DocumentViewModel: ObservableObject {
    @Published var documentText = ""
    @Published var inputText = ""
    @Published var messages: [Message] = []
    @Published var suggestions: [Suggestion] = []
    
    // Document operations
    func newDocument() {
        documentText = ""
        messages = []
    }
    
    func openDocument() {
        // Open document dialog
        let openPanel = NSOpenPanel()
        openPanel.allowedContentTypes = [.plainText]
        openPanel.allowsMultipleSelection = false
        
        if openPanel.runModal() == .OK {
            if let url = openPanel.url {
                do {
                    documentText = try String(contentsOf: url)
                } catch {
                    print("Error opening document: \(error)")
                }
            }
        }
    }
    
    func saveDocument() {
        // Save document dialog
        let savePanel = NSSavePanel()
        savePanel.allowedContentTypes = [.plainText]
        
        if savePanel.runModal() == .OK {
            if let url = savePanel.url {
                do {
                    try documentText.write(to: url, atomically: true, encoding: .utf8)
                } catch {
                    print("Error saving document: \(error)")
                }
            }
        }
    }
    
    // Generate suggestions based on document content
    func generateSuggestions() {
        // Delay to prevent too frequent updates
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            // Only generate if document has content
            guard !self.documentText.isEmpty else {
                self.suggestions = []
                return
            }
            
            // Generate based on document type/content
            if self.documentText.contains("func ") || self.documentText.contains("class ") {
                // Code document
                self.suggestions = [
                    Suggestion(id: UUID(), title: "Explain this code"),
                    Suggestion(id: UUID(), title: "Suggest improvements"),
                    Suggestion(id: UUID(), title: "Add documentation comments"),
                    Suggestion(id: UUID(), title: "Find potential bugs")
                ]
            } else if self.documentText.count > 1000 {
                // Longer document
                self.suggestions = [
                    Suggestion(id: UUID(), title: "Summarize this document"),
                    Suggestion(id: UUID(), title: "Extract key points"),
                    Suggestion(id: UUID(), title: "Suggest a title"),
                    Suggestion(id: UUID(), title: "Improve the writing")
                ]
            } else {
                // Default suggestions
                self.suggestions = [
                    Suggestion(id: UUID(), title: "Analyze this text"),
                    Suggestion(id: UUID(), title: "Continue writing"),
                    Suggestion(id: UUID(), title: "Fix grammar and spelling"),
                    Suggestion(id: UUID(), title: "Rewrite in a professional tone")
                ]
            }
        }
    }
}

// Message model
struct Message: Identifiable {
    let id: UUID
    let content: String
    let isUser: Bool
    let timestamp: Date
    
    var formattedTime: String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: timestamp)
    }
}

// Suggestion model
struct Suggestion: Identifiable {
    let id: UUID
    let title: String
}
```

### 3. Implementing the AI Service

```swift
// AIManager.swift
import Foundation
import CoreML

class AIManager: ObservableObject {
    // Configuration options
    struct Configuration {
        let defaultProvider: Provider
        let useStreaming: Bool
        let maxHistoryLength: Int
        
        static let `default` = Configuration(
            defaultProvider: .apple,
            useStreaming: true,
            maxHistoryLength: 10
        )
        
        static let testing = Configuration(
            defaultProvider: .localModel,
            useStreaming: false,
            maxHistoryLength: 5
        )
        
        static let performance = Configuration(
            defaultProvider: .openAI,
            useStreaming: true,
            maxHistoryLength: 20
        )
    }
    
    // AI providers
    enum Provider {
        case apple
        case anthropic
        case openAI
        case localModel
    }
    
    // Quality levels
    enum QualityLevel {
        case low
        case medium
        case high
    }
    
    // State properties
    @Published var isProcessing = false
    @Published var streamingContent = ""
    @Published var isStreaming = false
    @Published var conversations: [Conversation] = []
    @Published var currentConversation: Conversation?
    
    // Current settings
    var currentProvider: Provider
    private var qualityLevel: QualityLevel = .high
    
    // Configuration
    private let config: Configuration
    
    // Service dependencies
    private let cloudService = CloudModelService()
    private let localService = LocalModelService()
    private let appleService = AppleIntelligenceService()
    
    // Shared instance for easier access
    static var shared: AIManager!
    
    // Initialize with configuration
    init(configuration: Configuration = .default) {
        self.config = configuration
        self.currentProvider = configuration.defaultProvider
        
        // Set as shared instance
        Self.shared = self
        
        // Start with a new conversation
        startNewConversation()
    }
    
    // Start a new conversation
    func startNewConversation() {
        currentConversation = Conversation(id: UUID(), startTime: Date())
        conversations.append(currentConversation!)
    }
    
    // Load existing conversation
    func loadConversation(id: UUID) {
        currentConversation = conversations.first { $0.id == id }
    }
    
    // Set quality level
    func setQualityLevel(_ level: QualityLevel) {
        qualityLevel = level
    }
    
    // Set default provider
    func setDefaultProvider(_ provider: Provider) {
        currentProvider = provider
    }
    
    // Process text with AI
    func processText(_ text: String) async throws -> AIResponse {
        isProcessing = true
        defer { isProcessing = false }
        
        // Process based on provider
        let startTime = Date()
        
        do {
            let response: AIResponse
            
            switch currentProvider {
            case .apple:
                response = try await processWithAppleIntelligence(text)
            case .anthropic:
                response = try await processWithAnthropic(text)
            case .openAI:
                response = try await processWithOpenAI(text)
            case .localModel:
                response = try await processWithLocalModel(text)
            }
            
            // Log interaction metrics
            let duration = Date().timeIntervalSince(startTime)
            AITelemetry().logAIInteraction(
                promptLength: text.count,
                responseLength: response.content.count,
                duration: duration,
                provider: providerString(currentProvider)
            )
            
            return response
        } catch {
            // Log error
            AITelemetry().logError(
                code: "processing_error",
                message: error.localizedDescription,
                context: ["provider": providerString(currentProvider)]
            )
            
            throw error
        }
    }
    
    // Process with streaming
    func processTextWithStreaming(_ text: String) {
        isStreaming = true
        streamingContent = ""
        
        // Start processing in background
        Task {
            do {
                // Process with AI
                let response = try await processText(text)
                
                // Update streaming content
                for char in response.content {
                    streamingContent.append(char)
                    // Short delay to simulate typing
                    try await Task.sleep(nanoseconds: 5_000_000)
                }
            } catch {
                // Update streaming content with error
                streamingContent = "Error: \(error.localizedDescription)"
            }
            
            isStreaming = false
        }
    }
    
    // Process with callback for each chunk
    func streamTextWithCallback(_ text: String, callback: @escaping (String) -> Void) {
        // Simulate streaming for now
        Task {
            do {
                let response = try await processText(text)
                
                // Split into chunks and deliver
                let chunks = response.content.split(separator: " ")
                
                for chunk in chunks {
                    callback(String(chunk) + " ")
                    try await Task.sleep(nanoseconds: 100_000_000)
                }
                
                // End marker
                callback("THE END")
            } catch {
                callback("Error: \(error.localizedDescription)")
            }
        }
    }
    
    // Generate suggestions
    func generateSuggestions(for context: String?) async throws -> [String] {
        // Default suggestions if no context
        guard let context = context, !context.isEmpty else {
            return [
                "Summarize this document",
                "Generate key points",
                "Fix grammar and spelling",
                "Continue writing"
            ]
        }
        
        // Generate based on context
        let prompt = "Generate 4 helpful suggestions for this document:\n\n\(context.prefix(500))"
        
        let response = try await processText
