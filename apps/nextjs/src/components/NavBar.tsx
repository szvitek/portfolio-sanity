"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

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
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-4 py-3 md:grid-cols-[auto_1fr_auto]">
        <button
          type="button"
          aria-label="Toggle menu"
          className="justify-self-start md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-primary" />
          ) : (
            <Menu className="h-5 w-5 text-primary" />
          )}
        </button>
        <a
          href="#profile"
          className="flex shrink-0 items-center gap-2 justify-self-center md:justify-self-start"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">
            // swytech.dev
          </span>
        </a>
        <div
          data-slot="nav-links"
          className="hidden items-center gap-6 md:flex md:justify-self-center"
        >
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "group relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                activeSection === id
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground"
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
        <div
          data-slot="nav-audio"
          className="flex shrink-0 items-center gap-1.5 justify-self-end md:flex"
        >
          {musicUrl && (
            <Waveform
              bare
              playing={playing}
              bars={16}
              intensity="medium"
              title={title}
              className="origin-right scale-50 md:scale-100 md:origin-center"
            />
          )}
        </div>
      </div>
      <div
        data-slot="mobile-nav"
        data-testid="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        className={cn(
          "absolute left-0 right-0 top-full z-50 overflow-hidden bg-background/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden",
          mobileMenuOpen
            ? "max-h-96 border-t border-primary/10 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "group relative block px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors",
              activeSection === id
                ? "text-primary"
                : "text-foreground/80 hover:text-foreground"
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
