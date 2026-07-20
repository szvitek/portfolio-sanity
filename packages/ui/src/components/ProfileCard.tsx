import type { ReactNode } from "react"
import { SocialLinkIcon } from "./SocialLinkIcon"

interface SocialLinkData {
  platform: "github" | "linkedin" | "email"
  url: string
}

interface ProfileCardProps {
  title: string
  subtitle?: string
  bio?: ReactNode
  avatarUrl?: string
  avatarAlt?: string
  socialLinks?: SocialLinkData[]
  cvUrl?: string
}

export function ProfileCard({
  title,
  subtitle,
  bio,
  avatarUrl,
  avatarAlt,
  socialLinks,
  cvUrl,
}: ProfileCardProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-center text-center">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={avatarAlt ?? title}
              className="mb-6 h-32 w-32 rounded-full object-cover"
            />
          )}

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-xl text-neutral-600">{subtitle}</p>
          )}

          {bio && (
            <div className="prose prose-neutral mt-6 max-w-xl text-left">
              {bio}
            </div>
          )}

          {socialLinks && socialLinks.length > 0 && (
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((link) => (
                <SocialLinkIcon
                  key={link.platform}
                  platform={link.platform}
                  url={link.url}
                  className="text-neutral-500 transition-colors hover:text-neutral-900"
                />
              ))}
            </div>
          )}

          {cvUrl && (
            <a
              href={cvUrl}
              download
              className="mt-8 inline-flex items-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
