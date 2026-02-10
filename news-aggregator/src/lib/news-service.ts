import { newsApiClient } from "./api-clients";
import { Article, NewsFilterParams } from "@/types";

export const fetchNews = async (
  filters?: NewsFilterParams,
): Promise<Article[]> => {
  const params: Record<string, any> = {
    language: "en",
    pageSize: 50,
  };

  let endpoint = "/top-headlines";

  if (filters?.keyword) {
    params.q = filters.keyword;
    endpoint = "/everything";
    params.sortBy = "publishedAt";
  } else {
    params.category = "technology";
  }

  const { data } = await newsApiClient.get(endpoint, { params });

  return data.articles.filter(
    (article: Article) => article.title !== "[Removed]",
  );
};
