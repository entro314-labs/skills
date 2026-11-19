# AI Agent Workflow for Python/PySide/QtQuick Development

## Understanding Requirements

### Initial Analysis

- Parse project structure and architecture
- Identify existing patterns and conventions
- Understand domain language and models
- Match requirements to architectural components

### Context Building

- Scan for key files (main.py, QML root files, core models)
- Map dependencies between Python and QML components
- Note platform-specific requirements (OS targets)
- Identify third-party dependencies and Python version

## Code Generation Workflow

### Incremental Development

- Generate one component at a time
- Start with models, then services, then UI
- Build from core domain outward
- Test each component before moving to the next

```yaml
generation_order:
  - python_domain_models
  - service_interfaces
  - service_implementations
  - qml_models_bindings
  - viewmodels
  - qml_components
  - tests
```

### Context Awareness

- Maintain memory of previous generations
- Reference existing components by name
- Match coding style of existing codebase
- Use consistent naming conventions

### Feedback Integration

- Adapt based on user feedback
- Improve or modify previous generations
- Remember common preferences
- Document changes between iterations

## Documentation Best Practices

### Inline Documentation

- Document Python APIs with NumPy/Google style docstrings
- Include parameter and return descriptions with type annotations
- Note threading/performance considerations
- Document architectural decisions

```python
def authenticate(username: str, password: str) -> Awaitable[User]:
    """Authenticates a user with the provided credentials.
    
    Performs authentication against the backend service and returns a User object
    if successful. This operation is performed asynchronously.
    
    Args:
        username: The user's username or email
        password: The user's password
    
    Returns:
        A coroutine that resolves to a User object
        
    Raises:
        AuthenticationError: If credentials are invalid
        ConnectionError: If backend cannot be reached
        
    Note:
        This operation is performed on a background thread via asyncio
    """
    # Implementation
```

### QML Documentation

- Document QML components with proper comments
- Specify property types and defaults
- Include usage examples
- Document signal handlers and connections

```qml
/*!
   \qmltype CustomButton
   \brief A customized button with additional states
   
   This component extends the standard Button with additional states
   and visual feedback for hover effects.
   
   Example usage:
   \code
   CustomButton {
       text: "Click Me"
       onClicked: handleButtonClick()
       highlight: true
   }
   \endcode
*/
Button {
    id: root
    
    // Public properties
    /*! The highlight state of the button */
    property bool highlight: false
    
    // Private properties
    property real __dynamicOpacity: enabled ? 1.0 : 0.5
    
    // Implementation
}
```

### AI-Specific Comments

- Add agent directives in comments
- Mark areas that need human review
- Include reasoning behind design choices
- Reference architectural patterns

```python
# @agent: Following MVVM pattern here
# @rationale: Using modern asyncio for better readability over callbacks
# @human-review: Security implementation may need review
async def authenticate_user(credentials: Credentials) -> User:
    # Implementation
```

## Testing Generation

### Unit Tests

- Generate pytest tests alongside implementation
- Focus on behavior, not implementation details
- Include happy and error paths
- Use dependency injection for testability

```python
@pytest.mark.asyncio
async def test_authentication_success():
    # Arrange
    auth_service = AuthService(MockAuthBackend())
    test_credentials = Credentials("test_user", "valid_password")
    
    # Act
    user = await auth_service.authenticate(test_credentials)
    
    # Assert
    assert user is not None
    assert user.username == "test_user"
    assert user.is_authenticated
```

### QML Tests

- Generate QtQuick Test tests for QML components
- Test property bindings and state transitions
- Include visual appearance tests
- Verify signal handling

```qml
TestCase {
    name: "ButtonTests"
    
    when: windowShown
    
    SignalSpy {
        id: clickedSpy
        target: testButton
        signalName: "clicked"
    }
    
    CustomButton {
        id: testButton
        text: "Test Button"
    }
    
    function test_button_click() {
        // Test button click signal
        mouseClick(testButton)
        compare(clickedSpy.count, 1)
    }
    
    function test_button_highlight() {
        // Test highlight state
        testButton.highlight = true
        verify(testButton.background.color !== "white")
        
        // Test state change
        testButton.highlight = false
        verify(testButton.background.color === "white")
    }
}
```

## Error Handling

### Structured Errors

- Use exception hierarchy for error types
- Include context in error messages
- Design for localization
- Implement proper error recovery

```python
class ApplicationError(Exception):
    """Base class for all application errors."""
    pass

class NetworkError(ApplicationError):
    """Errors related to network operations."""
    
    def __init__(self, message: str, status_code: Optional[int] = None):
        self.status_code = status_code
        self.message = message
        super().__init__(f"{message} (Status code: {status_code})" if status_code else message)

class AuthenticationError(ApplicationError):
    """Errors related to authentication."""
    pass

class ValidationError(ApplicationError):
    """Errors related to data validation."""
    
    def __init__(self, field: str, message: str):
        self.field = field
        self.message = message
        super().__init__(f"Validation error on field '{field}': {message}")
```

### QML Error Handling

- Implement error propagation to QML
- Design error display components
- Handle errors at appropriate levels
- Provide user recovery options

```qml
// ErrorDisplay.qml
Item {
    id: root
    
    property var error: null
    property bool autoHide: true
    
    visible: error !== null
    
    Rectangle {
        anchors.fill: parent
        color: "#FFDDDD"
        border.color: "#FF0000"
        
        Column {
            anchors.centerIn: parent
            spacing: 10
            
            Text {
                text: error ? error.message : ""
                color: "#880000"
            }
            
            Button {
                text: "Retry"
                visible: error && error.canRetry
                onClicked: {
                    if (error && error.retry) {
                        error.retry()
                    }
                }
            }
        }
    }
    
    Timer {
        running: root.autoHide && root.visible
        interval: 5000
        onTriggered: root.error = null
    }
}
```

### Diagnostics

- Log errors with appropriate levels
- Include context for debugging
- Implement crash reporting
- Add performance metrics

```python
import logging
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)

class Diagnostics:
    def __init__(self, app_name: str, version: str):
        self.app_name = app_name
        self.version = version
        self.crash_reporter = CrashReporter(app_name, version)
        self.metrics = PerformanceMetrics()
    
    def log_error(self, error: Exception, context: Optional[Dict[str, Any]] = None):
        """Log an error with context and report to crash reporting service."""
        logger.error(f"Error: {error}", exc_info=True, extra=context or {})
        self.crash_reporter.report_exception(error, context)
    
    def start_operation(self, name: str) -> OperationContext:
        """Start tracking an operation for performance metrics."""
        return self.metrics.start_operation(name)
    
    def track_metric(self, name: str, value: float):
        """Track a custom metric."""
        self.metrics.track(name, value)
        logger.debug(f"Metric {name}: {value}")
```

## AI Code Review Strategy

### Code Quality Checks

- Verify architecture consistency
- Check for memory leaks and reference cycles
- Validate thread safety with asyncio/QThread
- Review error handling completeness

### Security Review

- Check for hardcoded credentials
- Verify proper encryption
- Review permission usage
- Validate input sanitization

### Performance Optimization

- Look for inefficient algorithms
- Check for main thread blocking
- Review resource management
- Suggest optimizations for QML scene graph
