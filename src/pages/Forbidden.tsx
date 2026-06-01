import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export function Forbidden() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，当前账号没有权限访问此页面。"
      extra={
        <Button type="primary">
          <Link to="/dashboard">返回仪表盘</Link>
        </Button>
      }
    />
  );
}
