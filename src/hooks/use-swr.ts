import type { AxiosRequestConfig } from 'axios'
import useSWR, { type SWRConfiguration } from 'swr'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'
import { http } from '@/services/http'

const fetcher = <T>(url: string, config?: AxiosRequestConfig) =>
  http.get<T>(url, config).then((res) => res.data)

export function useApi<T>(
  key: string | null,
  config?: AxiosRequestConfig,
  swrConfig?: SWRConfiguration,
) {
  return useSWR<T>(key, (url: string) => fetcher<T>(url, config), {
    revalidateOnFocus: false,
    ...swrConfig,
  })
}

type MutationFetcher<Body, Response> = (
  key: string,
  extra: { arg: Body },
) => Promise<Response>

export function useApiMutation<Body = unknown, Response = unknown>(
  key: string | null,
  fetcherFn: (url: string, body: Body) => Promise<Response>,
  swrConfig?: SWRMutationConfiguration<Response, Error, string, Body>,
) {
  const wrappedFetcher: MutationFetcher<Body, Response> = (url, { arg }) =>
    fetcherFn(url, arg)

  return useSWRMutation(key, wrappedFetcher, swrConfig)
}

export { useSWRConfig } from 'swr'
