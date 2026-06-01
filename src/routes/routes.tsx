import { Navigate, Outlet } from 'react-router-dom'
import { AdminPage } from '../pages/AdminPage'
import { Dashboard } from '../pages/Dashboard'
import { PATHS } from './paths'
import type { AppRouteObject } from './types'

export const protectedRoutes: AppRouteObject[] = [
  {
    index: true,
    element: <Navigate to={PATHS.dashboard} replace />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
  },
  {
    path: 'system',
    element: <Outlet />,
    meta: {
      title: '系统管理',
      icon: 'SettingOutlined',
      breadcrumbTo: PATHS.dashboard,
    },
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.dashboard} replace />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
        meta: {
          title: '管理员页面',
          icon: 'SafetyCertificateOutlined',
          roles: ['admin'],
        },
      },
    ],
  },
]
