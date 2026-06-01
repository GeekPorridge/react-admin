import { Layout } from 'antd'
import { SidebarMenu } from '../sidebar-menu/sidebar-menu'
import styles from './layout-sider.module.css'

const { Sider } = Layout

interface LayoutSiderProps {
  collapsed: boolean
  mode: 'light' | 'dark'
  onCollapse: (collapsed: boolean) => void
}

export function LayoutSider({ collapsed, mode, onCollapse }: LayoutSiderProps) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      theme={mode}
      className={styles.sider}
      width={208}
      collapsedWidth={64}
      onCollapse={onCollapse}
    >
      <SidebarMenu />
    </Sider>
  )
}
