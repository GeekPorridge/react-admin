import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../components/protected-route/protected-route'
import { MainLayout } from '../layouts/main-layout/main-layout'
import { Forbidden } from '../pages/forbidden/forbidden'
import { Login } from '../pages/login/login'
import { NotFound } from '../pages/not-found/not-found'
import { PATHS } from './paths'
import { protectedRoutes } from './routes'
import { toReactRouterRoutes } from './utils'

export const router = createBrowserRouter([
  {
    path: PATHS.login,
    element: <Login />,
  },
  {
    path: PATHS.forbidden,
    element: <Forbidden />,
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
    element: <NotFound />,
  },
])
