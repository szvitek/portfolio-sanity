"use client"

import { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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
      className="relative rounded border border-primary/20 p-6"
    >
      <div className="relative">
        <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground/90">
          //SEND TRANSMISSION
        </h3>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
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
            <Input
              type="text"
              name="name"
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className={cn(
                "font-mono text-xs",
                getError("name") &&
                  "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/30"
              )}
            />
            {getError("name") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("name")?.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="email"
              name="email"
              id="contact-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className={cn(
                "font-mono text-xs",
                getError("email") &&
                  "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/30"
              )}
            />
            {getError("email") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("email")?.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="text"
              name="subject"
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              required
              className={cn(
                "font-mono text-xs",
                getError("subject") &&
                  "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/30"
              )}
            />
            {getError("subject") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("subject")?.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              name="message"
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              required
              rows={4}
              className={cn(
                "resize-none font-mono text-xs",
                getError("message") &&
                  "border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/30"
              )}
            />
            {getError("message") && (
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
                // {getError("message")?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            disabled={status === "loading"}
            className="h-auto w-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest"
          >
            {status === "loading"
              ? "// TRANSMITTING..."
              : status === "success"
                ? "✓ MESSAGE SENT"
                : "// SEND MESSAGE"}
          </Button>
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
    </div>
  )
}
