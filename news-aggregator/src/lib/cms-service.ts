import { cmsClient } from "./api-clients";
import { CmsConfig } from "../types";

export const fetchCmsConfig = async (): Promise<CmsConfig> => {
  const query = encodeURIComponent(
    '*[_type == "newsSource" || _type == "topic"]',
  );

  const { data } = await cmsClient.get(`?query=${query}`);
  const result = data.result;

  const allowedSources = result
    .filter((item: any) => item._type === "newsSource")
    .map((item: any) => ({
      id:
        item.sourceId?.current || item.name.toLowerCase().replace(/\s+/g, "-"),
      name: item.name,
    }));

  const topics = result
    .filter((item: any) => item._type === "topic")
    .map((item: any) => ({
      id: item._id,
      name: item.title,
      keywords: item.keywords || [],
    }));

  return { allowedSources, topics };
};
