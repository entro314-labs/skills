# Python 3.13+/PySide 6+/QtQuick/QML 6.8+ Dos and Don'ts

## API Usage

### ✅ DO

- Use the latest stable APIs (Python 3.13+, PySide 6.5+, Qt 6.8+)
- Implement modern Python features (type hints, pattern matching, asyncio)
- Use QtQuick's declarative approach for UI design
- Apply typed QML properties with proper validation

### ❌ DON'T

- Use deprecated APIs (PyQt5, Qt Widgets for new components)
- Create compatibility abstractions for older Python versions
- Mix imperative and declarative UI paradigms unnecessarily
- Use dynamic typing when static typing is available

## Architecture Patterns

### ✅ DO

- Follow a consistent architecture pattern (MVVM, Clean, Redux-like)
- Inject dependencies via constructors or context objects
- Use proper Python data classes for models
- Design for testability with interfaces/protocols

### ❌ DON'T

- Mix architectural patterns within a feature
- Create global state or singletons
- Access services directly from QML views
- Bypass architecture for "quick fixes"

## Python Best Practices

### ✅ DO

- Use Python 3.13+ features (pattern matching, new type features)
- Implement proper error handling with exception hierarchies
- Design with data classes and immutability in mind
- Use virtual environments and dependency management

### ❌ DON'T

- Write legacy Python style code
- Overuse class inheritance where composition works better
- Implement custom solutions for standard library features
- Mix typing approaches (all or nothing)

## QML Best Practices

### ✅ DO

- Separate concerns with proper component structure
- Use property bindings rather than imperative assignments
- Implement responsive layouts with anchors and layouts
- Create reusable components with well-defined APIs

### ❌ DON'T

- Create large monolithic QML files
- Mix JavaScript logic with presentation
- Hardcode sizes and positions
- Overuse imperative `onCompleted` code

## Code Generation

### ✅ DO

- Add inline documentation for generated code
- Provide usage examples in comments
- Include architecture context in comments
- Generate tests alongside implementation

### ❌ DON'T

- Generate monolithic files
- Create complex dependencies without explanation
- Generate "magic" code without documentation
- Create duplicate utilities that already exist

## Project Organization

### ✅ DO

- Organize by feature/domain
- Co-locate related Python and QML files
- Use nested modules for complex features
- Include README files for complex modules

### ❌ DON'T

- Organize globally by type (/qml, /python, /utils)
- Place unrelated code in utility/helper modules
- Create deep folder hierarchies
- Mix framework boundaries

## When Handling Existing Code

### ✅ DO

- Identify and follow existing patterns
- Document tech debt or inconsistencies
- Propose incremental modernization
- Respect the local style

### ❌ DON'T

- Force modern APIs into legacy areas
- Mix styles within a module
- Automatically refactor across boundaries
- Assume newer is always better

## Testing Approach

### ✅ DO

- Write unit tests for Python with pytest
- Create QML tests with QtTest
- Use dependency injection for testability
- Write snapshot tests for UI components

### ❌ DON'T

- Skip tests for generated code
- Write tests that depend on order
- Use mutable global state in tests
- Create tests with external dependencies

## Performance Considerations

### ✅ DO

- Use efficient data structures
- Implement proper caching strategies
- Optimize QML component hierarchies
- Use background threads for heavy operations

### ❌ DON'T

- Copy large objects unnecessarily
- Block the main Qt/QML thread
- Create hidden performance bottlenecks
- Over-optimize prematurely

## Security and Privacy

### ✅ DO

- Store secrets securely
- Use proper encryption for sensitive data
- Implement proper error handling
- Respect user privacy

### ❌ DON'T

- Hardcode credentials or API keys
- Store sensitive data in plain text
- Ignore permission requirements
- Make unnecessary network requests

## Documentation Generation

### ✅ DO

- Document Python APIs with modern docstrings
- Include parameter and return type descriptions
- Document architecture decisions
- Provide usage examples

### ❌ DON'T

- Write generic unhelpful documentation
- Document only class names without context
- Skip documentation for complex logic
- Use outdated documentation formats

# Modern Python/PySide/QtQuick UI Implementation Rules

## QtQuick/QML Fundamentals

### App Structure

- Use `QQmlApplicationEngine` for application bootstrap
- Organize QML files by feature/component
- Implement proper component lifecycle handling
- Use `QQmlContext` for dependency injection

```python
# main.py
import sys
from pathlib import Path
from PySide6.QtCore import QUrl
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine, qmlRegisterType

from .viewmodels import MainViewModel
from .qml_types import register_types

def main():
    app = QGuiApplication(sys.argv)
    app.setApplicationName("MyApplication")
    
    # Register custom QML types
    register_types()
    
    # Create engine and view models
    engine = QQmlApplicationEngine()
    main_vm = MainViewModel()
    
    # Expose objects to QML
    engine.rootContext().setContextProperty("mainViewModel", main_vm)
    
    # Load main QML file
    qml_path = Path(__file__).parent / "qml" / "main.qml"
    engine.load(QUrl.fromLocalFile(str(qml_path)))
    
    if not engine.rootObjects():
        sys.exit(-1)
    
    return app.exec()

if __name__ == "__main__":
    sys.exit(main())
```

### QML Architecture

- Small, focused QML components
- Extract complex logic to Python ViewModels
- Use container/presentational pattern
- Avoid large monolithic QML files

### State Management

- Use proper property bindings in QML
- Implement observable properties in Python
- Use signals for events and notifications
- Implement proper state machines when needed

```python
# viewmodel.py
from PySide6.QtCore import QObject, Signal, Property, Slot

class TaskViewModel(QObject):
    nameChanged = Signal()
    statusChanged = Signal()
    completionChanged = Signal()
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self._name = ""
        self._status = "Not Started"
        self._completion = 0.0
    
    def name(self):
        return self._name
        
    def setName(self, name):
        if self._name != name:
            self._name = name
            self.nameChanged.emit()
    
    def status(self):
        return self._status
        
    def setStatus(self, status):
        if self._status != status:
            self._status = status
            self.statusChanged.emit()
    
    def completion(self):
        return self._completion
        
    def setCompletion(self, completion):
        if self._completion != completion:
            self._completion = completion
            self.completionChanged.emit()
    
    name = Property(str, name, setName, notify=nameChanged)
    status = Property(str, status, setStatus, notify=statusChanged)
    completion = Property(float, completion, setCompletion, notify=completionChanged)
    
    @Slot()
    def start(self):
        self.setStatus("In Progress")
        self.setCompletion(0.1)
```

### Layout System

- Use modern layout containers (Row, Column, Grid)
- Build custom layouts when needed
- Implement responsive designs with anchors
- Use proper spacing and margins

## Python/QML Integration

### Data Exposure

- Expose Python models as QObject subclasses
- Use properties and signals for data binding
- Implement custom list models for collections
- Handle large datasets with lazy loading

```python
# list_model.py
from PySide6.QtCore import QAbstractListModel, Qt, QModelIndex, Property
from typing import List, Any

class TaskListModel(QAbstractListModel):
    NameRole = Qt.UserRole + 1
    StatusRole = Qt.UserRole + 2
    CompletionRole = Qt.UserRole + 3
    
    def __init__(self, parent=None):
        super().__init__(parent)
        self._tasks = []
    
    def roleNames(self):
        return {
            self.NameRole: b"name",
            self.StatusRole: b"status",
            self.CompletionRole: b"completion"
        }
    
    def rowCount(self, parent=QModelIndex()):
        return len(self._tasks)
    
    def data(self, index, role=Qt.DisplayRole):
        if not index.isValid() or not (0 <= index.row() < len(self._tasks)):
            return None
            
        task = self._tasks[index.row()]
        
        if role == self.NameRole:
            return task.name
        elif role == self.StatusRole:
            return task.status
        elif role == self.CompletionRole:
            return task.completion
            
        return None
    
    def addTask(self, task):
        self.beginInsertRows(QModelIndex(), len(self._tasks), len(self._tasks))
        self._tasks.append(task)
        self.endInsertRows()
```

### API Design

- Create clean Python APIs for QML consumption
- Use `@Slot` decorated methods for callables
- Return Python objects as proper QML types
- Handle Python exceptions in QML-callable methods

## Input Handling

### Keyboard

- Implement keyboard shortcuts and focus
- Support keyboard navigation
- Create custom keyboard handling when needed
- Support key sequences and modifiers

### Mouse/Touch

- Implement proper click and touch handling
- Support gesture recognition
- Create proper draggable components
- Implement proper hover effects

### Accessibility

- Provide clear accessibility labels
- Support screen readers
- Implement proper focus management
- Test with accessibility tools

## Platform Adaptation

### Appearance

- Support light/dark mode
- Use theme-aware colors
- Adapt to system theme changes
- Implement proper styling system

### Displays

- Support multiple displays
- Handle screen resolution changes
- Respect display properties
- Implement proper scaling

### Window Management

- Support windowing system features
- Implement proper window state management
- Save window position/size preferences
- Support full-screen mode

## Specific Controls

### Lists and Tables

- Use QtQuick ListView with proper delegates
- Implement efficient data models
- Handle selection properly
- Support keyboard navigation

### Document Handling

- Implement proper document models
- Support autosave and document state
- Handle file coordination
- Implement proper file dialogs

# Legacy Code Migration Rules

## Mindset & Approach

### Evolutionary Strategy

- Respect existing architectural decisions
- Prefer incremental modernization over rewrites
- Follow local patterns when editing existing files
- Document technical debt instead of silently patching

### Migration Assessment

- Only propose migration when justified by:
  - Simplification
  - Security improvements
  - Performance gains
  - Better tooling support
  - Maintenance cost reduction

## Compatibility & Transitions

### Hybrid Approaches

- Wrap older APIs with Python-friendly layers during transition
- Use feature flags for gradual adoption
- Implement "strangler pattern": build new alongside old
- Mark transitional code with deprecation notices

```python
# TRANSITIONAL CODE: Bridging PyQt5 to PySide6
# Migration target: Q3 2025
import warnings

warnings.warn(
    "TaskListView is deprecated. Use modern TaskListComponent instead.",
    DeprecationWarning, 
    stacklevel=2
)

try:
    # Try PySide6 first
    from PySide6.QtWidgets import QListView
except ImportError:
    # Fall back to PyQt5
    from PyQt5.QtWidgets import QListView

class TaskListView(QListView):
    # Implementation
```

### Clean Boundaries

- Create clean interfaces between old and new code
- Use adapters to translate between paradigms
- Maintain separate test suites during transition
- Implement clear feature flags

## Migration Patterns

### Qt Widgets to QtQuick

- Start with leaf components
- Use QWidget hosting for gradual integration
- Create parallel implementations before switching
- Focus on state management differences

### SQLite to SQLAlchemy

- Analyze schema complexity first
- Create parallel models during transition
- Implement synchronization during migration
- Use SQLAlchemy exclusively for new features

### Callbacks to Asyncio

- Replace callback chains with async functions
- Rewrite event patterns as async sequences
- Convert callback-based APIs to awaitable ones
- Implement adapter patterns for transition

### MVC to MVVM

- Extract business logic from controllers first
- Create ViewModels that mirror controller state
- Refactor view bindings incrementally
- Add tests before significant refactoring

## Common Migration Challenges

### State Management

- Convert direct property access to observable properties
- Replace manual signal connections with property bindings
- Update event handling mechanisms
- Preserve state during transitions

### Navigation

- Replace imperative navigation with declarative patterns
- Update deep linking implementations
- Maintain navigation state during transitions
- Preserve custom transitions

### Persistence

- Handle schema migrations carefully
- Test data migration thoroughly
- Maintain backward compatibility
- Support rollback paths

## Migration Planning

### Phased Approach

- Identify independent components for migration
- Define clear exit criteria for each phase
- Implement automated testing before migration
- Monitor performance and stability metrics

### Risk Mitigation

- Create feature flags for quick rollback
- Implement parallel implementations
- Add comprehensive logging
- Deploy to internal users first

## AI Migration Helpers

### Static Analysis

- Generate usage reports for outdated APIs
- Create dependency graphs to identify migration order
- Detect architectural inconsistencies
- Identify test coverage gaps

### Migration Scripts

- Generate migration plans for common patterns
- Create boilerplate for modern equivalents
- Document before/after examples
- Generate test cases for validation

### Documentation Generation

- Create migration guides for specific patterns
- Document rationale for architectural changes
- Record known issues and workarounds
- Update API documentation during migration
