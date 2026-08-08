"use client"

import { useTheme } from "@portfolio/ui"
import type { ThemeName, Intensity } from "@portfolio/ui"
import { cn } from "@/lib/utils"
import { Pause, Play, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMusicPlayer } from "@/components/MusicPlayerProvider"

const THEME_DOT_COLORS: Record<ThemeName, string> = {
  tron: "bg-cyan-400",
  ares: "bg-red-400",
  clu: "bg-orange-400",
  athena: "bg-amber-300",
  aphrodite: "bg-pink-400",
  poseidon: "bg-blue-400",
}

const THEME_NAMES: ThemeName[] = ["tron", "ares", "clu", "athena", "aphrodite", "poseidon"]

const INTENSITY_VALUES: Intensity[] = ["none", "light", "medium", "heavy"]

const INTENSITY_PRIMARY_STYLES: Record<Intensity, string> = {
  none: "border border-primary/30 bg-transparent",
  light: "border border-primary/50 bg-primary/40",
  medium: "border border-primary/70 bg-primary/70",
  heavy: "border border-primary bg-primary",
}

export function ThemeControls() {
  const { state, setTheme, setIntensity } = useTheme()
  const { playing, toggle, next, previous, trackCount, musicUrl } = useMusicPlayer()

  return (
    <div
      data-testid="theme-controls"
      data-slot="theme-controls"
      className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3 rounded border border-border/30 bg-background/80 p-2 backdrop-blur-md"
    >
      <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/40 [writing-mode:vertical-lr]">
        Theme
      </span>
      {THEME_NAMES.map((theme) => (
        <Button
          key={theme}
          type="button"
          variant="link"
          onClick={() => setTheme(theme)}
          title={theme}
          aria-label={theme}
          className={cn(
            "h-3 w-3 rounded-full border p-0",
            THEME_DOT_COLORS[theme],
            state.theme === theme
              ? "scale-125 border-foreground ring-1 ring-foreground/50"
              : "border-transparent opacity-60 hover:scale-125 hover:opacity-100 hover:ring-1 hover:ring-foreground/40"
          )}
        />
      ))}

      <div className="my-1 h-px w-4 bg-border/30" />

      <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/40 [writing-mode:vertical-lr]">
        Glow
      </span>
      {INTENSITY_VALUES.map((intensity) => (
        <Button
          key={intensity}
          type="button"
          variant="link"
          onClick={() => setIntensity(intensity)}
          title={intensity}
          aria-label={intensity}
          className={cn(
            "h-3 w-3 rounded-full border p-0",
            INTENSITY_PRIMARY_STYLES[intensity],
            state.intensity === intensity
              ? "scale-125 ring-1 ring-foreground/50"
              : "hover:scale-125 hover:ring-1 hover:ring-foreground/40"
          )}
        />
      ))}

      {musicUrl && (
        <>
          <div className="my-1 h-px w-4 bg-border/30" />

          <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/40 [writing-mode:vertical-lr]">
            Audio
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggle}
            title={playing ? "Pause music" : "Play music"}
            aria-label={playing ? "Pause music" : "Play music"}
            className="h-6 w-6 rounded-full p-0"
          >
            {playing ? (
              <Pause className="size-3" />
            ) : (
              <Play className="size-3 animate-pulse" />
            )}
          </Button>

          {trackCount > 1 && (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={next}
                title="Next track"
                aria-label="Next track"
                className="h-6 w-6 rounded-full p-0"
              >
                <SkipForward className="size-3" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={previous}
                title="Previous track"
                aria-label="Previous track"
                className="h-6 w-6 rounded-full p-0"
              >
                <SkipBack className="size-3" />
              </Button>
            </>
          )}
        </>
      )}
    </div>
  )
}
