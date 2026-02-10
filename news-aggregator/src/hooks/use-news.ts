import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/news-service";
import { useCmsConfig } from "./use-cms-config";
import { EnrichedArticle, Article, CmsTopic } from "@/types";

const assignTopic = (title: string, topics: CmsTopic[]): string | undefined => {
  if (!topics || topics.length === 0) return undefined;

  const lowerTitle = title.toLowerCase();

  for (const topic of topics) {
    const hasMatch = topic.keywords.some((keyword) =>
      lowerTitle.includes(keyword.toLowerCase()),
    );
    if (hasMatch) return topic.name;
  }

  return undefined;
};

export const useNews = (filters?: { keyword?: string; source?: string }) => {
  const { data: config } = useCmsConfig();

  return useQuery({
    queryKey: ["news", filters],
    queryFn: async () => {
      const articles = await fetchNews(filters);

      console.log(
        "Сирі новини з NewsAPI:",
        articles.map((a) => a.source.name),
      );
      if (!config) return articles as EnrichedArticle[];

      const allowedSourceNames = config.allowedSources.map((s) =>
        s.name.toLowerCase(),
      );

      const filteredAndEnriched: EnrichedArticle[] = articles

        .filter((article: Article) => {
          const sourceName = article.source.name?.toLowerCase();
          return allowedSourceNames.includes(sourceName);
        })

        .map((article: Article) => ({
          ...article,
          matchedTopic: assignTopic(article.title, config.topics),
        }));

      return filteredAndEnriched;
    },

    enabled: !!config,
  });
};
