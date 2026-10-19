import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import handler from "@/pages/api/revalidate"
import type { NextApiRequest, NextApiResponse } from "next"

function createMockReqRes({
  method = "POST",
  secret,
  body = "",
  headers = {},
}: {
  method?: string
  secret?: string
  body?: string
  headers?: Record<string, string>
} = {}) {
  const req = {
    method,
    query: secret ? { secret } : {},
    headers,
    [Symbol.asyncIterator]: async function* () {
      if (body) yield Buffer.from(body)
    },
  } as unknown as NextApiRequest

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn().mockReturnThis(),
    revalidate: vi.fn().mockResolvedValue(undefined),
  } as unknown as NextApiResponse

  return { req, res }
}

describe("Revalidate API route", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv("REVALIDATE_SECRET", "test-secret")
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("rejects non-POST methods", async () => {
    const { req, res } = createMockReqRes({ method: "GET", secret: "test-secret" })
    await handler(req, res)
    expect(res.setHeader).toHaveBeenCalledWith("Allow", "POST")
    expect(res.status).toHaveBeenCalledWith(405)
    expect(res.revalidate).not.toHaveBeenCalled()
  })

  it("returns 401 when the secret query param is missing", async () => {
    const { req, res } = createMockReqRes()
    await handler(req, res)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.revalidate).not.toHaveBeenCalled()
  })

  it("returns 401 when the secret is incorrect", async () => {
    const { req, res } = createMockReqRes({ secret: "wrong-secret" })
    await handler(req, res)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.revalidate).not.toHaveBeenCalled()
  })

  it("returns 401 when no secret is configured", async () => {
    vi.stubEnv("REVALIDATE_SECRET", "")
    vi.stubEnv("SANITY_REVALIDATE_SECRET", "")
    const { req, res } = createMockReqRes({ secret: "test-secret" })
    await handler(req, res)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.revalidate).not.toHaveBeenCalled()
  })

  it("revalidates the home page when the secret is valid", async () => {
    const { req, res } = createMockReqRes({ secret: "test-secret" })
    await handler(req, res)
    expect(res.revalidate).toHaveBeenCalledWith("/")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ revalidated: true, path: "/" })
  })

  it("returns 500 when revalidation throws", async () => {
    const { req, res } = createMockReqRes({ secret: "test-secret" })
    vi.mocked(res.revalidate).mockRejectedValueOnce(new Error("boom"))
    await handler(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to revalidate" })
  })
})