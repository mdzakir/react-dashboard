import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Form, Input, Modal, notification } from "antd";

import React, { useEffect, useState } from "react";
import { UserPost } from "../@types/post";
import { updatePost } from "../hooks/services/postsService";

type Props = {
  post: UserPost | null;
  open: boolean;
  onClose: () => void;
  onSuccess: (post: UserPost) => void;
};

const EditPostModal: React.FC<Props> = ({
  post,
  open,
  onClose,
  onSuccess,
}: Props) => {
  const [form] = Form.useForm();
  const [formChanged, setFormChanged] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (post) {
      form.setFieldsValue({ title: post.title, body: post.body });
      setFormChanged(false);
    }
  }, [post, form]);

  const mutation = useMutation({
    mutationFn: (updated: UserPost) => updatePost(updated),
    onSuccess: (data) => {
      api.success({
        message: "Success",
        description: "Post updated successfully!",
        duration: 2,
      });

      onSuccess(data);

      setFormChanged(false);
      onClose();
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      api.success({
        message: "Error",
        description: "Failed to update post. Please try again.",
        duration: 2,
      });
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (post) {
          if (!formChanged) {
            api.info({
              message: "No changes detected",
              description: "You haven't made any changes to the post.",
              placement: "topRight",
            });
            return;
          }

          // Check if content includes disallowed HTML tags (security measure)
          const sanitizedBody = values.body;
          if (/<script|<iframe|javascript:/i.test(sanitizedBody)) {
            api.warning({
              message: "Invalid Content",
              description:
                "Your content contains disallowed HTML. Please remove any script tags or iframe elements.",
            });
            return;
          }

          mutation.mutate({ ...post, ...values });
        }
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleFormChange = () => {
    setFormChanged(true);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Edit Post"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={mutation.isPending}
          onClick={handleSubmit}
          disabled={mutation.isPending || !formChanged}
        >
          Save
        </Button>,
      ]}
    >
      {mutation.isError && (
        <Alert
          message="Error updating post"
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: "", body: "" }}
        onValuesChange={() => handleFormChange()}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter a title" },
            { min: 5, message: "Title must be at least 5 characters" },
            { max: 100, message: "Title cannot exceed 100 characters" },
            {
              pattern: /^[^<>]*$/,
              message: "Title should not contain HTML tags",
            },
          ]}
        >
          <Input placeholder="Enter post title" maxLength={100} />
        </Form.Item>
        <Form.Item
          name="body"
          label="Content"
          rules={[
            { required: true, message: "Please enter post content" },
            { min: 20, message: "Content must be at least 20 characters" },
            { max: 2000, message: "Content cannot exceed 2000 characters" },
            {
              validator: (_, value) => {
                if (value && value.trim().length < 20) {
                  return Promise.reject(
                    "Content must have at least 20 non-whitespace characters"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.TextArea
            rows={6}
            placeholder="Enter post content"
            showCount
            maxLength={2000}
          />
        </Form.Item>
      </Form>

      {mutation.isPending && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          Processing your request...
        </div>
      )}
      {contextHolder}
    </Modal>
  );
};

export default EditPostModal;
