import { getMapElements } from "@/features/types";
import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetadminMaps = () => {
  const { data } = useQuery<getMapElements[]>({
    queryKey: ["admin-map"],
    queryFn: async () => {
      const res = await customAxios.get("/admin/map");
      return res.data;
    },
  });

  if (data === undefined) return [];
  return data;
};
