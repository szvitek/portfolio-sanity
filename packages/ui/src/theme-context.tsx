"use client"

import { createContext, useContext, useReducer, useEffect, useState, useMemo, type ReactNode } from "react"

export type ThemeName = "tron" | "ares" | "clu" | "athena" | "aphrodite" | "poseidon"
export type Intensity = "none" | "light" | "medium" | "heavy"

interface ThemeState {
  theme: ThemeName
  intensity: Intensity
}

type ThemeAction =
  | { type: "SET_THEME"; payload: ThemeName }
  | { type: "SET_INTENSITY"; payload: Intensity }

const THEME_KEY = "tron-theme"
const INTENSITY_KEY = "tron-intensity"

const THEMES: ThemeName[] = ["tron", "ares", "clu", "athena", "aphrodite", "poseidon"]
const INTENSITIES: Intensity[] = ["none", "light", "medium", "heavy"]

const DEFAULT_STATE: ThemeState = { theme: "tron", intensity: "medium" }

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload }
    case "SET_INTENSITY":
      return { ...state, intensity: action.payload }
    default:
      return state
  }
}

interface ThemeContextValue {
  state: ThemeState
  setTheme: (t: ThemeName) => void
  setIntensity: (i: Intensity) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, DEFAULT_STATE)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const theme = localStorage.getItem(THEME_KEY)
      const intensity = localStorage.getItem(INTENSITY_KEY)
      if (THEMES.includes(theme as ThemeName)) {
        dispatch({ type: "SET_THEME", payload: theme as ThemeName })
      }
      if (INTENSITIES.includes(intensity as Intensity)) {
        dispatch({ type: "SET_INTENSITY", payload: intensity as Intensity })
      }
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    document.documentElement.setAttribute("data-theme", state.theme)
    localStorage.setItem(THEME_KEY, state.theme)
  }, [state.theme, hydrated])

  useEffect(() => {
    if (!hydrated) return
    if (state.intensity === "none") {
      document.documentElement.removeAttribute("data-tron-intensity")
    } else {
      document.documentElement.setAttribute("data-tron-intensity", state.intensity)
    }
    localStorage.setItem(INTENSITY_KEY, state.intensity)
  }, [state.intensity, hydrated])

  const value = useMemo<ThemeContextValue>(
    () => ({
      state,
      setTheme: (t) => dispatch({ type: "SET_THEME", payload: t }),
      setIntensity: (i) => dispatch({ type: "SET_INTENSITY", payload: i }),
    }),
    [state],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
