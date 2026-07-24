export const SKILL_CATEGORY_COLORS: Record<string, { border: string; bg: string; text: string; hoverBorder: string; hoverBg: string }> = {
  Frontend: {
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    hoverBorder: "hover:border-sky-500/60",
    hoverBg: "hover:bg-sky-500/20",
  },
  Backend: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/60",
    hoverBg: "hover:bg-emerald-500/20",
  },
  DevOps: {
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    hoverBorder: "hover:border-purple-500/60",
    hoverBg: "hover:bg-purple-500/20",
  },
  Languages: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    hoverBorder: "hover:border-amber-500/60",
    hoverBg: "hover:bg-amber-500/20",
  },
  Tools: {
    border: "border-rose-500/40",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    hoverBorder: "hover:border-rose-500/60",
    hoverBg: "hover:bg-rose-500/20",
  },
  Databases: {
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/60",
    hoverBg: "hover:bg-cyan-500/20",
  },
}

export function skillCategoryClasses(category: string): string {
  const c = SKILL_CATEGORY_COLORS[category]
  if (!c) return "border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20"
  return `${c.border} ${c.bg} ${c.hoverBorder} ${c.hoverBg}`
}

export function skillBadgeClasses(category: string): { border: string; bg: string; text: string } {
  const c = SKILL_CATEGORY_COLORS[category]
  if (!c) return { border: "border-primary/50", bg: "bg-primary/15", text: "text-primary" }
  return { border: c.border.replace("/40", "/50"), bg: c.bg.replace("/10", "/15"), text: c.text }
}
