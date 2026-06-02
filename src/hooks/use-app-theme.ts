import { use } from 'react'
import { ThemeContext } from '@/context/theme-context'

export const useAppTheme = () => {
  const context = use(ThemeContext)

  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider')
  }

  return context
}
