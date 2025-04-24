import { Layout, Input } from "antd";
import styled from "styled-components";

const { Header, Content } = Layout;

const { Search } = Input;


const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;


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
        <StyledHeader>
          <Search
            placeholder="Search posts"
            onSearch={onSearch}
            enterButton
            style={{ width: 300 }}
            
            allowClear
          />
        </StyledHeader>
        <Content style={{ margin: 20 }}>{children}</Content>
      </Layout>
    </AppLayout>
  );
};

export default MainLayout;
