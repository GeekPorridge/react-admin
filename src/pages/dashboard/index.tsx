import type { AgChartOptions } from 'ag-charts-community'
import { AgCharts } from 'ag-charts-react'
import { Card, Col, Row, Statistic } from 'antd'
import { useMemo } from 'react'
import { useAppTheme } from '@/hooks/use-app-theme'
import styles from './index.module.css'

const chartData = [
  { month: 'Jan', users: 1200, orders: 760 },
  { month: 'Feb', users: 1800, orders: 980 },
  { month: 'Mar', users: 2400, orders: 1320 },
  { month: 'Apr', users: 2100, orders: 1180 },
  { month: 'May', users: 2800, orders: 1680 },
  { month: 'Jun', users: 3200, orders: 1940 },
]

const Dashboard = () => {
  const { mode } = useAppTheme()

  const chartOptions = useMemo<AgChartOptions>(
    () => ({
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
    }),
    [mode],
  )

  return (
    <div className={styles.stack}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="新增用户" value={3200} suffix="人" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="订单数" value={1940} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="转化率" value={18.6} precision={1} suffix="%" />
          </Card>
        </Col>
      </Row>
      <Card title="ag-charts-react 示例">
        <div className={styles.chartBody}>
          <AgCharts options={chartOptions} />
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
