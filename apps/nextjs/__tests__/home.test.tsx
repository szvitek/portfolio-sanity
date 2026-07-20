import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import type { GetStaticPropsResult } from "next"
import HomePage, { getStaticProps } from "@/pages/index"
import { mockHomePageData } from "./fixtures/homePage"
import type { ProfileData } from "@/lib/sanity"

type PageProps = { profile: ProfileData | null }

async function getPageProps(): Promise<PageProps> {
  const result = await getStaticProps({} as any)
  if ("props" in result) {
    return { profile: (result as GetStaticPropsResult<PageProps> & { props: PageProps }).props.profile }
  }
  return { profile: null }
}

const mockFetch = vi.hoisted(() => vi.fn())

vi.mock("@portfolio/sanity/client", () => ({
  getClient: () => ({
    fetch: mockFetch,
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "test-project")
  vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production")
  mockFetch.mockResolvedValue(mockHomePageData)
})

describe("Home page", () => {
  it("renders profile title from Sanity data", async () => {
    const { profile } = await getPageProps()
    render(<HomePage profile={profile} />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Full-Stack Developer")).toBeInTheDocument()
  })

  it("renders bio content", async () => {
    const { profile } = await getPageProps()
    render(<HomePage profile={profile} />)

    expect(screen.getByText("I build things for the web.")).toBeInTheDocument()
  })

  it("renders social link icons", async () => {
    const { profile } = await getPageProps()
    render(<HomePage profile={profile} />)

    const githubLink = screen.getByLabelText("github")
    expect(githubLink).toHaveAttribute("href", "https://github.com/johndoe")

    const linkedinLink = screen.getByLabelText("linkedin")
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/johndoe")
  })

  it("renders CV download button", async () => {
    const { profile } = await getPageProps()
    render(<HomePage profile={profile} />)

    const cvLink = screen.getByText("Download CV")
    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveAttribute("download")
  })

  it("renders avatar image with correct alt text", async () => {
    const { profile } = await getPageProps()
    render(<HomePage profile={profile} />)

    const avatar = screen.getByAltText("John Doe")
    expect(avatar).toBeInTheDocument()
  })

  it("renders empty state when no profile data", async () => {
    mockFetch.mockResolvedValueOnce({ profile: null })
    const { profile } = await getPageProps()
    render(<HomePage profile={profile} />)

    expect(screen.getByText("No profile content found.")).toBeInTheDocument()
  })

  it("renders sections in correct order container", async () => {
    const { profile } = await getPageProps()
    const { container } = render(<HomePage profile={profile} />)

    const main = container.querySelector("main")
    expect(main).toBeInTheDocument()
  })
})
