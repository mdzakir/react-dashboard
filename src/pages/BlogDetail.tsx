import {
    ArrowLeftOutlined,
    EditOutlined
} from "@ant-design/icons";
import { Button, Image, Spin, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useUserPostById } from "../hooks/services/postDetailService";
import { UserPost } from "../@types/post";
import EditPostModal from "../components/EditPostModal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function BlogDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useUserPostById(Number(postId));
  console.log("data", data);
    const [modalOpen, setModalOpen] = useState(false);
  

  const handleEditClick = () => {
    // setSelectedPost(post);
    setModalOpen(true);
  };

  if (isLoading) return <Spin />;
  if (error) return <p>Error loading the post!</p>;

  return (
    <div>
        <div style={{ display: 'flex', justifyContent:'space-between' , alignItems:'center', marginBottom:30}}>
        <Button onClick={() => navigate(-1)}><ArrowLeftOutlined  /> Go Back</Button>
      
            <Typography.Title level={2}>{data?.title}</Typography.Title>
            <Button onClick={handleEditClick}><EditOutlined  /> Edit</Button>
            
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
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }}
      />
    </div>
  );
}
