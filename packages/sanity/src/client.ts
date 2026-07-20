import { createClient } from "@sanity/client"
import type { SanityClient } from "@sanity/client"

export interface ClientConfig {
  projectId: string
  dataset?: string
  apiVersion?: string
}

export function getClient(config: ClientConfig): SanityClient {
  return createClient({
    projectId: config.projectId,
    dataset: config.dataset ?? "production",
    apiVersion: config.apiVersion ?? "2024-01-01",
    useCdn: true,
  })
}
