import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRandomUserId } from "../../context/UserContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUser = () => {
  const userId = useRandomUserId();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return res.data;
    },
  });
};
