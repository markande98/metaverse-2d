import { Map } from "@prisma/client";

import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetMaps = () => {
  const { data } = useQuery<Map[]>({
    queryKey: ["maps"],
    queryFn: async () => {
      const res = await customAxios.get("/space/maps");
      return res.data;
    },
  });

  if (data === undefined) return [];
  return data;
};
