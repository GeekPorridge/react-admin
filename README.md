# React Admin

> 极简中后台管理模板 — React 19 + TypeScript + Ant Design v6 + React Router v7

开箱即用，克隆即跑。内置认证鉴权、角色权限、动态路由、搜索表格、图表看板等实用模块，5 分钟内即可开始编写业务代码。

---

## 技术栈

| 类别 | 技术 | 版本 |
|:---|:---|:---|
| 框架 | React | ^19.2 |
| 语言 | TypeScript | ^6.0 |
| UI 库 | Ant Design | ^6.4 |
| 路由 | React Router DOM (Data Router) | ^7.16 |
| 数据请求 | SWR + Axios | ^2.4 / ^1.13 |
| 图表 | ag-charts-react | ^13.3 |
| 构建 | Vite | ^8.0 |
| 代码规范 | Biome (Lint + Format) | ^2.4 |
| Mock | MSW (Mock Service Worker) | ^2.14 |

---

## 快速开始

```bash
# 克隆项目
git clone <repo-url>
cd react-admin

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器自动打开 `http://localhost:3000`，MSW 自动接管 API 请求，无需后端即可体验全部功能。

### 演示账号

| 账号 | 密码 | 角色 | 可访问页面 |
|:---|:---|:---|:---|
| `admin`| admin, user | 全部（含"二级管理页"） |
| 其他用户名 | 任意密码 | user | 欢迎页、表单页、列表页（**不含**二级管理页） |

---

## 目录结构

```
react-admin/
├── index.html                          # Vite 入口 HTML
├── package.json
├── vite.config.ts                      # Vite 配置（@/ 别名、开发服务器）
├── tsconfig.json                       # TypeScript 严格模式
├── biome.json                          # Biome 格式化 + Lint 配置
├── .env.example                        # 环境变量示例
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
└── src/
    ├── main.tsx                        # 应用入口（MSW 启动、模块注册、Provider 层）
    │
    ├── assets/                         # 静态资源（图片、SVG）
    │
    ├── components/                     # 公共组件
    │   ├── search-table/               # 通用搜索表格复合组件
    │   │   ├── index.tsx               #   SearchTable（根组件 + Object.assign 复合）
    │   │   ├── search-bar.tsx          #   SearchTable.SearchBar（搜索表单）
    │   │   ├── table.tsx               #   SearchTable.Table（数据表格）
    │   │   ├── toolbar.tsx             #   SearchTable.Toolbar（批量操作栏）
    │   │   ├── form-modal.tsx          #   SearchTable.FormModal（新增/编辑弹窗）
    │   │   ├── context.tsx             #   内部状态 Context
    │   │   └── hooks.ts                #   useSearchTable<T>() 泛型 Hook
    │   │
    │   ├── charts/                     # 图表复合组件
    │   │   ├── index.tsx               #   Charts.Pie / Charts.Bar / Charts.Line
    │   │   └── index.module.css
    │   │
    │   ├── layout-header-module/       # 顶部 Header（主题切换、用户菜单）
    │   ├── layout-sider-module/        # 侧边栏 Sider（可折叠）
    │   ├── app-breadcrumb.tsx          # 面包屑导航
    │   ├── sidebar-menu.tsx            # 侧边栏菜单（角色过滤 + 折叠适配）
    │   └── protected-route.tsx         # 路由守卫（认证 + 角色）
    │
    ├── context/                        # React Context
    │   ├── auth-context.tsx            #   AuthProvider（登录/登出、Token 管理）
    │   └── theme-context.tsx           #   ThemeProvider（亮色/暗色主题切换）
    │
    ├── hooks/                          # 自定义 Hooks
    │   ├── use-swr.ts                  #   useApi<T>() / useApiMutation() SWR 封装
    │   ├── use-app-theme.ts            #   主题 Hook
    │   ├── use-auth.ts                 #   认证 Hook
    │   └── use-form-submit.ts          #   表单提交 Hook
    │
    ├── layouts/
    │   ├── main-layout.tsx             # 主布局（Sider + Header + Content）
    │   └── index.module.css            # 布局样式（响应式断点、CSS 变量）
    │
    ├── mocks/                          # MSW Mock 服务
    │   ├── data.ts                     #   种子数据（12 个用户 + 图表数据 3 套）
    │   ├── handlers/
    │   │   ├── auth.ts                 #   登录/登出 Mock
    │   │   ├── dashboard.ts            #   仪表盘统计 + 图表 Mock
    │   │   ├── list.ts                 #   用户列表 CRUD Mock（内存可变数组）
    │   │   └── index.ts                #   handlers 聚合导出
    │   ├── browser.ts                  #   浏览器端 MSW Worker
    │   └── server.ts                   #   服务端 MSW Server（预留）
    │
    ├── pages/                          # 页面组件（路由级懒加载）
    │   ├── login/                      #   登录页（渐变背景、记住重定向目标）
    │   ├── dashboard/                  #   欢迎页/仪表盘（统计卡片 + 饼图 + 柱状图 + 折线图）
    │   ├── form/
    │   │   └── basic-form.tsx          #   基础表单页（校验、提交反馈）
    │   ├── list/
    │   │   └── user-list.tsx           #   用户列表页（搜索 + 表格 + CRUD）
    │   ├── admin/
    │   │   └── index.tsx               #   二级管理页（仅 admin 角色可访问）
    │   ├── forbidden/index.tsx         #   403 禁止访问页
    │   └── not-found/index.tsx         #   404 页面不存在
    │
    ├── routes/                         # 路由系统
    │   ├── paths.ts                    #   路径常量（PATHS.LOGIN / HOME / FORBIDDEN）
    │   ├── types.ts                    #   AppRouteObject 类型定义
    │   ├── routes.tsx                  #   受保护路由树（嵌套、角色、图标）
    │   ├── router.tsx                  #   createBrowserRouter 实例
    │   └── utils.tsx                   #   路由工具（转标准路由、构建菜单、菜单选中计算）
    │
    ├── services/                       # API 服务层
    │   ├── api.ts                      #   所有 API 函数（类型安全、.then(res=>res.data)）
    │   ├── auth-storage.ts             #   Token/User localStorage 读写 + 类型守卫
    │   └── http.ts                     #   Axios 实例 + 拦截器（Token 注入、401 处理）
    │
    └── styles/
        └── global.css                  # CSS 变量、全局重置、系统字体栈
```

---

## 功能特性

### 认证与鉴权

- **登录/登出**：Token 自动存储到 localStorage，请求拦截器自动注入 `Authorization` 头
- **会话过期**：401 响应自动清空本地会话并跳转登录页，通过自定义 `SESSION_EXPIRED_EVENT` 解耦合
- **运行时验证**：`isAuthUser()` 类型守卫对 localStorage 数据进行结构校验

### 角色权限

| 层级 | 机制 | 说明 |
|:---|:---|:---|
| 路由守卫 | `ProtectedRoute` 组件 | 未认证 → 登录页；无权限 → 403 页；记住重定向目标 |
| 菜单过滤 | `buildMenuItems()` | 根据用户角色动态过滤侧边栏菜单，父菜单无可见子项时自动隐藏 |
| 页面组件 | `AppRouteObject.roles` | 路由配置声明 `roles: ['admin']`，框架自动包裹守卫 |

### 布局系统

```
┌─────────────────────────────────────────┐
│  Header  (主题切换 / 用户头像 / 退登)      │
├───────────┬─────────────────────────────┤
│  Sider    │  Breadcrumb                  │
│  可折叠   ├─────────────────────────────┤
│  角色菜单 │  Content                     │
│           │    <Outlet />                │
│           │                             │
└───────────┴─────────────────────────────┘
```

- **桌面端**：侧边栏可折叠（208px / 64px），`position: sticky` 跟随滚动
- **移动端**（<768px）：侧边栏隐藏，Header 显示汉堡菜单 → 弹出 `Drawer`
- 面包屑在欢迎页自动隐藏，移动端自动隐藏

### 搜索表格 (SearchTable)

复合组件模式，开箱即用的列表 CRUD 解决方案：

```tsx
<SearchTable<UserItem> fetchFn={...} rowKey="id" name="用户">
  <SearchTable.SearchBar>
    <Form.Item name="keyword" label="关键字"><Input /></Form.Item>
  </SearchTable.SearchBar>
  <SearchTable.Toolbar />
  <SearchTable.Table columns={columns} />
  <SearchTable.FormModal onSave={handleSave}>
    <Form.Item name="name" label="姓名"><Input /></Form.Item>
  </SearchTable.FormModal>
</SearchTable>
```

- 自动管理分页、搜索、选中、弹窗状态
- 搜索重置自动清理空值
- 内置 `useSearchTable<T>()` 泛型 Hook

### 图表组件 (Charts)

基于 `ag-charts-react` 封装，自动适配亮/暗主题：

```tsx
// 饼图
<Charts.Pie
  data={[{ label: '直接访问', value: 335 }, ...]}
  title="渠道来源分布"
  height={350}
/>

// 柱状图
<Charts.Bar
  data={barData}
  xKey="month"
  series={[{ yKey: 'users', yName: '新增用户' }, { yKey: 'orders', yName: '订单数' }]}
/>

// 折线图
<Charts.Line
  data={lineData}
  xKey="month"
  series={[{ yKey: 'revenue', yName: '收入' }, { yKey: 'cost', yName: '成本' }]}
/>
```

---

## Mock 系统

项目使用 **MSW (Mock Service Worker)** 在浏览器层拦截请求，无需后端即可开发：

| 端点 | 方法 | 说明 |
|:---|:---|:---|
| `/api/auth/login` | POST | 登录验证（admin 账号返回 admin+user 双角色） |
| `/api/auth/logout` | POST | 退出登录 |
| `/api/dashboard/stats` | GET | 仪表盘统计数据 |
| `/api/dashboard/chart` | GET | 柱状图数据（6 个月） |
| `/api/dashboard/pie` | GET | 饼图数据（5 个渠道） |
| `/api/dashboard/line` | GET | 折线图数据（收入/成本趋势） |
| `/api/users` | GET / POST | 用户列表（分页+搜索）+ 创建 |
| `/api/users/:id` | GET / PUT / DELETE | 用户详情 / 编辑 / 删除 |

Mock 仅在 `import.meta.env.DEV` 时启用，生产构建不会包含 MSW 代码。切换后端只需修改 `VITE_API_BASE_URL` 环境变量。

---

## 可用脚本

```bash
npm run dev          # 启动开发服务器 (http://localhost:3000)
npm run build        # 类型检查 → 生产构建
npm run preview      # 预览生产构建产物
npm run lint         # Biome 代码检查
npm run format       # Biome 代码格式化
npm run check        # Biome 检查 + 格式化检查
```

---

## 开发指南

### 添加新页面

1. 在 `src/pages/` 下创建页面组件
2. 在 [src/routes/routes.tsx](file:///Users/zhouyang/Desktop/react-admin/src/routes/routes.tsx) 中添加路由配置
3. 如需要 Mock 数据，在 [src/mocks/handlers/](file:///Users/zhouyang/Desktop/react-admin/src/mocks/handlers/) 添加 handler

### 添加新 API

1. 在 [src/services/api.ts](file:///Users/zhouyang/Desktop/react-admin/src/services/api.ts) 添加函数和类型
2. 在 [src/mocks/handlers/](file:///Users/zhouyang/Desktop/react-admin/src/mocks/handlers/) 添加对应 handler
3. 页面中通过 `useApi<T>(endpoint)` 获取数据

### 切换后端

修改 `.env` 文件（参考 `.env.example`）：

```env
VITE_API_BASE_URL=https://your-api-server.com/api
```

### 主题定制

全局 CSS 变量定义在 [src/styles/global.css](file:///Users/zhouyang/Desktop/react-admin/src/styles/global.css)，Ant Design 主题令牌通过 `ConfigProvider` 注入（见 [src/main.tsx](file:///Users/zhouyang/Desktop/react-admin/src/main.tsx)）。

---

## 设计原则

| 原则 | 实践 |
|:---|:---|
| **极简优先** | 无 Redux/Zustand，2 个 Context 搞定状态；无 i18n/SSR/微前端 |
| **复合组件** | `SearchTable` 和 `Charts` 使用 `Object.assign` 模式，避免布尔值 props 膨胀 |
| **关注点分离** | 路由配置/工具函数/组件分别独立文件，单一职责 |
| **类型安全** | TypeScript strict 模式 + 运行时类型守卫 (`isAuthUser`) |
| **渐进式** | 可在当前架构上直接添加状态库、测试框架、CI/CD |

---