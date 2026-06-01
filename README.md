# React Admin

极简中后台模板：React 19、TypeScript、React Router v7 Data Router、Ant Design v6、Axios、ag-charts-react。

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Demo Accounts

- `admin`：拥有 `admin` 和 `user` 角色，可访问 `/system/admin`
- 其他用户名：仅拥有 `user` 角色，可访问 Dashboard

## Structure

```text
src/
  components/   # 路由守卫、菜单、面包屑
  context/      # Auth 与 Theme Context
  hooks/        # 业务 Hooks 出口
  layouts/      # 中后台布局
  pages/        # Login、Dashboard、Admin、403、404
  routes/       # 路由配置、Data Router、递归工具
  services/     # Axios 与认证存储
  styles/       # 全局样式
```
