import { Card, Col, Row, Statistic, Typography, theme as antdTheme } from "antd";
import { AgCharts } from "ag-charts-react";
import type { AgChartOptions } from "ag-charts-community";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { useAppTheme } from "../hooks/useAppTheme";

const chartData = [
  { month: "Jan", users: 1200, orders: 760 },
  { month: "Feb", users: 1800, orders: 980 },
  { month: "Mar", users: 2400, orders: 1320 },
  { month: "Apr", users: 2100, orders: 1180 },
  { month: "May", users: 2800, orders: 1680 },
  { month: "Jun", users: 3200, orders: 1940 },
];

export function Dashboard() {
  const { mode } = useAppTheme();
  const { token } = antdTheme.useToken();

  const chartOptions = useMemo<AgChartOptions>(
    () => ({
      theme: mode === "dark" ? "ag-default-dark" : "ag-default",
      data: chartData,
      title: {
        text: "业务增长趋势",
      },
      series: [
        {
          type: "bar",
          xKey: "month",
          yKey: "users",
          yName: "新增用户",
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "orders",
          yName: "订单数",
        },
      ],
      legend: {
        position: "bottom",
      },
    }),
    [mode],
  );

  return (
    <SpaceBlock>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        仪表盘
      </Typography.Title>
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
      <Card
        title="ag-charts-react 示例"
        style={{ background: token.colorBgContainer }}
        styles={{ body: { height: 420 } }}
      >
        <AgCharts options={chartOptions} />
      </Card>
    </SpaceBlock>
  );
}

function SpaceBlock({ children }: { children: ReactNode }) {
  return <div style={{ display: "grid", gap: 16 }}>{children}</div>;
}
