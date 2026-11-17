import type { NextApiRequest, NextApiResponse } from "next"
import { getClient } from "@portfolio/sanity/client"

function getClientInstance() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ""
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !token) return null

  return getClient({ projectId, dataset, token })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const client = getClientInstance()
  if (!client) {
    return res.status(500).json({ error: "Sanity client is not configured" })
  }

  try {
    await client.patch("profile").setIfMissing({ downloads: 0 }).inc({ downloads: 1 }).commit()
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Failed to increment CV download count:", error)
    return res.status(500).json({ error: "Failed to increment download count" })
  }
}
