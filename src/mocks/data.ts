export interface MockUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

export const seedUsers: MockUser[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-02-20T10:30:00Z',
  },
  {
    id: '3',
    name: '王五',
    email: 'wangwu@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2025-03-10T14:00:00Z',
  },
  {
    id: '4',
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-04-05T09:15:00Z',
  },
  {
    id: '5',
    name: '孙七',
    email: 'sunqi@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-05-12T16:45:00Z',
  },
  {
    id: '6',
    name: '周八',
    email: 'zhouba@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-06-01T11:20:00Z',
  },
  {
    id: '7',
    name: '吴九',
    email: 'wujiu@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2025-06-18T13:30:00Z',
  },
  {
    id: '8',
    name: '郑十',
    email: 'zhengshi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-07-22T08:50:00Z',
  },
  {
    id: '9',
    name: '冯十一',
    email: 'fengshiyi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-08-08T15:00:00Z',
  },
  {
    id: '10',
    name: '陈十二',
    email: 'chenshier@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-09-14T10:10:00Z',
  },
  {
    id: '11',
    name: '褚十三',
    email: 'chushisan@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2025-10-01T09:30:00Z',
  },
  {
    id: '12',
    name: '卫十四',
    email: 'weishisi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-10-20T12:00:00Z',
  },
]

export const chartData = [
  { month: '1月', users: 1200, orders: 760 },
  { month: '2月', users: 1800, orders: 980 },
  { month: '3月', users: 2400, orders: 1320 },
  { month: '4月', users: 2100, orders: 1180 },
  { month: '5月', users: 2800, orders: 1680 },
  { month: '6月', users: 3200, orders: 1940 },
]
