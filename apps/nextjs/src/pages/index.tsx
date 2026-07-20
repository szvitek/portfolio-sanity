import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { PortableText } from "@portabletext/react"
import { ProfileCard } from "@portfolio/ui"
import { getHomePageData, urlFor, cvUrlFor } from "@/lib/sanity"
import type { ProfileData } from "@/lib/sanity"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps: GetStaticProps<{ profile: ProfileData | null }> = async () => {
  const data = await getHomePageData()
  return { props: { profile: data.profile } }
}

export default function HomePage({ profile }: Props) {
  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-500">No profile content found.</p>
      </main>
    )
  }

  const avatarUrl = profile.avatar ? urlFor(profile.avatar).width(256).height(256).url() : undefined
  const cvUrl = profile.cv ? cvUrlFor(profile.cv) : undefined

  return (
    <main>
      <ProfileCard
        title={profile.title}
        subtitle={profile.subtitle}
        bio={profile.bio ? <PortableText value={profile.bio} /> : undefined}
        avatarUrl={avatarUrl}
        avatarAlt={profile.title}
        socialLinks={profile.socialLinks}
        cvUrl={cvUrl}
      />
    </main>
  )
}
