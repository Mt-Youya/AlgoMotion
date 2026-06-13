/** AlgoMotion design tokens for Remotion compositions. */
export const P = {
  paper:  "oklch(96% 0.012 95)",
  ink:    "oklch(19% 0.025 260)",
  cobalt: "oklch(48% 0.22 265)",
  signal: "oklch(87% 0.2 118)",
  coral:  "oklch(67% 0.22 30)",
  mist:   "oklch(91% 0.025 245)",
  gray:   "oklch(52% 0.02 260)",
  white:  "#FFFFFF",

  // semantic aliases
  bg:      "oklch(96% 0.012 95)",
  text:    "oklch(19% 0.025 260)",
  accent:  "oklch(87% 0.2 118)",
  warning: "oklch(67% 0.22 30)",
  info:    "oklch(48% 0.22 265)",
  subtle:  "oklch(91% 0.025 245)",
} as const

export type PaletteKey = keyof typeof P
