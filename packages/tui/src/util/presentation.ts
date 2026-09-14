const logo = {
  left: [
    "                                                                ",
    "_|    _|  _|    _|  _|_|_|_|  _|      _|  _|_|_|_|_|    _|_|    ",
    "_|  _|    _|    _|  _|        _|_|    _|      _|      _|    _|  ",
    "_|_|      _|    _|  _|_|_|    _|  _|  _|      _|      _|_|_|_|  ",
    "_|  _|    _|    _|  _|        _|    _|_|      _|      _|    _|  ",
    "_|    _|    _|_|    _|_|_|_|  _|      _|      _|      _|    _|  ",
    "                                                                ",
    "                                                                ",
    "",
  ],
  right: [
    "                                          ",
    "_|_|_|    _|_|_|_|  _|      _|    _|_|_|  ",
    "_|    _|  _|        _|      _|  _|        ",
    "_|    _|  _|_|_|    _|      _|    _|_|    ",
    "_|    _|  _|          _|  _|          _|  ",
    "_|_|_|    _|_|_|_|      _|      _|_|_|    ",
    "                                          ",
    "                                          ",
    "",
  ],
}

const reset = "\x1b[0m"
const bold = "\x1b[1m"
const dim = "\x1b[90m"
const green = "\x1b[38;5;46m"

function wordmark(pad = "") {
  const draw = (line: string, fg: string, shadow: string, bg: string) =>
    [...line]
      .map((char) => {
        if (char === "_") return `${bg} ${reset}`
        if (char === "^") return `${fg}${bg}▀${reset}`
        if (char === "~") return `${shadow}▀${reset}`
        if (char === " ") return " "
        return `${fg}${char}${reset}`
      })
      .join("")

  return logo.left.map((line, index) => {
    const left = draw(line, green, "\x1b[38;5;22m", "\x1b[48;5;22m")
    const right = draw(logo.right[index] ?? "", green, "\x1b[38;5;22m", "\x1b[48;5;22m")
    return `${pad}${left} ${right}`
  })
}

export function sessionEpilogue(input: { title: string; sessionID?: string }) {
  const weak = (text: string) => `${dim}${text.padEnd(10, " ")}${reset}`
  return [
    ...wordmark("  "),
    "",
    `  ${weak("Session")}${bold}${input.title}${reset}`,
    `  ${weak("Continue")}${bold}kuenta-devs -s ${input.sessionID}${reset}`,
    "",
  ].join("\n")
}