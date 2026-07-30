import type { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"

type ContactBody = {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

type ValidationError = {
  field: string
  message: string
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

function validate(body: unknown): { data: ContactBody; errors: ValidationError[] } {
  const errors: ValidationError[] = []
  const input = body as Record<string, unknown>

  const name = typeof input.name === "string" ? input.name.trim() : ""
  const email = typeof input.email === "string" ? input.email.trim() : ""
  const subject = typeof input.subject === "string" ? input.subject.trim() : ""
  const message = typeof input.message === "string" ? input.message.trim() : ""
  const honeypot = typeof input.honeypot === "string" ? input.honeypot : ""

  if (!name) errors.push({ field: "name", message: "Name is required" })
  if (!email) errors.push({ field: "email", message: "Email is required" })
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push({ field: "email", message: "Invalid email format" })
  if (!subject) errors.push({ field: "subject", message: "Subject is required" })
  if (!message) errors.push({ field: "message", message: "Message is required" })

  return { data: { name, email, subject, message, honeypot }, errors }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { data, errors } = validate(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  if (data.honeypot) {
    return res.status(200).json({ success: true })
  }

  const resend = getResend()
  if (!resend) {
    return res.status(500).json({ error: "RESEND_API_KEY is not configured" })
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    return res.status(500).json({ error: "CONTACT_EMAIL is not configured" })
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Failed to send email via Resend:", error)
    return res.status(500).json({ error: "Failed to send message" })
  }
}
