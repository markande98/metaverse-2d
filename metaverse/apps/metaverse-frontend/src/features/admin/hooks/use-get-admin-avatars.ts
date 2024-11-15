import { getAdminAvatarSchema } from "@/features/types";
import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminAvatars = () => {
  const { data } = useQuery<getAdminAvatarSchema>({
    queryKey: ["admin-avatars"],
    queryFn: async () => {
      const res = await customAxios.get("/admin/avatar");
      return res.data;
    },
  });

  if (data === undefined) return [];
  return data;
};
