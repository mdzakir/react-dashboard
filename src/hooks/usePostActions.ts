import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { deletePost } from "../hooks/services/postsService";
import { UserPost } from "../@types/post";

interface UsePostActionsOptions {
  onDeleteSuccess?: () => void;
}

/**
 * Custom hook to handle common post actions (edit and delete)
 * @param options - Configuration options
 * @returns Functions and state variables for post actions
 */
export const usePostActions = (options: UsePostActionsOptions = {}) => {
  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPostIdForDelete, setSelectedPostIdForDelete] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();

  // Delete mutation
  const mutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setSelectedPostIdForDelete(null);
      
      if (options.onDeleteSuccess) {
        options.onDeleteSuccess();
      }
    },
  });

  // Handle edit click
  const handleEditClick = (post: UserPost): void => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  // Show delete confirmation
  const showDeleteConfirm = (postId: number): void => {
    setSelectedPostIdForDelete(postId);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (postId: number): void => {
    setConfirmLoading(true);
    setTimeout(() => {
      mutation.mutate(postId, {
        onSettled: () => setConfirmLoading(false),
      });
      
      api.success({
        message: "Blog deleted successfully",
        description: `The blog with id ${postId} has been deleted.`,
        duration: 2,
      });
      
      setSelectedPostIdForDelete(null);
      setConfirmLoading(false);
    }, 2000);
  };

  // Cancel delete
  const handleDeleteCancel = (): void => {
    setSelectedPostIdForDelete(null);
  };

  // Close modal
  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  // Handle successful edit
  const handleEditSuccess = (): void => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  return {
    // State
    selectedPost,
    modalOpen,
    selectedPostIdForDelete,
    confirmLoading,
    contextHolder,
    
    // Actions
    handleEditClick,
    showDeleteConfirm,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleModalClose,
    handleEditSuccess,
    
    // Notification
    notification: api
  };
};