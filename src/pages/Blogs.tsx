import React, { useState } from "react";
import { List, Button, Space, Typography, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserPosts } from "../hooks/services/postsService";
import { formattedDate } from "../utils";
import { UserPost } from "../@types/post";
import EditPostModal from "../components/EditPostModal";
import { useQueryClient } from "@tanstack/react-query";

const { Title, Paragraph } = Typography;

const BlogItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
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
        dataSource={posts}
        renderItem={(post) => (
          <BlogItem key={post?.id}>
            <Thumbnail src={"https://picsum.photos/200"} alt="Blog thumbnail" />
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
                  Edit
                </Button>
              </Space>
            </BlogContent>
          </BlogItem>
        )}
      />
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
