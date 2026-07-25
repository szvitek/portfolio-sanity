"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  description?: string
  badge?: string
  align?: "left" | "center" | "right"
  rightContent?: React.ReactNode
}

export function HeroSection({
  title,
  subtitle,
  description,
  badge,
  align = "center",
  rightContent,
  children,
  className,
  ...props
}: HeroSectionProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  return (
    <div
      data-slot="tron-hero-section"
      className={cn(
        "group relative overflow-hidden rounded border border-primary/20 bg-card/80 px-6 py-16 backdrop-blur-sm md:px-12 md:py-24 lg:py-32",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb,0,180,255),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb,0,180,255),0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb,0,180,255),0.06),transparent_70%)]" />

      <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        style={{ animation: "heroScan 6s ease-in-out infinite" }}
      />

      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px">
        <div
          className="h-full w-1/4 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ animation: "heroSweep 5s ease-in-out infinite" }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px">
        <div
          className="h-full w-1/4 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ animation: "heroSweep 5s ease-in-out infinite reverse" }}
        />
      </div>

      <style>{`
        @keyframes heroScan {
          0%, 100% { top: 20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 80%; }
        }
        @keyframes heroSweep {
          0%, 100% { margin-left: -10%; }
          50% { margin-left: 86%; }
        }
      `}</style>

      <div
        className={cn(
          "relative z-10",
          rightContent
            ? "grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
            : "flex flex-col gap-4",
          !rightContent && alignmentClasses[align]
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-4",
            alignmentClasses[align]
          )}
        >
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.1)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {badge}
              </span>
            </div>
          )}

          {subtitle && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              {subtitle}
            </div>
          )}

          <h1 className="max-w-4xl font-display text-3xl font-bold uppercase tracking-wider text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div
            className={cn(
              "flex gap-1",
              align === "center" && "justify-center",
              align === "right" && "justify-end"
            )}
          >
            <div className="h-px w-12 bg-primary/60" />
            <div className="h-px w-6 bg-primary/30" />
            <div className="h-px w-3 bg-primary/15" />
          </div>

          {description && (
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 md:text-base">
              {description}
            </p>
          )}

          {children && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {children}
            </div>
          )}
        </div>

        {rightContent && (
          <div className="flex flex-col items-center gap-4">
            {rightContent}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-8 left-0 top-8 flex flex-col justify-between">
        <div className="h-16 w-px bg-gradient-to-b from-primary/40 to-transparent" />
        <div className="h-16 w-px bg-gradient-to-t from-primary/40 to-transparent" />
      </div>

      <div className="pointer-events-none absolute bottom-8 right-0 top-8 flex flex-col justify-between">
        <div className="h-16 w-px bg-gradient-to-b from-primary/40 to-transparent" />
        <div className="h-16 w-px bg-gradient-to-t from-primary/40 to-transparent" />
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-primary/40" />
    </div>
  )
}