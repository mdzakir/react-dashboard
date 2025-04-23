import { EditOutlined } from "@ant-design/icons";
import { ConfigProvider, Pagination } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Button, List, Space, Spin, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserPost } from "../@types/post";
import EditPostModal from "../components/EditPostModal";
import { useUserPosts } from "../hooks/services/postsService";
import { formattedDate } from "../utils";

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

const Blogs: React.FC = () => {
  const { data: posts, isLoading, isError } = useUserPosts();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const paginatedPosts = posts?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEditClick = (post: UserPost) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  if (isLoading) return <Spin />;
  if (isError) return <div>Something went wrong while fetching posts.</div>;

  return (
    <div>
      <Title level={2}>Blogs</Title>
      <List
        dataSource={paginatedPosts}
        renderItem={(post) => (
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
          total={posts?.length || 0}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: 16 }}
        />
      </ConfigProvider>
      <EditPostModal
        post={selectedPost}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }}
      />
    </div>
  );
};

export default Blogs;
