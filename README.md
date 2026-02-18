# 🦞 OpenClaw 2.0 — The Self-Evolving AI Gateway

Welcome to the future of AI agency. **OpenClaw 2.0** is not just a gateway; it's a self-evolving platform that empowers AI agents to overcome their own limitations by building, testing, and deploying their own tools in real-time.

---

## 🚀 The Core Advancement: Self-Evolving Dynamic Tools

The most significant update in 2.0 is the **Dynamic Tool Creation System**. When an agent encounters a task it can't handle with its built-in toolkit, it now has the autonomy to:

1.  **Identify Capability Gaps:** Detect when a specific computation or integration is missing.
2.  **Generate TypeScript Logic:** Write production-grade code to solve the problem.
3.  **Self-Test:** Execute automated test suites within the sandbox to ensure safety and correctness.
4.  **Auto-Register:** Instantly add the new capability to the `REGISTRY.md` for permanent or session-based use.

> [!TIP]
> This transforms OpenClaw from a static tool-executor into a dynamic, growing intelligence layer.

---

## 🛠 Features

- **Multi-Channel Gateway:** Seamless integration with Slack, Discord, and Telegram.
- **Provider Agnostic:** Supports OpenAI, Anthropic, Gemini, and local LLMs (via Ollama).
- **Native Automation:**
  - **Browser Control:** Integrated Playwright support for web research and interaction.
  - **Desktop Integration:** (Experimental) Control desktop applications through a cross-platform bridge.
- **Sandboxed Execution:** Securely run untrusted code in isolated environments.
- **Micro-Skill System:** Small, focused modules that define agent personalities and capabilities.

---

## 📦 Installation

To get started with the OpenClaw 2.0 CLI:

```bash
# Install globally
npm install -g .

# Initialize your environment
openclaw onboard
```

---

## 🏗 Developing Tools

OpenClaw 2.0 makes it easy for developers (and agents) to add new functionality:

```bash
# Dynamic tools live here:
./tools/dynamic/

# Each tool is a TypeScript module:
./tools/dynamic/my-new-tool/tool.ts
```

Check out the [Tools Documentation](./tools/README.md) for detailed implementation guides.

---

## 🌐 Community & Links

- **Website:** [openclaw.ai](https://openclaw.ai)
- **Docs:** [docs.openclaw.ai](https://docs.openclaw.ai)
- **Twitter:** [@OpenClaw](https://x.com/OpenClaw)

---

> "Stop using agents that wait for you to fix them. Start using the agent that fixes itself." — **OpenClaw Team**
