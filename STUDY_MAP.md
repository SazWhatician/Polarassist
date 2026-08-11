# 🗺️ PolarAssist Codebase Study Map

A structured, 6-phase self-study roadmap to master browser automation, DOM indexing, Re-Act AI agent decision loops, Shadow DOM UI overlays, and multi-tab Chrome extension architecture.

---

## 📌 How to Use This Study Map
Follow each phase sequentially. Open the linked files directly in your IDE by clicking the markdown file links (`[filename](file:///...)`), inspect the code, read the inline comments, and execute the suggested hands-on exercises.

```
┌────────────────────────────────────────────────────────┐
│ Phase 1: DOM Inspection & Node Indexing                │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Synthetic Action Execution & Framework Patches │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: LLM Reflection Schemas & Tool Registry       │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 4: Core Re-Act Event Loop & Memory Stream       │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 5: Shadow DOM UI Panel & Visual Masking          │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 6: Multi-Page Chrome Extension & MCP Server      │
└────────────────────────────────────────────────────────┘
```

---

## 📍 Phase 1: DOM Inspection & Node Indexing (Days 1–2)

**Goal**: Understand how raw HTML web pages are parsed into a clean, compact representation for LLM context without sending noisy HTML markup.

### 📚 Target Files to Read:
1. **[dom_tree/index.js](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/dom/dom_tree/index.js)**
   - *Key Concept*: Traverses the DOM tree, identifies visible elements, filters out hidden/zero-size elements, and formats interactive targets.
2. **[getPageInfo.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/dom/getPageInfo.ts)**
   - *Key Concept*: Computes element bounding boxes, visibility, scroll offset, and returns the snapshot object.
3. **[PageController.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/PageController.ts)**
   - *Key Concept*: High-level DOM controller facade initializing observers and viewport measurements.

### 🏋️ Hands-on Exercise:
Open browser DevTools on any website, import `PageController`, call `controller.getPageInfo()`, and print the returned `elementTree` string to see how elements receive numeric IDs like `[12] <button>Submit</button>`.

---

## 📍 Phase 2: Synthetic Action Execution & React Compatibility (Days 3–4)

**Goal**: Learn how low-level synthetic browser pointer/keyboard events simulate user interaction and how to handle framework-specific input binding issues.

### 📚 Target Files to Read:
1. **[actions.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/actions.ts)**
   - *Key Concept*: Implementations for `clickElement`, `fillElement`, `scrollPage`, `selectOption`, and `hoverElement`.
2. **[patches/react.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/patches/react.ts)**
   - *Key Concept*: Updating controlled React form inputs by triggering prototype value setters and updating `_valueTracker`.
3. **[mask/SimulatorMask.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/mask/SimulatorMask.ts)**
   - *Key Concept*: Rendering the visual animated cursor overlay and element target highlights during action execution.

### 🏋️ Hands-on Exercise:
Read [actions.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/page-controller/src/actions.ts#L30-L100) and observe how pointer events (`pointerdown`, `mousedown`, `pointerup`, `mouseup`, `click`) are dispatched sequentially to ensure custom web components recognize clicks.

---

## 📍 Phase 3: LLM Reflection Schemas & Tool Registry (Days 5–6)

**Goal**: Understand how LLMs are constrained to output structured reflections (evaluation, memory, next goal) alongside executable tool calls.

### 📚 Target Files to Read:
1. **[prompts/system_prompt.md](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/prompts/system_prompt.md)**
   - *Key Concept*: Master system prompt instructing the model to observe element IDs, reflect before acting, and adhere to strict tool rules.
2. **[tools/index.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/tools/index.ts)**
   - *Key Concept*: Zod schema definitions for tools (`click`, `fill`, `scroll`, `hover`, `pressKey`, `selectOption`, `finish`).
3. **[OpenAIClient.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/llms/src/OpenAIClient.ts)**
   - *Key Concept*: LLM API connector handling structured outputs, tool call parsing, API retries, and error normalizing.

### 🏋️ Hands-on Exercise:
Create a new tool in [tools/index.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/tools/index.ts) using `z.object({})` and trace how `PolarAssistCore` passes available tools to `OpenAIClient`.

---

## 📍 Phase 4: Core Re-Act Event Loop & Memory Stream (Days 7–8)

**Goal**: Master the central async agent loop, status state machine, step retries, and persistent event memory.

### 📚 Target Files to Read:
1. **[PolarAssistCore.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/PolarAssistCore.ts)**
   - *Key Concept*: The main Re-Act loop (`step()`), status management (`idle`, `running`, `completed`, `error`), and signal abort handling.
2. **[types.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/types.ts)**
   - *Key Concept*: Type definitions for `AgentReflection`, `HistoricalEvent`, `AgentStepEvent`, and `AgentActivity`.
3. **[PolarAssistCore.test.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/PolarAssistCore.test.ts)**
   - *Key Concept*: Unit test suite verifying step loops, stop signals, error recovery, and event emitters.

### 🏋️ Hands-on Exercise:
Open [PolarAssistCore.test.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/core/src/PolarAssistCore.test.ts) and run tests via `npm test` while editing a mock response to observe how the loop reacts to step failures.

---

## 📍 Phase 5: Shadow DOM UI Panel & Visual Isolation (Days 9–10)

**Goal**: Understand how the floating UI panel remains completely isolated from the host page using Shadow DOM and i18n localization.

### 📚 Target Files to Read:
1. **[Panel.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/ui/src/panel/Panel.ts)**
   - *Key Concept*: Creating a `ShadowRoot`, attaching CSS styles, rendering floating control buttons, and displaying live task progress.
2. **[cards.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/ui/src/panel/cards.ts)**
   - *Key Concept*: Formatting history cards, reflection bubbles, and action execution logs inside the panel.
3. **[PolarAssist.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/polar-assist/src/PolarAssist.ts)**
   - *Key Concept*: Combining `PolarAssistCore`, `PageController`, and `Panel` into the standalone top-level package.

### 🏋️ Hands-on Exercise:
Examine line 390 of [Panel.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/ui/src/panel/Panel.ts#L390) to see how `data-polar-assist-ignore="true"` prevents `PageController` from parsing the agent's own panel elements.

---

## 📍 Phase 6: Multi-Page Chrome Extension & MCP Protocol (Days 11–12)

**Goal**: Learn how the agent expands from single-page web scripts into cross-tab browser automation and external IDE integration via MCP.

### 📚 Target Files to Read:
1. **[MultiPageAgent.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/extension/src/agent/MultiPageAgent.ts)**
   - *Key Concept*: Extension agent managing browser tabs, handling tab switches, and executing actions across multiple domain origins.
2. **[TabsController.ts](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/extension/src/agent/TabsController.ts)**
   - *Key Concept*: Chrome extension tab controller managing active tab snapshots, tab creation, and script injection.
3. **[index.js (mcp)](file:///c:/Users/saswa/Desktop/Page-Agent/PolarAssist/packages/mcp/src/index.js)**
   - *Key Concept*: Model Context Protocol server exposing browser control methods to external tools over WebSocket.

---

## 🎯 Final Study Checkpoints

- [ ] Can you explain how `PageController` assigns numeric IDs to interactive DOM elements without using XPaths?
- [ ] Can you trace how an LLM tool call string translates into native pointer events in `actions.ts`?
- [ ] Can you explain why `Panel` uses Shadow DOM and `data-polar-assist-ignore`?
- [ ] Can you describe the difference between transient `activity` events and persistent `history` events in `PolarAssistCore`?
- [ ] Can you explain how `MultiPageAgent` orchestrates multi-tab tasks via Chrome Extension message passing?
