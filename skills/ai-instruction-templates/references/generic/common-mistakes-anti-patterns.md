# Common Mistakes & Anti-Patterns for This Project

This file lists patterns the AI should actively avoid when working on this specific codebase.

## Format Guide

Use the following structure for each entry:

```
### MISTAKE: [Short Description of the Mistake]
- [PATTERN]: Describe when or how the mistake typically occurs.
- [BAD_EXAMPLE]: (Optional) Show a concise code snippet of the incorrect way.
- [GOOD_EXAMPLE]: Show a concise code snippet of the correct way.
- [SOLUTION/RULE]: Clearly state the rule or the correct approach to follow.
- [CONTEXT/REASON]: (Optional) Explain why the correct way is preferred (e.g., performance, maintainability, project standard).
- [REFERENCE]: (Optional) Link to relevant documentation, style guide section, or issue tracker.
```

## Project-Specific Mistakes (User: Add your entries below)

### MISTAKE

- [PATTERN]:
- [BAD_EXAMPLE]:
- [GOOD_EXAMPLE]:
- [SOLUTION/RULE]:
- [CONTEXT/REASON]:
- [REFERENCE]:

## AI Code Generation Anti-Patterns

### MISTAKE: Over-complicated abstraction layers

- [PATTERN]: AI tends to create unnecessary abstraction layers when simpler solutions exist
- [BAD_EXAMPLE]: Creating complex inheritance hierarchies for simple data structures
- [GOOD_EXAMPLE]: Using composition and simple interfaces
- [SOLUTION/RULE]: Favor composition over inheritance, keep abstractions minimal
- [CONTEXT/REASON]: Simpler code is easier to maintain and understand

### MISTAKE: Introducing non-standard patterns

- [PATTERN]: AI introduces design patterns not consistent with the rest of the codebase
- [BAD_EXAMPLE]: Using Redux patterns in a project using React Context
- [GOOD_EXAMPLE]: Following existing state management approach
- [SOLUTION/RULE]: Always match the patterns already established in the codebase
- [CONTEXT/REASON]: Consistency makes code more maintainable and reduces cognitive load

### MISTAKE: Generated code that doesn't match project style

- [PATTERN]: AI generates code that follows different style conventions than the project
- [BAD_EXAMPLE]: Using camelCase in a project that uses snake_case
- [GOOD_EXAMPLE]: Consistent naming following project conventions
- [SOLUTION/RULE]: Always inspect existing code to determine style patterns
- [CONTEXT/REASON]: Consistent style makes code more readable and maintainable

### MISTAKE: Long file generation failures

- [PATTERN]: Attempting to generate very large files in a single operation
- [BAD_EXAMPLE]: Trying to create a 1000+ line file in one go
- [GOOD_EXAMPLE]: Breaking the file into logical components with clear boundaries
- [SOLUTION/RULE]: Use structural chunking and progressive implementation for large files
- [CONTEXT/REASON]: Token limits and context management require strategic approach to large files

### MISTAKE: Improper tool usage in agentic workflows

- [PATTERN]: Using wrong tools or calling tools with incorrect parameters
- [BAD_EXAMPLE]: Using text_editor_tool without proper parameter validation
- [GOOD_EXAMPLE]: Implementing pre-execution checks and clear parameter validation
- [SOLUTION/RULE]: Validate tool parameters and verify tool selection before execution
- [CONTEXT/REASON]: Proper tool usage prevents errors and maintains workflow integrity

### MISTAKE: Failed file writing operations

- [PATTERN]: Attempting to write files without proper error handling or verification
- [BAD_EXAMPLE]: Writing files without checking success or implementing fallbacks
- [GOOD_EXAMPLE]: Using atomic write operations with verification and rollback capabilities
- [SOLUTION/RULE]: Always implement proper error handling and verification for file operations
- [CONTEXT/REASON]: File operation failures can lead to data loss or inconsistent states

### MISTAKE: Messy code organization in large files

- [PATTERN]: Generating unstructured code without clear section boundaries
- [BAD_EXAMPLE]: Mixing concerns and functionality without logical organization
- [GOOD_EXAMPLE]: Using explicit section markers and logical grouping of related code
- [SOLUTION/RULE]: Implement sectional editing and clear organizational boundaries in large files
- [CONTEXT/REASON]: Well-organized code is easier to maintain and understand

## Language-Specific Generation Issues

### MISTAKE: Outdated JavaScript syntax

- [PATTERN]: Using older JS syntax instead of modern ES6+ features
- [BAD_EXAMPLE]: Using var and function expressions instead of const/let and arrow functions
- [GOOD_EXAMPLE]: Using const/let, arrow functions, destructuring, etc.
- [SOLUTION/RULE]: Always use modern language features appropriate to the project
- [CONTEXT/REASON]: Modern syntax improves code readability and reduces errors
- [REFERENCE]: See `languages/TypeScript-Modern.mdc` for modern TypeScript patterns

### MISTAKE: Mixing TypeScript and JavaScript patterns

- [PATTERN]: Generating TypeScript-like code in JavaScript projects or vice versa
- [BAD_EXAMPLE]: Using explicit type annotations in a pure JavaScript project
- [GOOD_EXAMPLE]: Using JSDoc comments for types in JavaScript, proper TypeScript in TS projects
- [SOLUTION/RULE]: Match the typing approach of the existing codebase
- [CONTEXT/REASON]: Consistency with project patterns is important for maintainability

### MISTAKE: Token size limitation failures

- [PATTERN]: Not respecting token size limitations when generating or modifying code
- [BAD_EXAMPLE]: Trying to handle a 5000-line file in a single operation
- [GOOD_EXAMPLE]: Breaking down tasks into smaller, manageable chunks with clear boundaries
- [SOLUTION/RULE]: Use modular file organization and strategic chunking to handle large code bases
- [CONTEXT/REASON]: Token limits are a fundamental constraint that must be managed strategically

## Technology Stack Anti-Patterns

### MISTAKE: Incorrect React Server Components usage

- [PATTERN]: Using client-side hooks or state in server components
- [BAD_EXAMPLE]: `export default function ServerComponent() { const [state, setState] = useState(null); }`
- [GOOD_EXAMPLE]: `export default function ServerComponent() { /* server-only code */ }` or marking with `'use client'` when needed
- [SOLUTION/RULE]: Follow the App Router patterns in `stacks/NextJS-Enterprise-Stack.mdc` and `stacks/Supabase-NextJS-Stack.mdc`
- [CONTEXT/REASON]: Mixing client and server code breaks the component model and causes runtime errors

### MISTAKE: Inefficient Supabase data fetching

- [PATTERN]: Not using RLS policies properly, causing excessive data fetching
- [BAD_EXAMPLE]: Fetching all records then filtering client-side
- [GOOD_EXAMPLE]: Using proper query filters on the server side with RLS policies
- [SOLUTION/RULE]: Follow patterns in `stacks/Supabase-NextJS-Stack.mdc` for efficient data access
- [CONTEXT/REASON]: Improper data fetching hurts performance and security

### MISTAKE: Missing end-to-end type safety with tRPC

- [PATTERN]: Not leveraging the full type safety capabilities of tRPC
- [BAD_EXAMPLE]: Using any or unknown types in tRPC procedures
- [GOOD_EXAMPLE]: Using zod schemas and leveraging type inference throughout the stack
- [SOLUTION/RULE]: Follow the type-safe patterns in `stacks/TRPC-FullStack.mdc`
- [CONTEXT/REASON]: tRPC's primary benefit is lost without proper typing

### MISTAKE: Mixing client and server code in Astro

- [PATTERN]: Not understanding Astro's islands architecture
- [BAD_EXAMPLE]: Putting client-side logic in Astro components without proper directives
- [GOOD_EXAMPLE]: Using client: directives only when needed, keeping most code server-rendered
- [SOLUTION/RULE]: Follow the patterns in `stacks/Astro-Content-Stack.mdc`
- [CONTEXT/REASON]: Incorrect component architecture defeats Astro's performance benefits

## Extended Thinking and Context Management

### MISTAKE: Not utilizing extended thinking for complex problems

- [PATTERN]: Attempting to solve complex logical problems without proper reasoning
- [BAD_EXAMPLE]: Generating complex algorithms or data structures without step-by-step reasoning
- [GOOD_EXAMPLE]: Using extended thinking to work through the problem methodically
- [SOLUTION/RULE]: Enable extended thinking for complex code generation tasks
- [CONTEXT/REASON]: Complex problem-solving benefits from explicit reasoning steps

### MISTAKE: Poor context management with large codebases

- [PATTERN]: Not prioritizing relevant context when working with large codebases
- [BAD_EXAMPLE]: Including entire file contents when only portions are relevant
- [GOOD_EXAMPLE]: Using strategic chunking and sectional analysis to focus on relevant code
- [SOLUTION/RULE]: Prioritize context organization and use quote-based grounding
- [CONTEXT/REASON]: Efficient context management is essential for working with large codebases

### MISTAKE: Failure to isolate modular components

- [PATTERN]: Creating tightly coupled components with unclear boundaries
- [BAD_EXAMPLE]: Mixing business logic, UI, and data access in a single component
- [GOOD_EXAMPLE]: Creating clearly separated components with defined interfaces
- [SOLUTION/RULE]: Start with interfaces and boundaries before implementation details
- [CONTEXT/REASON]: Modular design improves maintainability and testability
