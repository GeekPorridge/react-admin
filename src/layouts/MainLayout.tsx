import {
  LogoutOutlined,
  MoonOutlined,
  SettingFilled,
  SkinFilled,
  SunOutlined,
} from '@ant-design/icons'
import {
  theme as antdTheme,
  Button,
  Drawer,
  Grid,
  Layout,
  Space,
  Avatar,
  Dropdown,
  Flex,
} from 'antd'
import { type CSSProperties, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AppBreadcrumb } from '../components/AppBreadcrumb'
import { SidebarMenu } from '../components/SidebarMenu'
import { useAppTheme } from '../hooks/useAppTheme'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../routes/paths'
import styles from './MainLayout.module.css'
import { MenuProps } from 'antd/lib/menu'

const { Header, Sider, Content } = Layout
const { useBreakpoint } = Grid

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const screens = useBreakpoint()
  const { token } = antdTheme.useToken()
  const { mode, toggleTheme } = useAppTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isMobile = !screens.md

  const handleMenuItemClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      logout()
      navigate(PATHS.login, { replace: true })
    }
  }

  const suppMenuItems: MenuProps['items'] = [
    {
      key: 'personal',
      label: '个人设置',
      icon: <SettingFilled />,
    },
    {
      key: 'theme',
      label: '主题设置',
      icon: <SkinFilled />,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
    },
  ]

  const suppMenuProps = {
    items: suppMenuItems,
    onClick: handleMenuItemClick,
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
      <Header className={styles.header}>
        <Space className={styles.headerStart}>
          <Flex className={styles.brand} align="center" justify="center">
            React Admin
          </Flex>
        </Space>
        <Space size={24} className={styles.headerActions}>
          <Flex align="center" justify="center">
            <Button type="text" onClick={toggleTheme}>
              {mode === 'dark' ? <MoonOutlined /> : <SunOutlined />}
            </Button>
          </Flex>
          <Dropdown
            menu={suppMenuProps}
            placement="bottomRight"
            arrow
            key="dropdown"
          >
            <Flex align="center" justify="center">
              <Button type="text">
                <Avatar
                  src={
                    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                  }
                  shape="square"
                  size={28}
                />
                {}
                {user?.name}
              </Button>
            </Flex>
          </Dropdown>
        </Space>
      </Header>
      <Layout className={styles.body}>
        {!isMobile && (
          <Sider
            collapsible
            collapsed={collapsed}
            theme={mode}
            className={styles.sider}
            width={208}
            collapsedWidth={64}
            onCollapse={(value) => setCollapsed(value)}
          >
            <SidebarMenu />
          </Sider>
        )}
        <Content className={styles.content}>
          <div className={styles.breadcrumb}>
            <AppBreadcrumb />
          </div>
          <Outlet />
        </Content>
      </Layout>
      <Drawer
        title="React Admin"
        placement="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        width={280}
        classNames={{ body: styles.drawerBody }}
      >
        <SidebarMenu onNavigate={() => setMobileMenuOpen(false)} />
      </Drawer>
    </Layout>
  )
}
