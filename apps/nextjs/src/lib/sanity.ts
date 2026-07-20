import { getClient } from "@portfolio/sanity/client"
import { homePageQuery } from "@portfolio/sanity/queries"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { PortableTextBlock } from "@portabletext/react"

export interface SocialLinkData {
  platform: "github" | "linkedin" | "email"
  url: string
}

export interface ProfileData {
  title: string
  subtitle?: string
  bio: PortableTextBlock[]
  avatar?: SanityImageSource
  email?: string
  cv?: { asset: { _ref: string } }
  socialLinks?: SocialLinkData[]
}

export interface HomePageData {
  profile: ProfileData | null
}

function getConfig() {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  }
}

function createClient() {
  const { projectId, dataset } = getConfig()
  return getClient({ projectId, dataset })
}

const client = createClient()

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function cvUrlFor(cv: { asset: { _ref: string } }): string | undefined {
  const { projectId, dataset } = getConfig()
  if (!projectId) return undefined
  const ref = cv.asset._ref
  const parts = ref.replace(/^file-/, "").split("-")
  const ext = parts.pop() ?? ""
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${parts.join("-")}.${ext}`
}

export async function getHomePageData(): Promise<HomePageData> {
  const data = await client.fetch<HomePageData>(homePageQuery)
  return data
}
