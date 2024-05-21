import { Key } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './SearchedNews.css';

const SearchedNews = ({ news }) => {
  return (
    <div className='searched-news'>
      {news?.map((eachNews: any, i: Key) => (
        <div key={i}>
          <NewsCard news={eachNews} />
        </div>
      ))}
    </div>
  );
};

export default SearchedNews;
