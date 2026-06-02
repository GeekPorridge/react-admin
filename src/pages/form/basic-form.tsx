import { MailOutlined, UserOutlined } from '@ant-design/icons'
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Switch,
} from 'antd'
import type { Dayjs } from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useFormSubmit } from '@/hooks/use-form-submit'
import { PATHS } from '@/routes/paths'

interface FormValues {
  name: string
  email: string
  gender: string
  role: string
  status: boolean
  birthday: Dayjs
  description: string
}

const submitMock = (_values: FormValues) =>
  new Promise<{ id: string }>((resolve) =>
    setTimeout(() => resolve({ id: Date.now().toString() }), 500),
  )

const BasicForm = () => {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const [form] = Form.useForm<FormValues>()

  const { run, loading } = useFormSubmit<FormValues, { id: string }>({
    onSubmit: submitMock,
    onSuccess: () => {
      message.success('提交成功')
      form.resetFields()
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  return (
    <Card>
      <Form<FormValues>
        form={form}
        layout="vertical"
        initialValues={{ status: true }}
        onFinish={run}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入姓名" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: '请选择性别' }]}
            >
              <Radio.Group>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
                <Radio value="other">其他</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="role"
              label="角色"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Select placeholder="请选择角色">
                <Select.Option value="admin">管理员</Select.Option>
                <Select.Option value="editor">编辑</Select.Option>
                <Select.Option value="viewer">访客</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="birthday"
              label="生日"
              rules={[{ required: true, message: '请选择生日' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="请选择生日" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="status" label="状态" valuePropName="checked">
              <Switch checkedChildren="启用" unCheckedChildren="禁用" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="description" label="备注">
              <Input.TextArea rows={4} placeholder="请输入备注信息" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
            <Button onClick={() => navigate(PATHS.HOME)}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default BasicForm
