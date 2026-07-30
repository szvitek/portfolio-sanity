"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FooterLink {
  label: string
  href: string
}

interface TronFooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string
  tagline?: string
  links?: FooterLink[]
  copyright?: string
}

export function TronFooter({
  brand = "PORTFOLIO",
  tagline = "END OF LINE",
  links = [],
  copyright,
  className,
  ...props
}: TronFooterProps) {
  return (
    <footer
      data-slot="tron-footer"
      className={cn(
        "relative overflow-hidden border-t border-primary/20 bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb,0,180,255),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb,0,180,255),0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">
              //{brand}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              {tagline}
            </p>
          </div>

          {/* Links */}
          {links.length > 0 && (
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Status */}
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                SYSTEM OPERATIONAL
              </span>
            </div>
            <span className="font-mono text-[10px] text-foreground/30">
              {copyright || `© ${new Date().getFullYear()} ${brand}`}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border/30 pt-4">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-foreground/30">
            <span>BUILD: {process.env.NEXT_PUBLIC_BUILD_ID || "DEV"}</span>
            <span>NODE: REACT</span>
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-primary/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-primary/30" />
    </footer>
  )
}
