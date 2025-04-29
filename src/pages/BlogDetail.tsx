import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UserPost } from "../@types/post";
import EditPostModal from "../components/EditPostModal";
import { useUserPostById } from "../hooks/services/postDetailService";
import { usePostActions } from "../hooks/usePostActions";

export default function BlogDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useUserPostById(Number(postId));

  // Use the shared hook with a delete success callback for navigation
  const {
    modalOpen,
    selectedPostIdForDelete,
    confirmLoading,
    handleEditClick,
    showDeleteConfirm,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleModalClose,
    handleEditSuccess,
    contextHolder,
    notification
  } = usePostActions({
    onDeleteSuccess: () => {
      notification.info({
        message: "Redirecting...",
        description: "You will be redirected to the blogs page.",
        duration: 2,
      });
      
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    },
  });

  if (isLoading) return <Spin />;
  if (error) return <p>Error loading the post!</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Button onClick={() => navigate(-1)}>
          <ArrowLeftOutlined /> Go Back
        </Button>

        <Typography.Title level={2}>{data?.title}</Typography.Title>
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => data?.id ? handleEditClick(data) : 0}>
            <EditOutlined /> Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this blog?"
            description={`This action cannot be undone. Are you sure?`}
            onConfirm={() => data?.id ? handleDeleteConfirm(data?.id) : 0}
            open={selectedPostIdForDelete === data?.id}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleDeleteCancel}
          >
            <Button
              type="primary"
              danger
              onClick={() => data?.id ? showDeleteConfirm(data?.id) : 0}
            >
              <DeleteOutlined /> Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Image
          src={"https://picsum.photos/600/200"}
          alt="post image"
          style={{ margin: "auto" }}
        />
      </div>
      <Typography.Paragraph style={{ fontSize: 18, marginTop: 20 }}>
        {data?.body}
      </Typography.Paragraph>
      <EditPostModal
        post={data as UserPost}
        open={modalOpen}
        onClose={handleModalClose}
        onSuccess={handleEditSuccess}
      />
      {contextHolder}
    </div>
  );
}