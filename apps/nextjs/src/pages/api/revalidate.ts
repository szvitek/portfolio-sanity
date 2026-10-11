import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.query.secret !== secret) {
    return res.status(401).json({ error: "Invalid secret" })
  }

  try {
    await res.revalidate("/")
    return res.status(200).json({ revalidated: true })
  } catch (error) {
    console.error("Failed to revalidate:", error)
    return res.status(500).json({ error: "Failed to revalidate" })
  }
}
