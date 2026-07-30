import * as React from "react"
import { cn } from "@/lib/utils"

interface GlowContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight"
}

export function GlowContainer({
  variant = "default",
  children,
  className,
  ...props
}: GlowContainerProps) {
  return (
    <div
      data-slot="glow-container"
      className={cn(
        "relative overflow-hidden",
        variant === "highlight" &&
          "rounded border border-primary/30 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
