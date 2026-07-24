export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function formatYear(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", { year: "numeric" })
}

export function dateRange(startDate: string, endDate?: string): string {
  const from = formatDate(startDate)
  const to = endDate ? formatDate(endDate) : "Present"
  return `${from} — ${to}`
}
