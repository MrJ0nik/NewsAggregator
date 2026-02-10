import { useQuery } from "@tanstack/react-query";
import { fetchCmsConfig } from "@/lib/cms-service";
import { CmsConfig } from "@/types/index";

export const useCmsConfig = () => {
  return useQuery<CmsConfig>({
    queryKey: ["cms-config"],
    queryFn: fetchCmsConfig,
    staleTime: 1000 * 60 * 10,
  });
};
