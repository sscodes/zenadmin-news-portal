const express = require('express');
var cors = require('cors');
const controller = require('./controller');

const port = 4000;
const app = express();

app.use(cors());

app.get('/api/latest-news', controller.getLatestNews);
app.get('/api/news-details/:id', controller.getNewsDetails);
app.get('/api/search', controller.getSearchedNews);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
