export const fetchSearchResults: (key: string) => Promise<any> = async (
  key: string
) => {
  const res = await fetch(`http://localhost:4000/api/search?query=${key}`);
  return await res.json();
};

export const fetchLatestNews: () => Promise<any> = async () => {
  const res = await fetch('http://localhost:4000/api/latest-news');
  return await res.json();
};

export const fetchNewsDetail: (id: number) => Promise<any> = async (
  id: number
) => {
  const res = await fetch(`http://localhost:4000/api/news-details/${id}`);
  return await res.json();
};
