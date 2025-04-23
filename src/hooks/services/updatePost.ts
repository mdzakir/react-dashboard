// src/services/api.ts
import axios from "axios";
import { UserPost } from "../../@types/post";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updatePost = async (post: UserPost): Promise<UserPost> => {
  const { data } = await axios.put(`${API_BASE_URL}/posts/${post.id}`, post);
  return data;
};
