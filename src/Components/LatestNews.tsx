import { Key } from 'react';
import NewsCard from './NewsCard';

const LatestNews = () => {
  return (
    <div className='latest-news'>
      <h1>Latest News:</h1>
      <div className='latest-news-section'>
        {[...Array(4)].map((news: Number, i: Key) => (
          <div key={i}>
            <NewsCard news={news} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
