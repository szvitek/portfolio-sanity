import { useState } from "react"
import type { PortableTextBlock } from "@portabletext/react"
import { PortableText } from "@portabletext/react"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"
import { skillBadgeClasses } from "@/lib/skill-colors"
import { groupSkillsByCategory } from "@/lib/skill-groups"
import { Button } from "@/components/ui/button"

const DESCRIPTION_EXCERPT_WORDS = 30

function descriptionText(blocks: PortableTextBlock[]): string {
  return blocks
    .flatMap((block) => (block.children ?? []).map((child) => ("text" in child ? child.text : "")))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

interface SkillRef {
  _id: string
  name: string
  image?: SanityImageSource
  category: string
}

interface ProjectCardProps {
  title: string
  description?: PortableTextBlock[]
  thumbnail?: SanityImageSource
  skills?: SkillRef[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  className?: string
  style?: React.CSSProperties
}

export function ProjectCard({
  title,
  description,
  thumbnail,
  skills,
  liveUrl,
  githubUrl,
  featured,
  className,
  style,
}: ProjectCardProps) {
  const thumbnailUrl = thumbnail
    ? urlFor(thumbnail).width(600).height(340).url()
    : undefined

  const fullText = description ? descriptionText(description) : ""
  const words = fullText ? fullText.split(" ") : []
  const isTruncated = words.length > DESCRIPTION_EXCERPT_WORDS
  const excerpt = words.slice(0, DESCRIPTION_EXCERPT_WORDS).join(" ")
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      data-slot="project-card"
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded border border-border/30 bg-card/50 p-6",
        className
      )}
      style={style}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/50" />

      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          className="mb-4 w-full rounded border border-border/30 bg-background/80 object-cover"
          style={{ aspectRatio: "600/340" }}
        />
      ) : (
        <div className="mb-4 flex h-40 items-center justify-center rounded border border-border/30 bg-background/50">
          <svg
            className="h-10 w-10 text-foreground/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
          {title}
        </h3>
        {featured && (
          <span className="shrink-0 rounded border border-primary/50 bg-primary/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
            Featured
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col pb-4">
        {description && description.length > 0 && (
          <div className="prose-invert font-mono text-xs leading-relaxed text-foreground/70">
            {isTruncated && !expanded && <p>{excerpt}&#8230;</p>}
            {isTruncated ? (
              <div
                className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                style={{
                  gridTemplateRows: expanded ? "1fr" : "0fr",
                  opacity: expanded ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <PortableText value={description} />
                </div>
              </div>
            ) : (
              <PortableText value={description} />
            )}
            {isTruncated && (
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                className="mt-1 inline-flex cursor-pointer items-center gap-1 text-primary transition-colors hover:text-primary/80"
              >
                <span>Read {expanded ? "less" : "more"}</span>
                <svg
                  className={cn("h-3 w-3 transition-transform", expanded && "rotate-180")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {groupSkillsByCategory(skills).map((group) => (
              <div key={group.category} className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => {
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
            ))}
          </div>
        )}
      </div>

      {(liveUrl || githubUrl) && (
        <div className="flex gap-4 border-t border-border/30 pt-3">
          {liveUrl && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 font-mono text-[10px] uppercase tracking-widest"
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 font-mono text-[10px] uppercase tracking-widest"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
