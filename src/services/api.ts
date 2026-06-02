import type { AuthUser } from './auth-storage'
import { http } from './http'

interface LoginPayload {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  user: AuthUser
}

export const login = (payload: LoginPayload) =>
  http.post<LoginResponse>('/auth/login', payload).then((res) => res.data)

export const logout = () =>
  http.post<{ success: boolean }>('/auth/logout').then((res) => res.data)

interface DashboardStats {
  users: number
  orders: number
  conversionRate: number
}

export const fetchDashboardStats = () =>
  http.get<DashboardStats>('/dashboard/stats').then((res) => res.data)

interface ChartItem {
  month: string
  users: number
  orders: number
}

export const fetchDashboardChart = () =>
  http.get<ChartItem[]>('/dashboard/chart').then((res) => res.data)

interface PieItem {
  label: string
  value: number
}

export const fetchDashboardPie = () =>
  http.get<PieItem[]>('/dashboard/pie').then((res) => res.data)

interface LineItem {
  month: string
  revenue: number
  cost: number
}

export const fetchDashboardLine = () =>
  http.get<LineItem[]>('/dashboard/line').then((res) => res.data)

interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface UserItem {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface UserListParams {
  page?: number
  pageSize?: number
  keyword?: string
}

export const fetchUserList = (params?: UserListParams) =>
  http
    .get<PaginatedResponse<UserItem>>('/users', { params })
    .then((res) => res.data)

export const fetchUserDetail = (id: string) =>
  http.get<UserItem>(`/users/${id}`).then((res) => res.data)

export const createUser = (data: Partial<UserItem>) =>
  http.post<UserItem>('/users', data).then((res) => res.data)

export const updateUser = (id: string, data: Partial<UserItem>) =>
  http.put<UserItem>(`/users/${id}`, data).then((res) => res.data)

export const deleteUser = (id: string) =>
  http.delete<{ success: boolean }>(`/users/${id}`).then((res) => res.data)
