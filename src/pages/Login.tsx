import {
  LockOutlined,
  QuestionCircleTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import {
  theme as antdTheme,
  Button,
  Card,
  Flex,
  Form,
  Input,
  message,
  Tooltip,
  Typography,
} from 'antd'
import { type CSSProperties, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { useAuth } from '../hooks/useAuth'
import { PATHS } from '../routes/paths'
import styles from './Login.module.css'

interface LoginValues {
  username: string
  password: string
}

interface RedirectState {
  from?: {
    pathname?: string
  }
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const { token } = antdTheme.useToken()
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectState = location.state as RedirectState | null
  const from = redirectState?.from?.pathname ?? PATHS.dashboard

  if (auth.isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const handleFinish = async (values: LoginValues) => {
    setLoading(true)

    try {
      await auth.login(values)
      message.success('登录成功')
      navigate(from, { replace: true })
    } catch (error) {
      message.error(error instanceof Error ? error.message : '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <Card
        className={styles.card}
        style={
          { '--login-card-shadow': token.boxShadowSecondary } as CSSProperties
        }
        styles={{ body: { padding: 28 } }}
      >
        <Flex
          gap="medium"
          justify="center"
          align="center"
          className={styles.heroWrap}
        >
          <div className="hero">
            <img
              src={heroImg}
              className="base"
              width="170"
              height="179"
              alt=""
            />
            <img src={reactLogo} className="framework" alt="React logo" />
            <img src={viteLogo} className="vite" alt="Vite logo" />
          </div>
        </Flex>

        <Form<LoginValues>
          layout="vertical"
          initialValues={{ username: 'admin', password: 'admin123' }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="username"
            label={
              <>
                <Typography style={{ marginRight: 4 }}>用户名</Typography>
                <Tooltip title="使用 admin / 任意密码登录管理员，其他用户名登录普通用户。">
                  <QuestionCircleTwoTone />
                </Tooltip>
              </>
            }
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin 或 user" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="任意密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}
