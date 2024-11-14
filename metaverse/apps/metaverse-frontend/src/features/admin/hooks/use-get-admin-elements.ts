import { getAdminElementSchema } from "@/features/types";
import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminElements = () => {
  const { data } = useQuery<getAdminElementSchema>({
    queryKey: ["admin-element"],
    queryFn: async () => {
      const res = await customAxios.get("/admin/element");
      return res.data;
    },
  });

  if (data === undefined) return [];
  return data;
};
