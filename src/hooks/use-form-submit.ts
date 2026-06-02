import { useCallback, useRef, useState } from 'react'

interface UseFormSubmitOptions<V, R> {
  onSubmit: (values: V) => Promise<R>
  onSuccess?: (result: R) => void
  onError?: (error: Error) => void
}

export function useFormSubmit<V, R>({
  onSubmit,
  onSuccess,
  onError,
}: UseFormSubmitOptions<V, R>) {
  const [loading, setLoading] = useState(false)
  const errorRef = useRef<Error | null>(null)

  const run = useCallback(
    async (values: V) => {
      setLoading(true)
      errorRef.current = null

      try {
        const result = await onSubmit(values)
        onSuccess?.(result)
        return result
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))
        errorRef.current = err
        onError?.(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [onSubmit, onSuccess, onError],
  )

  return { run, loading }
}
