export type SkillCategoryColors = {
  border: string
  bg: string
  text: string
  hoverBorder: string
  hoverBg: string
  badgeBorder: string
  glow: string
}

export const SKILL_CATEGORY_COLORS: Record<string, SkillCategoryColors> = {
  Frontend: {
    border: "border-sky-500/40",
    bg: "bg-sky-500/20",
    text: "text-sky-400",
    hoverBorder: "hover:border-sky-500/60",
    hoverBg: "hover:bg-sky-500/30",
    badgeBorder: "border-sky-500/50",
    glow: "#0ea5e9",
  },
  Backend: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/60",
    hoverBg: "hover:bg-emerald-500/30",
    badgeBorder: "border-emerald-500/50",
    glow: "#10b981",
  },
  DevOps: {
    border: "border-purple-500/40",
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    hoverBorder: "hover:border-purple-500/60",
    hoverBg: "hover:bg-purple-500/30",
    badgeBorder: "border-purple-500/50",
    glow: "#a855f7",
  },
  Languages: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    hoverBorder: "hover:border-amber-500/60",
    hoverBg: "hover:bg-amber-500/30",
    badgeBorder: "border-amber-500/50",
    glow: "#f59e0b",
  },
  Tools: {
    border: "border-rose-500/40",
    bg: "bg-rose-500/20",
    text: "text-rose-400",
    hoverBorder: "hover:border-rose-500/60",
    hoverBg: "hover:bg-rose-500/30",
    badgeBorder: "border-rose-500/50",
    glow: "#f43f5e",
  },
  Databases: {
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/60",
    hoverBg: "hover:bg-cyan-500/30",
    badgeBorder: "border-cyan-500/50",
    glow: "#06b6d4",
  },
}

export function skillCategoryClasses(category: string): string {
  const c = SKILL_CATEGORY_COLORS[category]
  if (!c) return "border-primary/40 bg-primary/20 text-primary hover:border-primary/60 hover:bg-primary/30"
  return `${c.border} ${c.bg} ${c.hoverBorder} ${c.hoverBg}`
}

export function skillBadgeClasses(category: string): { border: string; bg: string; text: string } {
  const c = SKILL_CATEGORY_COLORS[category]
  if (!c) return { border: "border-primary/50", bg: "bg-primary/20", text: "text-primary" }
  return { border: c.badgeBorder, bg: c.bg, text: c.text }
}

export function categoryGlowColor(category: string): string {
  return SKILL_CATEGORY_COLORS[category]?.glow ?? "var(--primary)"
}
