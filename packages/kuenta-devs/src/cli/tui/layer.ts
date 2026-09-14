import { run as runTui, type TuiInput } from "@kuenta-devs/tui"
import { Global } from "@kuenta-devs/core/global"
import { AppNodeBuilder } from "@kuenta-devs/core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}
