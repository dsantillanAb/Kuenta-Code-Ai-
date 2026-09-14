import { EOL } from "os"
import { Schema } from "effect"
import { logo as glyphs } from "./logo"

const wordmark = [
  `                                                                `,
  `_|    _|  _|    _|  _|_|_|_|  _|      _|  _|_|_|_|_|    _|_|       `,
  `_|  _|    _|    _|  _|        _|_|    _|      _|      _|    _|    `,
  `_|_|      _|    _|  _|_|_|    _|  _|  _|      _|      _|_|_|_|  `,
  `_|  _|    _|    _|  _|        _|    _|_|      _|      _|    _|    `,
  `_|    _|    _|_|    _|_|_|_|  _|      _|      _|      _|    _|    `,
  `                                                                `,
  `                                                                `,
  ``,
]

export class CancelledError extends Schema.TaggedErrorClass<CancelledError>()("UICancelledError", {}) {}

export const Style = {
  TEXT_HIGHLIGHT: "\x1b[96m",
  TEXT_HIGHLIGHT_BOLD: "\x1b[96m\x1b[1m",
  TEXT_DIM: "\x1b[90m",
  TEXT_DIM_BOLD: "\x1b[90m\x1b[1m",
  TEXT_NORMAL: "\x1b[0m",
  TEXT_NORMAL_BOLD: "\x1b[1m",
  TEXT_WARNING: "\x1b[93m",
  TEXT_WARNING_BOLD: "\x1b[93m\x1b[1m",
  TEXT_DANGER: "\x1b[91m",
  TEXT_DANGER_BOLD: "\x1b[91m\x1b[1m",
  TEXT_SUCCESS: "\x1b[92m",
  TEXT_SUCCESS_BOLD: "\x1b[92m\x1b[1m",
  TEXT_INFO: "\x1b[94m",
  TEXT_INFO_BOLD: "\x1b[94m\x1b[1m",
}

export function println(...message: string[]) {
  print(...message)
  process.stderr.write(EOL)
}

export function print(...message: string[]) {
  blank = false
  process.stderr.write(message.join(" "))
}

let blank = false
export function empty() {
  if (blank) return
  println("" + Style.TEXT_NORMAL)
  blank = true
}

export function logo(pad?: string) {
  if (!process.stdout.isTTY && !process.stderr.isTTY) {
    const result = []
    for (const row of wordmark) {
      if (pad) result.push(pad)
      result.push(row)
      result.push(EOL)
    }
    return result.join("").trimEnd()
  }

  const result: string[] = []
  const reset = "\x1b[0m"

  // Horizontal gradient stops: cyan → mint → matrix-green → lime → yellow
  const stops: Array<[number, number, number]> = [
    [0, 255, 255], // cyan
    [0, 255, 170], // mint
    [0, 255, 65], // matrix green
    [128, 255, 0], // lime
    [220, 255, 0], // chartreuse
  ]

  const gradient = (col: number, totalCols: number): string => {
    const t = Math.min(1, Math.max(0, col / Math.max(1, totalCols - 1)))
    const scaled = t * (stops.length - 1)
    const idx = Math.floor(scaled)
    const frac = scaled - idx
    const a = stops[idx]
    const b = stops[Math.min(idx + 1, stops.length - 1)]
    const r = Math.round(a[0] + (b[0] - a[0]) * frac)
    const g = Math.round(a[1] + (b[1] - a[1]) * frac)
    const b2 = Math.round(a[2] + (b[2] - a[2]) * frac)
    return `\x1b[38;2;${r};${g};${b2}m`
  }

  const draw = (line: string, offset: number, width: number, baseBg: string) => {
    const parts: string[] = []
    let col = 0
    for (const char of line) {
      const pos = offset + col
      const fg = gradient(pos, width)
      if (char === "_") {
        parts.push(baseBg, " ", reset)
        col++
        continue
      }
      if (char === "^") {
        parts.push(fg, baseBg, "▀", reset)
        col++
        continue
      }
      if (char === "~") {
        parts.push(baseBg, "▀", reset)
        col++
        continue
      }
      if (char === " ") {
        parts.push(" ")
        col++
        continue
      }
      parts.push(fg, char, reset)
      col++
    }
    return parts.join("")
  }

  // Compute combined width for the gradient (left + 1 gap + right)
  const leftWidth = Math.max(...glyphs.left.map((r) => r.length))
  const rightWidth = Math.max(...glyphs.right.map((r) => r.length))
  const totalWidth = leftWidth + 1 + rightWidth
  const baseBg = "\x1b[48;5;22m"

  glyphs.left.forEach((row, index) => {
    if (pad) result.push(pad)
    result.push(draw(row, 0, totalWidth, baseBg))
    result.push(" ")
    const other = glyphs.right[index] ?? ""
    result.push(draw(other, leftWidth + 1, totalWidth, baseBg))
    result.push(EOL)
  })
  return result.join("").trimEnd()
}

export async function input(prompt: string): Promise<string> {
  const readline = require("readline")
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(prompt, (answer: string) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

export function error(message: string) {
  if (message.startsWith("Error: ")) {
    message = message.slice("Error: ".length)
  }
  println(Style.TEXT_DANGER_BOLD + "Error: " + Style.TEXT_NORMAL + message)
}

export function markdown(text: string): string {
  return text
}

export * as UI from "./ui"
