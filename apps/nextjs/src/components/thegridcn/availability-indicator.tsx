import * as React from "react"
import { cn } from "@/lib/utils"
import type { Availability } from "@/lib/sanity"

interface AvailabilityIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  availability: Availability
}

const availabilityConfig: Record<Availability, { dot: string; label: string; text: string }> = {
  available: {
    dot: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
    label: "Ready to work",
    text: "text-green-500",
  },
  limited: {
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    label: "Small projects only",
    text: "text-amber-500",
  },
  unavailable: {
    dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    label: "Not available",
    text: "text-red-500",
  },
}

export function AvailabilityIndicator({
  availability,
  className,
  ...props
}: AvailabilityIndicatorProps) {
  const config = availabilityConfig[availability]

  return (
    <div
      data-slot="tron-availability-indicator"
      className={cn(
        "flex w-full flex-col items-center gap-1 rounded border border-primary/30 bg-card/80 px-3 py-2 text-center backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
          Status:
        </span>
        <span className={cn("h-2 w-2 shrink-0 animate-pulse rounded-full", config.dot)} />
      </div>
      <span className={cn("font-mono text-[10px] font-bold uppercase tracking-widest", config.text)}>
        {config.label}
      </span>
    </div>
  )
}
