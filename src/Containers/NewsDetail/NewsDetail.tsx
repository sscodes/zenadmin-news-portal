import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Comment from '../../Components/Comment/Comment';
import './NewsDetail.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const NewsDetail = () => {
  const [limit, setLimit] = useState(5);

  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['news-details'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4000/api/news-details/${id}`);
      return await res.json();
    },
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

  return (
    !isLoading && (
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
    )
  );
};

export default NewsDetail;
