import { Menu, type MenuProps } from 'antd'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppTheme } from '@/hooks/use-app-theme'
import { useAuth } from '@/hooks/use-auth'
import { protectedRoutes } from '@/routes/routes'
import { buildMenuItems, getMenuSelection } from '@/routes/utils'

type MenuItem = NonNullable<MenuProps['items']>[number]

type SidebarMenuProps = {
  collapsed?: boolean
  onNavigate?: () => void
}

const hasChildrenByKey = (items: MenuItem[], key: string): boolean => {
  for (const item of items) {
    if (!item || typeof item !== 'object' || !('key' in item)) {
      continue
    }

    const itemKey = String(item.key)
    const children =
      'children' in item && Array.isArray(item.children)
        ? (item.children as MenuItem[])
        : []

    if (itemKey === key) {
      return children.length > 0
    }

    if (children.length && hasChildrenByKey(children, key)) {
      return true
    }
  }

  return false
}

const SidebarMenu = ({ collapsed, onNavigate }: SidebarMenuProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { roles } = useAuth()
  const { mode } = useAppTheme()
  const [userOpenKeys, setUserOpenKeys] = useState<string[]>([])

  const menuItems = useMemo(
    () => buildMenuItems(protectedRoutes, roles),
    [roles],
  )

  const { selectedKeys, openKeys: matchedOpenKeys } = useMemo(
    () => getMenuSelection(menuItems, location.pathname),
    [location.pathname, menuItems],
  )
  const openKeys = useMemo(
    () =>
      collapsed
        ? []
        : Array.from(new Set([...userOpenKeys, ...matchedOpenKeys])),
    [collapsed, matchedOpenKeys, userOpenKeys],
  )

  return (
    <Menu
      mode="inline"
      theme={mode}
      items={menuItems}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={(keys) => setUserOpenKeys(keys.map(String))}
      onClick={({ key }) => {
        const path = String(key)
        if (hasChildrenByKey(menuItems as MenuItem[], path)) {
          return
        }
        navigate(path)
        onNavigate?.()
      }}
      style={{ borderInlineEnd: 0 }}
    />
  )
}

export default SidebarMenu
