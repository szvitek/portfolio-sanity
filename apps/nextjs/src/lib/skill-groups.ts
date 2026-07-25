import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

interface SkillRef {
  _id: string
  name: string
  image?: SanityImageSource
  category: string
}

export function groupSkillsByCategory(skills: SkillRef[]): { category: string; skills: SkillRef[] }[] {
  const grouped = new Map<string, SkillRef[]>()
  for (const skill of skills) {
    const existing = grouped.get(skill.category) ?? []
    existing.push(skill)
    grouped.set(skill.category, existing)
  }
  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => ({
      category,
      skills: items.sort((a, b) => a.name.localeCompare(b.name)),
    }))
}
