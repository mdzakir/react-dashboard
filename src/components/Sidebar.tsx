import {
  AppstoreOutlined,
  BarChartOutlined,
  BookOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../hooks/services/userService";

const { Sider } = Layout;

const SidebarWrapper = styled(Sider)`
  min-height: 100vh;
  background: #fff;
`;

const Sidebar = () => {
  const location = useLocation();
  const { data, isLoading } = useUser();

  return (
    <SidebarWrapper width={250}>
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Avatar
          size={64}
          src={
            isLoading
              ? `https://placehold.co/62x62?text=Loading...`
              : `https://randomuser.me/api/portraits/women/${data?.id}.jpg`
          }
        />
        <div
          style={{
            marginTop: "12px",
            color: "#888",
          }}
        >
          Hello
        </div>
        <div style={{ fontWeight: "bold" }}>{data?.name}</div>
        <Button
          type="primary"
          style={{
            marginTop: "12px",
            width: "90%",
          }}
        >
          <BarChartOutlined style={{ marginRight: "8px" }} />
          <Link to="/profile">Live Metrics</Link>
        </Button>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ borderRight: 0 }}
      >
        <Menu.Item key="/" icon={<AppstoreOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.SubMenu key="blogs" title="Blogs" icon={<FileTextOutlined />}>
          <Menu.Item key="/blogs">
            <Link to="/blogs">All</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="docs" icon={<BookOutlined />}>
          Documentation
        </Menu.Item>
        <Menu.Item key="reports" icon={<BarChartOutlined />}>
          Reports
        </Menu.Item>
        <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
          Need Help?
        </Menu.Item>
      </Menu>
    </SidebarWrapper>
  );
};

export default Sidebar;
