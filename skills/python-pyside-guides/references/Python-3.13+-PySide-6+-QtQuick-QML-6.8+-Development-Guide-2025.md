# Python 3.13+ / PySide 6+ / QtQuick/QML 6.8+ Development Guide (2025)

## Foundational Architecture

### Modern Application Patterns

- **MVVM Pattern**: Preferred for QtQuick/QML applications
  - **Models**: Python data structures exposed to QML
  - **Views**: QML declarative interface components
  - **ViewModels**: QObjects with properties, signals, and slots
  - **Benefits**: Clean separation of concerns and QML data binding support
- **Clean Architecture**: Recommended for enterprise-level applications
  - **Entities**: Core business objects independent of frameworks
  - **Use Cases**: Application-specific business rules
  - **Interface Adapters**: Presenters, controllers, and gateways
  - **Frameworks**: External tools and platforms
  - **Benefits**: High modularity and testability
- **State Management Pattern**: For sophisticated state management
  - **State**: Complete application state representation
  - **Actions**: User interactions and system events
  - **Reducers**: Pure functions for state mutations
  - **Effects**: Side effects and asynchronous operations
  - **Benefits**: Predictable state flow and excellent testability
- **Dependency Management**:
  - Dependency injection for services and viewmodels
  - Context objects for QML dependency injection
  - Modules organized by feature domains: Core, Features, Data, UI, App

### Project Setup and Configuration

- **Project Organization**:
  - Target: Python 3.13+, PySide 6.5+, Qt 6.8+, organized by feature
  - Multiple modules for main app, libraries, plugins, and tests
  - Virtual environments with modern dependency management (PDM/Poetry)
  - Type annotations throughout with support for Mypy/Pyright
- **Environment Configuration**:
  - Feature flags for progressive feature deployment
  - Secure storage for API keys and credentials using environment variables
  - Configuration management using Pydantic settings models
- **Diagnostics Setup**:
  - Structured logging with modern Python logging or Loguru
  - Telemetry and crash reporting integration
  - Performance monitoring instrumentation points

## UI Framework Implementation

### QtQuick/QML for Modern Applications

- **App and Scene Structure**:
  - QML application structure with Engine and Component loading
  - Window hierarchy and organization
  - State management with QML properties and PropertyBinding
  - Document-based app considerations with document models
- **QML Implementation**:
  - Modern QtQuick 6.8+ controls and layouts
  - Material/Universal styling with theming support
  - Component organization and reuse strategies
  - Responsive layout with anchors, layouts, and states
- **Interoperability**:
  - Python/QML bridging patterns
  - Exposing Python models and functions to QML
  - Handling QML signals in Python
  - Data sharing between languages

### Advanced UI Features

- **Custom Components**:
  - Creating reusable QML components
  - Implementing custom rendering with ShaderEffect
  - Custom controls with proper focus and accessibility support
  - Style inheritance and customization
- **Animation and Transitions**:
  - Hardware-accelerated animations
  - State transitions and behaviors
  - Particle systems and effects
  - Gesture-driven animations

## Data Management and Persistence

### Database Integration

- **SQLAlchemy 2.0+ Implementation**:
  - Model schema definition with typed ORM classes
  - Query design with modern SQLAlchemy 2.0 select API
  - Schema versioning and migration strategies with Alembic
  - Async database operations with SQLAlchemy async support
- **Alternative Storage**:
  - Document databases (MongoDB) with modern ODM
  - Key-value storage with Redis or SQLite KV
  - Local storage with structured file formats
  - Data synchronization strategies
- **File Management**:
  - Securely handling file access across platforms
  - File watching and change notification
  - Import/export with standard file formats
  - File preview and thumbnail generation

## Platform Integration

### Operating System Integration

- **Modern OS Features**:
  - Notifications and system tray integration
  - File associations and protocol handlers
  - Platform styling and theme integration
  - Multi-monitor support
- **System Services**:
  - Background processing with QThreadPool
  - IPC mechanisms with modern techniques
  - Hardware integration (cameras, sensors, etc.)
  - Platform-specific extension points

### Python 3.13+ Features

- **Type System**:
  - Advanced type hints with generics and type guards
  - Runtime type checking strategies
  - Structural pattern matching for data processing
  - New 3.13+ type features utilization
- **Concurrency**:
  - Modern asyncio integration with Qt event loop
  - Task handling and cancellation
  - Structured concurrency patterns
  - Thread management and worker pools

## Cross-Platform Considerations

### Platform-Specific Features

- **Windows Integration**:
  - Windows themes and styling
  - Explorer integration and jump lists
  - High-DPI handling and scaling
  - Windows notifications
- **macOS Integration**:
  - Native menu bar and dock integration
  - macOS styling and appearances
  - Touchbar support (where applicable)
  - macOS sandbox compliance
- **Linux Integration**:
  - Freedesktop standards compliance
  - Desktop environment integration
  - Wayland and X11 considerations
  - Linux packaging formats

### Responsive Design

- **Device Adaptation**:
  - Screen size and orientation handling
  - Input method adaptation (touch vs mouse)
  - Dynamic layout adjustment
  - Resource scaling and adaptation

## Performance Optimization

### Memory Management

- **Resource Handling**:
  - Python memory management best practices
  - Qt object ownership and parent-child relationships
  - Resource cleanup and reference cycles prevention
  - Caching strategies to balance performance and memory usage
- **Concurrency Optimization**:
  - Background processing with worker threads
  - Async operations with proper cancellation
  - Cooperative multitasking with asyncio
  - Progress tracking and user feedback

### UI Performance

- **Rendering Optimization**:
  - Scene graph optimization techniques
  - Lazy loading and component instantiation
  - Batching property updates
  - Hardware acceleration utilization
- **Data Binding Optimization**:
  - Efficient property binding
  - Model updates with minimal refresh
  - Viewport-based rendering for large data sets
  - Progressive loading strategies

## Distribution and Deployment

### Packaging and Deployment

- **Application Bundling**:
  - PyInstaller/Nuitka configuration
  - Resource embedding and management
  - Platform-specific packaging
  - Dependency management and isolation
- **Update Mechanisms**:
  - Auto-update implementation
  - Delta updates for efficiency
  - Update security and verification
  - User update experience

### Distribution Channels

- **App Store Distribution**:
  - Platform store requirements compliance
  - Metadata and store listings optimization
  - Review process preparation
  - In-app purchase integration (if applicable)
- **Direct Distribution**:
  - Self-hosted distribution infrastructure
  - Installation process and bootstrapping
  - License management (if applicable)
  - Analytics and telemetry integration

## Testing and Quality Assurance

### Testing Strategy

- **Unit Testing**:
  - Python unit tests with pytest
  - Qt unit tests for C++ components
  - Mocking Qt components and signals
  - Property-based testing for robust verification
- **UI Testing**:
  - QML TestCase implementation
  - Squish or similar for UI automation
  - Screenshot comparison testing
  - Accessibility testing

### Continuous Integration

- **Build Pipeline**:
  - Multi-platform CI setup
  - Automated testing across platforms
  - Static analysis integration
  - Performance regression testing
- **Delivery Pipeline**:
  - Automated packaging and distribution
  - Environment-based configuration
  - Staged rollout strategies
  - Feature flagging control

## AI Assistant Guidelines

### Code Generation Strategies

- **Incremental Development**:
  - Component-by-component generation
  - Context-aware code creation
  - Adaptation based on user feedback
  - Progressive complexity introduction
- **Documentation Generation**:
  - Inline documentation with docstrings
  - Architecture documentation with component relationships
  - Tutorial generation for key concepts
  - Readme and user documentation
