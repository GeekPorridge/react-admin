import { useContext } from 'react'
import { ThemeContext } from '../../context/theme-context/theme-context'

export const useAppTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider')
  }

  return context
}
