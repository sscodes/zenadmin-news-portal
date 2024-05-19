import { Key, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsSection.css';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';

const NewsSection = ({ data }) => {
  const [limit, setLimit] = useState(4);

  const decrease = () => {
    if (limit !== 4) setLimit((e) => e - 4);
  };

  const increase = () => {
    if (limit < data.length) setLimit((e) => e + 4);
  };

  return (
    <div className='news-section'>
      <div className='news-section__icon'>
        <IoIosArrowDropleftCircle
          className={`${limit === 4 ? 'disabled' : 'icon'}`}
          onClick={decrease}
        />
      </div>
      {data.slice(limit - 4, limit).map((news, i: Key) => (
        <div key={i}>
          <NewsCard news={news} />
        </div>
      ))}
      <div className='news-section__icon'>
        <IoIosArrowDroprightCircle
          className={`${limit >= data.length ? 'disabled' : 'icon'}`}
          onClick={increase}
        />
      </div>
    </div>
  );
};

export default NewsSection;
