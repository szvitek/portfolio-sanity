import { useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import type { PortableTextBlock } from "@portabletext/react"
import { getHomePageData, urlFor, cvUrlFor } from "@/lib/sanity"
import type { ProfileData, SkillData, JobData, StudyData, CertificationData, ProjectData } from "@/lib/sanity"
import { HeroSection } from "@/components/thegridcn/hero-section"
import { AvailabilityIndicator } from "@/components/thegridcn/availability-indicator"
import { LogoCloud } from "@/components/thegridcn/logo-cloud"
import { JobCard } from "@/components/JobCard"
import { StudyCard } from "@/components/StudyCard"
import { CertificationCard } from "@/components/CertificationCard"
import { ProjectCard } from "@/components/ProjectCard"
import { NavBar } from "@/components/NavBar"
import { StatusBar } from "@/components/thegridcn/status-bar"
import { SocialLinkIcon } from "@portfolio/ui"
import { ThemeDots, IntensityDots } from "@/components/ThemeDots"
import { cn } from "@/lib/utils"
import { skillCategoryClasses } from "@/lib/skill-colors"
import { MOCK_PROJECTS } from "@/lib/mock-data"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps: GetStaticProps<{
  profile: ProfileData | null
  skills: SkillData[]
  jobs: JobData[]
  studies: StudyData[]
  certifications: CertificationData[]
  projects: ProjectData[]
}> = async () => {
  const data = await getHomePageData()
  return {
    props: {
      profile: data.profile,
      skills: data.skills ?? [],
      jobs: data.jobs ?? [],
      studies: data.studies ?? [],
      certifications: data.certifications ?? [],
      projects: data.projects?.length ? data.projects : MOCK_PROJECTS,
    },
  }
}

const CATEGORY_BTN: Record<string, { active: string; inactive: string }> = {
  Frontend: {
    active: "border-sky-500 bg-sky-500/20 text-sky-400",
    inactive: "border-sky-500/30 text-sky-500/60 hover:bg-sky-500/10 hover:border-sky-500/50",
  },
  Backend: {
    active: "border-emerald-500 bg-emerald-500/20 text-emerald-400",
    inactive: "border-emerald-500/30 text-emerald-500/60 hover:bg-emerald-500/10 hover:border-emerald-500/50",
  },
  DevOps: {
    active: "border-purple-500 bg-purple-500/20 text-purple-400",
    inactive: "border-purple-500/30 text-purple-500/60 hover:bg-purple-500/10 hover:border-purple-500/50",
  },
  Languages: {
    active: "border-amber-500 bg-amber-500/20 text-amber-400",
    inactive: "border-amber-500/30 text-amber-500/60 hover:bg-amber-500/10 hover:border-amber-500/50",
  },
  Tools: {
    active: "border-rose-500 bg-rose-500/20 text-rose-400",
    inactive: "border-rose-500/30 text-rose-500/60 hover:bg-rose-500/10 hover:border-rose-500/50",
  },
  Databases: {
    active: "border-cyan-500 bg-cyan-500/20 text-cyan-400",
    inactive: "border-cyan-500/30 text-cyan-500/60 hover:bg-cyan-500/10 hover:border-cyan-500/50",
  },
}

function extractText(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks) return ""
  const firstBlock = blocks[0]
  if (!firstBlock?.children) return ""
  return firstBlock.children.map((c) => ("text" in c ? c.text ?? "" : "")).join(" ")
}

export default function HomePage({ profile, skills, jobs, studies, certifications, projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const avatarUrl = profile?.avatar ? urlFor(profile.avatar).width(120).height(120).url() : undefined
  const cvUrl = profile?.cv ? cvUrlFor(profile.cv) : undefined
  const bioText = profile?.bio ? extractText(profile.bio) : ""
  const hasProfile = !!profile

  const categories = [...new Set(skills.map((s) => s.category))]
  const filteredSkills = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills

  return (
    <>
      <StatusBar
        leftContent={
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            SYSTEM ONLINE
          </span>
        }
        rightContent={
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="text-[10px] text-foreground/50">Theme:</span>
              <ThemeDots />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[10px] text-foreground/50">Intensity:</span>
              <IntensityDots />
            </span>
            <span className="text-foreground/80">PORTFOLIO v1.0</span>
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
              <p className="text-sm text-foreground/50">No profile content found.</p>
            </div>
          ) : (
          <HeroSection
            title={profile.title}
            subtitle={profile.subtitle}
            description={bioText}
            align="center"
            rightContent={
              <>
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt={profile?.title ?? "Avatar"}
                    className="h-48 w-48 rounded-full border-2 border-primary/30 object-cover ring-2 ring-primary/10 md:h-56 md:w-56"
                  />
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
            {profile?.socialLinks && profile.socialLinks.length > 0 && (
              <div className="flex w-full items-center gap-4">
                {profile.socialLinks.map((link) => (
                  <SocialLinkIcon
                    key={link.platform}
                    platform={link.platform}
                    url={link.url}
                    className="text-foreground/60 transition-colors hover:text-primary"
                  />
                ))}

                {cvUrl && (
                  <a
                    href={cvUrl}
                    download
                    className="inline-flex items-center rounded border border-primary/30 bg-primary/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:border-primary/60 hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)]"
                  >
                    Download CV
                  </a>
                )}
              </div>
            )}
          </HeroSection>
          )}
          </div>
        </section>

        <section id="skills" className="scroll-mt-16 border-t border-border/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground/50">Skills</h2>
            {skills.length > 0 ? (
              <>
                <div className="mb-6 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={cn(
                      "rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors",
                      activeCategory === null
                        ? "border-primary/60 bg-primary/20 text-primary"
                        : "border-border/30 text-foreground/50 hover:border-foreground/30"
                    )}
                  >
                    All
                  </button>
                  {categories.map((cat) => {
                    const btn = CATEGORY_BTN[cat]
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "rounded border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors",
                          activeCategory === cat
                            ? btn?.active ?? "border-primary/60 bg-primary/20 text-primary"
                            : btn?.inactive ?? "border-border/30 text-foreground/50 hover:border-foreground/30"
                        )}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
                <LogoCloud
                  key={activeCategory ?? "all"}
                  logos={filteredSkills.map((skill) => ({
                    name: skill.name,
                    className: skillCategoryClasses(skill.category),
                    icon: skill.image
                      ? (
                        <img
                          src={urlFor(skill.image).width(32).height(32).url()}
                          alt=""
                          className="h-8 w-8 rounded bg-background/80 object-contain p-0.5"
                        />
                      )
                      : undefined,
                  }))}
                  speed="slow"
                />
              </>
            ) : (
              <p className="text-sm text-foreground/40">Skills content coming soon.</p>
            )}
          </div>
        </section>

        <section id="projects" className="scroll-mt-16 border-t border-border/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground/50">Projects</h2>
            {projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
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
            ) : (
              <p className="text-sm text-foreground/40">Projects content coming soon.</p>
            )}
          </div>
        </section>

        <section id="jobs" className="scroll-mt-16 border-t border-border/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground/50">Experience</h2>
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
              <p className="text-sm text-foreground/40">Experience content coming soon.</p>
            )}
          </div>
        </section>

        <section id="studies" className="scroll-mt-16 border-t border-border/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground/50">Education</h2>
            {studies.length > 0 ? (
              <div className="space-y-6">
                {studies.map((study) => (
                  <StudyCard
                    key={study._id}
                    institution={study.institution}
                    field={study.field}
                    startDate={study.startDate}
                    endDate={study.endDate}
                    description={study.description}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-foreground/40">Education content coming soon.</p>
            )}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-16 border-t border-border/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground/50">Certifications</h2>
            {certifications.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {certifications.map((cert) => (
                  <CertificationCard
                    key={cert._id}
                    name={cert.name}
                    date={cert.date}
                    url={cert.url}
                    thumbnail={cert.thumbnail}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-foreground/40">Certifications content coming soon.</p>
            )}
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 border-t border-border/30 px-4 py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-foreground/50">Contact</h2>
            {profile?.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center rounded border border-primary/30 bg-primary/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
              >
                Send Message
              </a>
            ) : (
              <p className="text-sm text-foreground/40">Contact content coming soon.</p>
            )}
          </div>
        </section>
      </main>

      <StatusBar
        leftContent={
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            CONNECTION ESTABLISHED
          </span>
        }
        rightContent={
          <span>END OF TRANSMISSION</span>
        }
        data-testid="bottom-statusbar"
      />
    </>
  )
}