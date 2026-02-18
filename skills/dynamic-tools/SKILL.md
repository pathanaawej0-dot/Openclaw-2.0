---
name: dynamic-tools
description: Create, test, and run custom TypeScript tools on-the-fly when you encounter a capability gap. Use when the user needs something you cannot do with built-in tools — e.g. a specialized data transformer, API wrapper, file processor, or any reusable utility. The tool is written to tools/dynamic/<tool-name>/tool.ts, tested with npx tsx, and registered in tools/REGISTRY.md. After creation, run it via the exec tool.
---

# Dynamic Tools

When you hit a capability gap, create a TypeScript tool in `tools/dynamic/` and run it via `exec`.

## Workflow

1. **Identify the gap** — what built-in tool is missing?
2. **Create the tool directory**: `tools/dynamic/<tool-name>/`
3. **Write `tool.ts`** — see structure below
4. **Test it**: `npx tsx tools/dynamic/<tool-name>/tool.ts`
5. **Register it** in `tools/REGISTRY.md`
6. **Use it** via `exec`: `npx tsx tools/dynamic/<tool-name>/tool.ts <args>`

## Tool Structure

```typescript
const TOOL_NAME = "my-tool";
const TOOL_VERSION = "1.0.0";

interface Args { input: string }
interface Result { success: boolean; result?: any; error?: string; tool: string; version: string }

export async function main(args: Args): Promise<Result> {
  try {
    // your logic here
    return { success: true, result: "...", tool: TOOL_NAME, version: TOOL_VERSION };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error), tool: TOOL_NAME, version: TOOL_VERSION };
  }
}

// CLI execution support
if (import.meta.url === `file://${process.argv[1]}`) {
  const args: Args = { input: process.argv[2] ?? "" };
  main(args).then(r => console.log(JSON.stringify(r, null, 2)));
}
```

## Running Tools

```bash
# Run directly
npx tsx tools/dynamic/<tool-name>/tool.ts "<arg1>" "<arg2>"

# Run via exec tool
exec({ command: "npx tsx tools/dynamic/my-tool/tool.ts \"hello\"", workdir: "<workspace-root>" })
```

> **Important:** Always use `workdir` pointing to the workspace root so relative paths resolve correctly.

## REGISTRY.md Format

After a tool works, add a row to `tools/REGISTRY.md`:

```markdown
| <tool-name> | active | 1.0.0 | agent:main | YYYY-MM-DD | <description> |
```

## Rules

- Always use `npx tsx` (not bare `tsx`) — it works without a global install
- Use relative paths from workspace root, not absolute paths
- Return structured JSON: `{ success, result?, error?, tool, version }`
- Write a test case in `tool.ts` under the CLI block to verify it works
- Keep tools focused — one tool, one job

## Existing Tools

Check `tools/REGISTRY.md` before creating a new tool — it may already exist.

| Tool | What it does |
|------|-------------|
| `url-encoder` | Encode/decode URL strings |
| `sample-json-parser` | Parse JSON + dot-notation path extraction |
| `timestamp-converter` | Unix timestamp ↔ human-readable date |
