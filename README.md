# PolarAssist 🐻‍❄️⚡

> An Autonomous AI-Powered UI Browser Agent for Intelligent Web Automation & Deep Codebase Study.

**PolarAssist** is a modern, modular, source-first monorepo that embeds intelligent AI agents into any web application or browser context. Built for robust web interaction, multi-page browser automation, and deep architectural study.

---

## 🌟 Key Capabilities

- **🧠 Reflection-First Mental Model**: Deliberates, plans, and evaluates past DOM interactions before executing actions.
- **⚡ DOM Tree Serialization & Interactive Masking**: Analyzes web pages and highlights interactive targets cleanly.
- **📦 Modular Monorepo Architecture**: Clean separation into `@polar-assist/core`, `@polar-assist/page-controller`, `@polar-assist/llms`, `@polar-assist/ui`, `@polar-assist/mcp`, `@polar-assist/ext`, and `@polar-assist/website`.
- **🔌 Multi-Page & MCP Support**: Native Model Context Protocol server and Chrome extension capabilities for cross-tab workflows.
- **📚 Deep Study Guide Included**: Includes an end-to-end code breakdown and direct file paths for learning browser automation internals.

---

## 🚀 Quick Start

### Installation

```bash
npm install polar-assist
```

### Basic Usage

```typescript
import { PolarAssist } from 'polar-assist'

const agent = new PolarAssist({
    model: 'gpt-4o',
    apiKey: 'YOUR_OPENAI_API_KEY',
    language: 'en-US'
})

// Display UI overlay and start execution
agent.panel.show()
```

---

## 📂 Monorepo Structure

| Package | Path | Description |
| :--- | :--- | :--- |
| **`polar-assist`** | `packages/polar-assist` | Main bundle combining Core, PageController, and UI Panel |
| **`@polar-assist/core`** | `packages/core` | Headless Re-Act event loop, tool registry, and memory stream |
| **`@polar-assist/page-controller`** | `packages/page-controller` | DOM inspection, element labeling, and action simulation |
| **`@polar-assist/llms`** | `packages/llms` | Unified LLM client adapter with reflection JSON schemas |
| **`@polar-assist/ui`** | `packages/ui` | Interactive Shadow DOM overlay panel and i18n support |
| **`@polar-assist/mcp`** | `packages/mcp` | Model Context Protocol server bridge |
| **`@polar-assist/ext`** | `packages/extension` | Chrome Web Extension for multi-page automation |
| **`@polar-assist/website`** | `packages/website` | Interactive documentation and demo site |

---

## 📖 Deep Study Guide

For an in-depth code walkthrough with direct links to every module, function, and interface, see [STUDY_GUIDE.md](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/STUDY_GUIDE.md).

---

## 📄 License

Licensed under the [MIT License](LICENSE).
