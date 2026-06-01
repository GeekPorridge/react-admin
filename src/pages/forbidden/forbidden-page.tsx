import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，当前账号没有权限访问此页面。"
      extra={
        <Button type="primary">
          <Link to={PATHS.dashboard}>返回仪表盘</Link>
        </Button>
      }
    />
  )
}

export default Forbidden
