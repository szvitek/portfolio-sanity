import { fireEvent, render, screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import type { GetStaticPropsResult } from "next"
import HomePage, { getStaticProps } from "@/pages/index"
import { ProjectCard } from "@/components/ProjectCard"
import { mockHomePageData } from "./fixtures/homePage"
import type { ProfileData, SkillData, JobData, StudyData, CertificationData, ProjectData } from "@/lib/sanity"
import type { GroupedStudy } from "@/pages/index"
import { SKILL_CATEGORY_COLORS } from "@/lib/skill-colors"
import { ThemeProvider } from "@portfolio/ui"

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

type PageProps = {
  profile: ProfileData | null
  skills: SkillData[]
  jobs: JobData[]
  studies: StudyData[]
  groupedStudies: GroupedStudy[]
  certifications: CertificationData[]
  projects: ProjectData[]
}

async function getPageProps(): Promise<PageProps> {
  const result = await getStaticProps({} as any)
  if ("props" in result) {
    return result.props as PageProps
  }
  return { profile: null, skills: [], jobs: [], studies: [], groupedStudies: [], certifications: [], projects: [] }
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

    const githubLinks = screen.getAllByLabelText("github")
    expect(githubLinks.length).toBeGreaterThanOrEqual(1)
    expect(githubLinks[0]).toHaveAttribute("href", "https://github.com/johndoe")

    const linkedinLinks = screen.getAllByLabelText("linkedin")
    expect(linkedinLinks.length).toBeGreaterThanOrEqual(1)
    expect(linkedinLinks[0]).toHaveAttribute("href", "https://linkedin.com/in/johndoe")
  })

  it("renders hero and contact social links as outline buttons", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const githubButtons = screen
      .getAllByText("GitHub")
      .map((el) => el.closest('a[data-slot="button"]'))
      .filter((el): el is HTMLAnchorElement => el !== null)
      .filter((el) => el.getAttribute("href") === "https://github.com/johndoe")
    expect(githubButtons.length).toBeGreaterThanOrEqual(2)
    githubButtons.forEach((btn) => expect(btn).toHaveAttribute("data-variant", "outline"))

    const linkedinButtons = screen
      .getAllByText("LinkedIn")
      .map((el) => el.closest('a[data-slot="button"]'))
      .filter((el): el is HTMLAnchorElement => el !== null)
      .filter((el) => el.getAttribute("href") === "https://linkedin.com/in/johndoe")
    expect(linkedinButtons.length).toBeGreaterThanOrEqual(2)
    linkedinButtons.forEach((btn) => expect(btn).toHaveAttribute("data-variant", "outline"))
  })

  it("renders CV download button", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const cvLinks = screen.getAllByText("Download CV")
    expect(cvLinks.length).toBeGreaterThanOrEqual(1)
    expect(cvLinks[0]).toHaveAttribute("download")
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
      "swytech.dev", "Profile", "Skills", "Projects", "Jobs", "Studies", "Certifications", "Contact",
    ])
  })

  it("renders nav items with an animated bottom border — active kept, hover animates in", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const nav = screen.getByTestId("navbar")
    const sectionLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')).filter(
      (link) => link.querySelector("span") && !link.querySelector("img")
    )
    expect(sectionLinks.length).toBeGreaterThanOrEqual(7)

    for (const link of sectionLinks) {
      expect(link).toHaveClass("group", "relative")
      expect(link.querySelector("span")).toHaveClass(
        "absolute", "inset-x-2", "bottom-0", "h-px", "bg-primary", "transition-transform"
      )
    }

    const activeLink = sectionLinks.find((link) => link.href.endsWith("#profile"))
    expect(activeLink).toBeDefined()
    expect(activeLink?.querySelector("span")).toHaveClass("scale-x-100")

    const inactiveLinks = sectionLinks.filter((link) => link !== activeLink)
    expect(inactiveLinks.length).toBeGreaterThan(0)
    for (const link of inactiveLinks) {
      expect(link.querySelector("span")).toHaveClass("scale-x-0", "group-hover:scale-x-100")
    }
  })

  it("renders the swytech.dev brand linking to the top of the page", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const nav = screen.getByTestId("navbar")
    const brandLink = nav.querySelector('a[href="#profile"]')
    expect(brandLink).toBeInTheDocument()

    const logo = brandLink?.querySelector('img[alt="swytech.dev logo"]')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src", "/swytech-dev-logo.png")
    expect(brandLink).toHaveTextContent("swytech.dev")
  })

  it("pushes the menu items to the right of the header brand", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const nav = screen.getByTestId("navbar")
    expect(nav.firstElementChild).toHaveClass("justify-between")
  })

  it("renders top status bar", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByTestId("top-statusbar")).toBeInTheDocument()
    expect(screen.getByText("SYSTEM ONLINE")).toBeInTheDocument()
  })

  it("renders footer section", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("//swytech.dev")).toBeInTheDocument()
    expect(screen.getByText("END OF LINE")).toBeInTheDocument()
  })

  it("renders the swytech.dev logo in the footer", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const logo = container.querySelector('[data-slot="tron-footer"] img[alt="swytech.dev logo"]')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute("src", "/swytech-dev-logo.png")
  })

  it("renders the SWYTECH.DEV badge in the hero", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("[ SWYTECH.DEV ]")).toBeInTheDocument()
  })

  it("renders section IDs for navigation anchor targets", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const sections = ["profile", "skills", "projects", "jobs", "studies", "certifications"]
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

  it("renders skill icons without their own background so the carousel item tint shows through", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const logoCloud = container.querySelector('[data-slot="tron-logo-cloud"]')
    const iconImgs = Array.from(logoCloud?.querySelectorAll("img") ?? [])
    expect(iconImgs.length).toBeGreaterThan(0)

    for (const img of iconImgs) {
      const bgClasses = Array.from(img.classList).filter((c) => c.startsWith("bg-"))
      expect(bgClasses).toEqual([])
    }
  })

  it("gives each skill category filter button a glow matching its category color", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const skillsSection = container.querySelector("#skills")
    const ghostButtons = Array.from(
      skillsSection?.querySelectorAll<HTMLButtonElement>('button[data-slot="button"][data-variant="ghost"]') ?? []
    )
    expect(ghostButtons.length).toBeGreaterThan(0)

    const categoryButtons = ghostButtons.filter((btn) => {
      const text = btn.textContent ?? ""
      return text !== "All" && text !== "Featured" && text in SKILL_CATEGORY_COLORS
    })
    expect(categoryButtons.length).toBeGreaterThan(0)

    for (const btn of categoryButtons) {
      const category = btn.textContent as string
      expect(btn).toHaveAttribute("data-category-glow")
      expect(btn.style.getPropertyValue("--glow")).toBe(SKILL_CATEGORY_COLORS[category].glow)
    }

    for (const btn of ghostButtons) {
      if (btn.textContent === "All" || btn.textContent === "Featured") {
        expect(btn).not.toHaveAttribute("data-category-glow")
      }
    }

    const labels = ghostButtons.map((btn) => btn.textContent)
    expect(labels[labels.length - 1]).toBe("All")
    expect(labels.indexOf("Featured")).toBeLessThan(labels.indexOf("All"))
  })

  it("renders category filter buttons and filters skills on click", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const allButton = screen.getByText("All")
    expect(allButton).toBeInTheDocument()

    const featuredButtons = screen.getAllByText("Featured")
    expect(featuredButtons.length).toBeGreaterThanOrEqual(1)

    const frontendButton = screen.getByText("Frontend")
    expect(frontendButton).toBeInTheDocument()

    fireEvent.click(frontendButton)

    const frontendSkills = screen.getAllByText(/React|Next\.js/)
    expect(frontendSkills.length).toBeGreaterThan(0)

    const skillsSection = container.querySelector('#skills')
    const nodeTexts = Array.from(skillsSection?.querySelectorAll("*") ?? []).filter(
      (el) => el.textContent === "Node.js" && el.children.length === 0
    )
    expect(nodeTexts.length).toBe(0)
  })

  it("renders skill filter buttons using the GridCN button component", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const skillsSection = container.querySelector("#skills")
    const allButton = Array.from(
      skillsSection?.querySelectorAll<HTMLButtonElement>('[data-slot="button"]') ?? []
    ).find((btn) => btn.textContent === "All")
    expect(allButton).toBeInTheDocument()
    expect(allButton).toHaveAttribute("data-variant", "ghost")
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

    expect(screen.getByText("EXPERIENCE")).toBeInTheDocument()
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

    expect(screen.getByText("EDUCATION")).toBeInTheDocument()
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

  it("renders study fields in timeline", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getAllByText(/Computer Science/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Software Engineering/).length).toBeGreaterThan(0)
  })

  it("renders study date ranges", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getAllByText(/Aug 2015/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/May 2019/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Sep 2019/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Jun 2021/).length).toBeGreaterThan(0)
  })

  it("renders study descriptions", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText(/Bachelor of Science in Computer Science with focus on distributed systems/)).toBeInTheDocument()
    expect(screen.getByText(/Master of Science in Software Engineering/)).toBeInTheDocument()
  })

  it("renders studies in timeline component", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const timeline = container.querySelector('[data-slot="tron-timeline"]')
    expect(timeline).toBeInTheDocument()
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

    expect(screen.getByText("CERTIFICATIONS")).toBeInTheDocument()
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

    const thumbnails = screen.getAllByRole("img")
    expect(thumbnails.length).toBeGreaterThan(0)
  })

  it("renders certification link", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const bento = container.querySelector('[data-slot="tron-bento-grid"]')
    expect(bento).toBeInTheDocument()

    const link = bento?.querySelector('a[href="https://aws.amazon.com/certification/aws-solutions-architect"]')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders certification cards with correct data-slot", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const certCards = container.querySelectorAll('[data-slot="tron-bento-grid"]')
    expect(certCards.length).toBe(1)
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

  it("renders project skill badges in a single-line scrolling marquee", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const projectCards = container.querySelectorAll('[data-slot="project-card"]')
    expect(projectCards.length).toBeGreaterThan(0)

    for (const card of Array.from(projectCards)) {
      const marquees = card.querySelectorAll('[data-slot="tron-marquee"]')
      expect(marquees.length).toBe(1)
      expect(marquees[0].textContent).toMatch(/React|Node\.js/)
      expect(card.querySelectorAll('[class*="ml-3"]').length).toBe(0)
    }
  })

  it("renders links in project descriptions as styled clickable anchors", () => {
    const description = [
      {
        _type: "block",
        _key: "link-desc",
        style: "normal",
        markDefs: [
          { _type: "link", _key: "link-1", href: "https://example.com/docs" },
        ],
        children: [
          {
            _type: "span",
            _key: "link-span",
            text: "See the docs",
            marks: ["link-1"],
          },
        ],
      },
    ]

    renderWithTheme(<ProjectCard title="Linked Project" description={description} />)

    const link = screen.getByRole("link", { name: "See the docs" })
    expect(link).toHaveAttribute("href", "https://example.com/docs")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
    expect(link).toHaveClass("underline")
  })

  it("renders project cards as equal-height columns with bottom-anchored buttons", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const projectCard = container.querySelector('[data-slot="project-card"]')
    expect(projectCard).toHaveClass("h-full", "flex", "flex-col")

    const liveDemo = screen.getAllByText("Live Demo")[0].closest("a")
    expect(liveDemo).toHaveClass("flex-1")

    const githubLink = screen
      .getAllByText("GitHub")
      .map((el) => el.closest("a"))
      .find((el) => el !== null && el.getAttribute("href")?.includes("johndoe/portfolio"))
    expect(githubLink).toHaveClass("flex-1")
  })

  it("renders project featured badges for featured projects", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const featuredBadges = screen.getAllByText("Featured")
    expect(featuredBadges.length).toBe(3)
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

    const githubLinks = screen
      .getAllByText("GitHub")
      .map((el) => el.closest("a"))
      .filter((el): el is HTMLAnchorElement => el !== null)
      .filter((el) => el.getAttribute("href")?.includes("github.com/johndoe/"))
    expect(githubLinks.length).toBeGreaterThanOrEqual(3)

    expect(githubLinks[0]).toHaveAttribute("href", "https://github.com/johndoe/portfolio")
    expect(githubLinks[0]).toHaveAttribute("target", "_blank")
  })

  it("renders project action links as GridCN default buttons", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const liveDemo = screen.getAllByText("Live Demo")[0]
    expect(liveDemo).toHaveAttribute("data-slot", "button")
    expect(liveDemo).toHaveAttribute("data-variant", "default")

    const githubLinks = screen.getAllByText("GitHub")
    const githubButton = githubLinks
      .map((el) => el.closest("a"))
      .find((el) => el !== null && el.getAttribute("href")?.includes("johndoe/portfolio"))
    expect(githubButton).toHaveAttribute("data-slot", "button")
    expect(githubButton).toHaveAttribute("data-variant", "default")
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

  it("shows only featured projects by default", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    expect(screen.getByText("Portfolio Site")).toBeInTheDocument()
    expect(screen.getByText("Cloud Deploy Tool")).toBeInTheDocument()
    expect(screen.getByText("Show All")).toBeInTheDocument()
  })

  it("shows all projects when Show All button is clicked", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const showAllButton = screen.getByText("Show All")
    expect(showAllButton).toBeInTheDocument()

    fireEvent.click(showAllButton)

    const projectCards = container.querySelectorAll('[data-slot="project-card"]')
    expect(projectCards.length).toBe(3)

    expect(screen.getByText("Portfolio Site")).toBeInTheDocument()
    expect(screen.getByText("Task Manager API")).toBeInTheDocument()
    expect(screen.getByText("Cloud Deploy Tool")).toBeInTheDocument()

    expect(screen.getByText("Show Featured")).toBeInTheDocument()
  })

  it("renders the projects toggle using the GridCN button component", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const showAllButton = screen.getByText("Show All")
    expect(showAllButton).toHaveAttribute("data-slot", "button")
    expect(showAllButton).toHaveAttribute("data-variant", "ghost")
  })

  it("renders CV download links using the GridCN button component", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const cvLinks = screen.getAllByText("Download CV")
    expect(cvLinks.length).toBeGreaterThanOrEqual(1)
    for (const link of cvLinks) {
      expect(link).toHaveAttribute("data-slot", "button")
    }
  })

  it("renders theme control swatches as GridCN button components", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const themeControls = screen.getByTestId("theme-controls")
    const swatches = themeControls.querySelectorAll('[data-slot="button"]')
    expect(swatches.length).toBe(10)
  })

  it("toggles back to featured only when Show Featured is clicked", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    fireEvent.click(screen.getByText("Show All"))
    fireEvent.click(screen.getByText("Show Featured"))

    expect(screen.getByText("Show All")).toBeInTheDocument()
    expect(screen.getByText("Portfolio Site")).toBeInTheDocument()
    expect(screen.getByText("Cloud Deploy Tool")).toBeInTheDocument()
  })

  it("renders only featured skills in the carousel", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const allReact = screen.getAllByText("React")
    expect(allReact.length).toBeGreaterThan(0)

    const allNext = screen.getAllByText("Next.js")
    expect(allNext.length).toBeGreaterThan(0)

    const skillsSection = container.querySelector("#skills")
    const nodeTexts = Array.from(skillsSection?.querySelectorAll("*") ?? []).filter(
      (el) => el.textContent === "Node.js" && el.children.length === 0
    )
    expect(nodeTexts.length).toBe(0)

    const pythonTexts = Array.from(skillsSection?.querySelectorAll("*") ?? []).filter(
      (el) => el.textContent === "Python" && el.children.length === 0
    )
    expect(pythonTexts.length).toBe(0)
  })

  it("renders floating theme controls panel", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const themeControls = screen.getByTestId("theme-controls")
    expect(themeControls).toBeInTheDocument()
    expect(themeControls).toHaveClass("fixed")
    expect(themeControls).toHaveClass("right-4")
  })

  it("renders jobs sorted by startDate descending", async () => {
    const props = await getPageProps()
    renderWithTheme(<HomePage {...props} />)

    const jobCards = screen.getAllByText(/Acme Corp|TechStart/)
    const acmeIndex = jobCards.findIndex((el) => el.textContent?.includes("Acme Corp"))
    const techStartIndex = jobCards.findIndex((el) => el.textContent?.includes("TechStart"))
    expect(acmeIndex).toBeLessThan(techStartIndex)
  })

  it("renders 3-column project grid", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const projectsSection = container.querySelector("#projects")
    const grid = projectsSection?.querySelector(".grid")
    expect(grid).toHaveClass("md:grid-cols-3")
  })

  it("shows all skills when All filter is clicked", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    fireEvent.click(screen.getByText("All"))

    const skillsSection = container.querySelector("#skills")
    const nodeTexts = Array.from(skillsSection?.querySelectorAll("*") ?? []).filter(
      (el) => el.textContent === "Node.js" && el.children.length === 0
    )
    expect(nodeTexts.length).toBeGreaterThan(0)
  })

  it("shows only featured skills by default", async () => {
    const props = await getPageProps()
    const { container } = renderWithTheme(<HomePage {...props} />)

    const skillsSection = container.querySelector("#skills")
    const nodeTexts = Array.from(skillsSection?.querySelectorAll("*") ?? []).filter(
      (el) => el.textContent === "Node.js" && el.children.length === 0
    )
    expect(nodeTexts.length).toBe(0)
  })
})