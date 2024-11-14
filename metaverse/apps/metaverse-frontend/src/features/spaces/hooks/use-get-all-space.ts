import { getUserOwnSpaces } from "@/features/types";
import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllSpace = () => {
  const { data, isError } = useQuery<{ spaces: getUserOwnSpaces[] }>({
    queryKey: ["get-all-space"],
    queryFn: async () => {
      const res = await customAxios.get("/space/all");
      return res.data;
    },
  });
  return {
    spaces: data?.spaces,
    isError,
  };
};
