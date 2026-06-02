import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不存在或已被移动。"
      extra={
        <Button type="primary">
          <Link to={PATHS.HOME}>返回首页</Link>
        </Button>
      }
    />
  )
}

export default NotFound
