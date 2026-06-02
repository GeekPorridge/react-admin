import { Layout } from 'antd'
import SidebarMenu from '../sidebar-menu'
import styles from './index.module.css'

const { Sider } = Layout

interface LayoutSiderProps {
  collapsed: boolean
  mode: 'light' | 'dark'
  onCollapse: (collapsed: boolean) => void
}

const LayoutSider = ({ collapsed, mode, onCollapse }: LayoutSiderProps) => {
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
      <SidebarMenu collapsed={collapsed} />
    </Sider>
  )
}

export default LayoutSider
