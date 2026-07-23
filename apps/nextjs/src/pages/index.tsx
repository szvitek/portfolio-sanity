import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { PortableText } from "@portabletext/react"
import { getHomePageData, urlFor, cvUrlFor } from "@/lib/sanity"
import type { ProfileData, SkillData, JobData, StudyData, CertificationData, ProjectData } from "@/lib/sanity"
import { HeroSection } from "@/components/thegridcn/hero-section"
import { NavBar } from "@/components/NavBar"
import { StatusBar } from "@/components/thegridcn/status-bar"
import { SocialLinkIcon } from "@portfolio/ui"

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
      projects: data.projects ?? [],
    },
  }
}

function extractText(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return ""
  const firstBlock = blocks[0] as { children?: { text?: string }[] } | undefined
  if (!firstBlock?.children) return ""
  return firstBlock.children.map((c) => c.text ?? "").join(" ")
}

export default function HomePage({ profile, skills, jobs, studies, certifications, projects }: Props) {
  const avatarUrl = profile?.avatar ? urlFor(profile.avatar).width(120).height(120).url() : undefined
  const cvUrl = profile?.cv ? cvUrlFor(profile.cv) : undefined
  const bioText = profile?.bio ? extractText(profile.bio) : ""
  const hasProfile = !!profile

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
          <span>PORTFOLIO v1.0</span>
        }
        data-testid="top-statusbar"
      />

      <NavBar />

      <main>
        <section id="profile" className="scroll-mt-16 px-4 py-8 md:py-16">
          {!hasProfile ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <p className="text-sm text-foreground/50">No profile content found.</p>
            </div>
          ) : (
          <HeroSection
            title={profile.title}
            subtitle={profile.subtitle}
            description={bioText}
            badge="PORTFOLIO"
            align="center"
          >
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={profile?.title ?? "Avatar"}
                className="h-24 w-24 rounded-full border-2 border-primary/30 object-cover ring-2 ring-primary/10"
              />
            )}

            {profile?.socialLinks && profile.socialLinks.length > 0 && (
              <div className="mt-2 flex w-full items-center justify-center gap-4">
                {profile.socialLinks.map((link) => (
                  <SocialLinkIcon
                    key={link.platform}
                    platform={link.platform}
                    url={link.url}
                    className="text-foreground/60 transition-colors hover:text-primary"
                  />
                ))}
              </div>
            )}

            {cvUrl && (
              <a
                href={cvUrl}
                download
                className="inline-flex items-center rounded border border-primary/30 bg-primary/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
              >
                Download CV
              </a>
            )}
          </HeroSection>
          )}
        </section>

        <section id="skills" className="scroll-mt-16 border-t border-border/30 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-foreground/50">Skills</h2>
            {skills.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {skills.map((skill) => (
                  <div key={skill._id} className="rounded border border-border/30 bg-card/50 p-4 text-center font-mono text-sm text-foreground/80">
                    {skill.name}
                  </div>
                ))}
              </div>
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
                  <div key={project._id} className="rounded border border-border/30 bg-card/50 p-6">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">{project.title}</h3>
                  </div>
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
                  <div key={job._id} className="rounded border border-border/30 bg-card/50 p-6">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">{job.role}</h3>
                    <p className="mt-1 font-mono text-xs text-foreground/60">{job.company}</p>
                  </div>
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
                  <div key={study._id} className="rounded border border-border/30 bg-card/50 p-6">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">{study.field}</h3>
                    <p className="mt-1 font-mono text-xs text-foreground/60">{study.institution}</p>
                  </div>
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
                  <div key={cert._id} className="rounded border border-border/30 bg-card/50 p-6">
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">{cert.name}</h3>
                  </div>
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