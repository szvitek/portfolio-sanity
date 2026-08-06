import { dateRange } from "@/lib/date-utils"

interface StudyCardProps {
  institution: string
  field: string
  startDate: string
  endDate?: string
  description?: string
}

export function StudyCard({
  institution,
  field,
  startDate,
  endDate,
  description,
}: StudyCardProps) {
  return (
    <div
      data-slot="study-card"
      className="relative overflow-hidden rounded border border-border/30 bg-card/50 p-6"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/50" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded border border-border/30 bg-muted/50">
            <svg
              className="h-6 w-6 text-foreground/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
              {institution}
            </h3>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            {dateRange(startDate, endDate)}
          </p>
        </div>
      </div>

      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-primary/80">
        {field}
      </p>

      {description && (
        <p className="mt-3 font-mono text-xs leading-relaxed text-foreground/70">
          {description}
        </p>
      )}
    </div>
  )
}
