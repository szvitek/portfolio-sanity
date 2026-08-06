import * as React from "react"
import { cn } from "@/lib/utils"
import { Marquee } from "./marquee"

export interface LogoItem {
  name: string
  icon?: React.ReactNode
  className?: string
}

interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[]
  label?: string
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
  direction?: "left" | "right"
}

export function LogoCloud({
  logos,
  label,
  speed = "normal",
  pauseOnHover = true,
  direction = "left",
  className,
  ...props
}: LogoCloudProps) {
  return (
    <div
      data-slot="tron-logo-cloud"
      className={cn(
        "relative overflow-hidden rounded border border-primary/20 bg-card/80 py-6 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="relative mb-4 text-center text-[10px] uppercase tracking-widest text-foreground/40">
          {label}
        </div>
      )}

      <Marquee
        speed={speed}
        direction={direction}
        pauseOnHover={pauseOnHover}
        variant="subtle"
        className="px-0"
      >
        {logos.map((logo, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded border px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground/50 transition-colors hover:text-foreground/70",
              logo.className
            )}
          >
            {logo.icon && <span className="shrink-0">{logo.icon}</span>}
            <span>{logo.name}</span>
          </div>
        ))}
      </Marquee>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/40" />
    </div>
  )
}
