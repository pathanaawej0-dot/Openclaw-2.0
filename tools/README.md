# OpenClaw Dynamic Tools System 🦞

**"Build Your Own Road"** - Self-Evolving Agent Capabilities

## What Is This?

A revolutionary system where OpenClaw agents can **create their own tools** when they encounter capability gaps. Instead of waiting for humans to add tools, agents can:

1. **Identify** what they need
2. **Write** TypeScript code for new tools
3. **Test** their implementations
4. **Debug** any issues
5. **Register** the tool for everyone to use

This is **"build your own road"** - agents aren't just walking on roads we build; they're building their own highways.

---

## Architecture

```
/openclaw/tools/
├── SYSTEM_PROMPT.md     ← Developer mode instructions
├── instructions.md       ← How to build tools
├── REGISTRY.md          ← Tool inventory
├── README.md            ← This file
└── dynamic/             ← Agent-created tools
    ├── sample-json-parser/
    │   ├── tool.ts
    │   └── test.ts
    └── timestamp-converter/
        ├── tool.ts
        └── test.ts
```

---

## How It Works

### 1. Developer Mode

When an agent needs a capability that doesn't exist, it reads:
- `/tools/SYSTEM_PROMPT.md` - Enters developer mode
- `/tools/instructions.md` - Gets building instructions
- `/tools/REGISTRY.md` - Sees what tools exist

### 2. Create a Tool

```bash
# Agent creates directory
mkdir /tools/dynamic/<tool-name>/

# Agent writes tool.ts with TypeScript code
# Agent writes test.ts with tests
```

### 3. Test & Debug

```bash
# Test the tool
tsx /tools/dynamic/<tool-name>/tool.ts

# Run test suite
tsx /tools/dynamic/<tool-name>/test.ts

# Debug with logs
tsx /tools/dynamic/<tool-name>/tool.ts > /tools/dynamic/<tool-name>/log.txt 2>&1
```

### 4. Register & Use

Agent updates `/tools/REGISTRY.md` to add the new tool, then uses it like any built-in tool.

---

## Example: Creating a New Tool

### Step 1: Identify Gap
Agent: "I need to URL-encode strings but no tool exists."

### Step 2: Create Tool
```bash
mkdir /tools/dynamic/url-encoder/
```

### Step 3: Write Code (tool.ts)
```typescript
const TOOL_NAME = "url-encoder";
const TOOL_VERSION = "1.0.0";

export async function main(args: { text: string }): Promise<{ result: string }> {
  return {
    result: encodeURIComponent(args.text),
    tool: TOOL_NAME,
    version: TOOL_VERSION
  };
}
```

### Step 4: Test
```bash
tsx /tools/dynamic/url-encoder/tool.ts "hello world"
# Output: hello%20world ✓
```

### Step 5: Register
Update REGISTRY.md with the new tool.

---

## Tool Structure

Every tool must follow this structure:

```
/tools/dynamic/<tool-name>/
├── tool.ts           # Main implementation
├── test.ts           # Tests (optional but recommended)
├── log.txt           # Execution logs (auto-generated)
└── README.md         # Documentation (optional)
```

### tool.ts Template

```typescript
/**
 * Tool Name - Brief Description
 */

const TOOL_NAME = "tool-name";
const TOOL_VERSION = "1.0.0";
const TOOL_DESCRIPTION = "What this tool does";

interface Args {
  // Define arguments
}

interface Result {
  success: boolean;
  result?: any;
  error?: string;
  tool: string;
  version: string;
}

export async function main(args: Args): Promise<Result> {
  try {
    // Implementation
    return {
      success: true,
      result: /* ... */,
      tool: TOOL_NAME,
      version: TOOL_VERSION
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      tool: TOOL_NAME,
      version: TOOL_VERSION
    };
  }
}

// Direct execution
if (process.argv[1]?.includes(TOOL_NAME)) {
  // Handle CLI execution
}
```

---

## Available Tools

See [REGISTRY.md](REGISTRY.md) for the current list of agent-created tools.

---

## Tool Categories

Organize new tools by purpose:

- `data-processing/` - JSON, CSV, XML, data transformation
- `communication/` - Email, webhooks, messaging
- `file-tools/` - File manipulation
- `integration/` - API connectors
- `utilities/` - General utilities
- `automation/` - Task automation

---

## Best Practices

### 1. Write Clean Code
- Use TypeScript with proper types
- Add JSDoc comments
- Follow consistent naming

### 2. Test Thoroughly
- Write unit tests in test.ts
- Test edge cases
- Verify error handling

### 3. Document Everything
- Add README.md for complex tools
- Comment your code
- Update REGISTRY.md

### 4. Error Handling
Always return:
```typescript
{
  success: boolean,
  result?: any,
  error?: string
}
```

### 5. Versioning
- Start with 1.0.0
- Increment major for breaking changes
- Increment minor for new features

---

## Commands Available to Agents

Agents can use these OpenClaw tools to build:

- `read` - Read files
- `write` - Create/overwrite files
- `edit` - Modify files
- `exec` - Run shell commands (tsx, ts-node, node)

---

## Why This Is Revolutionary

| Feature | Traditional Agents | This System |
|---------|-------------------|-------------|
| Tool creation | Human developers only | Agents can create |
| Capability gaps | Wait for updates | Agent fills them |
| Tool library | Static | Dynamically growing |
| Learning | Context-only | Persistent tools |
| Evolution | Manual updates | Self-evolving |

---

## Security Considerations

Currently, agents have full trust. Future enhancements may include:
- Sandboxing for agent-created tools
- Human approval for new tools
- Tool code review requirements
- Permission manifests

---

## Success Criteria

✅ Agent can identify capability gaps  
✅ Agent can write TypeScript code  
✅ Agent can test and debug  
✅ Tools persist across sessions  
✅ All agents can use shared tools  
✅ Agent modifies/fixes its own tools  

---

## Future Enhancements

- [ ] Auto-discovery of tools in dynamic folder
- [ ] Tool dependencies and imports
- [ ] Package management for tools
- [ ] Tool versioning and history
- [ ] Collaborative tool development
- [ ] Security sandboxing
- [ ] Tool marketplace

---

## Contributing

To add a new tool:

1. Create `/tools/dynamic/<tool-name>/tool.ts`
2. Write comprehensive tests
3. Test thoroughly with `tsx` or `ts-node`
4. Update [REGISTRY.md](REGISTRY.md)
5. Document in tool-specific README.md

---

## License

Part of OpenClaw. See OpenClaw repository for license.

---

**Built with ❤️ by OpenClaw agents**

*"The road is not given. The road is built."*
