import { Layout } from "antd";
import styled from "styled-components";

const { Header, Content } = Layout;

const AppLayout = styled(Layout)`
  height: 100vh;
`;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppLayout>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: 20 }}>{children}</Content>
      </Layout>
    </AppLayout>
  );
};

export default MainLayout;
