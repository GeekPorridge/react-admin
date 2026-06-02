import { Button, Flex, Popconfirm, Space } from 'antd'
import type { ReactNode } from 'react'
import { useSearchTable } from './hooks'

interface ToolbarProps {
  children?: ReactNode
  hideCreate?: boolean
  showDelete?: boolean
  onBatchDelete?: (records: unknown[]) => Promise<void>
}

export function Toolbar({
  children,
  hideCreate,
  showDelete,
  onBatchDelete,
}: ToolbarProps) {
  const { state, actions, name } = useSearchTable()

  return (
    <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
      <Space>
        {!hideCreate && (
          <Button type="primary" onClick={actions.openCreateModal}>
            新增{name}
          </Button>
        )}
        {showDelete && onBatchDelete && state.selectedRowKeys.length > 0 && (
          <Popconfirm
            title={`确定删除选中的 ${state.selectedRowKeys.length} 条记录吗？`}
            onConfirm={() => onBatchDelete(state.selectedRows)}
          >
            <Button danger>批量删除</Button>
          </Popconfirm>
        )}
      </Space>
      <Space>{children}</Space>
    </Flex>
  )
}
