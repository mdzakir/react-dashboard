import { Layout } from "antd";
import styled from "styled-components";
import AppHeader from "./components/AppHeader";

const {  Content } = Layout;

type AppLayoutProps = {
  children: React.ReactNode;
  onSearch?: (value: string) => void;
};

const AppLayout = styled(Layout)`
  height: 100vh;
`;

const MainLayout: React.FC<AppLayoutProps> = ({ children, onSearch }) => {
  return (
    <AppLayout>
      <Layout style={{ minHeight: "100%" }}>
        <AppHeader onSearch={onSearch} />
        <Content style={{ margin: 20 }}>{children}</Content>
      </Layout>
    </AppLayout>
  );
};

export default MainLayout;
