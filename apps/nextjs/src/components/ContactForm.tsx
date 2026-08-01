"use client"

import { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"

type FieldError = {
  field: string
  message: string
}

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setFieldErrors([])

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, honeypot }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors)
        }
        throw new Error(data.error ?? "Failed to send message")
      }

      setStatus("success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  const getError = (field: string) => fieldErrors.find((e) => e.field === field)

  return (
    <div
      data-slot="tron-contact-form"
      className={cn(
        "group relative overflow-hidden rounded border border-primary/20 bg-card/80 p-6 backdrop-blur-sm"
      )}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className="relative">
        <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground/90">
          //SEND TRANSMISSION
        </h3>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
          Fill out the form below to get in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
          {/* Honeypot - invisible to users */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 opacity-0">
            <label htmlFor="honeypot">Leave empty</label>
            <input
              id="honeypot"
              name="honeypot"
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <input
              type="text"
              name="name"
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className={cn(
                "w-full rounded border bg-background/50 px-3 py-2 font-mono text-xs text-black placeholder:text-black/30 focus:outline-none focus:ring-1",
                getError("name")
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                  : "border-primary/30 focus:border-primary focus:ring-primary/30"
              )}
            />
            {getError("name") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("name")?.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              id="contact-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className={cn(
                "w-full rounded border bg-background/50 px-3 py-2 font-mono text-xs text-black placeholder:text-black/30 focus:outline-none focus:ring-1",
                getError("email")
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                  : "border-primary/30 focus:border-primary focus:ring-primary/30"
              )}
            />
            {getError("email") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("email")?.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="subject"
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
              className={cn(
                "w-full rounded border bg-background/50 px-3 py-2 font-mono text-xs text-black placeholder:text-black/30 focus:outline-none focus:ring-1",
                getError("subject")
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                  : "border-primary/30 focus:border-primary focus:ring-primary/30"
              )}
            />
            {getError("subject") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("subject")?.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              required
              rows={4}
              className={cn(
                "w-full resize-none rounded border bg-background/50 px-3 py-2 font-mono text-xs text-black placeholder:text-black/30 focus:outline-none focus:ring-1",
                getError("message")
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
                  : "border-primary/30 focus:border-primary focus:ring-primary/30"
              )}
            />
            {getError("message") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("message")?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded border border-primary/50 bg-primary/20 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary transition-all hover:bg-primary/30 disabled:opacity-50"
          >
            {status === "loading"
              ? "// TRANSMITTING..."
              : status === "success"
                ? "✓ MESSAGE SENT"
                : "// SEND MESSAGE"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-green-500">
            // TRANSMISSION RECEIVED — I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-red-500">
            // TRANSMISSION FAILED — please try again later.
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
