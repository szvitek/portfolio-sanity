# 10 — Theme system (6 themes, glow, dark mode)

**What to build:** The GridCN theme infrastructure — `ThemeProvider` with 6 themes (tron/ares/clu/athena/aphrodite/poseidon), 4 glow intensity levels (none/light/medium/heavy), dark mode toggle, and localStorage persistence. All subsequent section tickets depend on this for their GridCN components to render with the correct theme context.

**GridCN components from prototype:** Theme context uses `useReducer`; public API: `useTheme()` returns `{ state, setTheme, setIntensity, toggleDarkMode }`. Flash-prevention inline script in `_document.tsx` reads `tron-theme`, `tron-intensity`, `tron-dark-mode` from localStorage before React hydrates.

**Blocked by:** 02 — Home page shell + Profile section

**Status:** ready-for-agent

- [ ] `ThemeProvider` context with `useReducer` (theme, intensity, darkMode) in `packages/ui`
- [ ] Flash-prevention inline script in `apps/nextjs` `_document.tsx` for localStorage theme restore
- [ ] 6 theme CSS blocks (`[data-theme="tron"]`, etc.) in globals.css with `oklch()` variables
- [ ] 4 glow intensity CSS blocks (`[data-tron-intensity]`) for component glow overrides
- [ ] Dark mode via `.dark` class on `<html>` with `--primary-rgb` fallback vars
- [ ] Theme/intensity/dark mode switcher component (floating panel, can be hidden later)
- [ ] `packages/tailwind-config` updated with GridCN theme token presets
