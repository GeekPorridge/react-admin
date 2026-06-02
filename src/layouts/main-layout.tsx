import { theme as antdTheme, Drawer, Grid, Layout } from 'antd'
import { type CSSProperties, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AppBreadcrumb from '@/components/app-breadcrumb'
import LayoutHeader from '@/components/layout-header-module'
import LayoutSider from '@/components/layout-sider-module'
import SidebarMenu from '@/components/sidebar-menu'
import { useAppTheme } from '@/hooks/use-app-theme'
import styles from './index.module.css'

const { Content } = Layout
const { useBreakpoint } = Grid

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { pathname } = location
  const screens = useBreakpoint()
  const { token } = antdTheme.useToken()
  const { mode, toggleTheme } = useAppTheme()
  const isMobile = !screens.md

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
      <LayoutHeader
        mode={mode}
        showMenuTrigger={isMobile}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onToggleTheme={toggleTheme}
      />
      <Layout className={styles.body}>
        {!isMobile && (
          <LayoutSider
            collapsed={collapsed}
            mode={mode}
            onCollapse={setCollapsed}
          />
        )}
        <Content className={styles.content}>
          {pathname !== '/welcome' && (
            <div className={styles.breadcrumb}>
              <AppBreadcrumb />
            </div>
          )}
          <Outlet />
        </Content>
      </Layout>
      <Drawer
        title="React Admin"
        placement="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        classNames={{ body: styles.drawerBody }}
      >
        <SidebarMenu onNavigate={() => setMobileMenuOpen(false)} />
      </Drawer>
    </Layout>
  )
}

export default MainLayout
