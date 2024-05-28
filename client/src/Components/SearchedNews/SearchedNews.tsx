import { Key } from 'react';
import { HitsType } from '../../Types/Type';
import NewsCard from '../NewsCard/NewsCard';
import './SearchedNews.css';

const SearchedNews = ({ news }: { news: HitsType[] }) => {
  return (
    <div className='searched-news'>
      {news?.map((eachNews: any, i: Key) => (
        <div key={i}>
          <NewsCard news={eachNews} matchedValue={eachNews._highlightResult} />
        </div>
      ))}
    </div>
  );
};

export default SearchedNews;
