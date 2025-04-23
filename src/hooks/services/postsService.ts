import { useQuery } from "@tanstack/react-query";
import { useRandomUserId } from "../../context/UserContext";
import { getClient } from "../../services/client";
import { UserPost } from "../../@types/post";

const fetchUserPosts = async (userId: number): Promise<UserPost[]> => {
  const client = await getClient();
  const { data } = await client(`/users/${userId}/posts`);
  return data;
};

export const useUserPosts = () => {
  const userId = useRandomUserId();
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchUserPosts(userId),
  });
};
