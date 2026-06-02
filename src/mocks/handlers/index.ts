import { authHandlers } from './auth'
import { dashboardHandlers } from './dashboard'
import { listHandlers } from './list'

export const handlers = [...authHandlers, ...dashboardHandlers, ...listHandlers]
