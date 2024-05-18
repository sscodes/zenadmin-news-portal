const NewsCard = ({ news }: { news: Number }) => {
  return (
    <div className='latest-news-card'>
      <a href='' className='latest-news-card__new-title'>
        Lorem ipsum dolor sit amet, consectetur adipisicing.
      </a>
      <div className="latest-news-card__author">- author</div>
    </div>
  );
};

export default NewsCard;
