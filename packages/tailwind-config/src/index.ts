import type { Config } from "tailwindcss"

const palette: Record<string, Record<string, string>> = {
  neutral: {
    50: "oklch(0.985 0 0)",
    100: "oklch(0.97 0 0)",
    200: "oklch(0.92 0 0)",
    300: "oklch(0.87 0 0)",
    400: "oklch(0.71 0 0)",
    500: "oklch(0.55 0 0)",
    600: "oklch(0.44 0 0)",
    700: "oklch(0.37 0 0)",
    800: "oklch(0.27 0 0)",
    900: "oklch(0.21 0 0)",
    950: "oklch(0.15 0 0)",
  },
  primary: {
    50: "oklch(0.95 0.025 260)",
    100: "oklch(0.9 0.05 260)",
    200: "oklch(0.8 0.1 260)",
    300: "oklch(0.7 0.15 260)",
    400: "oklch(0.6 0.2 260)",
    500: "oklch(0.5 0.22 260)",
    600: "oklch(0.4 0.2 260)",
    700: "oklch(0.3 0.18 260)",
    800: "oklch(0.2 0.15 260)",
    900: "oklch(0.15 0.1 260)",
    950: "oklch(0.1 0.05 260)",
  },
  accent: {
    50: "oklch(0.95 0.05 50)",
    100: "oklch(0.9 0.1 50)",
    200: "oklch(0.8 0.15 50)",
    300: "oklch(0.7 0.2 50)",
    400: "oklch(0.6 0.22 50)",
    500: "oklch(0.5 0.24 50)",
    600: "oklch(0.4 0.22 50)",
    700: "oklch(0.3 0.2 50)",
    800: "oklch(0.2 0.18 50)",
    900: "oklch(0.15 0.12 50)",
    950: "oklch(0.1 0.06 50)",
  },
}

const spacing: Record<string, string> = {
  "0": "0px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
}

const fontFamily: Record<string, string[]> = {
  sans: ["Inter", "system-ui", "sans-serif"],
  mono: ["JetBrains Mono", "Fira Code", "monospace"],
}

const fontSize: Record<string, [string, { lineHeight: string }]> = {
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.5rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
  "5xl": ["3rem", { lineHeight: "1" }],
  "6xl": ["3.75rem", { lineHeight: "1" }],
  "7xl": ["4.5rem", { lineHeight: "1" }],
  "8xl": ["6rem", { lineHeight: "1" }],
  "9xl": ["8rem", { lineHeight: "1" }],
}

const borderRadius: Record<string, string> = {
  sm: "0.25rem",
  DEFAULT: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
}

const gridcnPreset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral: palette.neutral,
        primary: palette.primary,
        accent: palette.accent,
      },
      spacing,
      fontFamily,
      fontSize,
      borderRadius,
    },
  },
}

export default gridcnPreset
export { palette, spacing, fontFamily, fontSize, borderRadius }
