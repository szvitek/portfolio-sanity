import { getClient } from "@portfolio/sanity/client"
import { homePageQuery } from "@portfolio/sanity/queries"
import { createImageUrlBuilder } from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"
import type { PortableTextBlock } from "@portabletext/react"

export interface SocialLinkData {
  platform: "github" | "linkedin" | "email"
  url: string
}

export type Availability = "available" | "limited" | "unavailable"

export interface ProfileData {
  title: string
  subtitle?: string
  bio: PortableTextBlock[]
  avatar?: SanityImageSource
  email?: string
  cv?: { asset: { _ref: string } }
  socialLinks?: SocialLinkData[]
  availability?: Availability
}

export interface SkillData {
  _id: string
  name: string
  image?: SanityImageSource
  category: string
  featured: boolean
  order: number
  publishedAt: string
}

export interface SkillRef {
  _id: string
  name: string
  image?: SanityImageSource
  category: string
}

export interface HighlightItem {
  title: string
  description?: string
  category: string
}

export interface JobData {
  _id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  description?: PortableTextBlock[]
  image?: SanityImageSource
  location?: string
  website?: string
  skills?: SkillRef[]
  highlights?: HighlightItem[]
  order: number
  publishedAt: string
}

export interface StudyData {
  _id: string
  institution: string
  field: string
  startDate: string
  endDate?: string
  description?: string
  order: number
  publishedAt: string
}

export interface CertificationData {
  _id: string
  name: string
  date: string
  url?: string
  thumbnail?: SanityImageSource
  order: number
  publishedAt: string
}

export interface ProjectData {
  _id: string
  title: string
  description?: PortableTextBlock[]
  thumbnail?: SanityImageSource
  skills?: SkillRef[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  publishedAt: string
}

export interface BackgroundMusicData {
  _id: string
  title?: string
  audioUrl?: string
}

export interface HomePageData {
  profile: ProfileData | null
  skills: SkillData[]
  jobs: JobData[]
  studies: StudyData[]
  certifications: CertificationData[]
  projects: ProjectData[]
  backgroundMusic: BackgroundMusicData[]
}

function getConfig() {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    token: process.env.SANITY_API_TOKEN,
  }
}

function createClient() {
  const { projectId, dataset, token } = getConfig()
  return getClient({ projectId, dataset, token })
}

const client = createClient()

const builder = createImageUrlBuilder(client)

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
  const data = await client.fetch<HomePageData>(homePageQuery, {}, { cache: "no-store" })
  return data
}
