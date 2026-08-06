import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ContactForm } from "@/components/ContactForm"
import handler from "@/pages/api/contact"
import type { NextApiRequest, NextApiResponse } from "next"

const mockResendSend = vi.hoisted(() => vi.fn())

vi.mock("resend", () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: mockResendSend,
    },
  })),
}))

function createMockReqRes(body: unknown) {
  const req = {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
  } as unknown as NextApiRequest

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
  } as unknown as NextApiResponse

  return { req, res }
}

describe("Contact API route", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv("RESEND_API_KEY", "re_test_key")
    vi.stubEnv("CONTACT_EMAIL", "test@example.com")
  })

  it("rejects GET requests", async () => {
    const req = { method: "GET" } as NextApiRequest
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    await handler(req, res)

    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST")
    expect(res.status).toHaveBeenCalledWith(405)
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" })
  })

  it("validates required fields", async () => {
    const { req, res } = createMockReqRes({})

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([
        expect.objectContaining({ field: "name" }),
        expect.objectContaining({ field: "email" }),
        expect.objectContaining({ field: "subject" }),
        expect.objectContaining({ field: "message" }),
      ]),
    })
  })

  it("validates email format", async () => {
    const { req, res } = createMockReqRes({
      name: "Test",
      email: "not-an-email",
      subject: "Hello",
      message: "Test message",
    })

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      errors: expect.arrayContaining([
        expect.objectContaining({ field: "email", message: "Invalid email format" }),
      ]),
    })
  })

  it("returns success for honeypot submissions without calling Resend", async () => {
    const { req, res } = createMockReqRes({
      name: "Bot",
      email: "bot@spam.com",
      subject: "Spam",
      message: "Buy now",
      honeypot: "filled",
    })

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ success: true })
    expect(mockResendSend).not.toHaveBeenCalled()
  })

  it("sends email via Resend on valid submission", async () => {
    mockResendSend.mockResolvedValueOnce({ data: { id: "test-id" }, error: null })

    const { req, res } = createMockReqRes({
      name: "John Doe",
      email: "john@example.com",
      subject: "Hello",
      message: "This is a test message.",
    })

    await handler(req, res)

    expect(mockResendSend).toHaveBeenCalledWith({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "test@example.com",
      replyTo: "john@example.com",
      subject: "[Portfolio] Hello",
      text: expect.stringContaining("John Doe"),
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ success: true })
  })
})

describe("ContactForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    globalThis.fetch = vi.fn()
  })

  it("renders all form fields", () => {
    render(<ContactForm />)

    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Your message...")).toBeInTheDocument()
    expect(screen.getByText("//SEND TRANSMISSION")).toBeInTheDocument()
  })

  it("renders the submit button using the GridCN button component", () => {
    render(<ContactForm />)

    const submit = screen.getByText("// SEND MESSAGE")
    expect(submit).toHaveAttribute("data-slot", "button")
    expect(submit).toHaveAttribute("data-variant", "default")
    expect(submit).toHaveAttribute("type", "submit")
  })

  it("shows success message on successful submission", async () => {
    const mockFetch = vi.mocked(globalThis.fetch)
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
              } as Response),
            10
          )
        )
    )

    render(<ContactForm />)

    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "John" } })
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "john@test.com" } })
    fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Hello" } })
    fireEvent.change(screen.getByPlaceholderText("Your message..."), { target: { value: "Test" } })
    fireEvent.click(screen.getByText("// SEND MESSAGE"))

    expect(await screen.findByText(/TRANSMISSION RECEIVED/)).toBeInTheDocument()
  })

  it("shows error message on failed submission", async () => {
    const mockFetch = vi.mocked(globalThis.fetch)
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network error")), 10)
        )
    )

    render(<ContactForm />)

    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "John" } })
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "john@test.com" } })
    fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Hello" } })
    fireEvent.change(screen.getByPlaceholderText("Your message..."), { target: { value: "Test" } })
    fireEvent.click(screen.getByText("// SEND MESSAGE"))

    expect(await screen.findByText(/TRANSMISSION FAILED/)).toBeInTheDocument()
  })

  it("disables submit button while loading", async () => {
    const mockFetch = vi.mocked(globalThis.fetch)
    mockFetch.mockImplementationOnce(() => new Promise(() => {}))

    render(<ContactForm />)

    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "John" } })
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "john@test.com" } })
    fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Hello" } })
    fireEvent.change(screen.getByPlaceholderText("Your message..."), { target: { value: "Test" } })
    fireEvent.click(screen.getByText("// SEND MESSAGE"))

    expect(await screen.findByText("// TRANSMITTING...")).toBeInTheDocument()
  })

  it("shows validation errors from API", async () => {
    const mockFetch = vi.mocked(globalThis.fetch)
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: false,
                json: () =>
                  Promise.resolve({
                    errors: [{ field: "email", message: "Invalid email format" }],
                  }),
              } as Response),
            10
          )
        )
    )

    render(<ContactForm />)

    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "John" } })
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "bad-email" } })
    fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Hello" } })
    fireEvent.change(screen.getByPlaceholderText("Your message..."), { target: { value: "Test" } })
    fireEvent.submit(screen.getByTestId("contact-form"))

    expect(await screen.findByText(/Invalid email format/)).toBeInTheDocument()
  })
})
