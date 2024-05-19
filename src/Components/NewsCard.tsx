const NewsCard = ({ news = { text: '', author: '' } }) => {
  return (
    <div className='news-card'>
      <a href='' className='news-card__new-title'>
        {news.text.slice(0, 47)}...
      </a>
      <div className='news-card__author'>- {news.author}</div>
    </div>
  );
};

export default NewsCard;
