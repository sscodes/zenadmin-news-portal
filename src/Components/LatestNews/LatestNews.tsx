import NewsSection from '../NewsSection/NewsSection';
import './LatestNews.css';

const LatestNews = ({ news }) => {
  return (
    <div className='latest-news'>
      <h1>Latest News:</h1>
      <NewsSection data={news} />
    </div>
  );
};

export default LatestNews;
