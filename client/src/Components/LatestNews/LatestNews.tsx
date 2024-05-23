import { Key, useState } from 'react';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import { HitsType } from '../../Types/Type';
import NewsCard from '../NewsCard/NewsCard';
import './LatestNews.css';

const LatestNews = ({ news }: { news: HitsType[] }) => {
  const [limit, setLimit] = useState(4);

  const decrease = () => {
    if (limit !== 4) setLimit((e) => e - 4);
  };

  const increase = () => {
    if (limit < news.length) setLimit((e) => e + 4);
  };

  return (
    <>
      <div className='news-section'>
        <div className='news-section__icon'>
          <IoIosArrowDropleftCircle
            className={`${limit === 4 ? 'disabled' : 'icon'}`}
            onClick={decrease}
          />
        </div>
        {news?.slice(limit - 4, limit).map((eachNews, i: Key) => (
          <div key={i}>
            <NewsCard news={eachNews} />
          </div>
        ))}
        <div className='news-section__icon'>
          <IoIosArrowDroprightCircle
            className={`${limit >= news?.length ? 'disabled' : 'icon'}`}
            onClick={increase}
          />
        </div>
      </div>
      <div className='news-section__small-screen-navigation'>
        <div>
          <IoIosArrowDropleftCircle
            className={`news-section__icon ${
              limit === 4 ? 'news-section__icon--disabled' : ''
            }`}
            onClick={decrease}
          />
        </div>
        <div>
          <IoIosArrowDroprightCircle
            className={`news-section__icon ${
              limit >= news?.length ? 'news-section__icon--disabled' : ''
            }`}
            onClick={increase}
          />
        </div>
      </div>
    </>
  );
};

export default LatestNews;
