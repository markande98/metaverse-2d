import { Element } from "@prisma/client";

import { customAxios } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetElements = () => {
  const { data: elements } = useQuery<{ elements: Element[] }>({
    queryKey: ["elements"],
    queryFn: async () => {
      const res = await customAxios.get("/elements");
      return res.data;
    },
  });

  if (elements === undefined) return [];
  return elements.elements;
};
