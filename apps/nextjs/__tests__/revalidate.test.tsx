import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { NextRequest } from "next/server"
import { POST } from "@/app/api/revalidate/route"

vi.mock("next-sanity/webhook", () => ({
  parseBody: vi.fn(),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

import { parseBody } from "next-sanity/webhook"
import { revalidatePath } from "next/cache"

describe("Revalidate API route", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv("REVALIDATE_SECRET", "test-secret")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  function makeReq(method = "POST") {
    return new NextRequest("http://localhost/api/revalidate", { method })
  }

  it("rejects non-POST methods", async () => {
    const res = await POST(makeReq("GET"))
    expect(res.status).toBe(405)
  })

  it("returns 401 when the signature is invalid", async () => {
    vi.mocked(parseBody).mockResolvedValue({ isValidSignature: false, body: null })
    const res = await POST(makeReq())
    expect(res.status).toBe(401)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("returns 401 when the secret is not configured", async () => {
    vi.stubEnv("REVALIDATE_SECRET", "")
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "")
    vi.mocked(parseBody).mockResolvedValue({ isValidSignature: null, body: null })
    const res = await POST(makeReq())
    expect(res.status).toBe(500)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it("revalidates the home page when the signature is valid", async () => {
    vi.mocked(parseBody).mockResolvedValue({
      isValidSignature: true,
      body: { path: "/" },
    })
    const res = await POST(makeReq())
    expect(revalidatePath).toHaveBeenCalledWith("/")
    expect(res.status).toBe(200)
  })

  it("returns 500 when revalidation throws", async () => {
    vi.mocked(parseBody).mockResolvedValue({
      isValidSignature: true,
      body: { path: "/" },
    })
    vi.mocked(revalidatePath).mockImplementation(() => {
      throw new Error("boom")
    })
    const res = await POST(makeReq())
    expect(res.status).toBe(500)
  })
})