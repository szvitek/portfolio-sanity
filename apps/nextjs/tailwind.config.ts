import type { Config } from "tailwindcss"
import gridcnPreset from "@portfolio/tailwind-config"

const config: Config = {
  presets: [gridcnPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
}

export default config
