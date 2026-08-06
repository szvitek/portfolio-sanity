"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NewsletterFormProps {
  title?: string
  description?: string
  placeholder?: string
  submitLabel?: string
  onSubmit?: (email: string) => void
  className?: string
}

export function NewsletterForm({
  title = "Stay Connected",
  description = "Subscribe to receive updates on new projects and opportunities.",
  placeholder = "your@email.com",
  submitLabel = "Subscribe",
  onSubmit,
  className,
  ...props
}: NewsletterFormProps) {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === "loading") return

    setStatus("loading")
    try {
      await onSubmit?.(email)
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div
      data-slot="tron-newsletter-form"
      className={cn(
        "group relative overflow-hidden rounded border border-primary/20 bg-card/80 p-6 backdrop-blur-sm",
        className
      )}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className="relative">
        <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground/90">
          //{title}
        </h3>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 rounded border border-primary/30 bg-background/50 px-3 py-2 font-mono text-xs text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="whitespace-nowrap rounded border border-primary/50 bg-primary/20 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary transition-all hover:bg-primary/30 disabled:opacity-50"
          >
            {status === "loading" ? "..." : status === "success" ? "✓ SENT" : submitLabel}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-green-500">
            // TRANSMISSION RECEIVED
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-red-500">
            // TRANSMISSION FAILED
          </p>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-primary/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-primary/30" />
    </div>
  )
}
