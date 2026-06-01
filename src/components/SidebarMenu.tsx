import { Menu } from "antd";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { protectedRoutes } from "../routes/routes";
import { buildMenuItems, getMenuSelection } from "../routes/utils";
import { useAppTheme } from "../hooks/useAppTheme";

export function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roles } = useAuth();
  const { mode } = useAppTheme();
  const [userOpenKeys, setUserOpenKeys] = useState<string[]>([]);

  const menuItems = useMemo(() => buildMenuItems(protectedRoutes, roles), [roles]);

  const { selectedKeys, openKeys: matchedOpenKeys } = useMemo(
    () => getMenuSelection(menuItems, location.pathname),
    [location.pathname, menuItems],
  );
  const openKeys = useMemo(
    () => Array.from(new Set([...userOpenKeys, ...matchedOpenKeys])),
    [matchedOpenKeys, userOpenKeys],
  );

  return (
    <Menu
      mode="inline"
      theme={mode}
      items={menuItems}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={(keys) => setUserOpenKeys(keys.map(String))}
      onClick={({ key }) => navigate(key)}
      style={{ borderInlineEnd: 0 }}
    />
  );
}
