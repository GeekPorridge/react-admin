import type { ReactNode } from 'react'
import type { PaginatedResult, SearchTableFetchParams } from './context'
import { SearchTableProvider } from './context'
import { FormModal } from './form-modal'
import { SearchBar } from './search-bar'
import { Table } from './table'
import { Toolbar } from './toolbar'

interface SearchTableProps<T> {
  children: ReactNode
  fetchFn: (params: SearchTableFetchParams) => Promise<PaginatedResult<T>>
  rowKey: string
  name: string
  defaultPageSize?: number
}

function SearchTableRoot<T>({
  children,
  fetchFn,
  rowKey,
  name,
  defaultPageSize,
}: SearchTableProps<T>) {
  return (
    <SearchTableProvider<T>
      fetchFn={fetchFn}
      rowKey={rowKey}
      name={name}
      defaultPageSize={defaultPageSize}
    >
      {children}
    </SearchTableProvider>
  )
}

export const SearchTable = Object.assign(SearchTableRoot, {
  SearchBar,
  Toolbar,
  Table,
  FormModal,
})

export type { SearchTableActions, SearchTableState } from './context'
export { useSearchTable } from './hooks'
