const express = require('express');
const crossFetch = require('cross-fetch');
var cors = require('cors');

const port = 4000;
const app = express();

app.use(cors());

app.get(
  '/api/latest-news',
  async (
    _req: any,
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): void; new (): any };
      };
    }
  ) => {
    try {
      const response = await crossFetch(
        'http://hn.algolia.com/api/v1/search_by_date?tags=story'
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch latest news' });
    }
  }
);

app.get(
  '/api/news-details/:id',
  async (
    req: { params: { id: number } },
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): void; new (): any };
      };
    }
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
  }
);

app.get(
  '/api/search',
  async (
    req: { query: { query: string } },
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: string }): void; new (): any };
      };
    }
  ) => {
    try {
      const response = await crossFetch(
        ` http://hn.algolia.com/api/v1/search?query=${req.query.query}`
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch latest news' });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
