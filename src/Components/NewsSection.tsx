import { Key } from 'react';
import NewsCard from './NewsCard';

const NewsSection = ({ data = [...Array(10)] }) => {
  return (
    <div className='news-section'>
      {data.map((news, i: Key) => (
        <div key={i}>
          <NewsCard news={news} />
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
