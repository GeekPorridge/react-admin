import type { ReactNode } from 'react'

export interface RouteMeta {
  title: string
  icon?: string
  breadcrumbTo?: string
  redirectTo?: string
  hideInMenu?: boolean
  roles?: string[]
}

export interface AppRouteObject {
  path?: string
  index?: boolean
  element?: ReactNode
  meta?: RouteMeta
  children?: AppRouteObject[]
}

export interface RouteHandle {
  meta?: RouteMeta
}
