import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '@/components/protected-route'
import { PATHS } from './paths'
import { protectedRoutes } from './routes'
import { toReactRouterRoutes } from './utils'

const LoginPage = lazy(() => import('@/pages/login'))
const ForbiddenPage = lazy(() => import('@/pages/forbidden'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))
const MainLayout = lazy(() => import('@/layouts/main-layout'))

export const router = createBrowserRouter([
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.FORBIDDEN,
    element: <ForbiddenPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: toReactRouterRoutes(protectedRoutes),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
