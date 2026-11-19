---
title: 'Project Manifest - Large Codebase Management'
description: 'Define these based on your actual codebase.'
category: 'Claude Code'
---

# Project Manifest - Large Codebase Management

## Core Architecture Patterns

_Define these based on your actual codebase_

### Framework & Stack

- Framework: [Next.js/React/Vue/etc.]
- State Management: [Redux/Zustand/Context/etc.]
- Styling: [Tailwind/Styled Components/CSS Modules/etc.]
- Database: [PostgreSQL/MongoDB/etc.]
- Language: [TypeScript/JavaScript/Python/Go/etc.]

### Type System Rules

- ❌ No 'any' types allowed
- ❌ No inline type definitions in components
- ❌ No raw API calls without error handling
- ✅ All API responses have interfaces
- ✅ Use discriminated unions for states
- ✅ Validation schemas for all forms

### File Structure Standards

```
/src
  /components    # Reusable UI components
  /pages        # Route components
  /lib          # Utilities and shared logic
  /types        # ALL TypeScript interfaces
  /hooks        # Custom React hooks
  /services     # API and external calls
  /utils        # Pure utility functions
```

### Code Signatures (Enforce These Patterns)

```typescript
// All API calls use this pattern:
const result = await apiCall<ResponseType>();
if (result.error) return handleError(result.error);

// All components use this structure:
interface ComponentProps {
  // props here
}
export function Component({ prop1, prop2 }: ComponentProps) {
  // implementation
}

// State updates always use this pattern:
const updateState = useCallback((newData) => {
  setState((prev) => ({ ...prev, ...newData }));
}, []);
```

### Data Flow Rules

1. **Components** → never fetch data directly, use hooks
2. **API calls** → only through /services layer
3. **Types** → defined once in /types, imported everywhere
4. **Forms** → always use validation schemas
5. **Errors** → Result<T, E> pattern, no raw throws
6. **State** → immutable updates only

### Naming Conventions

- **Files**: kebab-case (user-profile.tsx)
- **Components**: PascalCase (UserProfile)
- **Functions**: camelCase (getUserProfile)
- **Constants**: SCREAMING_SNAKE_CASE (API_BASE_URL)
- **Types**: PascalCase with descriptive names (UserProfileData)

## Current Implementation Status

_Update this as you implement features_

- [x] Authentication system (lib/auth.ts)
- [x] User management (services/user.ts)
- [ ] Dashboard implementation
- [ ] Settings page
- [ ] API integration complete

## Known Technical Debt

_Track specific issues that need addressing_

- UserProfile component uses 'any' type (src/components/UserProfile.tsx)
- Duplicate auth logic in login.tsx and register.tsx
- Missing error boundaries in dashboard routes
- API service lacks proper retry logic
- Form validation inconsistent across components

## Established Patterns (Don't Break These)

_Document patterns as you establish them_

### Error Handling Pattern

```typescript
// Established: 2024-01-15
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

// Use everywhere for async operations
```

### Component Structure Pattern

```typescript
// Established: 2024-01-16
// All components follow this exact structure:
interface Props {
  // props
}

export function ComponentName({ ...props }: Props) {
  // 1. Hooks
  // 2. Derived state
  // 3. Event handlers
  // 4. Effects
  // 5. Render
}
```

### API Service Pattern

```typescript
// Established: 2024-01-17
// All API calls through services with this signature:
export async function apiCall<T>(params: RequestParams): Promise<Result<T>> {
  try {
    const response = await fetch(/* ... */);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
```

## Anti-Patterns (Never Do These)

- Direct database queries in components
- Inline styles (use className only)
- Global state mutations
- Untyped API responses
- Copy-paste code blocks
- Mixed async/sync error handling
