import { useQuery } from "@tanstack/react-query";
import { UserPost } from "../../@types/post";
import { getClient } from "../../services/client";

const fetchUserPostById = async (id: number): Promise<UserPost> => {
  const client = await getClient();
  const { data } = await client(`/posts/${id}`);
  return data;
};

export const useUserPostById = (id:number) => {
  console.log('useUserPostById', id)
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchUserPostById(id),
    // enabled: !!id,
  });
};
