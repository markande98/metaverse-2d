import { Avatar } from "@repo/db/client";
import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAvatar = () => {
  const { data } = useQuery<{ avatars: Avatar[] }>({
    queryKey: ["available-avatars"],
    queryFn: async () => {
      const res = await customAxios.get("/avatars");
      return res.data;
    },
  });

  if (data === undefined) return [];

  return data.avatars;
};
