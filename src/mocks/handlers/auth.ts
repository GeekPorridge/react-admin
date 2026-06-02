import { delay, HttpResponse, http } from 'msw'

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await delay(300)

    const body = (await request.json()) as {
      username?: string
      password?: string
    }
    const username = body.username?.trim() ?? ''
    const password = body.password ?? ''

    if (!username || !password) {
      return HttpResponse.json(
        { message: '请输入用户名和密码' },
        { status: 400 },
      )
    }

    const roles = username === 'admin' ? ['admin', 'user'] : ['user']
    const permissions = roles.includes('admin')
      ? ['dashboard:view', 'admin:view']
      : ['dashboard:view']

    const user = {
      id: username,
      name: username,
      roles,
      permissions,
    }

    const token = btoa(`${username}:${Date.now()}`)

    return HttpResponse.json({ token, user }, { status: 200 })
  }),

  http.post('/api/auth/logout', async () => {
    await delay(100)

    return HttpResponse.json({ success: true }, { status: 200 })
  }),
]
