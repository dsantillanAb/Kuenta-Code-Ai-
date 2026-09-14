import type { Argv } from "yargs"
import { UI } from "../ui"
import { Style } from "../ui"
import { Global } from "@kuenta-devs/core/global"
import fs from "fs/promises"
import path from "path"

const MARKER = ".kuenta-devs-welcomed"
const VERSION_SEEN = "v1"

// Shows the Kuenta Devs first-run welcome screen.
// Auto-runs once per machine per major version, can be re-triggered
// any time with `kuenta-devs welcome --force`.
export const WelcomeCommand = {
  command: "welcome [reset]",
  describe: "show the Kuenta Devs first-run welcome screen",
  builder: (yargs: Argv) =>
    yargs
      .positional("reset", {
        describe: "use 'reset' to re-show the welcome screen",
        type: "string",
      })
      .option("force", {
        alias: "f",
        type: "boolean",
        describe: "force re-show even if already welcomed",
        default: false,
      }),
  handler: async (args: { reset?: string; force?: boolean }) => {
    const markerPath = path.join(Global.Path.config, MARKER)

    if (args.force || args.reset === "reset") {
      try {
        await fs.unlink(markerPath)
      } catch {}
    }

    let alreadyWelcomed = false
    try {
      const data = await fs.readFile(markerPath, "utf-8")
      alreadyWelcomed = data === VERSION_SEEN
    } catch {
      alreadyWelcomed = false
    }

    if (alreadyWelcomed) {
      UI.println(UI.logo("  "))
      UI.empty()
      UI.println(Style.TEXT_SUCCESS_BOLD + "  Welcome back!" + Style.TEXT_NORMAL)
      UI.println(
        Style.TEXT_DIM +
          "  Run 'kuenta-devs welcome --force' to see this again." +
          Style.TEXT_NORMAL,
      )
      return
    }

    UI.empty()
    UI.println(UI.logo("  "))
    UI.empty()
    UI.println(Style.TEXT_SUCCESS_BOLD + "  KUENTA DEVS CLI" + Style.TEXT_NORMAL)
    UI.println(Style.TEXT_DIM + "  black & green, built for developers" + Style.TEXT_NORMAL)
    UI.empty()
    UI.println("  " + Style.TEXT_HIGHLIGHT_BOLD + "Get started in 30 seconds:" + Style.TEXT_NORMAL)
    UI.empty()
    UI.println("  " + Style.TEXT_SUCCESS_BOLD + "1." + Style.TEXT_NORMAL + "  " + Style.TEXT_NORMAL_BOLD + "cd <your-project>" + Style.TEXT_NORMAL + Style.TEXT_DIM + "   # open a directory" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_SUCCESS_BOLD + "2." + Style.TEXT_NORMAL + "  " + Style.TEXT_NORMAL_BOLD + "kuenta-devs" + Style.TEXT_NORMAL + Style.TEXT_DIM + "            # launch the TUI" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_SUCCESS_BOLD + "3." + Style.TEXT_NORMAL + "  " + Style.TEXT_NORMAL_BOLD + "kuenta-devs run \"<prompt>\"" + Style.TEXT_NORMAL + Style.TEXT_DIM + "  # one-shot task" + Style.TEXT_NORMAL)
    UI.empty()
    UI.println("  " + Style.TEXT_HIGHLIGHT_BOLD + "Quick commands:" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_NORMAL_BOLD + "  /theme" + Style.TEXT_NORMAL + Style.TEXT_DIM + "    cycle themes (kuenta-devs, opencode, orng, catppuccin...)" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_NORMAL_BOLD + "  /model" + Style.TEXT_NORMAL + Style.TEXT_DIM + "    switch model (e.g. kuentadevs/<your-model>)" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_NORMAL_BOLD + "  /connect" + Style.TEXT_NORMAL + Style.TEXT_DIM + "  connect a provider (75+ supported)" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_NORMAL_BOLD + "  /agents" + Style.TEXT_NORMAL + Style.TEXT_DIM + "   toggle between build / plan agents" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_NORMAL_BOLD + "  Ctrl+P" + Style.TEXT_NORMAL + Style.TEXT_DIM + "  command palette" + Style.TEXT_NORMAL)
    UI.empty()
    UI.println("  " + Style.TEXT_HIGHLIGHT_BOLD + "Docs:" + Style.TEXT_NORMAL + " " + Style.TEXT_NORMAL + "https://kuenta.dev/docs" + Style.TEXT_NORMAL)
    UI.println("  " + Style.TEXT_HIGHLIGHT_BOLD + "Repo:" + Style.TEXT_NORMAL + " " + Style.TEXT_NORMAL + "https://github.com/dsantillanAb/Kuenta-Code-Ai-" + Style.TEXT_NORMAL)
    UI.empty()
    UI.println(Style.TEXT_DIM + "  This welcome won't show again on this machine." + Style.TEXT_NORMAL)
    UI.empty()

    try {
      await fs.mkdir(Global.Path.config, { recursive: true })
      await fs.writeFile(markerPath, VERSION_SEEN, "utf-8")
    } catch {}
  },
}