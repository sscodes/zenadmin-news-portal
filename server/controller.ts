const crossFetch = require('cross-fetch');

type responseType = {
  json: (arg0: any) => void;
  status: (arg0: number) => {
    (): any;
    new (): any;
    json: { (arg0: { error: string }): void; new (): any };
  };
};

const getLatestNews = async (_req: any, res: responseType) => {
  try {
    const response = await crossFetch(
      'http://hn.algolia.com/api/v1/search_by_date?tags=story'
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest news' });
  }
};

const getNewsDetails = async (
  req: { params: { id: number } },
  res: responseType
) => {
  try {
    const response = await crossFetch(
      `http://hn.algolia.com/api/v1/items/${req.params.id}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest news' });
  }
};

const getSearchedNews: (
  req: {
    query: {
      query: string;
      page: number;
    };
  },
  res: responseType
) => Promise<void> = async (
  req: { query: { query: string; page: number } },
  res: responseType
) => {
  try {
    const response = await crossFetch(
      `http://hn.algolia.com/api/v1/search?query=${req.query.query}&tags=story&page=${req.query.page}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest news' });
  }
};

module.exports = { getLatestNews, getNewsDetails, getSearchedNews };
