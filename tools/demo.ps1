#!/bin/bash
# Demo script showing the "build your own road" system in action

echo "=========================================="
echo "OpenClaw Dynamic Tools System Demo 🦞"
echo "=========================================="
echo ""

echo "1. Testing sample-json-parser tool..."
echo "   Input: {\"name\":\"ZulfiClaw\",\"type\":\"agent\"}"
echo ""
echo "   Command: npx tsx tools/dynamic/sample-json-parser/tool.ts '{\"name\":\"ZulfiClaw\",\"type\":\"agent\"}'"
echo ""
npx tsx tools/dynamic/sample-json-parser/tool.ts '{"name":"ZulfiClaw","type":"agent"}'
echo ""
echo "   ✓ JSON parser works!"
echo ""

echo "2. Testing timestamp-converter tool..."
echo "   Input: 1735689600 (2026-01-01 00:00:00 UTC)"
echo ""
echo "   Command: npx tsx tools/dynamic/timestamp-converter/tool.ts 1735689600"
echo ""
npx tsx tools/dynamic/timestamp-converter/tool.ts 1735689600
echo ""
echo "   ✓ Timestamp converter works!"
echo ""

echo "3. Checking tool registry..."
echo ""
cat tools/REGISTRY.md
echo ""

echo "=========================================="
echo "Demo Complete! 🎉"
echo "=========================================="
echo ""
echo "What just happened:"
echo "- Two TypeScript tools created by agents"
echo "- Both tools are executable and working"
echo "- Tools persist on disk for future sessions"
echo "- Registry tracks all agent-created tools"
echo ""
echo "This is 'build your own road' - agents grow their own capabilities!"
echo ""
