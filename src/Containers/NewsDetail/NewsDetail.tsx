import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { fetchNewsDetail } from '../../API/API';
import Comment from '../../Components/Comment/Comment';
import Error from '../../Components/Error/Error';
import './NewsDetail.css';

const NewsDetail = () => {
  const [limit, setLimit] = useState(5);

  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['news-details'],
    queryFn: () => fetchNewsDetail(Number(id)),
  });

  const handleScrolledToBottom = () => {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight
    )
      setLimit((e) => e + 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrolledToBottom);

    return () => window.removeEventListener('scroll', handleScrolledToBottom);
  }, []);

  return isLoading ? (
    <div className='detail-skeleton-section'>
      <div className='detail-skeleton-section__title-skeleton animate-pulse'></div>
      <div className='detail-skeleton-section__points-skeleton animate-pulse'></div>
      <div className='detail-skeleton-section__comments-skeleton animate-pulse'></div>
    </div>
  ) : error ? (
    <Error />
  ) : (
    <div className='news-detail'>
      <a href={data.url} target='_blank' className='news-detail__title'>
        <h1>{data.title}</h1>
      </a>
      <div className='news-detail__points'>
        <div className='points__icon'>
          <FaHeart />{' '}
        </div>
        <div>{data.points}</div>
      </div>
      <div className='news-detail__comments-section'>
        <h2 className='comments-section__title'>Comments: </h2>
        <div className='comments-section__comments'>
          <Comment data={data.children} limit={limit} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
