# PolarAssist 🐻‍❄️ Deep Architectural Study Guide

Welcome to the **PolarAssist Deep Architectural Study Guide**! This document is designed to serve as a comprehensive code walkthrough for studying browser automation, AI UI agents, DOM serialization, Re-Act decision loops, and Chrome extension integration.

---

## 🏛️ System Architecture Overview

PolarAssist operates as a **modular monorepo** structured around strict topological dependencies:

```
@polar-assist/website ─────┐
                           ▼
@polar-assist/ext ──► polar-assist (Main Library Entry)
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
    @polar-assist/ui   @polar-assist/core   @polar-assist/mcp
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    @polar-assist/llms         @polar-assist/page-controller
```

### Module Roles & Links

1. **[polar-assist](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/polar-assist/src/PolarAssist.ts)**: The primary entry point connecting Core, Controller, and UI Panel.
2. **[@polar-assist/core](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/PolarAssistCore.ts)**: Headless event-driven agent implementing the observation-reflection-action loop.
3. **[@polar-assist/page-controller](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/PageController.ts)**: Low-level DOM tree builder, element snapshot generator, and synthetic user input simulator.
4. **[@polar-assist/llms](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/llms/src/index.ts)**: High-level LLM client handling API calls, structured tool schemas, and reflection validation.
5. **[@polar-assist/ui](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/ui/src/panel/Panel.ts)**: Shadow DOM floating panel and real-time interaction overlay.
6. **[@polar-assist/ext](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/extension/src/agent/MultiPageAgent.ts)**: Chrome extension background script & sidepanel for multi-tab automation.
7. **[@polar-assist/mcp](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/mcp/src/index.js)**: Model Context Protocol bridge allowing external tools (like Claude Desktop or IDEs) to command the browser.

---

## 🔄 End-to-End Execution Flow

When a user submits a goal (e.g., *"Search for wireless headphones and click the first result"*), the system progresses through 5 phases:

```
[ User Input ] ──► (1) PageController Snapshots DOM Tree
                        │
                        ▼
                    (2) PolarAssistCore Constructs Prompt
                        │
                        ▼
                    (3) LLMClient Requests Action (Reflection + Tool Call)
                        │
                        ▼
                    (4) Tool Registry Invokes DOM Action (click/fill/scroll)
                        │
                        ▼
                    (5) SimulatorMask Visualizes Action & Updates UI Panel
```

### Step-by-Step Code Walkthrough

#### 1. DOM Observation & Indexing
- **Entry point**: [PageController.getPageInfo()](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/dom/getPageInfo.ts)
- **DOM Tree Construction**: [dom_tree/index.js](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/dom/dom_tree/index.js)
- **How it works**: Traverses visible HTML elements, filters out non-interactive nodes, computes bounding boxes, and assigns unique integer `index` numbers to target elements.

#### 2. Re-Act Loop & Prompt Building
- **Core Loop**: [PolarAssistCore.ts Step Method](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/PolarAssistCore.ts#L200-L350)
- **System Prompt**: [system_prompt.md](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/prompts/system_prompt.md)
- **State Serialization**: [PolarAssistCore.getBrowserStatePrompt()](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/PolarAssistCore.ts#L600-L650)
- **How it works**: Formats current page URL, title, scroll position, and numbered DOM tree into a markdown prompt sent to the LLM.

#### 3. Structured LLM Reflection & Tool Calling
- **LLM Client**: [OpenAIClient.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/llms/src/OpenAIClient.ts)
- **Tool Schema Registry**: [tools/index.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/tools/index.ts)
- **How it works**: Forces the LLM to output a `reflection` field (evaluating past steps and current state) alongside a concrete `tool_call` (such as `click`, `fill`, `scroll`, or `finish`).

#### 4. Synthetic Action Execution
- **Action Handlers**: [actions.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/actions.ts)
- **DOM Utilities**: [utils/index.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/utils/index.ts)
- **How it works**: Resolves the target element by `index`, scrolls it into view, dispatches native pointer and key events, and handles framework-specific input patches ([react.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/patches/react.ts)).

#### 5. Visual Masking & User Control
- **Simulator Overlay**: [SimulatorMask.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/mask/SimulatorMask.ts)
- **UI Panel**: [Panel.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/ui/src/panel/Panel.ts)
- **How it works**: An animated cursor moves to the target element location, highlights it with glowing visual boundaries, and updates the task status in the floating panel.

---

## 🔬 Core Concepts Deep Dive

### 1. Element Identification without XPaths
Instead of relying on fragile XPaths or CSS selectors, `PageController` generates a simplified, numbered tree of interactive elements.
- **Reference**: [dom_tree/index.js](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/dom/dom_tree/index.js)

### 2. Reflection Mental Model
Before taking an action, the agent is mandated by system prompts and Zod schemas to output:
- `evaluation`: Did the previous action succeed?
- `memory`: What key facts need to be remembered?
- `nextGoal`: What is the immediate sub-goal?

- **Reference**: [types.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/types.ts)

### 3. Isolation & Shadow DOM
To ensure the agent UI does not interfere with host web applications or leak styles:
- `Panel` uses a **ShadowRoot** (`attachShadow({ mode: 'open' })`).
- Attributes like `data-polar-assist-ignore="true"` prevent the DOM parser from observing the agent's own UI elements.
- **Reference**: [Panel.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/ui/src/panel/Panel.ts#L390-L420)

---

## 🛠️ Key File Index for Study

| Study Topic | File Link | Focus Area |
| :--- | :--- | :--- |
| **Main Orchestrator** | [PolarAssist.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/polar-assist/src/PolarAssist.ts) | Class hierarchy & setup |
| **Agent Re-Act Loop** | [PolarAssistCore.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/PolarAssistCore.ts) | Async event loop & event dispatching |
| **Tool Definitions** | [tools/index.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/tools/index.ts) | Action definitions & Zod parameters |
| **DOM Parsing** | [getPageInfo.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/dom/getPageInfo.ts) | DOM traversal & element indexing |
| **Simulated Actions** | [actions.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/actions.ts) | Click, fill, press key implementation |
| **LLM Connector** | [OpenAIClient.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/llms/src/OpenAIClient.ts) | Fetch API, streaming & structured outputs |
| **UI Panel** | [Panel.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/ui/src/panel/Panel.ts) | Shadow DOM floating overlay |
| **Chrome Extension** | [MultiPageAgent.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/extension/src/agent/MultiPageAgent.ts) | Cross-tab multi-page automation |
| **MCP Server** | [index.js (mcp)](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/mcp/src/index.js) | Model Context Protocol integration |

---

## 💡 Recommended Study Exercises

1. **Trace a Click Event**: Open [actions.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/actions.ts) and trace how `clickElement` calculates coordinates and dispatches `pointerdown`, `mousedown`, `pointerup`, `mouseup`, and `click`.
2. **Examine System Prompts**: Read [system_prompt.md](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/prompts/system_prompt.md) to understand how instructions constrain LLM hallucinations and force structured outputs.
3. **Inspect React Patches**: Read [react.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/patches/react.ts) to learn how synthetic value setters trigger React's controlled input updates (`_valueTracker`).
