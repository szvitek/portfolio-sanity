import { useState } from "react"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import { ThemeProvider } from "@portfolio/ui"
import { BootOverlay } from "@/components/BootOverlay"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }: AppProps) {
  const [booted, setBooted] = useState(false)

  return (
    <ThemeProvider>
      {!booted && <BootOverlay onComplete={() => setBooted(true)} />}
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}
