import { fireEvent, render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import type { GetStaticPropsResult } from "next"
import HomePage, { getStaticProps } from "@/pages/index"
import { mockHomePageData } from "./fixtures/homePage"
import type { ProfileData, SkillData, JobData, StudyData, CertificationData, ProjectData } from "@/lib/sanity"
import { ThemeProvider } from "@portfolio/ui"

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

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
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getAllByText("Full-Stack Developer").length).toBeGreaterThanOrEqual(1)
  })

  it("renders bio content", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("I build things for the web.")).toBeInTheDocument()
  })

  it("renders social link icons", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const githubLink = screen.getByLabelText("github")
    expect(githubLink).toHaveAttribute("href", "https://github.com/johndoe")

    const linkedinLink = screen.getByLabelText("linkedin")
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/johndoe")
  })

  it("renders CV download button", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const cvLink = screen.getByText("Download CV")
    expect(cvLink).toBeInTheDocument()
    expect(cvLink).toHaveAttribute("download")
  })

  it("renders avatar image with correct alt text", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

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
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("No profile content found.")).toBeInTheDocument()
  })

  it("renders main content container", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const main = container.querySelector("main")
    expect(main).toBeInTheDocument()
  })

  it("renders hero section with correct structure", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const hero = container.querySelector('[data-slot="tron-hero-section"]')
    expect(hero).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("renders hero section with min-h-screen", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const profileSection = container.querySelector("#profile")
    expect(profileSection).toHaveClass("min-h-screen")
  })

  it("renders hero section with 2-column grid layout", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const hero = container.querySelector('[data-slot="tron-hero-section"]')
    const grid = hero?.querySelector(".grid")
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass("lg:grid-cols-[7fr_3fr]")
  })

  it("renders availability indicator in hero", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const indicator = screen.getByText("Ready to work")
    expect(indicator).toBeInTheDocument()

    const wrapper = container.querySelector('[data-slot="tron-availability-indicator"]')
    expect(wrapper).toBeInTheDocument()
    expect(screen.getByText("Status:")).toBeInTheDocument()
  })

  it("renders hero inside mx-auto max-w-5xl container", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const profileSection = container.querySelector("#profile")
    const container_ = profileSection?.querySelector(".mx-auto.max-w-5xl")
    expect(container_).toBeInTheDocument()
  })

  it("renders avatar in right column of hero", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const hero = container.querySelector('[data-slot="tron-hero-section"]')
    const grid = hero?.querySelector(".grid")
    const columns = grid?.children
    expect(columns).toHaveLength(2)

    const rightColumn = columns?.[1]
    const avatar = rightColumn?.querySelector("img[alt='John Doe']")
    expect(avatar).toBeInTheDocument()
  })

  it("renders navigation bar with section links", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

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
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByTestId("top-statusbar")).toBeInTheDocument()
    expect(screen.getByTestId("bottom-statusbar")).toBeInTheDocument()
    expect(screen.getByText("SYSTEM ONLINE")).toBeInTheDocument()
    expect(screen.getByText("END OF TRANSMISSION")).toBeInTheDocument()
  })

  it("renders section IDs for navigation anchor targets", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const sections = ["profile", "skills", "projects", "jobs", "studies", "certifications", "contact"]
    for (const sectionId of sections) {
      expect(container.querySelector(`#${sectionId}`)).toBeInTheDocument()
    }
  })

  it("renders skills section in second position after profile", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const main = container.querySelector("main")
    const sectionElements = main?.querySelectorAll("section") ?? []
    expect(sectionElements.length).toBeGreaterThanOrEqual(2)
    expect(sectionElements[0]).toHaveAttribute("id", "profile")
    expect(sectionElements[1]).toHaveAttribute("id", "skills")
  })

  it("renders skills in a single LogoCloud with colored items per category", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const logoCloud = container.querySelector('[data-slot="tron-logo-cloud"]')
    expect(logoCloud).toBeInTheDocument()

    const allReact = screen.getAllByText("React")
    expect(allReact.length).toBeGreaterThan(0)

    const allNext = screen.getAllByText("Next.js")
    expect(allNext.length).toBeGreaterThan(0)

    const allNode = screen.getAllByText("Node.js")
    expect(allNode.length).toBeGreaterThan(0)

    const allPython = screen.getAllByText("Python")
    expect(allPython.length).toBeGreaterThan(0)
  })

  it("renders category filter buttons and filters skills on click", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const allButton = screen.getByText("All")
    expect(allButton).toBeInTheDocument()

    const frontendButton = screen.getByText("Frontend")
    expect(frontendButton).toBeInTheDocument()

    const backendButton = screen.getByText("Backend")
    expect(backendButton).toBeInTheDocument()

    fireEvent.click(frontendButton)

    const frontendSkills = screen.getAllByText(/React|Next\.js/)
    expect(frontendSkills.length).toBeGreaterThan(0)

    const skillsSection = container.querySelector('#skills')
    const nodeItems = skillsSection?.querySelectorAll("text") ?? []
    const nodeTexts = Array.from(skillsSection?.querySelectorAll("*") ?? []).filter(
      (el) => el.textContent === "Node.js" && el.children.length === 0
    )
    expect(nodeTexts.length).toBe(0)
  })

  it("renders no placeholder text when all sections have data", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const placeholders = screen.queryAllByText(/content coming soon/i)
    expect(placeholders.length).toBe(0)
  })

  it("renders jobs section with job cards", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Experience")).toBeInTheDocument()
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
    expect(screen.getByText("TechStart")).toBeInTheDocument()
  })

  it("renders job company logos", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const logo = screen.getByAltText("Acme Corp logo")
    expect(logo).toBeInTheDocument()
  })

  it("renders job locations", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument()
    expect(screen.getByText("Remote")).toBeInTheDocument()
  })

  it("renders job date ranges", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText(/Jan 2022/)).toBeInTheDocument()
    expect(screen.getByText(/Jun 2024/)).toBeInTheDocument()
  })

  it("renders job roles", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Senior Developer")).toBeInTheDocument()
    expect(screen.getAllByText("Full-Stack Developer").length).toBeGreaterThanOrEqual(1)
  })

  it("renders job website links", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const websiteLink = screen.getByText("Website")
    expect(websiteLink).toHaveAttribute("href", "https://acme.example.com")
    expect(websiteLink).toHaveAttribute("target", "_blank")
  })

  it("renders job skill badges", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const reactBadges = screen.getAllByText("React")
    expect(reactBadges.length).toBeGreaterThan(0)

    const nodeBadges = screen.getAllByText("Node.js")
    expect(nodeBadges.length).toBeGreaterThan(0)
  })

  it("renders job highlights", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Reduced API latency by 40%")).toBeInTheDocument()
    expect(screen.getByText("Mentored team of 5 developers")).toBeInTheDocument()
  })

  it("renders job descriptions", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Led development of microservices platform.")).toBeInTheDocument()
    expect(screen.getByText("Built and maintained core product features.")).toBeInTheDocument()
  })

  it("renders job cards with correct data-slot", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const jobCards = container.querySelectorAll('[data-slot="job-card"]')
    expect(jobCards.length).toBe(2)
  })

  it("renders jobs section in correct position", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const main = container.querySelector("main")
    const sectionElements = main?.querySelectorAll("section") ?? []
    const sectionIds = Array.from(sectionElements).map((s) => s.getAttribute("id"))
    const jobsIndex = sectionIds.indexOf("jobs")
    expect(jobsIndex).toBeGreaterThan(0)
  })

  it("renders studies section with study cards", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Education")).toBeInTheDocument()
    expect(screen.getByText("University of California, Berkeley")).toBeInTheDocument()
    expect(screen.getByText("Stanford University")).toBeInTheDocument()
  })

  it("renders study institutions as card titles", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const ucBerkeley = screen.getByText("University of California, Berkeley")
    expect(ucBerkeley).toBeInTheDocument()

    const stanford = screen.getByText("Stanford University")
    expect(stanford).toBeInTheDocument()
  })

  it("renders study fields", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Computer Science")).toBeInTheDocument()
    expect(screen.getByText("Software Engineering")).toBeInTheDocument()
  })

  it("renders study date ranges", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText(/Aug 2015/)).toBeInTheDocument()
    expect(screen.getByText(/May 2019/)).toBeInTheDocument()
    expect(screen.getByText(/Sep 2019/)).toBeInTheDocument()
    expect(screen.getByText(/Jun 2021/)).toBeInTheDocument()
  })

  it("renders study descriptions", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Bachelor of Science in Computer Science with focus on distributed systems.")).toBeInTheDocument()
    expect(screen.getByText("Master of Science in Software Engineering.")).toBeInTheDocument()
  })

  it("renders study cards with correct data-slot", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const studyCards = container.querySelectorAll('[data-slot="study-card"]')
    expect(studyCards.length).toBe(2)
  })

  it("renders studies section in correct position", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const main = container.querySelector("main")
    const sectionElements = main?.querySelectorAll("section") ?? []
    const sectionIds = Array.from(sectionElements).map((s) => s.getAttribute("id"))
    const studiesIndex = sectionIds.indexOf("studies")
    const jobsIndex = sectionIds.indexOf("jobs")
    expect(studiesIndex).toBeGreaterThan(jobsIndex)
  })

  it("renders certifications section with certification cards", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const certHeadings = screen.getAllByText("Certifications")
    expect(certHeadings.length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText("AWS Solutions Architect")).toBeInTheDocument()
    expect(screen.getByText("Google Cloud Professional")).toBeInTheDocument()
  })

  it("renders certification year dates", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("2023")).toBeInTheDocument()
    expect(screen.getByText("2022")).toBeInTheDocument()
  })

  it("renders certification thumbnail", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const thumbnail = screen.getByAltText("AWS Solutions Architect thumbnail")
    expect(thumbnail).toBeInTheDocument()
  })

  it("renders certification link", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const certLink = screen.getByText("View Certificate")
    expect(certLink).toHaveAttribute(
      "href",
      "https://aws.amazon.com/certification/aws-solutions-architect"
    )
    expect(certLink).toHaveAttribute("target", "_blank")
  })

  it("renders certification cards with correct data-slot", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const certCards = container.querySelectorAll('[data-slot="certification-card"]')
    expect(certCards.length).toBe(2)
  })

  it("renders certifications section in correct position", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const main = container.querySelector("main")
    const sectionElements = main?.querySelectorAll("section") ?? []
    const sectionIds = Array.from(sectionElements).map((s) => s.getAttribute("id"))
    const certIndex = sectionIds.indexOf("certifications")
    const studiesIndex = sectionIds.indexOf("studies")
    expect(certIndex).toBeGreaterThan(studiesIndex)
  })

  it("renders projects section with project cards", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const projectsSection = container.querySelector("#projects")
    expect(projectsSection).toBeInTheDocument()
    expect(screen.getByText("Portfolio Site")).toBeInTheDocument()
    expect(screen.getByText("Task Manager API")).toBeInTheDocument()
    expect(screen.getByText("Cloud Deploy Tool")).toBeInTheDocument()
  })

  it("renders project thumbnails", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const thumbnail = screen.getByAltText("Portfolio Site thumbnail")
    expect(thumbnail).toBeInTheDocument()
  })

  it("renders project descriptions", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText(/personal portfolio built with Next\.js/)).toBeInTheDocument()
    expect(screen.getByText(/RESTful API for task management/)).toBeInTheDocument()
    expect(screen.getByText(/CLI tool for automated deployments/)).toBeInTheDocument()
  })

  it("renders project skill badges", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const reactBadges = screen.getAllByText("React")
    expect(reactBadges.length).toBeGreaterThan(0)

    const nodeBadges = screen.getAllByText("Node.js")
    expect(nodeBadges.length).toBeGreaterThan(0)
  })

  it("renders project featured badges for featured projects", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const featuredBadges = screen.getAllByText("Featured")
    expect(featuredBadges.length).toBe(2)
  })

  it("renders project live demo links", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const liveDemoLinks = screen.getAllByText("Live Demo")
    expect(liveDemoLinks.length).toBe(2)

    expect(liveDemoLinks[0]).toHaveAttribute("href", "https://portfolio.example.com")
    expect(liveDemoLinks[0]).toHaveAttribute("target", "_blank")
  })

  it("renders project GitHub links", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const githubLinks = screen.getAllByText("GitHub")
    expect(githubLinks.length).toBe(3)

    expect(githubLinks[0]).toHaveAttribute("href", "https://github.com/johndoe/portfolio")
    expect(githubLinks[0]).toHaveAttribute("target", "_blank")
  })

  it("renders project cards with correct data-slot", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const projectCards = container.querySelectorAll('[data-slot="project-card"]')
    expect(projectCards.length).toBe(3)
  })

  it("renders projects section in correct position", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const main = container.querySelector("main")
    const sectionElements = main?.querySelectorAll("section") ?? []
    const sectionIds = Array.from(sectionElements).map((s) => s.getAttribute("id"))
    const projectsIndex = sectionIds.indexOf("projects")
    const skillsIndex = sectionIds.indexOf("skills")
    expect(projectsIndex).toBeGreaterThan(skillsIndex)
  })
})