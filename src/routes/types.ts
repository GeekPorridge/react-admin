import type { ReactNode } from 'react'

export interface RouteMeta {
  title: string
  icon?: ReactNode
  breadcrumbTo?: string
  redirectTo?: string
  hideInMenu?: boolean
  roles?: string[]
}

export interface AppRouteObject {
  path?: string
  index?: boolean
  element?: ReactNode
  title?: string
  icon?: ReactNode
  breadcrumbTo?: string
  redirectTo?: string
  hideInMenu?: boolean
  roles?: string[]
  children?: AppRouteObject[]
}

export interface RouteHandle {
  meta?: RouteMeta
}
