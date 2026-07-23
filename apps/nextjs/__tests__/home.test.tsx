import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import type { GetStaticPropsResult } from "next"
import HomePage, { getStaticProps } from "@/pages/index"
import { mockHomePageData } from "./fixtures/homePage"
import type { ProfileData, SkillData, JobData, StudyData, CertificationData, ProjectData } from "@/lib/sanity"

type PageProps = {
  profile: ProfileData | null
  skills: SkillData[]
  jobs: JobData[]
  studies: StudyData[]
  certifications: CertificationData[]
  projects: ProjectData[]
}

async function getPageProps(): Promise<PageProps> {
  const result = await getStaticProps({} as any)
  if ("props" in result) {
    return result.props as PageProps
  }
  return { profile: null, skills: [], jobs: [], studies: [], certifications: [], projects: [] }
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
    const props = await getPageProps()
    render(<HomePage {...props} />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Full-Stack Developer")).toBeInTheDocument()
  })

  it("renders bio content", async () => {
    const props = await getPageProps()
    render(<HomePage {...props} />)

    expect(screen.getByText("I build things for the web.")).toBeInTheDocument()
  })

  it("renders social link icons", async () => {
    const props = await getPageProps()
    render(<HomePage {...props} />)

    const githubLink = screen.getByLabelText("github")
    expect(githubLink).toHaveAttribute("href", "https://github.com/johndoe")

    const linkedinLink = screen.getByLabelText("linkedin")
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/johndoe")
  })

  it("renders CV download button", async () => {
    const props = await getPageProps()
    render(<HomePage {...props} />)

    const cvLink = screen.getByText("Download CV")
    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveAttribute("download")
  })

  it("renders avatar image with correct alt text", async () => {
    const props = await getPageProps()
    render(<HomePage {...props} />)

    const avatar = screen.getByAltText("John Doe")
    expect(avatar).toBeInTheDocument()
  })

  it("renders empty state when no profile data", async () => {
    mockFetch.mockResolvedValueOnce({
      profile: null,
      skills: [],
      jobs: [],
      studies: [],
      certifications: [],
      projects: [],
    })
    const props = await getPageProps()
    render(<HomePage {...props} />)

    expect(screen.getByText("No profile content found.")).toBeInTheDocument()
  })

  it("renders main content container", async () => {
    const props = await getPageProps()
    const { container } = render(<HomePage {...props} />)

    const main = container.querySelector("main")
    expect(main).toBeInTheDocument()
  })

  it("renders hero section with correct structure", async () => {
    const props = await getPageProps()
    const { container } = render(<HomePage {...props} />)

    const hero = container.querySelector('[data-slot="tron-hero-section"]')
    expect(hero).toBeInTheDocument()
    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("renders navigation bar with section links", async () => {
    const props = await getPageProps()
    render(<HomePage {...props} />)

    const nav = screen.getByTestId("navbar")
    expect(nav).toBeInTheDocument()

    const navLinks = nav.querySelectorAll("a")
    const linkTexts = Array.from(navLinks).map((link) => link.textContent)
    expect(linkTexts).toEqual([
      "Profile", "Skills", "Projects", "Jobs", "Studies", "Certifications", "Contact",
    ])
  })

  it("renders top and bottom status bars", async () => {
    const props = await getPageProps()
    render(<HomePage {...props} />)

    expect(screen.getByTestId("top-statusbar")).toBeInTheDocument()
    expect(screen.getByTestId("bottom-statusbar")).toBeInTheDocument()
    expect(screen.getByText("SYSTEM ONLINE")).toBeInTheDocument()
    expect(screen.getByText("END OF TRANSMISSION")).toBeInTheDocument()
  })

  it("renders section IDs for navigation anchor targets", async () => {
    const props = await getPageProps()
    const { container } = render(<HomePage {...props} />)

    const sections = ["profile", "skills", "projects", "jobs", "studies", "certifications", "contact"]
    for (const sectionId of sections) {
      expect(container.querySelector(`#${sectionId}`)).toBeInTheDocument()
    }
  })

  it("renders section placeholder text when sections have no data", async () => {
    const props = await getPageProps()
    render(<HomePage {...props} />)

    const placeholders = screen.getAllByText(/content coming soon/i)
    expect(placeholders.length).toBeGreaterThanOrEqual(5)
  })
})