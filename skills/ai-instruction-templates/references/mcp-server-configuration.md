# MCP Server Configuration

This file documents the Model Context Protocol (MCP) servers available in your environment. It helps the AI understand which tools it can use for tasks involving memory, filesystem operations, web interaction, etc.

## How to Provide Your MCP Configuration

1. Open Cursor Settings (Cmd+, or Ctrl+,)
2. Go to the 'MCP' section
3. Click 'Add new global MCP server' (opens `mcp.json`)
4. With `mcp.json` open, return to chat and provide context using @

## Available MCP Servers

### Example Server Format

```
### MCP Server Name
Purpose: Provides file system access for reading/writing files
When to Use: For file operations (read, write, check existence)
Key Commands: `read_file`, `write_file`, `file_exists`, `list_directory`
Usage Instructions: Always use absolute file paths
```

### Server Template

```
### MCP Server
Purpose: 
When to Use: 
Key Commands: 
Usage Instructions: 
Access Scope: 
Authentication: 
Rate Limits: 
Error Handling: 
```

## Important Notes

- Always use absolute paths for filesystem operations
- Tool descriptions are derived from available tool descriptions in your configuration

## Code Generation Tools

### Using MCP Servers for Code Generation

- **Filesystem MCP**: Use for creating new files or modifying existing ones
- **Memory MCP**: Use for storing project patterns the AI should reference
- **Sequential-thinking MCP**: Use for breaking down complex code generation tasks

### Best Practices

- **Always check if a file exists** before attempting to create it
- **Make backups before modifying critical files**
- **Use appropriate error handling** when accessing MCP capabilities
- **Remember path contexts** when generating file paths
- **Store generated code patterns** in memory for reuse
- **Break down complex code generation** into logical sequences
- **Favor atomic operations** over complex chained commands
- **Use checkpointing** for long-running operations to prevent data loss
- **Implement verification steps** after file operations
- **Include proper error recovery** mechanisms for failed operations

### Token Management with MCP

- **Chunked File Processing**: Break large files into manageable segments when reading or modifying
- **Progressive Implementation**: Use a step-by-step approach for complex coding tasks
- **Context Windowing**: Focus on relevant portions of code when working with large files
- **Modular Approach**: Create or modify related files in logical, functional groups
- **State Preservation**: Use memory MCP to track state across operations

### Stack-Specific MCP Usage

#### Next.js and Supabase Stack

- Use filesystem MCP to scaffold appropriate Next.js project structure (see `stacks/Supabase-NextJS-Stack.mdc`)
- Use memory MCP to store Supabase schema definitions and access patterns
- Store authentication patterns for quick reference when implementing protected routes
- Use sequential-thinking for complex data flow implementations

#### tRPC Full-Stack

- Use filesystem MCP to create proper router structure (see `stacks/TRPC-FullStack.mdc`)
- Store procedure patterns in memory for consistent implementation
- Leverage sequential-thinking for designing type-safe API flows

#### Astro Content Stack

- Use filesystem MCP for proper content structure creation (see `stacks/Astro-Content-Stack.mdc`)
- Store MDX patterns in memory for consistent authoring
- Use sequential-thinking for planning SSG/SSR strategies

#### E-commerce Stack

- Use memory MCP to store product, cart, and checkout flows (see `stacks/Ecommerce-Stack.mdc`)
- Use sequential-thinking for complex payment integration processes
- Implement filesystem operations for proper commerce layer setup

#### React Native Mobile Stack

- Store mobile navigation patterns in memory (see `stacks/ReactNative-Mobile-Stack.mdc`)
- Use sequential-thinking for cross-platform implementation strategies
- Leverage filesystem MCP for proper project structure setup

### Code Generation Patterns

#### File Creation Pattern

```
1. Check if file exists (avoid overwriting)
2. Analyze project structure to determine appropriate location
3. Create necessary parent directories
4. Write file with proper imports and dependencies
5. Confirm creation success
```

#### Code Modification Pattern

```
1. Read existing file content
2. Analyze structure and patterns
3. Make targeted modifications
4. Verify changes won't break existing functionality
5. Write changes back to file
```

#### Long File Handling Pattern

```
1. Create a map of file sections and logical boundaries
2. Read the file in manageable chunks
3. Focus operations on specific sections
4. Maintain contextual awareness across sections
5. Apply changes incrementally
6. Verify each change before proceeding
```

#### Error Recovery Pattern

```
1. Implement backups before modifications
2. Use atomic operations where possible
3. Verify success after each operation
4. Implement rollback capabilities
5. Maintain state tracking for resumption
```

#### Sequential Implementation Pattern

```
1. Break down complex task into logical steps
2. Start with interface/contract definitions
3. Implement core functionality first
4. Add error handling and edge cases
5. Optimize and refine
6. Test each component before proceeding
```

---
NOTE TO AI:

- Populate this file based on user's `.cursor/mcp.json`
- For each server, list name and brief description of purpose/commands
- Include relevant configuration details (paths, environment variables, etc.)
- Remove example section when populating with actual MCP servers

---
