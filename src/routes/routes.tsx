import {
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from './paths'
import type { AppRouteObject } from './types'

const AdminPage = lazy(() => import('@/pages/admin'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const UserListPage = lazy(() => import('@/pages/list/user-list'))

export const protectedRoutes: AppRouteObject[] = [
  {
    index: true,
    element: <Navigate to={PATHS.HOME} replace />,
  },
  {
    path: 'welcome',
    element: <DashboardPage />,
    title: '欢迎',
    icon: <HomeOutlined />,
  },
  {
    path: 'admin',
    element: <Outlet />,
    title: '管理页',
    icon: <SettingOutlined />,
    breadcrumbTo: PATHS.HOME,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.HOME} replace />,
      },
      {
        path: 'sub-page',
        element: <AdminPage />,
        title: '二级管理页',
        roles: ['admin'],
      },
    ],
  },
  {
    path: 'form',
    element: <Outlet />,
    title: '表单页',
    icon: <SettingOutlined />,
    breadcrumbTo: PATHS.HOME,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.HOME} replace />,
      },
      {
        path: 'sub-page',
        element: <AdminPage />,
        title: '基础表单',
      },
    ],
  },
  {
    path: 'list',
    element: <Outlet />,
    title: '列表页',
    icon: <UnorderedListOutlined />,
    breadcrumbTo: PATHS.HOME,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.HOME} replace />,
      },
      {
        path: 'user-list',
        element: <UserListPage />,
        title: '用户列表',
      },
    ],
  },
]
