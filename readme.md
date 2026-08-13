# Hon

> A terminal AI coding agent built to understand your codebase, execute tools, and help you build software from the terminal.

Hon is a **terminal-first AI coding agent** designed to go beyond simple chat. It connects an LLM to your filesystem, shell, and development environment so it can inspect your project, reason about what needs to change, execute commands, and iterate toward a solution.

The goal is simple:

**Give the agent a task → let it understand the environment → plan → use tools → verify the result.**

## Features

* **AI Agent Loop** — Reason, act, observe, and repeat until the task is complete.
* **Terminal First** — Interact with Hon directly from your CLI.
* **Tool Execution** — Give the model access to tools such as filesystem operations and shell commands.
* **Codebase Awareness** — Inspect files and understand the structure of your project before making changes.
* **LLM Provider Abstraction** — Keep the agent architecture independent from a single model provider.
* **Context-Aware Execution** — Pass relevant tool results and project context back into the agent loop.
* **Controlled Execution** — Keep model reasoning separate from the runtime that actually performs operations.
* **Interactive TUI** — A terminal interface for communicating with the agent and viewing its activity.

## Architecture

Hon is built around a simple separation of responsibilities:

```text
┌──────────────────────┐
│        TUI           │
│   User Interaction   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Runtime        │
│  Agent Orchestration │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        Agent         │
│   Reason + Decide    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        Tools         │
│ Shell / Files / etc. │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Local System      │
│    Your Codebase     │
└──────────────────────┘
```

The **agent decides what should happen**, while the **runtime is responsible for actually executing those decisions**.

This separation makes the system easier to extend with new tools, models, permissions, sessions, and execution strategies.

##  Agent Loop

At the core of Hon is the agent loop:

```text
User Task
   │
   ▼
Understand Context
   │
   ▼
LLM Reasoning
   │
   ▼
Tool Call?
  / \
Yes  No
 │    │
 ▼    ▼
Execute  Final Response
Tool
 │
 ▼
Observe Result
 │
 └──────────────► LLM
```

For example, when you ask:

```text
Fix the authentication bug in this project.
```

Hon can:

1. Inspect the project structure.
2. Read relevant files.
3. Identify the authentication flow.
4. Reason about the problem.
5. Modify the required files.
6. Run tests or other verification commands.
7. Inspect the results.
8. Iterate if something fails.
9. Report what was changed.

##  Core Components

### Agent

The agent is responsible for the intelligence of Hon.

It receives:

* User requests
* System instructions
* Conversation context
* Tool definitions
* Tool results

It produces either:

* A final response
* A tool call

The agent itself should **not directly perform filesystem or shell operations**.

---

### Runtime

The runtime is the orchestration layer.

It handles:

* Agent execution
* Tool dispatch
* Tool results
* Event streaming
* Iteration
* Errors
* Runtime state

This keeps external side effects outside the model-facing layer.

---

### Tools

Tools provide Hon with capabilities that an LLM cannot perform by itself.

Examples include:

```text
filesystem
├── read_file
├── write_file
├── edit_file
└── list_directory

shell
└── execute_command
```

The model decides **which tool to use and with what arguments**.

The runtime validates and executes the request.

---

### TUI

The TUI provides the interactive terminal experience.

It is responsible for things such as:

* User input
* Agent responses
* Tool activity
* Execution status
* Errors
* Streaming output

The UI should primarily be concerned with **presentation and interaction**, while the runtime owns the actual agent orchestration.

##  Tech Stack

Hon is built with a modern TypeScript/Node.js stack.

* **TypeScript**
* **Node.js**
* **React**
* **Ink**
* **LLM APIs / SDKs**
* **Shell execution**
* **Filesystem APIs**

The architecture is intentionally modular so individual pieces can evolve independently.

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js installed
* An API key for a supported LLM provider
* A terminal environment



## Example

Start Hon inside a project:

```bash
hon
```

Then give it a task:

```text
> Add dark mode to the application.
```

Hon can inspect the existing application, determine how styling is organized, make the necessary changes, and verify the result.

Other examples:

```text
> Explain how authentication works in this project.

> Find the bug causing the API request to fail.

> Refactor this component to make it reusable.

> Run the tests and fix the failing ones.

> Create a new API endpoint for user profiles.

> Find all unused dependencies in this project.
```



This creates a clear boundary between **reasoning** and **execution**.

### Tools Are Capabilities

The agent should not need to know how the operating system works internally.

It only needs to understand the capabilities exposed to it:

```text
execute_command
```

The runtime handles the implementation.

### Observe Before Acting

A coding agent should understand the environment before blindly modifying it.

Whenever possible:

```text
Inspect → Reason → Act → Verify
```

rather than:

```text
Guess → Modify → Hope
```


## Roadmap

Hon is an evolving project.

### Agent

* [x] Basic agent loop
* [x] Tool calling
* [ ] Better context management
* [ ] Improved error recovery
* [ ] Agent planning
* [ ] Multi-step task execution
* [ ] Sub-agents

### Tools

* [x] Shell execution
* [x] Filesystem access
* [ ] File editing tools
* [ ] Git tools
* [ ] Search tools
* [ ] Project diagnostics
* [ ] Browser tools

### Runtime

* [x] Tool orchestration
* [x] Event-based execution
* [ ] Permission system
* [ ] Execution cancellation
* [ ] Persistent sessions
* [ ] Context compaction
* [ ] Better observability

### TUI

* [x] Interactive terminal interface
* [ ] Rich tool execution display
* [ ] Streaming responses
* [ ] Session history
* [ ] Keyboard shortcuts
* [ ] Better error presentation

### Future

* [ ] Multiple LLM providers
* [ ] Configurable models
* [ ] Skills
* [ ] MCP support
* [ ] Remote/cloud execution
* [ ] Sandboxed execution
* [ ] Parallel tool execution

## 🤝 Contributing

Hon is primarily a learning and experimentation project focused on understanding how modern coding agents work under the hood.

Contributions, ideas, experiments, and discussions are welcome.


## 📄 License

This project is licensed under the MIT License.

---

Built to understand **agent orchestration, tool execution, runtime architecture, and AI-powered software development**.

**Hon — your coding agent in the terminal.**
