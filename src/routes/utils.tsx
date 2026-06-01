import {
  DashboardOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import type { ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import type { AppRouteObject, RouteMeta } from './types'

type MenuItem = NonNullable<MenuProps['items']>[number]

const iconMap: Record<string, ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  SafetyCertificateOutlined: <SafetyCertificateOutlined />,
  SettingOutlined: <SettingOutlined />,
}

const joinPath = (parentPath: string, childPath: string) => {
  const normalizedParent = parentPath === '/' ? '' : parentPath
  return `${normalizedParent}/${childPath}`.replace(/\/+/g, '/')
}

const hasRoleAccess = (meta: RouteMeta | undefined, roles: string[]) =>
  !meta?.roles?.length || meta.roles.some((role) => roles.includes(role))

export const toReactRouterRoutes = (routes: AppRouteObject[]): RouteObject[] =>
  routes.map((route) => {
    const element = route.meta?.roles?.length ? (
      <ProtectedRoute key={route.path} roles={route.meta.roles}>
        {route.element}
      </ProtectedRoute>
    ) : (
      route.element
    )
    const handle = route.meta ? { meta: route.meta } : undefined

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
    if (
      !route.path ||
      route.meta?.hideInMenu ||
      !hasRoleAccess(route.meta, roles)
    ) {
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
      icon: route.meta?.icon ? iconMap[route.meta.icon] : undefined,
      label: route.meta?.title ?? route.path,
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
