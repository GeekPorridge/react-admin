import type { AgChartOptions } from 'ag-charts-community'
import { AgCharts } from 'ag-charts-react'
import { useAppTheme } from '@/hooks/use-app-theme'

function useChartTheme() {
  const { mode } = useAppTheme()
  return mode === 'dark' ? 'ag-default-dark' : 'ag-default'
}

interface PieChartProps {
  data: { label: string; value: number }[]
  title?: string
  height?: number
}

function PieChart({ data, title, height = 420 }: PieChartProps) {
  const theme = useChartTheme()
  return (
    <AgCharts
      options={{
        theme,
        data,
        title: title ? { text: title } : undefined,
        series: [
          {
            type: 'pie',
            angleKey: 'value',
            calloutLabelKey: 'label',
            sectorLabelKey: 'value',
            sectorLabel: {
              color: 'white',
              fontWeight: 'bold',
            },
          },
        ],
        legend: {
          position: 'bottom',
        },
        height,
      } as unknown as AgChartOptions}
    />
  )
}

interface AxisSeriesConfig {
  yKey: string
  yName?: string
}

interface AxisChartProps {
  data: object[]
  xKey: string
  series: AxisSeriesConfig[]
  title?: string
  height?: number
}

function BarChart({ data, xKey, series, title, height = 420 }: AxisChartProps) {
  const theme = useChartTheme()
  const options: AgChartOptions = {
    theme,
    data,
    title: title ? { text: title } : undefined,
    series: series.map((s) => ({
      type: 'bar' as const,
      xKey,
      yKey: s.yKey,
      yName: s.yName,
    })),
    legend: {
      position: 'bottom',
    },
    height,
  }
  return <AgCharts options={options} />
}

function LineChart({ data, xKey, series, title, height = 420 }: AxisChartProps) {
  const theme = useChartTheme()
  const options: AgChartOptions = {
    theme,
    data,
    title: title ? { text: title } : undefined,
    series: series.map((s) => ({
      type: 'line' as const,
      xKey,
      yKey: s.yKey,
      yName: s.yName,
    })),
    legend: {
      position: 'bottom',
    },
    height,
  }
  return <AgCharts options={options} />
}

const ChartsRoot = () => null

export const Charts = Object.assign(ChartsRoot, {
  Pie: PieChart,
  Bar: BarChart,
  Line: LineChart,
})
