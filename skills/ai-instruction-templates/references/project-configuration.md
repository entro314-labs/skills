# Project Configuration

## 1. Project Overview

- Project Name:
- Brief Description:
- Repository URL (e.g., GitHub):
- Main Branch Name:
- Website / Deployment URL:

## 2. Technical Stack

# List the primary technologies and versions if known

# For comprehensive guidance on common technology stacks, refer to /stacks directory files

# - Supabase-NextJS-Stack.mdc: Next.js + Supabase full-stack

# - NextJS-Enterprise-Stack.mdc: Next.js + Prisma + Enterprise patterns

# - TRPC-FullStack.mdc: Next.js/SvelteKit with end-to-end type safety via tRPC

# - Astro-Content-Stack.mdc: Content-focused sites with Astro

# - Ecommerce-Stack.mdc: E-commerce patterns with various providers

# - ReactNative-Mobile-Stack.mdc: Mobile app development with React Native

- Programming Language(s):
- Frontend Framework/Libraries:
- Backend Framework/Libraries:
- Database(s) & ORM/ODM:
- Authentication Method/Library:
- State Management (Frontend):
- UI Component Library:
- Testing Frameworks/Libraries:
- Build Tools/Bundlers:
- Package Manager (npm, yarn, pnpm, etc.):
- Deployment Platform/Environment:
- Other Key Libraries/Tools:

## 3. Project Structure

# Briefly describe the main source code directories and their purpose

# Example

# - `/src/app`: Next.js App Router pages/layouts

# - `/src/components`: Reusable UI components

# - `/src/lib`: Utility functions, shared code, types

# - `/prisma`: Database schema and migrations

# - `/scripts`: Utility/automation scripts

- `/`:
- `/`:
- `/`:
- `/`:
- `/`:

## 4. Coding Conventions & Standards

# Specify any enforced or preferred conventions

- Naming Conventions:
  - Files:
  - Directories:
  - Variables/Functions:
  - Classes/Components:
  - CSS Classes:
- Formatting Tool (e.g., Prettier): (Yes/No? If yes, are defaults used?)
- Linter Tool (e.g., ESLint, RuboCop): (Yes/No? Specify config if non-standard)
- Code Style Preferences: (e.g., single vs double quotes, semicolon usage, functional vs class components)
- Path Aliases (e.g., `@/*` -> `src/*`):
- Commenting Style:

## 5. Key Abstractions & Patterns

# List any important custom hooks, utility functions, base classes, or design patterns the AI should prioritize using

# Example

# - Always use the `useApiData()` hook (in `src/hooks/`) for data fetching

# - Use the `logger` utility (in `src/lib/logger.ts`) for all server-side logging

# - Follow the Repository pattern for database access

-
-
-

## 6. Important Notes or Constraints

# Any other critical information the AI should know? (e.g., performance constraints, specific browser support, accessibility requirements)

-
-

## 7. AI Code Generation Preferences

# Specify preferences that guide how AI generates code for this project

### Token and Context Management

- **Context Window Optimization**: Place long-form data at the top of prompts, followed by specific instructions.
- **Strategic Chunking**: Process code in logical, functional units rather than attempting to generate very large files at once.
- **Sectional References**: Use XML tags to structure document content and metadata for clarity.
- **Quote-Based Grounding**: Extract and reference specific parts of existing code before modifying them.

### Progressive Generation

- **Start with Interfaces**: Begin with interface/contract definitions to establish boundaries between components.
- **Use Skeleton-First Approach**: Generate structural scaffolding before filling in implementation details.
- **Prioritize Dependencies**: Create foundational components before dependent ones to maintain logical flow.

### Long File Handling

- **When File Splitting is Possible**:
  - Use modular organization with clear separation of concerns
  - Use index files to re-export functionality from multiple implementation files
  - Create each component in dependency order to ensure completeness
- **When Working with Large Single Files**:
  - Work on one clearly defined section at a time with explicit section markers
  - Make targeted changes to specific functions/methods rather than regenerating entire files
  - Include only the immediate context needed for the current change plus minimal surrounding code
  - Add status comments to track implementation progress across sessions

### Code Organization and Structure

- Preferred Component Structure:
- State Management Pattern:
- Error Handling Strategy:
- Documentation Style:
- Typical File Organization:
- Common Utility Functions:
- Standard Import Pattern:
- Logging Approach:
- Testing Strategy:

## 8. Representative Code Examples

# Provide examples of well-structured code that AI should emulate when generating new code

### Example Component

```
// Paste a representative component here
```

### Example API Function

```
// Paste a representative API function here
```

---
NOTE TO AI: Remove this line, once project-context is filled out. If this file is largely empty, rely primarily on analyzing the codebase directly for context. You may politely prompt the user to fill out relevant sections if it would significantly improve assistance for a specific task.
