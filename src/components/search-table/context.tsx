import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface SearchTableFetchParams {
  page: number
  pageSize: number
  [key: string]: unknown
}

export interface PaginatedResult<T> {
  list: T[]
  total: number
}

export interface SearchTableState<T> {
  data: T[]
  loading: boolean
  filters: Record<string, unknown>
  pagination: { page: number; pageSize: number; total: number }
  selectedRowKeys: React.Key[]
  selectedRows: T[]
  modalOpen: boolean
  editingRecord: T | null
  rowKey: string
}

export interface SearchTableActions<T> {
  onSearch: (values: Record<string, unknown>) => void
  onReset: () => void
  onPageChange: (page: number, pageSize: number) => void
  setSelectedRows: (keys: React.Key[], rows: T[]) => void
  openCreateModal: () => void
  openEditModal: (record: T) => void
  closeModal: () => void
  refresh: () => void
}

interface ContextValue<T> {
  state: SearchTableState<T>
  actions: SearchTableActions<T>
  name: string
}

const context = createContext<ContextValue<unknown> | null>(null)
context.displayName = 'SearchTable'

export const SearchTableContext = context

interface ProviderProps<T> {
  children: ReactNode
  fetchFn: (params: SearchTableFetchParams) => Promise<PaginatedResult<T>>
  rowKey: string
  name: string
  defaultPageSize?: number
}

export function SearchTableProvider<T>({
  children,
  fetchFn,
  rowKey,
  name,
  defaultPageSize = 10,
}: ProviderProps<T>) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<Record<string, unknown>>({})
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: defaultPageSize,
    total: 0,
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<T | null>(null)

  const filtersRef = useRef<Record<string, unknown>>({})
  const paginationRef = useRef(pagination)
  const initialLoaded = useRef(false)

  paginationRef.current = pagination

  const doFetch = useCallback(
    async (f: Record<string, unknown>, page: number, pageSize: number) => {
      setLoading(true)
      const result = await fetchFn({ ...f, page, pageSize })
      setData(result.list)
      setPagination({ page, pageSize, total: result.total })
      setLoading(false)
    },
    [fetchFn],
  )

  useEffect(() => {
    if (initialLoaded.current) {
      return
    }
    initialLoaded.current = true
    doFetch({}, 1, defaultPageSize)
  }, [doFetch, defaultPageSize])

  const onSearch = useCallback(
    (values: Record<string, unknown>) => {
      const cleaned = Object.fromEntries(
        Object.entries(values).filter(
          ([, v]) => v !== '' && v !== undefined && v !== null,
        ),
      )
      filtersRef.current = cleaned
      setFilters(cleaned)
      doFetch(cleaned, 1, paginationRef.current.pageSize)
    },
    [doFetch],
  )

  const onReset = useCallback(() => {
    filtersRef.current = {}
    setFilters({})
    doFetch({}, 1, paginationRef.current.pageSize)
  }, [doFetch])

  const onPageChange = useCallback(
    (page: number, pageSize: number) => {
      doFetch(filtersRef.current, page, pageSize)
    },
    [doFetch],
  )

  const handleSetSelectedRows = useCallback((keys: React.Key[], rows: T[]) => {
    setSelectedRowKeys(keys)
    setSelectedRows(rows)
  }, [])

  const openCreateModal = useCallback(() => {
    setEditingRecord(null)
    setModalOpen(true)
  }, [])

  const openEditModal = useCallback((record: T) => {
    setEditingRecord(record)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingRecord(null)
  }, [])

  const refresh = useCallback(() => {
    doFetch(
      filtersRef.current,
      paginationRef.current.page,
      paginationRef.current.pageSize,
    )
  }, [doFetch])

  const state = useMemo<SearchTableState<T>>(
    () => ({
      data,
      loading,
      filters,
      pagination,
      selectedRowKeys,
      selectedRows,
      modalOpen,
      editingRecord,
      rowKey,
    }),
    [
      data,
      loading,
      filters,
      pagination,
      selectedRowKeys,
      selectedRows,
      modalOpen,
      editingRecord,
      rowKey,
    ],
  )

  const actions = useMemo<SearchTableActions<T>>(
    () => ({
      onSearch,
      onReset,
      onPageChange,
      setSelectedRows: handleSetSelectedRows,
      openCreateModal,
      openEditModal,
      closeModal,
      refresh,
    }),
    [
      onSearch,
      onReset,
      onPageChange,
      handleSetSelectedRows,
      openCreateModal,
      openEditModal,
      closeModal,
      refresh,
    ],
  )

  const value = useMemo<ContextValue<T>>(
    () => ({ state, actions, name }),
    [state, actions, name],
  )

  return (
    <SearchTableContext value={value as ContextValue<unknown>}>
      {children}
    </SearchTableContext>
  )
}
