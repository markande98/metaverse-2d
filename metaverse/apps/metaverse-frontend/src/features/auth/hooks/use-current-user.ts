import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await customAxios.get("/current-user");
      return res.data;
    },
  });
  if (data === undefined) return null;
  return data;
};
