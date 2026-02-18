# Developer Instructions - How to Build Tools

## Overview

When you need a capability that doesn't exist, **build it yourself**. This guide shows you how to create, test, and deploy tools in `/tools/dynamic/`.

---

## Step 1: Identify the Gap

Ask yourself:
- "What capability am I missing?"
- "What would make this task easier?"
- "Is there a tool I can use, or do I need to create one?"

---

## Step 2: Create Tool Directory

```bash
mkdir /tools/dynamic/<tool-name>/
```

Example: `mkdir /tools/dynamic/json-parser/`

---

## Step 3: Write Your Tool (tool.ts)

Every tool follows this structure:

```typescript
// Tool metadata
const TOOL_NAME = "json-parser";
const TOOL_VERSION = "1.0.0";
const TOOL_DESCRIPTION = "Parse JSON strings and extract data";

// Main function
export async function main(args: {
  json: string;
  path?: string;
}): Promise<{ result: any; success: boolean }> {
  try {
    const data = JSON.parse(args.json);
    
    // If path is provided, extract that value
    if (args.path) {
      const keys = args.path.split(".");
      let result = data;
      for (const key of keys) {
        result = result[key];
      }
      return { result, success: true };
    }
    
    return { result: data, success: true };
  } catch (error) {
    return { 
      result: `Error: ${error instanceof Error ? error.message : String(error)}`,
      success: false 
    };
  }
}

// If running directly
if (process.argv[1]?.includes(TOOL_NAME)) {
  const input = process.argv[2] || '{"test": "value"}';
  main({ json: input }).then(console.log);
}
```

---

## Step 4: Write Tests (test.ts)

```typescript
import { main } from "./tool.js";

async function runTests() {
  console.log("Running tests for json-parser...");
  
  const test1 = await main({ json: '{"name": "test"}' });
  console.assert(test1.success, "Test 1 failed");
  console.log("✓ Test 1 passed");
  
  const test2 = await main({ json: '{"name": "test", "nested": {"value": 123}}', path: "nested.value" });
  console.assert(test2.result === 123, "Test 2 failed");
  console.log("✓ Test 2 passed");
  
  console.log("All tests passed!");
}

runTests().catch(console.error);
```

---

## Step 5: Test Your Tool

```bash
# Run the main function
tsx /tools/dynamic/json-parser/tool.ts '{"test": "data"}'

# Run tests
tsx /tools/dynamic/json-parser/test.ts
```

---

## Step 6: Debug with Logs

If something doesn't work:

```bash
# Run and capture output
tsx /tools/dynamic/json-parser/tool.ts '{"test": "data"}' > /tools/dynamic/json-parser/log.txt 2>&1

# Read the log
read /tools/dynamic/json-parser/log.txt
```

---

## Step 7: Update REGISTRY.md

Add your tool to the registry:

```markdown
## Available Tools

| Tool | Status | Version | Created By | Date | Description |
|------|--------|---------|------------|------|-------------|
| json-parser | active | 1.0.0 | agent:main | 2026-02-17 | Parse JSON strings and extract data |
```

---

## Best Practices

### 1. Clear Naming
- Use kebab-case: `json-parser`, `email-sender`, `url-shortener`
- Descriptive: `pdf-extractor` not `pdf`

### 2. Error Handling
```typescript
try {
  // your code
} catch (error) {
  return {
    success: false,
    error: error instanceof Error ? error.message : "Unknown error"
  };
}
```

### 3. Documentation
Add JSDoc comments to your functions:

```typescript
/**
 * Parses a JSON string and optionally extracts a value at a path.
 * @param json - The JSON string to parse
 * @param path - Optional dot-notation path (e.g., "user.name")
 * @returns The parsed result or extracted value
 */
export async function main(args: { json: string; path?: string }): Promise<{ result: any; success: boolean }> {
  // implementation
}
```

### 4. Versioning
Increment version when you make breaking changes:
- `1.0.0` - Initial release
- `1.1.0` - New features
- `2.0.0` - Breaking changes

### 5. Tool Categories
Organize by purpose:
- `data-processing/` - JSON, CSV, XML tools
- `communication/` - Email, webhook tools
- `file-tools/` - File manipulation
- `integration/` - API connectors

---

## Common Patterns

### Reading Input
```typescript
// From command line
const input = process.argv[2];

// From file
const content = await fs.readFile("/path/to/file", "utf-8");
```

### Writing Output
```typescript
// To console
console.log(JSON.stringify(result));

// To file
await fs.writeFile("/path/to/output.json", JSON.stringify(result));
```

### Return Format
```typescript
return {
  success: boolean,
  result?: any,
  error?: string,
  data?: any, // alternative to result
  message?: string
};
```

---

## Troubleshooting

### "Cannot find module"
- Make sure you're in the right directory
- Check file paths
- Verify TypeScript compilation

### "Syntax error"
- Check for missing braces, parentheses
- Ensure proper TypeScript syntax
- Run `tsx` to see detailed errors

### "Tool not working"
- Check log.txt for errors
- Test in isolation
- Add console.log statements for debugging

---

## Example Tools

### Example 1: URL Encoder
```
/tools/dynamic/url-encoder/
├── tool.ts
└── test.ts
```

### Example 2: Email Sender
```
/tools/dynamic/email-sender/
├── tool.ts
├── test.ts
└── templates/
    └── welcome.html
```

### Example 3: Data Validator
```
/tools/dynamic/data-validator/
├── tool.ts
├── schemas/
│   └── user.json
└── test.ts
```

---

## Next Steps

1. Start small - build simple tools first
2. Test thoroughly before moving on
3. Document everything
4. Update REGISTRY.md
5. Share tools with other agents

Good luck, developer! 🚀
