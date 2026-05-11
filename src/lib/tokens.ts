// Design tokens — single source of truth. Mirrored as CSS variables in
// src/styles/tokens.css. Edit both together (or generate one from the
// other; for now they're hand-mirrored, which is cheap at this scale).

export const palette = {
  paper: "#f1e8d6",
  paperWarm: "#ede2cd",
  paperDeep: "#e3d4b6",
  paperEdge: "#cdb893",
  ink: "#1c1612",
  inkSoft: "#3d322a",
  inkMuted: "#6b5a44",
  inkFaint: "#a8967c",
  inkTrace: "#c9b896",
  kodachrome: "#b83a1f",
  saffron: "#b8862c",
  sage: "#4a5d4a",
} as const

export const fonts = {
  display: '"Fraunces", "Times New Roman", serif',
  mono: '"DM Mono", "Courier New", monospace',
} as const

export const breakpoints = {
  mobile: 900,
} as const

export const layout = {
  containerMax: 1320,
  containerPadding: 80,
  containerPaddingMobile: 32,
} as const
