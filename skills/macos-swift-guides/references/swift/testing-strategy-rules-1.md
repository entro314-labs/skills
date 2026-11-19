# Testing Strategy Rules

## Unit Testing Principles

### Test Organization

- Co-locate tests with implementation
- Organize tests by feature/component
- Use clear, descriptive test names
- Group related tests with nested contexts

```swift
import XCTest
@testable import MyApp

final class UserServiceTests: XCTestCase {
    func test_authenticateUser_withValidCredentials_succeeds() {
        // Given
        let sut = UserService(apiClient: MockAPIClient())
        let credentials = Credentials(username: "user", password: "pass")
        
        // When
        let result = try? await sut.authenticate(credentials: credentials)
        
        // Then
        XCTAssertNotNil(result)
        XCTAssertEqual(result?.id, "user-123")
    }
    
    func test_authenticateUser_withInvalidCredentials_throwsAuthError() {
        // Given
        let sut = UserService(apiClient: MockAPIClient(shouldFail: true))
        let credentials = Credentials(username: "user", password: "wrong")
        
        // When/Then
        XCTAssertThrowsError(try await sut.authenticate(credentials: credentials)) { error in
            XCTAssertTrue(error is AuthError)
            if let authError = error as? AuthError {
                XCTAssertEqual(authError, .invalidCredentials)
            }
        }
    }
}
```

### Test Dependencies

- Use protocol-based dependency injection
- Create mock implementations for testing
- Avoid static dependencies
- Use factory methods for test objects

### Test Coverage

- Target business logic for 90%+ coverage
- Test happy paths and error paths
- Include edge cases and boundary conditions
- Monitor coverage with CI tools

## UI Testing

### SwiftUI Testing

- Use `ViewInspector` for unit testing views
- Test view state changes
- Verify view hierarchy structure
- Test bindings and events

### UI Test Automation

- Focus on critical user flows
- Test accessibility functionality
- Include platform-specific features
- Support different screen sizes

```swift
import XCTest

final class LoginUITests: XCTestCase {
    var app: XCUIApplication!
    
    override func setUp() {
        super.setUp()
        app = XCUIApplication()
        app.launchArguments = ["--uitesting"]
        app.launch()
    }
    
    func testLoginFlow() {
        // Given
        let emailField = app.textFields["emailField"]
        let passwordField = app.secureTextFields["passwordField"]
        let loginButton = app.buttons["loginButton"]
        
        // When
        emailField.tap()
        emailField.typeText("test@example.com")
        
        passwordField.tap()
        passwordField.typeText("password")
        
        loginButton.tap()
        
        // Then
        XCTAssertTrue(app.staticTexts["welcomeMessage"].exists)
    }
}
```

### Snapshot Testing

- Capture visual references
- Test light/dark mode appearance
- Test different device sizes
- Include localization tests

## Integration Testing

### Service Integration

- Test service boundaries
- Mock external dependencies
- Verify correct data transformation
- Test error propagation

### Persistence Testing

- Test data round trips
- Verify migration paths
- Include data validation
- Test concurrent access

### Networking Tests

- Mock network responses
- Test request formation
- Verify error handling
- Test network transitions

## Performance Testing

### Benchmark Tests

- Measure critical operations
- Establish performance baselines
- Test with varying data sizes
- Monitor trends over time

```swift
func testSearchPerformance() {
    // Given
    let sut = SearchIndex()
    populateWithTestData(items: 10000)
    
    // When/Then
    measure {
        let results = sut.search(query: "test")
        XCTAssertFalse(results.isEmpty)
    }
}
```

### Memory Tests

- Track allocations and leaks
- Test memory pressure handling
- Verify proper cleanup
- Monitor heap allocations

### Concurrency Tests

- Test thread safety
- Verify deadlock prevention
- Test task cancellation
- Check race condition handling

## Test Automation

### CI Integration

- Run tests on every PR
- Include all test categories
- Set up automatic failure reporting
- Track test coverage over time
- Run UI tests on multiple device configurations

### Test Environment

- Create isolated test environments
- Use DI containers for testing
- Implement environment switching
- Create test fixtures and factories

```swift
struct TestEnvironment {
    static func configure() {
        // Register test dependencies
        DependencyContainer.register(APIClientProtocol.self) { _ in
            MockAPIClient(responseDelay: 0.1)
        }
        
        DependencyContainer.register(PersistenceManagerProtocol.self) { _ in
            InMemoryPersistenceManager()
        }
        
        // Configure test settings
        AppSettings.shared.environment = .testing
    }
}
```

## TCA-Specific Testing

### State Testing

- Test state transitions with reducers
- Verify state immutability
- Test derived state calculations
- Ensure state consistency

### Effect Testing

- Test effect triggering conditions
- Verify effect cancellation
- Test effect dependencies
- Check effect threading behavior

### TestStore Usage

- Use TestStore for reducer testing
- Test action sequences
- Verify state changes
- Test effect completion

```swift
func testCounterReducer() {
    let store = TestStore(
        initialState: CounterState(count: 0),
        reducer: counterReducer,
        environment: CounterEnvironment(
            mainQueue: .immediate,
            factClient: FactClient.mock
        )
    )
    
    store.send(.increment) {
        $0.count = 1
    }
    
    store.send(.decrement) {
        $0.count = 0
    }
    
    store.send(.loadFact) {
        $0.isLoading = true
    }
    
    store.receive(.factResponse(.success("Test fact"))) {
        $0.isLoading = false
        $0.fact = "Test fact"
    }
}
```

## SwiftData Testing

### Persistence Testing

- Test model relationships
- Verify query performance
- Test migration paths
- Check constraint enforcement

### In-Memory Configuration

- Use in-memory stores for testing
- Reset data between tests
- Test concurrent access patterns
- Verify transaction behavior
