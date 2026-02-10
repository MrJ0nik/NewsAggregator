import axios from "axios";

export const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "X-Api-Key": import.meta.env.VITE_NEWS_API_KEY,
  },
});

export const cmsClient = axios.create({
  baseURL: `https://${import.meta.env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v2022-03-07/data/query/production`,
});
