import { useState, useMemo } from "react"
import type { CSSProperties } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import type { PortableTextBlock } from "@portabletext/react"
import { getHomePageData, urlFor, cvUrlFor } from "@/lib/sanity"
import type { ProfileData, SkillData, JobData, StudyData, CertificationData, ProjectData, BackgroundMusicData } from "@/lib/sanity"
import { HeroSection } from "@/components/thegridcn/hero-section"
import { AvailabilityIndicator } from "@/components/thegridcn/availability-indicator"
import { AgentAvatar } from "@/components/thegridcn/agent-avatar"
import { AnomalyBanner } from "@/components/thegridcn/anomaly-banner"
import { LogoCloud } from "@/components/thegridcn/logo-cloud"
import { BentoGrid } from "@/components/thegridcn/bento-grid"
import { Divider } from "@/components/thegridcn/divider"
import { JobCard } from "@/components/JobCard"
import { CertificationCard } from "@/components/CertificationCard"
import { ProjectCard } from "@/components/ProjectCard"
import { NavBar } from "@/components/NavBar"
import { MusicPlayerProvider } from "@/components/MusicPlayerProvider"
import { StatusBar } from "@/components/thegridcn/status-bar"
import { ClipboardCopy, Download, FileUser } from "lucide-react"
import { SocialIcon, SocialLinkIcon, useTheme, type ThemeName } from "@portfolio/ui"
import { ThemeControls } from "@/components/ThemeControls"
import { GridBackground } from "@/components/GridBackground"
import { TronFooter } from "@/components/thegridcn/tron-footer"
import { ContactForm } from "@/components/ContactForm"
import { Radar } from "@/components/thegridcn/radar"
import { Timeline } from "@/components/thegridcn/timeline"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { skillCategoryClasses, categoryGlowColor } from "@/lib/skill-colors"
import { dateRange, formatYear } from "@/lib/date-utils"
import { MOCK_PROJECTS } from "@/lib/mock-data"

const SOCIAL_LABELS: Record<"github" | "linkedin", string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
}

export type GroupedStudy = {
  institution: string
  studies: StudyData[]
  latestStart: string
  earliestEnd?: string
}

function groupStudiesByInstitution(studies: StudyData[]): GroupedStudy[] {
  const map = new Map<string, StudyData[]>()
  for (const study of studies) {
    const existing = map.get(study.institution) ?? []
    existing.push(study)
    map.set(study.institution, existing)
  }
  const groups: GroupedStudy[] = []
  for (const [institution, items] of map) {
    const sorted = [...items].sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""))
    groups.push({
      institution,
      studies: sorted,
      latestStart: sorted[0]?.startDate ?? "",
      earliestEnd: sorted[sorted.length - 1]?.endDate,
    })
  }
  return groups.sort((a, b) => b.latestStart.localeCompare(a.latestStart))
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps: GetStaticProps<{
  profile: ProfileData | null
  skills: SkillData[]
  jobs: JobData[]
  studies: StudyData[]
  groupedStudies: GroupedStudy[]
  certifications: CertificationData[]
  projects: ProjectData[]
  backgroundMusic: BackgroundMusicData[]
}> = async () => {
  const data = await getHomePageData()
  const sortByDateDesc = <T extends { startDate?: string; date?: string }>(items: T[]): T[] =>
    [...items].sort((a, b) => {
      const dateA = a.startDate ?? a.date ?? ""
      const dateB = b.startDate ?? b.date ?? ""
      return dateB.localeCompare(dateA)
    })

  const allStudies = sortByDateDesc(data.studies ?? [])

  return {
    props: {
      profile: data.profile,
      skills: data.skills ?? [],
      jobs: sortByDateDesc(data.jobs ?? []),
      studies: allStudies,
      groupedStudies: groupStudiesByInstitution(allStudies),
      certifications: sortByDateDesc(data.certifications ?? []),
      projects: data.projects?.length ? data.projects : MOCK_PROJECTS,
      backgroundMusic: data.backgroundMusic ?? [],
    },
    revalidate: 300,
  }
}

const CATEGORY_BTN: Record<string, { active: string; inactive: string }> = {
  Frontend: {
    active: "border-sky-500 bg-sky-500/20 text-sky-400 hover:border-sky-500 hover:bg-sky-500/20 hover:text-sky-400",
    inactive: "border-sky-500/30 bg-transparent text-sky-500/60 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-500/60",
  },
  Backend: {
    active: "border-emerald-500 bg-emerald-500/20 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-400",
    inactive: "border-emerald-500/30 bg-transparent text-emerald-500/60 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-500/60",
  },
  DevOps: {
    active: "border-purple-500 bg-purple-500/20 text-purple-400 hover:border-purple-500 hover:bg-purple-500/20 hover:text-purple-400",
    inactive: "border-purple-500/30 bg-transparent text-purple-500/60 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-500/60",
  },
  Languages: {
    active: "border-amber-500 bg-amber-500/20 text-amber-400 hover:border-amber-500 hover:bg-amber-500/20 hover:text-amber-400",
    inactive: "border-amber-500/30 bg-transparent text-amber-500/60 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500/60",
  },
  Tools: {
    active: "border-rose-500 bg-rose-500/20 text-rose-400 hover:border-rose-500 hover:bg-rose-500/20 hover:text-rose-400",
    inactive: "border-rose-500/30 bg-transparent text-rose-500/60 hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-500/60",
  },
  Databases: {
    active: "border-cyan-500 bg-cyan-500/20 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-400",
    inactive: "border-cyan-500/30 bg-transparent text-cyan-500/60 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-500/60",
  },
}

const FILTER_BTN = "h-auto rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-widest shadow-none"
const FILTER_ACTIVE = "border-primary/60 bg-primary/20 text-primary hover:border-primary/60 hover:bg-primary/20 hover:text-primary"
const FILTER_INACTIVE =
  "border-border/30 bg-transparent text-foreground/80 hover:border-foreground/30 hover:bg-transparent hover:text-foreground"
const CV_BTN =
  "h-auto font-mono uppercase tracking-widest hover:shadow-[0_0_16px_rgba(var(--primary-rgb,0,180,255),0.3)]"

function extractText(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks) return ""
  const firstBlock = blocks[0]
  if (!firstBlock?.children) return ""
  return firstBlock.children.map((c) => ("text" in c ? c.text ?? "" : "")).join(" ")
}

const THEME_AVATAR_HUES: Record<ThemeName, number> = {
  tron: 198,
  ares: 12,
  clu: 39,
  athena: 51,
  aphrodite: 328,
  poseidon: 216,
}

export default function HomePage({ profile, skills, jobs, studies, groupedStudies, certifications, projects, backgroundMusic }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>("featured")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const { state } = useTheme()

  const copyEmailToClipboard = async () => {
    if (!profile?.email) return
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }
  const avatarUrl = profile?.avatar ? urlFor(profile.avatar).width(120).height(120).url() : undefined
  const cvUrl = profile?.cv ? cvUrlFor(profile.cv) : undefined
  const bioText = profile?.bio ? extractText(profile.bio) : ""
  const hasProfile = !!profile

  const categories = [...new Set(skills.map((s) => s.category))]

  const featuredSkills = useMemo(
    () =>
      skills
        .filter((s) => s.featured)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [skills]
  )

  const allSkillsSorted = useMemo(
    () => [...skills].sort((a, b) => a.name.localeCompare(b.name)),
    [skills]
  )

  const featuredCategories = useMemo(() => {
    const cats = [...new Set(featuredSkills.map((s) => s.category))]
    return cats.sort()
  }, [featuredSkills])

  const allCategories = useMemo(() => {
    const cats = [...new Set(skills.map((s) => s.category))]
    return cats.sort()
  }, [skills])

  const isFeaturedFilter = activeFilter === "featured" || activeFilter === "all"
  const baseSkills = isFeaturedFilter
    ? (activeFilter === "all" ? allSkillsSorted : featuredSkills)
    : allSkillsSorted.filter((s) => s.category === activeFilter)

  const visibleProjects = showAllProjects ? projects : projects.filter((p) => p.featured)

  return (
    <MusicPlayerProvider tracks={backgroundMusic}>
      <GridBackground />

      <StatusBar
        leftContent={
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            SYSTEM ONLINE
          </span>
        }
        rightContent={
          <span className="flex items-center gap-4">
            <span className="text-foreground">PORTFOLIO v1.0</span>
          </span>
        }
        data-testid="top-statusbar"
      />

      <NavBar />

      <main>
        <section id="profile" className="scroll-mt-16 flex min-h-screen items-center px-4">
          <div className="mx-auto w-full max-w-5xl">
          {!hasProfile ? (
            <div className="flex min-h-[40vh] w-full items-center justify-center">
              <p className="text-sm text-foreground/80">No profile content found.</p>
            </div>
          ) : (
          <HeroSection
            title=""
            subtitle=""
            align="center"
            rightContent={
            <>
              {avatarUrl && (
                <div className="relative h-48 w-48 md:h-56 md:w-56">
                  <AgentAvatar
                    seed={profile.title}
                    size={240}
                    hue={THEME_AVATAR_HUES[state.theme]}
                    ring={false}
                    animated
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen"
                  />
                  <img
                    src={avatarUrl}
                    alt={profile?.title ?? "Avatar"}
                    className="relative h-full w-full rounded-full border-2 border-primary/30 object-cover ring-2 ring-primary/10"
                  />
                </div>
              )}
              {profile.availability && (
                <AvailabilityIndicator
                  availability={profile.availability}
                  className="w-48 md:w-56"
                />
              )}
            </>
            }
          >
            <div className="flex w-full flex-col items-center gap-4">
              <AnomalyBanner
                title={profile.title}
                subtitle={profile.subtitle}
                label="[ SWYTECH.DEV ]"
                animated={false}
              />
              {bioText && (
                <p className="max-w-2xl text-center text-sm leading-relaxed text-foreground md:text-base">
                  {bioText}
                </p>
              )}
                  {profile?.socialLinks && profile.socialLinks.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {profile.socialLinks.map((link) =>
                        link.platform === "github" || link.platform === "linkedin" ? (
                          <Button
                            key={link.platform}
                            asChild
                            variant="outline"
                            className="px-4 py-2 text-xs"
                          >
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={link.platform}
                            >
                              <SocialIcon platform={link.platform} className="h-4 w-4" />
                              <span>{SOCIAL_LABELS[link.platform]}</span>
                            </a>
                          </Button>
                        ) : (
                          <SocialLinkIcon
                            key={link.platform}
                            platform={link.platform}
                            url={link.url}
                            className="text-foreground/80 transition-colors hover:text-primary"
                          />
                        )
                      )}

                  {cvUrl && (
                    <Button
                      asChild
                      variant="default"
                      className={cn(CV_BTN, "group/cv px-5 py-2 text-xs")}
                    >
                      <a href={cvUrl} download>
                        <span className="grid shrink-0 place-items-center">
                          <FileUser className="col-start-1 row-start-1 size-3.5 transition-opacity group-hover/cv:opacity-0" />
                          <Download className="col-start-1 row-start-1 size-3.5 opacity-0 transition-opacity group-hover/cv:opacity-100" />
                        </span>
                        Download CV
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </HeroSection>
          )}
          </div>
        </section>

        <section id="skills" className="scroll-mt-16 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Divider label="SKILLS" variant="circuit" reverse className="mb-8" />
            {skills.length > 0 ? (
              <>
                <div className="mb-6 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveFilter("featured")}
                    className={cn(
                      FILTER_BTN,
                      activeFilter === "featured" ? FILTER_ACTIVE : FILTER_INACTIVE
                    )}
                  >
                    Featured
                  </Button>
                  {allCategories.map((cat) => {
                    const btn = CATEGORY_BTN[cat]
                    return (
                      <Button
                        key={cat}
                        type="button"
                        variant="ghost"
                        data-category-glow
                        style={{ "--glow": categoryGlowColor(cat) } as CSSProperties}
                        onClick={() => setActiveFilter(cat)}
                        className={cn(
                          FILTER_BTN,
                          activeFilter === cat
                            ? btn?.active ?? FILTER_ACTIVE
                            : btn?.inactive ?? FILTER_INACTIVE
                        )}
                      >
                        {cat}
                      </Button>
                    )
                  })}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveFilter("all")}
                    className={cn(
                      FILTER_BTN,
                      activeFilter === "all" ? FILTER_ACTIVE : FILTER_INACTIVE
                    )}
                  >
                    All
                  </Button>
                </div>
                <LogoCloud
                  key={activeFilter}
                  logos={baseSkills.map((skill) => ({
                    name: skill.name,
                    className: skillCategoryClasses(skill.category),
                    icon: skill.image
                      ? (
                        <img
                          src={urlFor(skill.image).width(32).height(32).url()}
                          alt=""
                          className="h-8 w-8 rounded object-contain p-0.5"
                        />
                      )
                      : undefined,
                  }))}
                  speed="slow"
                />
              </>
            ) : (
              <p className="text-sm text-foreground/60">Skills content coming soon.</p>
            )}
          </div>
        </section>

        <section id="projects" className="scroll-mt-16 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <Divider label="PROJECTS" variant="circuit" className="flex-1" />
              {projects.some((p) => !p.featured) && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="ml-4 h-auto shrink-0 rounded border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary shadow-none transition-colors hover:border-primary/60 hover:bg-primary/20 hover:text-primary"
                >
                  {showAllProjects ? "Show Featured" : "Show All"}
                </Button>
              )}
            </div>
            {visibleProjects.length > 0 ? (
              <div>
                <div className="grid gap-6 md:grid-cols-3">
                  {projects
                    .filter((p) => p.featured)
                    .map((project) => (
                      <ProjectCard
                        key={project._id}
                        title={project.title}
                        description={project.description}
                        thumbnail={project.thumbnail}
                        skills={project.skills}
                        liveUrl={project.liveUrl}
                        githubUrl={project.githubUrl}
                        featured={project.featured}
                      />
                    ))}
                </div>
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-700 ease-out"
                  style={{
                    gridTemplateRows: showAllProjects ? "1fr" : "0fr",
                    opacity: showAllProjects ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pt-6 md:grid-cols-3">
                      {projects
                        .filter((p) => !p.featured)
                        .map((project, index) => (
                          <ProjectCard
                            key={project._id}
                            title={project.title}
                            description={project.description}
                            thumbnail={project.thumbnail}
                            skills={project.skills}
                            liveUrl={project.liveUrl}
                            githubUrl={project.githubUrl}
                            featured={project.featured}
                            className="project-card-animate-in"
                            style={{ animationDelay: `${index * 60}ms` }}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-foreground/60">Projects content coming soon.</p>
            )}
          </div>
        </section>

        <section id="jobs" className="scroll-mt-16 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Divider label="EXPERIENCE" variant="circuit" reverse className="mb-8" />
            {jobs.length > 0 ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    company={job.company}
                    role={job.role}
                    startDate={job.startDate}
                    endDate={job.endDate}
                    description={job.description}
                    image={job.image}
                    location={job.location}
                    website={job.website}
                    skills={job.skills}
                    highlights={job.highlights}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-foreground/60">Experience content coming soon.</p>
            )}
          </div>
        </section>

        <section id="studies" className="scroll-mt-16 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Divider label="EDUCATION" variant="circuit" className="mb-8" />
            {groupedStudies.length > 0 ? (
              <Timeline
                label="ACADEMIC RECORD"
                items={groupedStudies.map((group) => ({
                  title: group.institution,
                  description: (
                    <div className="mt-1 space-y-1.5">
                      {group.studies.map((study) => (
                        <div key={study._id} className="flex items-center gap-2">
                          <Badge variant="outline" className="shrink-0 font-mono text-[9px] leading-none uppercase tracking-wider">
                            {study.field}
                          </Badge>
                          {study.description && (
                            <span className="text-xs text-foreground/70">— {study.description}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ),
                  date: group.studies.length === 1
                    ? dateRange(group.studies[0].startDate, group.studies[0].endDate)
                    : dateRange(group.latestStart, group.earliestEnd),
                  status: group.earliestEnd ? "completed" as const : "active" as const,
                }))}
              />
            ) : (
              <p className="text-sm text-foreground/60">Education content coming soon.</p>
            )}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-16 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Divider label="CERTIFICATIONS" variant="circuit" reverse className="mb-8" />
            {certifications.length > 0 ? (
              <BentoGrid
                columns={3}
                items={certifications.map((cert) => ({
                  title: cert.name,
                  description: formatYear(cert.date),
                  variant: "highlight" as const,
                  url: cert.url,
                  icon: cert.thumbnail ? (
                    <img
                      src={urlFor(cert.thumbnail).width(48).height(48).url()}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  ),
                }))}
              />
            ) : (
              <p className="text-sm text-foreground/60">Certifications content coming soon.</p>
            )}
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Divider label="CONTACT" variant="circuit" className="mb-8" />
            <div
              data-slot="tron-contact"
              className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-6 backdrop-blur-sm md:p-8"
            >
              {/* Scanline overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

              <div className="relative grid gap-8 lg:grid-cols-[2fr_3fr]">
                <div className="relative flex h-full flex-col items-center justify-between rounded border border-primary/20 p-6 lg:items-start">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                      // GET IN TOUCH
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                      Have a project, question, or just want to say hi? Drop a message.
                    </p>
                  </div>
                  <Radar
                    size={180}
                    sweepSpeed={4}
                    className="self-center"
                    targets={[
                      { x: 25, y: 70, label: "Socials" },
                      { x: 50, y: 25, label: "Projects" },
                      { x: 75, y: 50, label: "Email" },
                    ]}
                  />
                  <div className="flex w-full flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {profile?.socialLinks &&
                        profile.socialLinks.length > 0 &&
                        profile.socialLinks.map((link) =>
                          link.platform === "github" || link.platform === "linkedin" ? (
                            <Button
                              key={link.platform}
                              asChild
                              variant="outline"
                              className="w-full px-4 py-2 text-[10px]"
                            >
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.platform}
                              >
                                <SocialIcon platform={link.platform} className="h-4 w-4" />
                                <span>{SOCIAL_LABELS[link.platform]}</span>
                              </a>
                            </Button>
                          ) : null
                        )}
                      {cvUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className={cn(CV_BTN, "group/cv w-full px-4 py-2 text-[10px]")}
                        >
                          <a href={cvUrl} download>
                            <span className="grid shrink-0 place-items-center">
                              <FileUser className="col-start-1 row-start-1 size-3.5 transition-opacity group-hover/cv:opacity-0" />
                              <Download className="col-start-1 row-start-1 size-3.5 opacity-0 transition-opacity group-hover/cv:opacity-100" />
                            </span>
                            CV
                          </a>
                        </Button>
                      )}
                    </div>
                    {profile?.email && (
                      <Button
                        variant="default"
                        onClick={copyEmailToClipboard}
                        className={cn(CV_BTN, "group w-full px-4 py-2 text-[10px]")}
                      >
                        <SocialIcon platform="email" className="size-4" />
                        <span>{emailCopied ? "COPIED!" : profile.email}</span>
                        <ClipboardCopy className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Button>
                    )}
                    {profile?.socialLinks &&
                      profile.socialLinks.some(
                        (link) => link.platform !== "github" && link.platform !== "linkedin"
                      ) && (
                        <div className="flex flex-wrap gap-3">
                          {profile.socialLinks
                            .filter(
                              (link) =>
                                link.platform !== "github" && link.platform !== "linkedin"
                            )
                            .map((link) => (
                              <SocialLinkIcon
                                key={link.platform}
                                platform={link.platform}
                                url={link.url}
                                className="text-foreground/80 transition-colors hover:text-primary"
                              />
                            ))}
                        </div>
                      )}
                  </div>
                </div>
                <ContactForm />
              </div>

              {/* Corner decorations */}
              <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-primary/30" />
              <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-primary/30" />
            </div>
          </div>
        </section>

      </main>

      <TronFooter
        brand="swytech.dev"
        tagline="END OF LINE"
      />

      <ThemeControls />
    </MusicPlayerProvider>
  )
}