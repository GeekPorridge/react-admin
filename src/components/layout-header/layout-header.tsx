import {
  LogoutOutlined,
  MenuFoldOutlined,
  MoonOutlined,
  SettingFilled,
  SkinFilled,
  SunOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Dropdown, Flex, Layout, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth'
import { PATHS } from '../../routes/paths'
import styles from './layout-header.module.css'

const { Header } = Layout

interface LayoutHeaderProps {
  mode: 'light' | 'dark'
  showMenuTrigger: boolean
  onOpenMobileMenu: () => void
  onToggleTheme: () => void
}

export function LayoutHeader({
  mode,
  showMenuTrigger,
  onOpenMobileMenu,
  onToggleTheme,
}: LayoutHeaderProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleMenuItemClick: MenuProps['onClick'] = (event) => {
    if (event.key === 'logout') {
      logout()
      navigate(PATHS.login, { replace: true })
    }
  }

  const userMenuItems: MenuProps['items'] = [
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

  return (
    <Header className={styles.header}>
      <Space className={styles.headerStart}>
        {showMenuTrigger && (
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            onClick={onOpenMobileMenu}
            className={styles.trigger}
            aria-label="打开菜单"
          />
        )}
        <Flex className={styles.brand} align="center" justify="left">
          React Admin
        </Flex>
      </Space>
      <Space size={24} className={styles.headerActions}>
        <Flex align="center" justify="center">
          <Button
            type="text"
            onClick={onToggleTheme}
            icon={mode === 'dark' ? <MoonOutlined /> : <SunOutlined />}
            aria-label="切换主题"
          />
        </Flex>
        <Dropdown
          menu={{ items: userMenuItems, onClick: handleMenuItemClick }}
          placement="bottomRight"
          arrow
        >
          <Flex align="center" justify="center">
            <Button type="text">
              <Avatar
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                shape="square"
                size={28}
              />
              <span className={styles.userName}>{user?.name}</span>
            </Button>
          </Flex>
        </Dropdown>
      </Space>
    </Header>
  )
}
