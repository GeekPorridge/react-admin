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

import dayjs from 'dayjs'
import dayjsDuration from 'dayjs/plugin/duration'
import dayjsIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import dayjsFromNow from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

ModuleRegistry.registerModules([AllCommunityModule])

dayjs.locale('zh-hk')
dayjs.extend(dayjsDuration)
dayjs.extend(dayjsIsSameOrAfter)
dayjs.extend(dayjsFromNow)
dayjs.extend(utc)

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

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <RootApp />
      </ThemeProvider>
    </React.StrictMode>,
  )
}

startApp()
