import { useNavigate } from 'react-router-dom';
import { HitsType } from '../../Types/Type';
import './NewsCard.css';

const NewsCard = ({ news }: { news: HitsType }) => {
  const navigate = useNavigate();
  const navigateToDetails = () => {
    navigate(`/news/${news.story_id}`);
  };

  return (
    <div className='news-card' onClick={navigateToDetails}>
      <div className='news-card__title'>
        <div className='news-card__new-title'>
          {news?.title.slice(0, 50)}
          {news?.title.length >= 50 && '...'}
        </div>
      </div>
      <div className='news-card__author'>
        by <b>@{news?.author}</b>
      </div>
    </div>
  );
};

export default NewsCard;
