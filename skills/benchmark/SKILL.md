---
name: benchmark
description: "Measures and analyzes performance across build time, bundle size, runtime rendering, API latency, memory and code-quality metrics, then recommends optimizations with before/after comparisons. Use when asked to benchmark, profile or measure project performance. Assumes npm scripts such as test, build and benchmark."
allowed-tools: Read, Bash(npm run test), Bash(npm run build), Bash(npm run benchmark)
disable-model-invocation: true
---

# Performance Benchmarking

Measure and analyze codebase performance metrics:

## Benchmark Categories

### Build Performance

- Compilation time analysis
- Bundle size measurements
- Tree-shaking effectiveness
- Source map generation time
- Development server startup

### Runtime Performance

- Component render times
- API response latencies
- Memory usage patterns
- JavaScript execution metrics
- Network request optimization

### Code Quality Metrics

- Cyclomatic complexity
- Technical debt index
- Test coverage impact
- Maintainability scores

### Architecture Performance

- Module loading times
- Dependency resolution
- Import/export efficiency
- Code splitting effectiveness

## Usage

- `/benchmark` - Full performance analysis
- `/benchmark --build` - Build performance only
- `/benchmark --runtime` - Runtime metrics
- `/benchmark --performance` - Performance optimizations

## Optimization Areas

- Bundle size reduction strategies
- Code splitting opportunities
- Lazy loading recommendations
- Caching optimization
- Performance anti-patterns

## Output

Performance report with:

- 📊 Current metrics and trends
- 🎯 Performance bottlenecks
- 💡 Optimization recommendations
- 📈 Before/after comparisons
- 🏆 Performance goals and targets
