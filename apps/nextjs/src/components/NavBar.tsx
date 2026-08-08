"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Waveform } from "@/components/thegridcn/waveform"
import { useMusicPlayer } from "@/components/MusicPlayerProvider"

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
  const { playing, musicUrl, title } = useMusicPlayer()
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
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3">
        <a href="#profile" className="flex shrink-0 items-center gap-2">
          <img
            src="/swytech-dev-logo.png"
            alt="swytech.dev logo"
            className="h-7 w-7 object-contain"
          />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">
            swytech.dev
          </span>
        </a>
        <div data-slot="nav-links" className="flex items-center justify-center gap-1">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "group relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                activeSection === id
                  ? "text-primary"
                  : "text-foreground/50 hover:text-foreground/80"
              )}
            >
              {label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-2 bottom-0 h-px bg-primary transition-transform",
                  activeSection === id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </a>
          ))}
        </div>
        <div data-slot="nav-audio" className="hidden shrink-0 items-center gap-1.5 md:flex">
          {musicUrl && (
            <Waveform
              bare
              playing={playing}
              bars={16}
              intensity="medium"
              title={title}
            />
          )}
        </div>
      </div>
    </nav>
  )
}
