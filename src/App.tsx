import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";

import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import MainLayout from "./MainLayout";
import BlogDetail from "./pages/BlogDetail";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";

const AppWrapper = styled(Layout)`
  height: 100vh;
`;

function App() {
  return (
    <AppWrapper>
      <Sidebar />

      <MainLayout>
      <Routes>
          <Route path="/" element={<Navigate to="/blogs" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/posts/:postId" element={<BlogDetail />} />
        </Routes>
      </MainLayout>
    </AppWrapper>
  );
}

export default App;
