"use client"

import { useTheme } from "@portfolio/ui"
import type { ThemeName, Intensity } from "@portfolio/ui"
import { cn } from "@/lib/utils"

const THEME_DOT_COLORS: Record<ThemeName, string> = {
  tron: "bg-cyan-400",
  ares: "bg-red-400",
  clu: "bg-orange-400",
  athena: "bg-amber-300",
  aphrodite: "bg-pink-400",
  poseidon: "bg-blue-400",
}

const THEME_NAMES: ThemeName[] = ["tron", "ares", "clu", "athena", "aphrodite", "poseidon"]

export function ThemeDots() {
  const { state, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1.5">
      {THEME_NAMES.map((theme) => (
        <button
          key={theme}
          onClick={() => setTheme(theme)}
          title={theme}
          className={cn(
            "h-3 w-3 rounded-full border transition-all",
            THEME_DOT_COLORS[theme],
            state.theme === theme
              ? "scale-125 border-foreground ring-1 ring-foreground/50"
              : "border-transparent opacity-60 hover:scale-110 hover:opacity-100"
          )}
        />
      ))}
    </div>
  )
}
const INTENSITY_VALUES: Intensity[] = ["none", "light", "medium", "heavy"]

const INTENSITY_DOT_STYLES: Record<Intensity, string> = {
  none: "border border-foreground/30 bg-transparent",
  light: "border border-foreground/50 bg-foreground/30",
  medium: "border border-foreground/70 bg-foreground/60",
  heavy: "border border-foreground bg-foreground",
}

export function IntensityDots() {
  const { state, setIntensity } = useTheme()

  return (
    <div className="flex items-center gap-1.5">
      {INTENSITY_VALUES.map((intensity) => (
        <button
          key={intensity}
          onClick={() => setIntensity(intensity)}
          title={intensity}
          className={cn(
            "h-3 w-3 rounded-full transition-all",
            INTENSITY_DOT_STYLES[intensity],
            state.intensity === intensity
              ? "scale-125 ring-1 ring-foreground/50"
              : "opacity-60 hover:scale-110 hover:opacity-100"
          )}
        />
      ))}
    </div>
  )
}
