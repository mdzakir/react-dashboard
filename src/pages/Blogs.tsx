import React, { FC, useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ConfigProvider, Layout, Pagination, Popconfirm } from "antd";
import { Tabs, Button, List, Space, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserPost } from "../@types/post";
import { useUserPosts } from "../hooks/services/postsService";
import { formattedDate } from "../utils";
import EditPostModal from "../components/EditPostModal";
import { usePostActions } from "../hooks/usePostActions";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const BlogItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const BlogContent = styled.div`
  flex: 1;
`;

const Blogs: FC = () => {
  const { data: posts, isLoading, isError } = useUserPosts();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 4;

  const {
    selectedPost,
    modalOpen,
    selectedPostIdForDelete,
    confirmLoading,
    handleEditClick,
    showDeleteConfirm,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleModalClose,
    handleEditSuccess
  } = usePostActions();

  const getFilteredPosts = (): UserPost[] => {
    if (!posts) return [];

    switch (activeTab) {
      case "latest":
        return posts.slice(0, 3);
      case "archived":
        return posts.slice(-3);
      default:
        return posts;
    }
  };

  const filteredPosts: UserPost[] = getFilteredPosts();

  const paginatedPosts: UserPost[] = filteredPosts?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  if (isLoading) return <Spin />;
  if (isError) return <div>Something went wrong while fetching posts.</div>;

  return (
    <div>
      <Title style={{ paddingLeft: "1rem" }} level={2}>
        All Blog posts
      </Title>
      <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
        <Tabs
          style={{
            fontWeight: "bold",
          }}
          defaultActiveKey="all"
          onChange={(key) => {
            setActiveTab(key);
            setCurrentPage(1);
          }}
          items={[
            { key: "all", label: "ALL POSTS" },
            { key: "latest", label: "LATEST POSTS" },
            { key: "archived", label: "ARCHIVED" },
          ]}
        />
        <List
          dataSource={paginatedPosts}
          renderItem={(post: UserPost) => (
            <BlogItem key={post?.id}>
              <Thumbnail
                src={
                  isLoading
                    ? `https://placehold.co/62x62?text=Loading...`
                    : post?.imgUrl
                }
                loading="lazy"
                alt="Blog thumbnail"
              />
              <BlogContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <Title
                    level={4}
                    style={{
                      marginBottom: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    {post.title}
                  </Title>
                  <span style={{ color: "#999", fontWeight: "normal" }}>
                    {formattedDate}
                  </span>
                </div>
                <Paragraph ellipsis={{ rows: 2 }}>{post.body}</Paragraph>
                <Space size="small">
                  <Button
                    style={{ paddingLeft: 0 }}
                    type="link"
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    Read More
                  </Button>
                </Space>
                <Space size="small">
                  <Button type="primary" onClick={() => handleEditClick(post)}>
                    <EditOutlined /> Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure to delete this blog?"
                    description={`This action cannot be undone. Are you sure?`}
                    onConfirm={() => handleDeleteConfirm(post.id)}
                    open={selectedPostIdForDelete === post.id}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleDeleteCancel}
                  >
                    <Button
                      type="primary"
                      danger
                      onClick={() => showDeleteConfirm(post.id)}
                    >
                      <DeleteOutlined /> Delete
                    </Button>
                  </Popconfirm>
                </Space>
              </BlogContent>
            </BlogItem>
          )}
        />
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#1a2651",
              },
            },
            token: {
              colorPrimary: "#fff",
            },
          }}
        >
          <Pagination
            align="center"
            current={currentPage}
            pageSize={pageSize}
            total={filteredPosts?.length || 0}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 16 }}
          />
        </ConfigProvider>
        <EditPostModal
          post={selectedPost}
          open={modalOpen}
          onClose={handleModalClose}
          onSuccess={handleEditSuccess}
        />
      </Content>
    </div>
  );
};

export default Blogs;