import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth'
import { PATHS } from '../../routes/paths'

interface ProtectedRouteProps {
  children?: ReactNode
  roles?: string[]
}

const canAccess = (requiredRoles: string[] | undefined, userRoles: string[]) =>
  !requiredRoles?.length ||
  requiredRoles.some((role) => userRoles.includes(role))

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to={PATHS.login} replace state={{ from: location }} />
  }

  if (!canAccess(roles, auth.roles)) {
    return <Navigate to={PATHS.forbidden} replace />
  }

  return children ?? <Outlet />
}
