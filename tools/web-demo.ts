#!/usr/bin/env node
/**
 * Dynamic Tools System - Interactive Demo
 * 
 * This simulates what would happen in a web chat session
 */

import { readFileSync } from 'fs';
import { main as jsonParser } from './dynamic/sample-json-parser/tool.js';
import { main as timestampConverter } from './dynamic/timestamp-converter/tool.js';

async function demo() {
  console.log('='.repeat(70));
  console.log('🌐 OPENCLAW DYNAMIC TOOLS - WEB INTERFACE DEMO');
  console.log('='.repeat(70));
  console.log('');
  
  // Simulate chat messages
  const messages = [
    {
      role: 'human',
      content: 'I need to parse this JSON: {"user":{"name":"ZulfiClaw","tools":2}}'
    },
    {
      role: 'agent',
      action: 'Reads /tools/SYSTEM_PROMPT.md and /tools/instructions.md',
      result: '✅ Developer mode activated'
    },
    {
      role: 'agent',
      action: 'Uses sample-json-parser tool',
      content: 'I\'ll use the JSON parser tool to extract the data.',
      execution: async () => {
        const result = await jsonParser({
          json: '{"user":{"name":"ZulfiClaw","tools":2}}',
          path: 'user.name'
        });
        return result;
      }
    },
    {
      role: 'human', 
      content: 'Can you also convert timestamp 1735689600?'
    },
    {
      role: 'agent',
      action: 'Uses timestamp-converter tool',
      content: 'I\'ll convert that timestamp for you.',
      execution: async () => {
        const result = await timestampConverter({
          timestamp: 1735689600
        });
        return result;
      }
    },
    {
      role: 'human',
      content: 'I need a URL encoder tool'
    },
    {
      role: 'agent',
      action: 'Creates new url-encoder tool',
      content: 'I don\'t have a URL encoder, so I\'ll create one!',
      execution: async () => {
        // This simulates the agent creating a new tool
        return {
          action: 'CREATE_TOOL',
          path: '/tools/dynamic/url-encoder/tool.ts',
          status: 'CREATED',
          toolName: 'url-encoder',
          version: '1.0.0',
          capabilities: ['encode', 'decode']
        };
      }
    }
  ];

  // Execute demo
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    
    console.log(`\n📱 [CHAT ${i + 1}]`);
    console.log('-'.repeat(70));
    
    if (msg.role === 'human') {
      console.log(`👤 HUMAN: "${msg.content}"`);
    } else {
      console.log(`🤖 AGENT:`);
      console.log(`   Action: ${msg.action}`);
      
      if (msg.content) {
        console.log(`   Message: "${msg.content}"`);
      }
      
      if (msg.execution) {
        const result = await msg.execution();
        console.log(`   Result:`, JSON.stringify(result, null, 2));
      }
      
      if (msg.result) {
        console.log(`   Status: ${msg.result}`);
      }
    }
    
    console.log('');
  }

  console.log('='.repeat(70));
  console.log('✅ DEMO COMPLETE');
  console.log('='.repeat(70));
  console.log('');
  console.log('What Just Happened:');
  console.log('1. Agent read developer instructions');
  console.log('2. Agent used existing JSON parser tool');
  console.log('3. Agent used existing timestamp converter tool');
  console.log('4. Agent demonstrated ability to create new tools');
  console.log('');
  console.log('🎯 The "Build Your Own Road" system is working!');
  console.log('');
  console.log('To test through the web interface:');
  console.log('1. Open: http://127.0.0.1:18789/chat?session=agent%3Amain%3Amain');
  console.log('2. Send: "Read /tools/SYSTEM_PROMPT.md"');
  console.log('3. Send: "Create a URL encoder tool at /tools/dynamic/url-encoder/"');
  console.log('');
}

demo().catch(console.error);
