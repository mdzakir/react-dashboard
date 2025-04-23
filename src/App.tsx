import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";

import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import MainLayout from "./MainLayout";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";

const { Content } = Layout;

const AppWrapper = styled(Layout)`
  height: 100vh;
`;

function App() {
  return (
    <AppWrapper>
      <Sidebar />
      <MainLayout>
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogs" element={<Blogs />} />
            {/* <Route path="/posts/:postId" element={<BlogDetails />} /> */}
          </Routes>
        </Content>
      </MainLayout>
    </AppWrapper>
  );
}

export default App;
