import axios from "axios";

const newsApiBaseUrl = import.meta.env.DEV
  ? "https://newsapi.org/v2"
  : "/api/news";

export const newsApiClient = axios.create({
  baseURL: newsApiBaseUrl,
  headers: {
    "X-Api-Key": import.meta.env.VITE_NEWS_API_KEY,
  },
});

export const cmsClient = axios.create({
  baseURL: `https://${import.meta.env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v2022-03-07/data/query/production`,
});
