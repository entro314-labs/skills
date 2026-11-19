---
name: modernize-deps
description: "Updates and modernizes project dependencies: audits outdated and vulnerable packages across npm, pip and composer, applies patch, minor then major updates incrementally, reviews breaking changes and re-runs tests, build and lint. Use when asked to update or upgrade dependencies. Takes optional scope as an argument."
disable-model-invocation: true
---

# Modernize Dependencies Command

Update and modernize project dependencies

## Instructions

Follow this approach to modernize dependencies: **$ARGUMENTS**

1. **Dependency Audit**
   ```bash
   # Check outdated packages
   npm outdated
   pip list --outdated
   composer outdated
   
   # Security audit
   npm audit
   pip-audit
   ```

2. **Update Strategy**
   - Start with patch updates (1.2.3 → 1.2.4)
   - Then minor updates (1.2.3 → 1.3.0)
   - Finally major updates (1.2.3 → 2.0.0)
   - Test thoroughly between each step

3. **Automated Updates**
   ```bash
   # Safe updates
   npm update
   pip install -U package-name
   
   # Interactive updates
   npx npm-check-updates -i
   ```

4. **Breaking Changes Review**
   - Read changelogs and migration guides
   - Identify deprecated APIs
   - Plan code changes needed
   - Update tests and documentation

5. **Testing and Validation**
   ```bash
   npm test
   npm run build
   npm run lint
   ```

6. **Documentation Updates**
   - Update README.md
   - Revise installation instructions
   - Update API documentation
   - Note breaking changes

Remember to update dependencies incrementally, test thoroughly, and maintain backward compatibility where possible.
