import type { PortableTextBlock } from "@portabletext/react"
import { PortableText } from "@portabletext/react"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"
import { skillBadgeClasses } from "@/lib/skill-colors"
import { dateRange } from "@/lib/date-utils"

interface SkillRef {
  _id: string
  name: string
  image?: SanityImageSource
  category: string
}

interface JobCardProps {
  company: string
  role: string
  startDate: string
  endDate?: string
  description?: PortableTextBlock[]
  image?: SanityImageSource
  location?: string
  website?: string
  skills?: SkillRef[]
  highlights?: string[]
}

export function JobCard({
  company,
  role,
  startDate,
  endDate,
  description,
  image,
  location,
  website,
  skills,
  highlights,
}: JobCardProps) {
  const logoUrl = image ? urlFor(image).width(96).height(96).url() : undefined

  return (
    <div
      data-slot="job-card"
      className="relative overflow-hidden rounded border border-border/30 bg-card/50 p-6"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/50" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${company} logo`}
              className="h-12 w-12 rounded border border-border/30 object-contain"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded border border-border/30 bg-muted/50 font-mono text-sm font-bold uppercase text-foreground/60">
              {company.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
              {company}
            </h3>
            {location && (
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                {location}
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            {dateRange(startDate, endDate)}
          </p>
        </div>
      </div>

      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-primary/80">
        {role}
      </p>

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary/60 transition-colors hover:text-primary"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Website
        </a>
      )}

      {description && description.length > 0 && (
        <div className="prose-invert mt-4 font-mono text-xs leading-relaxed text-foreground/70">
          <PortableText value={description} />
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skills.map((skill) => {
            const colors = skillBadgeClasses(skill.category)
            return (
              <span
                key={skill._id}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest",
                  colors.border,
                  colors.bg,
                  colors.text
                )}
              >
                {skill.image ? (
                  <img
                    src={urlFor(skill.image).width(16).height(16).url()}
                    alt=""
                    className="h-3 w-3 object-contain"
                  />
                ) : null}
                {skill.name}
              </span>
            )
          })}
        </div>
      )}

      {highlights && highlights.length > 0 && (
        <div className="mt-4 border-t border-border/30 pt-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            Highlights
          </p>
          <ul className="space-y-1">
            {highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-2 font-mono text-xs text-foreground/70">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
