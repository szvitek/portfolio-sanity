import type { NextApiRequest, NextApiResponse } from "next"
import crypto from "crypto"

export const config = { api: { bodyParser: false } }

const secrets = () =>
  [process.env.SANITY_REVALIDATE_SECRET, process.env.REVALIDATE_SECRET].filter(
    Boolean
  ) as string[]

async function readRawBody(req: NextApiRequest): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req as any) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString("utf8")
}

function verifySignature(secret: string, rawBody: string, header: string): boolean {
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const [k, v] = p.split("=")
      return [k, v]
    })
  )
  const timestamp = parts.t
  const signature = parts.v1
  if (!timestamp || !signature) return false

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex")

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex")
    )
  } catch {
    return false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const configuredSecrets = secrets()
  if (configuredSecrets.length === 0) {
    return res.status(401).json({ error: "Invalid secret" })
  }

  const rawBody = await readRawBody(req)

  const querySecret = Array.isArray(req.query.secret)
    ? req.query.secret[0]
    : req.query.secret

  let authorized = false
  if (querySecret) {
    authorized = configuredSecrets.includes(querySecret)
  } else {
    const signatureHeader = req.headers["sanity-webhook-signature"]
    const header = Array.isArray(signatureHeader)
      ? signatureHeader[0]
      : signatureHeader
    if (header) {
      authorized = configuredSecrets.some((secret) =>
        verifySignature(secret, rawBody, header)
      )
    }
  }

  if (!authorized) {
    return res.status(401).json({ error: "Invalid secret" })
  }

  let body: { path?: string } = {}
  if (rawBody) {
    try {
      body = JSON.parse(rawBody)
    } catch {
      body = {}
    }
  }

  const path = body?.path ?? "/"

  try {
    await res.revalidate(path)
    return res.status(200).json({ revalidated: true, path })
  } catch (error) {
    console.error("Failed to revalidate:", error)
    return res.status(500).json({ error: "Failed to revalidate" })
  }
}
