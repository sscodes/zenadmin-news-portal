import he from 'he';
import { useNavigate } from 'react-router-dom';
import { HighlightsType, HitsType } from '../../Types/Type';
import './NewsCard.css';

type PropType = {
  news: HitsType;
  matchedValue?: HighlightsType;
};

const NewsCard = ({ news, matchedValue }: PropType) => {
  const navigate = useNavigate();
  const navigateToDetails = () => {
    navigate(`/news/${news.story_id}`);
  };

  const createMarkup = (html: string | TrustedHTML) => {
    return { __html: html };
  };

  return (
    <div className='news-card' onClick={navigateToDetails}>
      <div className='news-card__title'>
        {matchedValue?.title.matchLevel === 'full' ? (
          <div
            className='news-card__new-title'
            dangerouslySetInnerHTML={createMarkup(
              he.decode(
                `${matchedValue?.title.value.slice(0, 74)}${
                  news?.title.length >= 74 ? '...' : ''
                }`
              )
            )}
          />
        ) : (
          <div className='news-card__new-title'>
            {news?.title.slice(0, 74)}
            {news?.title.length >= 74 && '...'}
          </div>
        )}
      </div>
      <div className='news-card__author'>
        {matchedValue?.author.matchLevel === 'full' ? (
          <b
            dangerouslySetInnerHTML={createMarkup(
              he.decode(`by @+${matchedValue?.author?.value}`)
            )}
          />
        ) : (
          <b>by @{news?.author}</b>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
