import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ConfigProvider, Layout, Pagination, Popconfirm } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, Button, List, Space, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserPost } from "../@types/post";
import EditPostModal from "../components/EditPostModal";
import { deletePost, useUserPosts } from "../hooks/services/postsService";
import { formattedDate } from "../utils";
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

const Blogs: React.FC = () => {
  const { data: posts, isLoading, isError } = useUserPosts();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPostIdForDelete, setSelectedPostIdForDelete] = useState<
    number | null
  >(null);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const mutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setSelectedPostIdForDelete(null);
    },
  });

  const getFilteredPosts = () => {
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

  const filteredPosts = getFilteredPosts();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const paginatedPosts = filteredPosts?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEditClick = (post: UserPost) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const showPopconfirm = (postId: number) => {
    setSelectedPostIdForDelete(postId);
  };

  const handleOk = (postId: number) => {
    setConfirmLoading(true);
    setTimeout(() => {
      mutation.mutate(postId, {
        onSettled: () => setConfirmLoading(false),
      });
      setSelectedPostIdForDelete(null);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setSelectedPostIdForDelete(null);
  };

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
                  <Popconfirm
                    title="Are you sure to delete this blog?"
                    description={`This action cannot be undone. Are you sure?`}
                    onConfirm={() => handleOk(post.id)}
                    open={selectedPostIdForDelete === post.id}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancel}
                  >
                    <Button
                      type="primary"
                      danger
                      onClick={() => showPopconfirm(post.id)}
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
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
          }}
        />
      </Content>
    </div>
  );
};

export default Blogs;
