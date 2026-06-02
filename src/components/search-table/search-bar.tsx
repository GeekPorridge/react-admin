import { Button, Form, type FormProps, Space } from 'antd'
import type { ReactNode } from 'react'
import { useSearchTable } from './hooks'

interface SearchBarProps {
  children: ReactNode
  extra?: ReactNode
  formProps?: Omit<FormProps, 'onFinish' | 'children'>
}

export function SearchBar({ children, extra, formProps }: SearchBarProps) {
  const { actions } = useSearchTable()
  const [form] = Form.useForm()

  const handleFinish = (values: Record<string, unknown>) => {
    actions.onSearch(values)
  }

  const handleReset = () => {
    form.resetFields()
    actions.onReset()
  }

  return (
    <Form form={form} layout="inline" onFinish={handleFinish} {...formProps}>
      <Space align="baseline" size="medium" wrap>
        {children}
        <Space>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
          {extra}
        </Space>
      </Space>
    </Form>
  )
}
