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

### QML Documentation

- Document QML components with proper comments
- Specify property types and defaults
- Include usage examples
- Document signal handlers and connections

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

## Error Handling

### QML Error Handling

- Implement error propagation to QML
- Design error display components
- Handle errors at appropriate levels
- Provide user recovery options

### Diagnostics

- Log errors with appropriate levels
- Include context for debugging
- Implement crash reporting
- Add performance metrics

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
