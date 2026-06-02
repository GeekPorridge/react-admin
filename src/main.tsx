import { AllCommunityModule, ModuleRegistry } from 'ag-charts-community'
import { App as AntdApp, ConfigProvider, Flex, Spin, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/context/theme-context'
import { router } from '@/routes/router'
import { useAppTheme } from './hooks/use-app-theme'
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
          <Suspense
            fallback={
              <Flex
                justify="center"
                align="center"
                style={{ minHeight: '100vh' }}
              >
                <Spin size="large" />
              </Flex>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
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
