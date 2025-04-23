import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";

const { Header, Content } = Layout;

const AppWrapper = styled(Layout)`
  height: 100vh;
`;

function App() {
  return (
    <AppWrapper>
      <Sidebar />
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </Content>
      </Layout>
    </AppWrapper>
  );
}

export default App;
