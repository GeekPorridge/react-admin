import { Card, Col, Row, Skeleton, Statistic } from 'antd'
import { useApi } from '@/hooks/use-swr'
import { Charts } from '@/components/charts'
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

interface PieItem {
  label: string
  value: number
}

interface LineItem {
  month: string
  revenue: number
  cost: number
}

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } =
    useApi<DashboardStats>('/dashboard/stats')
  const { data: barData, isLoading: barLoading } =
    useApi<ChartItem[]>('/dashboard/chart')
  const { data: pieData, isLoading: pieLoading } =
    useApi<PieItem[]>('/dashboard/pie')
  const { data: lineData, isLoading: lineLoading } =
    useApi<LineItem[]>('/dashboard/line')

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

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="渠道来源分布">
            <div className={styles.chartBody}>
              {pieLoading || !pieData ? (
                <Skeleton active />
              ) : (
                <Charts.Pie
                  data={pieData}
                  height={350}
                />
              )}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="营收趋势">
            <div className={styles.chartBody}>
              {lineLoading || !lineData ? (
                <Skeleton active />
              ) : (
                <Charts.Line
                  data={lineData}
                  xKey="month"
                  series={[
                    { yKey: 'revenue', yName: '收入' },
                    { yKey: 'cost', yName: '成本' },
                  ]}
                  height={350}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="业务增长趋势">
            <div className={styles.chartBody}>
              {barLoading || !barData ? (
                <Skeleton active />
              ) : (
                <Charts.Bar
                  data={barData}
                  xKey="month"
                  series={[
                    { yKey: 'users', yName: '新增用户' },
                    { yKey: 'orders', yName: '订单数' },
                  ]}
                  height={350}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
