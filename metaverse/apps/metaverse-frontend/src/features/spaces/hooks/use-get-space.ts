import { spaceInfoWithCreatorAndElements } from "@/features/types";
import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetSpace = (spaceId?: string) => {
  const {
    data: space,
    isError,
    isPending,
  } = useQuery<spaceInfoWithCreatorAndElements>({
    queryKey: ["get-space"],
    queryFn: async () => {
      const res = await customAxios.get(`/space/${spaceId}`);
      return res.data;
    },
  });
  return {
    space,
    isError,
    isPending,
  };
};
