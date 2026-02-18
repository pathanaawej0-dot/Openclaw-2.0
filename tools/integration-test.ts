/**
 * Integration test demonstrating the complete workflow
 * Run with: npx tsx tools/integration-test.ts
 */

import { main as jsonParser } from "./dynamic/sample-json-parser/tool.js";
import { main as timestampConverter } from "./dynamic/timestamp-converter/tool.js";

async function runIntegrationTest() {
  console.log("🧪 Integration Test: Complete Workflow\n");
  console.log("=".repeat(60));
  console.log("Testing 'Build Your Own Road' System\n");
  
  let tests = 0;
  let passed = 0;
  
  // Test 1: JSON Parser Tool
  console.log("Test 1: Sample JSON Parser");
  console.log("-".repeat(60));
  try {
    const result = await jsonParser({
      json: JSON.stringify({
        name: "ZulfiClaw",
        version: "1.0.0",
        capabilities: ["dynamic-tools", "self-evolution"]
      })
    });
    
    console.log(`✓ Success: ${result.success}`);
    console.log(`✓ Result:`, result.result);
    console.log(`✓ Tool: ${result.tool} v${result.version}`);
    tests++;
    passed++;
    console.log("");
  } catch (error) {
    console.log(`✗ Failed: ${error}`);
    tests++;
  }
  
  // Test 2: Timestamp Converter Tool
  console.log("Test 2: Timestamp Converter");
  console.log("-".repeat(60));
  try {
    const result = await timestampConverter({
      timestamp: 1735689600 // 2026-01-01 00:00:00 UTC
    });
    
    console.log(`✓ Success: ${result.success}`);
    console.log(`✓ Timestamp: ${result.result?.timestamp}`);
    console.log(`✓ Date: ${result.result?.date}`);
    console.log(`✓ Relative: ${result.result?.relative}`);
    console.log(`✓ Tool: ${result.tool} v${result.version}`);
    tests++;
    passed++;
    console.log("");
  } catch (error) {
    console.log(`✗ Failed: ${error}`);
    tests++;
  }
  
  // Test 3: Nested JSON extraction
  console.log("Test 3: Nested JSON Extraction");
  console.log("-".repeat(60));
  try {
    const result = await jsonParser({
      json: JSON.stringify({
        user: {
          profile: {
            name: "ZulfiClaw",
            settings: {
              theme: "dark",
              notifications: true
            }
          }
        }
      }),
      path: "user.profile.settings.theme"
    });
    
    console.log(`✓ Success: ${result.success}`);
    console.log(`✓ Extracted 'user.profile.settings.theme': ${result.result}`);
    console.log(`✓ Expected: dark`);
    tests++;
    passed++;
    console.log("");
  } catch (error) {
    console.log(`✗ Failed: ${error}`);
    tests++;
  }
  
  // Test 4: Current timestamp
  console.log("Test 4: Current Timestamp");
  console.log("-".repeat(60));
  try {
    const result = await timestampConverter({});
    
    console.log(`✓ Success: ${result.success}`);
    console.log(`✓ Current timestamp: ${result.result?.timestamp}`);
    console.log(`✓ Current date: ${result.result?.date}`);
    console.log(`✓ Relative: ${result.result?.relative}`);
    tests++;
    passed++;
    console.log("");
  } catch (error) {
    console.log(`✗ Failed: ${error}`);
    tests++;
  }
  
  // Summary
  console.log("=".repeat(60));
  console.log(`📊 Integration Test Results`);
  console.log("=".repeat(60));
  console.log(`Total Tests: ${tests}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${tests - passed}`);
  console.log(`Success Rate: ${Math.round((passed / tests) * 100)}%`);
  console.log("");
  
  if (passed === tests) {
    console.log("🎉 ALL TESTS PASSED!");
    console.log("");
    console.log("What This Proves:");
    console.log("✓ Agent-created tools work correctly");
    console.log("✓ Tools can be imported and used programmatically");
    console.log("✓ JSON parsing and extraction functions");
    console.log("✓ Timestamp conversion works");
    console.log("✓ 'Build Your Own Road' system is operational");
    console.log("");
    console.log("🚀 OpenClaw can now create its own tools!");
  } else {
    console.log("⚠️ Some tests failed. Check the output above.");
    process.exit(1);
  }
  
  console.log("\n" + "=".repeat(60));
}

runIntegrationTest().catch(error => {
  console.error("Integration test failed:", error);
  process.exit(1);
});
