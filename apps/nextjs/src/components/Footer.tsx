"use client"

import { CTABanner } from "@/components/thegridcn/cta-banner"
import { StatusBar } from "@/components/thegridcn/status-bar"

interface FooterProps {
  email?: string
}

export function Footer({ email }: FooterProps) {
  return (
    <footer className="border-t border-border/30">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <CTABanner
          title="Let's Build Something"
          description="Currently open to new opportunities and collaborations."
          primaryAction={
            email
              ? {
                  label: "Get In Touch",
                  onClick: () => window.open(`mailto:${email}`, "_blank"),
                }
              : undefined
          }
          secondaryAction={{
            label: "View GitHub",
            onClick: () => window.open("https://github.com/johndoe", "_blank"),
          }}
          variant="highlight"
        />
      </div>

      <StatusBar
        leftContent={
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            CONNECTION TERMINATED
          </span>
        }
        rightContent={
          <span className="text-foreground/50">
            &copy; {new Date().getFullYear()} PORTFOLIO v1.0
          </span>
        }
      />
    </footer>
  )
}
