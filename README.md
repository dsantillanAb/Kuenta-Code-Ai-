<p align="center">
  <pre>
 █  █ █  █ █▀▀▀ █  █ █▀▀█  ▀▀    ████ █████ █   █  ████
 █▀▀█ █  █ █    █▀▀█ █▀▀  █  █    █ █ █     █   █ █
 █  █ █  █ █    █  █ ▀▀▀▀ █▀▀█    █   █ ████  █   █ ███
 ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀    ████  █████   █ ███
  </pre>
  <strong>KUENTA DEVS CLI</strong>
</p>
<p align="center"><em>black &amp; green, built for developers</em></p>
<p align="center">An open-source AI coding agent. Forked from OpenCode, rebranded by <a href="https://github.com/dsantillanAb">Kuenta Devs</a>.</p>

<p align="center">
  <a href="https://github.com/dsantillanAb/Kuenta-Code-Ai-/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/dsantillanAb/Kuenta-Code-Ai-?include_prereleases&style=flat-square" /></a>
  <a href="https://github.com/dsantillanAb/Kuenta-Code-Ai-/actions"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/dsantillanAb/Kuenta-Code-Ai-/publish.yml?style=flat-square&branch=dev" /></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/github/license/dsantillanAb/Kuenta-Code-Ai-?style=flat-square" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.es.md">Español</a>
</p>

---

### Installation

```bash
# One-line installer (recommended)
curl -fsSL https://raw.githubusercontent.com/dsantillanAb/Kuenta-Code-Ai-/dev/install | bash

# Or with bun (after install)
bun i -g kuenta-devs@latest
```

> [!NOTE]
> Kuenta Devs CLI is not yet on npm. Use the curl install above.

After install, run `kuenta-devs` to launch the TUI. The first-run welcome screen will greet you.

> [!TIP]
> The install script seeds a default config at `~/.config/opencode/opencode.jsonc` that points to the `kuentadevs` provider. Edit it to use your own model ID and API key.

### Commands

```bash
kuenta-devs                   # launch the TUI
kuenta-devs welcome           # show the first-run welcome
kuenta-devs run "<prompt>"    # one-shot task in the CLI
kuenta-devs serve              # start a headless server
kuenta-devs web                # start server + open web UI
kuenta-devs upgrade            # self-update to the latest version
kuenta-devs uninstall          # remove Kuenta Devs and its files
```

### Agents

Kuenta Devs CLI ships with two built-in agents you can switch between with `Tab`:

- **build** — Default, full-access agent for development work
- **plan** — Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

A **general** subagent is also included for complex searches and multistep tasks. Invoke it with `@general` in messages.

### Visual identity

- **Background**: black (`#000000`)
- **Accent**: Matrix green (`#00ff41`)
- **Logo**: block-font ASCII art with horizontal cyan → green → yellow gradient in the CLI banner
- **Sidebar titles**: bold green
- **Theme**: `kuenta-devs` (the new default) + 30+ other themes available via `/theme`

### Configuration

Kuenta Devs CLI looks for configuration in this order (later overrides earlier):

1. Built-in defaults
2. `~/.config/opencode/opencode.jsonc` (user global)
3. `.opencode/opencode.jsonc` (project local)
4. `$KUENTA_DEVS_CONFIG_DIR/opencode.jsonc` (env override)

The default provider `kuentadevs` is configured out-of-the-box. To use your own:

```jsonc
// ~/.config/opencode/opencode.jsonc
{
  "provider": {
    "kuentadevs": {
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "https://your-router.example.com/v1",
        "apiKey": "{env:KUENTA_DEVS_API_KEY}"  // or hardcode (less safe)
      },
      "models": {
        "your-model-name": {
          "name": "Your Model",
          "modalities": { "input": ["text", "image"], "output": ["text"] }
        }
      }
    }
  },
  "model": "kuentadevs/your-model-name"
}
```

> [!WARNING]
> If you commit `opencode.jsonc` with a hardcoded API key, **rotate that key** after committing because git history is forever.

### Differences from OpenCode

| Aspect | OpenCode | Kuenta Devs CLI |
|---|---|---|
| Binary name | `opencode` | `kuenta-devs` |
| Workspace packages | `@opencode-ai/*` | `@kuenta-devs/*` |
| Default theme | `opencode` (orange) | `kuenta-devs` (black + Matrix green) |
| Logo | OpenCode wordmark | `KUENTA DEVS` block-font |
| CLI banner | Single color | Horizontal color gradient |
| Bin dir | `~/.opencode/bin` | `~/.kuenta-devs/bin` |
| Install URL | `opencode.ai` | `dsantillanAb/Kuenta-Code-Ai-` |

### Documentation

- **Quick start:** run `kuenta-devs welcome` after install
- **TUI:** press `Ctrl+P` for the command palette, `/help` for inline help
- **Repo:** https://github.com/dsantillanAb/Kuenta-Code-Ai-

### Contributing

Want to help shape Kuenta Devs? Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

### Building on Kuenta Devs

If you ship a project based on Kuenta Devs CLI and use "kuenta-devs" in the name, please add a note in your README clarifying that it's not built by the original OpenCode team.

---

**Kuenta Devs** — made with 💚 by the community. Based on [OpenCode](https://github.com/anomalyco/opencode) (MIT).