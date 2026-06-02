import type { MenuProps } from 'antd'
import type { RouteObject } from 'react-router-dom'
import ProtectedRoute from '@/components/protected-route'
import type { AppRouteObject } from './types'

type MenuItem = NonNullable<MenuProps['items']>[number]

const joinPath = (parentPath: string, childPath: string) => {
  const normalizedParent = parentPath === '/' ? '' : parentPath
  return `${normalizedParent}/${childPath}`.replace(/\/+/g, '/')
}

const hasRoleAccess = (requiredRoles: string[] | undefined, roles: string[]) =>
  !requiredRoles?.length || requiredRoles.some((role) => roles.includes(role))

export const toReactRouterRoutes = (routes: AppRouteObject[]): RouteObject[] =>
  routes.map((route) => {
    const element = route.roles?.length ? (
      <ProtectedRoute key={route.path} roles={route.roles}>
        {route.element}
      </ProtectedRoute>
    ) : (
      route.element
    )
    const handle = route.title
      ? {
          meta: {
            title: route.title,
            breadcrumbTo: route.breadcrumbTo,
            redirectTo: route.redirectTo,
          },
        }
      : undefined

    if (route.index) {
      return {
        index: true,
        element,
        handle,
      }
    }

    return {
      path: route.path,
      element,
      handle,
      children: route.children
        ? toReactRouterRoutes(route.children)
        : undefined,
    }
  })

export const buildMenuItems = (
  routes: AppRouteObject[],
  roles: string[],
  parentPath = '',
): MenuItem[] =>
  routes.reduce<MenuItem[]>((items, route) => {
    if (!route.path || route.hideInMenu || !hasRoleAccess(route.roles, roles)) {
      return items
    }

    const key = joinPath(parentPath, route.path)
    const children = route.children?.length
      ? buildMenuItems(route.children, roles, key)
      : undefined

    if (route.children?.length && !children?.length) {
      return items
    }

    items.push({
      key,
      icon: route.icon,
      label: route.title ?? route.path,
      children,
    })

    return items
  }, [])

const findMenuPath = (items: MenuItem[], pathname: string): string[] => {
  for (const item of items) {
    if (!item || typeof item !== 'object' || !('key' in item)) {
      continue
    }

    const key = String(item.key)
    const children =
      'children' in item && Array.isArray(item.children) ? item.children : []
    const childPath = findMenuPath(children, pathname)

    if (pathname === key || pathname.startsWith(`${key}/`)) {
      return childPath.length ? [key, ...childPath] : [key]
    }

    if (childPath.length) {
      return [key, ...childPath]
    }
  }

  return []
}

export const getMenuSelection = (items: MenuItem[], pathname: string) => {
  const path = findMenuPath(items, pathname)
  const selectedKey = path.at(-1)

  return {
    selectedKeys: selectedKey ? [selectedKey] : [],
    openKeys: path.slice(0, -1),
  }
}
