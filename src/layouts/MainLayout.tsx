import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons'
import {
  Button,
  Layout,
  Space,
  Switch,
  Typography,
  theme as antdTheme,
} from 'antd'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBreadcrumb } from '../components/AppBreadcrumb'
import { SidebarMenu } from '../components/SidebarMenu'
import { useAuth } from '../hooks/useAuth'
import { useAppTheme } from '../hooks/useAppTheme'

const { Header, Sider, Content } = Layout

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = antdTheme.useToken()
  const { mode, toggleTheme } = useAppTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <Sider
        collapsed={collapsed}
        theme={mode}
        style={{ borderInlineEnd: `1px solid ${token.colorBorderSecondary}` }}
      >
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: mode === 'dark' ? '#fff' : token.colorText,
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          {collapsed ? 'RA' : 'React Admin'}
        </div>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Header
          style={{
            height: 56,
            paddingInline: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Space size={16}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((value) => !value)}
            />
            <AppBreadcrumb />
          </Space>
          <Space size={16}>
            <Switch
              checked={mode === 'dark'}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              onChange={toggleTheme}
            />
            <Typography.Text>{user?.name}</Typography.Text>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              退出
            </Button>
          </Space>
        </Header>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
