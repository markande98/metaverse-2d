import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await customAxios.get("/current-user");
      return res.data;
    },
  });
  if (user === undefined) return null;
  return user;
};
