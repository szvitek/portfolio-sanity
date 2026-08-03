"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "jobs", label: "Jobs" },
  { id: "studies", label: "Studies" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
]

export function NavBar() {
  const [activeSection, setActiveSection] = React.useState("profile")

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id)
      if (!el) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id)
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      )

      observer.observe(el)
      observers.push(observer)
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <nav
      data-testid="navbar"
      className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-1 px-4 py-2">
        <a href="#profile" className="flex shrink-0 items-center gap-2">
          <img
            src="/swytech-dev-logo.png"
            alt="swytech.dev logo"
            className="h-6 w-6 object-contain"
          />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">
            swytech.dev
          </span>
        </a>
        <div className="flex items-center justify-end gap-1">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "rounded px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                activeSection === id
                  ? "text-primary"
                  : "text-foreground/50 hover:text-foreground/80"
              )}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}