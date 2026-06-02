import type { AgChartOptions } from 'ag-charts-community'
import { AgCharts } from 'ag-charts-react'
import { Card, Col, Row, Skeleton, Statistic } from 'antd'
import { useMemo } from 'react'
import { useAppTheme } from '@/hooks/use-app-theme'
import { useApi } from '@/hooks/use-swr'
import styles from './index.module.css'

interface DashboardStats {
  users: number
  orders: number
  conversionRate: number
}

interface ChartItem {
  month: string
  users: number
  orders: number
}

const Dashboard = () => {
  const { mode } = useAppTheme()
  const { data: stats, isLoading: statsLoading } =
    useApi<DashboardStats>('/dashboard/stats')
  const { data: chartData, isLoading: chartLoading } =
    useApi<ChartItem[]>('/dashboard/chart')

  const chartOptions = useMemo<AgChartOptions | null>(() => {
    if (!chartData) {
      return null
    }

    return {
      theme: mode === 'dark' ? 'ag-default-dark' : 'ag-default',
      data: chartData,
      title: {
        text: '业务增长趋势',
      },
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'users',
          yName: '新增用户',
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'orders',
          yName: '订单数',
        },
      ],
      legend: {
        position: 'bottom',
      },
    }
  }, [mode, chartData])

  return (
    <div className={styles.stack}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            {statsLoading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <Statistic
                title="新增用户"
                value={stats?.users ?? 0}
                suffix="人"
              />
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            {statsLoading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <Statistic title="订单数" value={stats?.orders ?? 0} />
            )}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            {statsLoading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <Statistic
                title="转化率"
                value={stats?.conversionRate ?? 0}
                precision={1}
                suffix="%"
              />
            )}
          </Card>
        </Col>
      </Row>
      <Card title="ag-charts-react 示例">
        <div className={styles.chartBody}>
          {chartLoading || !chartOptions ? (
            <Skeleton active />
          ) : (
            <AgCharts options={chartOptions} />
          )}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
