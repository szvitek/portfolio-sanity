"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChangelogItem {
  title: string
  description?: string
  category: string
}

interface ChangelogProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ChangelogItem[]
  label?: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ARCH: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/40" },
  FEAT: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/40" },
  LEAD: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/40" },
  PERF: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/40" },
  DEVOPS: { bg: "bg-rose-500/15", text: "text-rose-400", border: "border-rose-500/40" },
  FIN: { bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/40" },
}

const DEFAULT_COLOR = { bg: "bg-primary/15", text: "text-primary", border: "border-primary/40" }

export function Changelog({
  items,
  label,
  className,
  ...props
}: ChangelogProps) {
  const [revealedIdx, setRevealedIdx] = React.useState(-1)
  React.useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      setRevealedIdx(idx)
      idx++
      if (idx >= items.length) clearInterval(interval)
    }, 120)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div
      data-slot="tron-changelog"
      className={cn(
        "relative overflow-hidden rounded border border-primary/15 bg-black/40 p-5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
          // {label}
        </div>
      )}

      <div className="relative space-y-0">
        {items.map((item, i) => {
          const colors = CATEGORY_COLORS[item.category] ?? DEFAULT_COLOR
          return (
            <div
              key={i}
              className={cn(
                "relative flex gap-4 pb-5 transition-all duration-400",
                i <= revealedIdx ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
            >
                <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "relative z-10 flex h-2 w-2 shrink-0 items-center justify-center rounded-full shadow-[0_0_6px_var(--primary)]",
                    colors.text
                  )}
                  style={{ backgroundColor: "currentColor" }}
                />
                <div className="mt-1 w-px flex-1 bg-primary/20" />
              </div>

              <div className="-mt-0.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider",
                      colors.bg,
                      colors.text,
                      colors.border
                    )}
                  >
                    {item.category}
                  </span>
                  <h4 className="font-mono text-sm font-medium text-foreground/90">
                    {item.title}
                  </h4>
                </div>
                {item.description && (
                  <p className="mt-1 text-xs leading-relaxed text-foreground/50">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
