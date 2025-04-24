import {
  AppstoreOutlined,
  BarChartOutlined,
  BookOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Image, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../hooks/services/userService";
import { useState } from "react";

const { Sider } = Layout;

const SidebarWrapper = styled(Sider)`
  min-height: 100vh;
  background: #fff;
`;

const Sidebar = () => {
  const location = useLocation();
  const { data, isLoading } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarWrapper
      width={250}
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#397bf6",
        }}
      >
        {!collapsed ? (
          <Image
            src={
              "https://www.qdb.qa/-/media/images/project/qdb/icons/logo-colored.svg"
            }
            alt="post image"
            style={{
              margin: "auto",
              height: "62px",
              width: "100px",
              paddingLeft: "16px",
              filter: "brightness(0) invert(1)",
            }}
          />
        ) : null}
        <Button
          type="text"
          data-testid="collapse-button"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined color="#fff" />
            ) : (
              <MenuFoldOutlined color="#fff" />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: "#fff",
          }}
        />
      </div>
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
        <Menu.Item key="/dashboard" icon={<AppstoreOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.SubMenu key="blogs" title="Blogs" icon={<FileTextOutlined />}>
          <Menu.Item key="/blogs">
            <Link to="/blogs">All</Link>
          </Menu.Item>
          <Menu.Item key="/blogs?status=latest">
            <Link to="/blogs?status=latest">Latest</Link>
          </Menu.Item>
          <Menu.Item key="/blogs?status=archived">
            <Link to="/blogs?status=archived">Archived</Link>
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
