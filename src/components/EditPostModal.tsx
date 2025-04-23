import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

import { useMutation } from "@tanstack/react-query";
import { UserPost } from "../@types/post";
import { updatePost } from "../hooks/services/updatePost";

type Props = {
  post: UserPost | null;
  open: boolean;
  onClose: () => void;
  onSuccess: (post: UserPost) => void;
};

const EditPostModal: React.FC<Props> = ({ post, open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (post) form.setFieldsValue({ title: post.title, body: post.body });
  }, [post, form]);

  const mutation = useMutation({
    mutationFn: (updated: UserPost) => updatePost(updated),
    onSuccess: (data) => {
      onSuccess(data);
      onClose();
    },
  });

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (post) {
        mutation.mutate({ ...post, ...values });
      }
    });
  };

  return (
    <Modal
      title="Edit Post"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" loading={mutation?.isPending} onClick={handleSubmit}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="body" label="Body" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditPostModal;