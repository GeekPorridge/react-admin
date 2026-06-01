import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { MainLayout } from '../layouts/MainLayout'
import { Forbidden } from '../pages/Forbidden'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
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
