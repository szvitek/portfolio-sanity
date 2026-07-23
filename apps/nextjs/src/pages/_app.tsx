import type { AppProps } from "next/app"
import "../styles/globals.css"
import { ThemeProvider } from "@portfolio/ui"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
