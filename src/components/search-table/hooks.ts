import { useContext } from 'react'
import type { SearchTableActions, SearchTableState } from './context'
import { SearchTableContext } from './context'

export function useSearchTable<T>() {
  const ctx = useContext(SearchTableContext)

  if (!ctx) {
    throw new Error('useSearchTable must be used within a <SearchTable>')
  }

  return {
    state: ctx.state as SearchTableState<T>,
    actions: ctx.actions as SearchTableActions<T>,
    name: ctx.name,
  }
}
