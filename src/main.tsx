import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community'
import { App as AntdApp, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { useAppTheme } from './hooks/useAppTheme'
import { router } from './routes/router'
import './styles/global.css'

ModuleRegistry.registerModules([AllCommunityModule])

function RootApp() {
  const { mode } = useAppTheme()

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 6,
          colorPrimary: '#1677ff',
        },
      }}
    >
      <AntdApp>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RootApp />
    </ThemeProvider>
  </React.StrictMode>,
)
