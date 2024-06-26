import { NewsListsType, NewsDetails } from '../Types/Type';

// fetch the search results with the keyword and the page
export const fetchSearchResults = async (key: string, page: number) => {
  const res = await fetch(
    `https://zenadmin-news-portal-server.onrender.com/api/search?query=${key}&page=${page}`
  );
  return (await res.json()) as NewsListsType;
};

// fetch the latest news
export const fetchLatestNews = async () => {
  const res = await fetch('https://zenadmin-news-portal-server.onrender.com/api/latest-news');
  return (await res.json()) as NewsListsType;
};

// fetch the news details with the specified id
export const fetchNewsDetail = async (id: number) => {
  const res = await fetch(`https://zenadmin-news-portal-server.onrender.com/api/news-details/${id}`);
  return (await res.json()) as NewsDetails;
};
