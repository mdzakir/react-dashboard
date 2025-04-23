import { Layout, Menu, Avatar } from "antd";
import {
  AppstoreOutlined,
  FileTextOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const SidebarWrapper = styled(Sider)`
  min-height: 100vh;
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarWrapper width={250} theme="light">
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Avatar size={64} src="/default-avatar.png" />
        <div style={{ marginTop: "12px", fontWeight: "bold" }}>Allie Simon</div>
        <div style={{ color: "#888", fontSize: 12 }}>
          Qatar Development Bank
        </div>
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
