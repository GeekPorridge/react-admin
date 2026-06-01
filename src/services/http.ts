import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { message } from 'antd'
import { clearSession, readToken, SESSION_EXPIRED_EVENT } from './authStorage'

interface ErrorResponse {
  message?: string
}

const getErrorMessage = (status?: number, fallback?: string) => {
  if (fallback) {
    return fallback
  }

  switch (status) {
    case 401:
      return '登录已过期，请重新登录'
    case 403:
      return '当前账号无权限访问'
    case 500:
      return '服务器异常，请稍后再试'
    default:
      return '请求失败，请稍后再试'
  }
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
})

let hasHandledUnauthorized = false

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = readToken()

  if (token) {
    config.headers = AxiosHeaders.from(config.headers)
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    hasHandledUnauthorized = false
    return response
  },
  (error: AxiosError<ErrorResponse>) => {
    const status = error.response?.status
    const serverMessage = error.response?.data?.message

    if (status === 401) {
      if (!hasHandledUnauthorized) {
        hasHandledUnauthorized = true
        message.error(getErrorMessage(status, serverMessage))
        clearSession()
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
      }
      return Promise.reject(error)
    }

    message.error(getErrorMessage(status, serverMessage))
    return Promise.reject(error)
  },
)
