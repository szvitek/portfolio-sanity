import type { NextApiRequest, NextApiResponse } from "next"
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook"

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
    const signatureHeader = req.headers[SIGNATURE_HEADER_NAME]
    const header = Array.isArray(signatureHeader)
      ? signatureHeader[0]
      : signatureHeader
    if (header && typeof header === "string") {
      authorized = await configuredSecrets.some((secret) =>
        isValidSignature(rawBody, header, secret)
      )
    }
  }

  if (!authorized) {
    return res.status(401).json({ error: "Invalid secret" })
  }

  // Wait for Content Lake eventual consistency, as parseBody does
  await new Promise((resolve) => setTimeout(resolve, 3000))

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
