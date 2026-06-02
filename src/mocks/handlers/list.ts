import { delay, HttpResponse, http } from 'msw'
import { type MockUser, seedUsers } from '../data'

let users = seedUsers.map((u) => ({ ...u }))
let nextId = users.length + 1

const cloneUser = (u: MockUser): MockUser => ({ ...u })

export const resetUsers = () => {
  users = seedUsers.map((u) => ({ ...u }))
  nextId = users.length + 1
}

export const listHandlers = [
  http.get('/api/users', async ({ request }) => {
    await delay(300)

    const url = new URL(request.url)
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
    const pageSize = Math.max(
      1,
      Math.min(100, Number(url.searchParams.get('pageSize')) || 10),
    )
    const keyword = (url.searchParams.get('keyword') ?? '').trim().toLowerCase()

    let filtered = users.map(cloneUser)

    if (keyword) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(keyword) ||
          u.email.toLowerCase().includes(keyword),
      )
    }

    const total = filtered.length
    const start = (page - 1) * pageSize
    const list = filtered.slice(start, start + pageSize)

    return HttpResponse.json({ list, total, page, pageSize }, { status: 200 })
  }),

  http.get('/api/users/:id', async ({ params }) => {
    await delay(200)

    const user = users.find((u) => u.id === params.id)

    if (!user) {
      return HttpResponse.json({ message: '用户不存在' }, { status: 404 })
    }

    return HttpResponse.json(cloneUser(user), { status: 200 })
  }),

  http.post('/api/users', async ({ request }) => {
    await delay(300)

    const body = (await request.json()) as Partial<MockUser>

    if (!body.name?.trim() || !body.email?.trim()) {
      return HttpResponse.json(
        { message: '姓名和邮箱不能为空' },
        { status: 400 },
      )
    }

    const newUser: MockUser = {
      id: String(nextId),
      name: body.name.trim(),
      email: body.email.trim(),
      role: body.role ?? 'user',
      status: body.status ?? 'active',
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    nextId += 1

    return HttpResponse.json(cloneUser(newUser), { status: 201 })
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    await delay(300)

    const index = users.findIndex((u) => u.id === params.id)

    if (index === -1) {
      return HttpResponse.json({ message: '用户不存在' }, { status: 404 })
    }

    const body = (await request.json()) as Partial<MockUser>

    if (body.name !== undefined && !body.name.trim()) {
      return HttpResponse.json({ message: '姓名不能为空' }, { status: 400 })
    }

    const updated = {
      ...users[index],
      ...(body.name !== undefined && { name: body.name.trim() }),
      ...(body.email !== undefined && { email: body.email.trim() }),
      ...(body.role !== undefined && { role: body.role }),
      ...(body.status !== undefined && { status: body.status }),
    }

    users[index] = updated

    return HttpResponse.json(cloneUser(updated), { status: 200 })
  }),

  http.delete('/api/users/:id', async ({ params }) => {
    await delay(200)

    const index = users.findIndex((u) => u.id === params.id)

    if (index === -1) {
      return HttpResponse.json({ message: '用户不存在' }, { status: 404 })
    }

    users.splice(index, 1)

    return HttpResponse.json({ success: true }, { status: 200 })
  }),
]
