import { Card, Descriptions, Result, Space, Tag, Typography } from 'antd'
import { useAuth } from '@/hooks/use-auth'

const AdminPage = () => {
  const { user, roles, permissions } = useAuth()

  return (
    <Card>
      <Result
        status="success"
        title="Admin Only"
        subTitle="只有 admin 角色可以看到这个页面。"
      />
      <Typography.Title level={5}>当前身份</Typography.Title>
      <Descriptions bordered size="small" column={1}>
        <Descriptions.Item label="用户名">{user?.name}</Descriptions.Item>
        <Descriptions.Item label="角色">
          <Space wrap>
            {roles.map((role) => (
              <Tag color="blue" key={role}>
                {role}
              </Tag>
            ))}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="权限">
          <Space>
            {permissions.map((permission) => (
              <Tag key={permission}>{permission}</Tag>
            ))}
          </Space>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default AdminPage
