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
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-1 px-4 py-2">
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
    </nav>
  )
}