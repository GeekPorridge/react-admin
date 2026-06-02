import {
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { App, Button, Card, Form, Input, Popconfirm, Space, Tag } from 'antd'
import type { ColumnType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { SearchTable, useSearchTable } from '@/components/search-table'
import type {
  PaginatedResult,
  SearchTableFetchParams,
} from '@/components/search-table/context'
import {
  createUser,
  deleteUser,
  fetchUserList,
  type UserItem,
  updateUser,
} from '@/services/api'

const UserList = () => {
  const fetchFn = (
    params: SearchTableFetchParams,
  ): Promise<PaginatedResult<UserItem>> =>
    fetchUserList({
      page: params.page,
      pageSize: params.pageSize,
      keyword: params.keyword as string | undefined,
    })

  const handleCreate = (values: Record<string, unknown>) =>
    createUser(values as Partial<UserItem>).then(() => undefined)

  const handleUpdate = (id: string, values: Record<string, unknown>) =>
    updateUser(id, values as Partial<UserItem>).then(() => undefined)

  return (
    <SearchTable<UserItem>
      fetchFn={fetchFn}
      rowKey="id"
      name="用户"
      defaultPageSize={10}
    >
      <Card>
        <SearchTable.SearchBar extra={<CreateButton />}>
          <Form.Item name="keyword">
            <Input
              placeholder="搜索姓名或邮箱"
              prefix={<MailOutlined />}
              allowClear
            />
          </Form.Item>
        </SearchTable.SearchBar>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <SearchTable.Toolbar hideCreate />
        <UserTable />
      </Card>

      <SearchTable.FormModal<UserItem>
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
        </Form.Item>
      </SearchTable.FormModal>
    </SearchTable>
  )
}

const CreateButton = () => {
  const { actions, name } = useSearchTable()

  return (
    <Button type="primary" onClick={actions.openCreateModal}>
      新增{name}
    </Button>
  )
}

const UserTable = () => {
  const columns: ColumnType<UserItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'blue' : 'default'}>{role}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (v: string) => dayjs(v).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const { actions } = useSearchTable<UserItem>()
  const { message } = App.useApp()

  const handleDelete = useCallback(
    async (record: UserItem) => {
      await deleteUser(record.id)
      message.success('删除成功')
      actions.refresh()
    },
    [message, actions],
  )

  const fullColumns: ColumnType<UserItem>[] = [
    ...columns,
    {
      title: '操作',
      key: 'action',
      fixed: 'right' as const,
      render: (_: unknown, record: UserItem) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => actions.openEditModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该用户吗？"
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return <SearchTable.Table<UserItem> columns={fullColumns} scrollX={1200} />
}

export default UserList
