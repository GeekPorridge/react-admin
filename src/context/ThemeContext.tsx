import { createContext, useMemo, useState, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

const THEME_KEY = 'react_admin_theme'

export const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

const readThemeMode = (): ThemeMode => {
  const cachedMode = localStorage.getItem(THEME_KEY)
  return cachedMode === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => readThemeMode())

  const setThemeMode = (nextMode: ThemeMode) => {
    localStorage.setItem(THEME_KEY, nextMode)
    setMode(nextMode)
  }

  const toggleTheme = () => {
    setThemeMode(mode === 'dark' ? 'light' : 'dark')
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      toggleTheme,
      setThemeMode,
    }),
    [mode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
