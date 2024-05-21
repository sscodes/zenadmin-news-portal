import { NewsListsType, NewsDetails } from '../Types/Type';

export const fetchSearchResults = async (
  key: string
) => {
  const res = await fetch(`http://localhost:4000/api/search?query=${key}`);
  return (await res.json()) as NewsListsType;
};

export const fetchLatestNews = async () => {
  const res = await fetch('http://localhost:4000/api/latest-news');
  return (await res.json()) as NewsListsType;
};

export const fetchNewsDetail = async (id: number) => {
  const res = await fetch(`http://localhost:4000/api/news-details/${id}`);
  return (await res.json()) as NewsDetails;
};
