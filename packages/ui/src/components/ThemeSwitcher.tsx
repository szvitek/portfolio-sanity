"use client"

import { useTheme, type ThemeName, type Intensity } from "../theme-context"

const THEMES: { name: ThemeName; label: string }[] = [
  { name: "tron", label: "TRON" },
  { name: "ares", label: "ARES" },
  { name: "clu", label: "CLU" },
  { name: "athena", label: "ATHENA" },
  { name: "aphrodite", label: "APHRODITE" },
  { name: "poseidon", label: "POSEIDON" },
]

const INTENSITIES: { name: Intensity; label: string }[] = [
  { name: "none", label: "OFF" },
  { name: "light", label: "LIGHT" },
  { name: "medium", label: "MEDIUM" },
  { name: "heavy", label: "HEAVY" },
]

export function ThemeSwitcher() {
  const { state, setTheme } = useTheme()

  return (
    <div className="flex flex-wrap gap-1">
      {THEMES.map(({ name, label }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest transition-all duration-200 ${
            state.theme === name
              ? "bg-primary text-primary-foreground shadow-[var(--tron-border-glow)]"
              : "border border-[var(--border)] text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function IntensitySwitcher() {
  const { state, setIntensity } = useTheme()

  return (
    <div className="flex flex-wrap gap-1">
      {INTENSITIES.map(({ name, label }) => (
        <button
          key={name}
          onClick={() => setIntensity(name)}
          className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest transition-all duration-200 ${
            state.intensity === name
              ? "bg-primary text-primary-foreground shadow-[var(--tron-border-glow)]"
              : "border border-[var(--border)] text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function ThemeControls() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 rounded-none border border-[var(--border)] bg-[var(--card)] p-3 shadow-lg">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        Theme
      </span>
      <ThemeSwitcher />
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        Glow
      </span>
      <IntensitySwitcher />
    </div>
  )
}
