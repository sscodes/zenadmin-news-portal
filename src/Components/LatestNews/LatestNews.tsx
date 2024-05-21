import NewsSection from '../NewsSection/NewsSection';
import './LatestNews.css';

const LatestNews = ({ news }) => {
  return <NewsSection data={news} />;
};

export default LatestNews;
