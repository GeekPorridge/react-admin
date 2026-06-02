import { delay, HttpResponse, http } from 'msw'
import { chartData } from '../data'

export const dashboardHandlers = [
  http.get('/api/dashboard/stats', async () => {
    await delay(200)

    return HttpResponse.json(
      {
        users: 3200,
        orders: 1940,
        conversionRate: 18.6,
      },
      { status: 200 },
    )
  }),

  http.get('/api/dashboard/chart', async () => {
    await delay(200)

    return HttpResponse.json(chartData, { status: 200 })
  }),
]
