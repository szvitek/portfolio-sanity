import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
  xl: "h-32 w-32 text-4xl",
}

export function Avatar({ className, src, alt, fallback, size = "md", ...props }: AvatarProps) {
  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-full", sizeClasses[size], className)} {...props}>
      {src ? (
        <img src={src} alt={alt ?? ""} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-700 font-medium">
          {fallback ?? "?"}
        </div>
      )}
    </div>
  )
}
