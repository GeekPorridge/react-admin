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
import { useState, type CSSProperties } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBreadcrumb } from '../components/AppBreadcrumb'
import { SidebarMenu } from '../components/SidebarMenu'
import { useAuth } from '../hooks/useAuth'
import { useAppTheme } from '../hooks/useAppTheme'
import { PATHS } from '../routes/paths'
import styles from './MainLayout.module.css'

const { Header, Sider, Content } = Layout

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { token } = antdTheme.useToken()
  const { mode, toggleTheme } = useAppTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(PATHS.login, { replace: true })
  }

  return (
    <Layout
      className={styles.root}
      style={
        {
          '--layout-bg': token.colorBgLayout,
          '--border-secondary': token.colorBorderSecondary,
          '--header-bg': token.colorBgContainer,
          '--brand-color': mode === 'dark' ? '#fff' : token.colorText,
        } as CSSProperties
      }
    >
      <Sider collapsed={collapsed} theme={mode} className={styles.sider}>
        <div className={styles.brand}>RA</div>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Header className={styles.header}>
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
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
