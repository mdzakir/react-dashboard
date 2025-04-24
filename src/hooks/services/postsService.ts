import { useQuery } from "@tanstack/react-query";
import { useRandomUserId } from "../../context/UserContext";
import { getClient } from "../../services/client";
import { UserPost } from "../../@types/post";
import axios from "axios";

const fetchUserPosts = async (userId: number): Promise<UserPost[]> => {
  const client = await getClient();
  const { data } = await client(`/users/${userId}/posts`);
  return data.map((post: UserPost) => ({ ...post, imgUrl: `https://picsum.photos/id/${post?.id}/200/120` }));
};

export const useUserPosts = () => {
  const userId = useRandomUserId();
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchUserPosts(userId),
  });
};



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updatePost = async (post: UserPost): Promise<UserPost> => {
  const { data } = await axios.put(`${API_BASE_URL}/posts/${post.id}`, post);
  return data;
};


export const deletePost = async (postId: number): Promise<UserPost> => {
  const { data } = await axios.delete(`${API_BASE_URL}/posts/${postId}`);
  return data;
};
