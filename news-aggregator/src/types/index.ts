export interface NewsSource {
  id: string;
  name: string;
  url?: string;
}

export interface CmsTopic {
  id: string;
  name: string;
  keywords: string[];
}

export interface CmsConfig {
  allowedSources: NewsSource[];
  topics: CmsTopic[];
}

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface EnrichedArticle extends Article {
  matchedTopic?: string;
}

export interface NewsFilterParams {
  keyword?: string;
  source?: string;
  topic?: string;
}
