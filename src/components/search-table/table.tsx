import { Table as AntTable } from 'antd'
import type { ColumnType, TablePaginationConfig } from 'antd/es/table'
import { useSearchTable } from './hooks'

interface TableProps<T> {
  columns: ColumnType<T>[]
  scrollX?: number | string
}

export function Table<T>({ columns, scrollX = 1200 }: TableProps<T>) {
  const { state, actions } = useSearchTable<T>()

  const handleTableChange = (pagination: TablePaginationConfig) => {
    actions.onPageChange(pagination.current ?? 1, pagination.pageSize ?? 10)
  }

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (keys: React.Key[], rows: T[]) => {
      actions.setSelectedRows(keys, rows)
    },
  }

  return (
    <AntTable<T>
      rowKey={state.rowKey}
      columns={columns}
      dataSource={state.data}
      loading={state.loading}
      rowSelection={rowSelection}
      scroll={{ x: scrollX }}
      pagination={{
        current: state.pagination.page,
        pageSize: state.pagination.pageSize,
        total: state.pagination.total,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`,
      }}
      onChange={handleTableChange}
    />
  )
}
