import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchNewsDetail } from '../../API/API';
import Comment from '../../Components/Comment/Comment';
import Error from '../../Components/Error/Error';
import { techErrorMessage } from '../../Constants/Constants';
import './NewsDetail.css';
import ErrorAnimation from '../../Components/Loader/ErrorAnimation';
import { TbArrowBackUpDouble } from 'react-icons/tb';

const NewsDetail: () => JSX.Element = () => {
  const [limit, setLimit] = useState(5);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['news-details', id],
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
    <Error loader={<ErrorAnimation />} message={techErrorMessage} />
  ) : !data ? (
    <div></div>
  ) : (
    <div className='news-detail'>
      <div>
        <button className='news-detail__go-back' onClick={() => navigate('/')}>
          <div className='news-detail__go-back-icon'>
            <TbArrowBackUpDouble />
          </div>
          <div>Go Back</div>
        </button>
      </div>
      <a href={data.url} target='_blank' className='news-detail__title'>
        <h1>
          {data.title} by @{data.author}
        </h1>
      </a>
      <div className='news-detail__points'>
        <div className='news-detail__icon'>
          <FaHeart />{' '}
        </div>
        <div>{data.points}</div>
      </div>
      <div className='news-detail__comments-section'>
        <h2 className='news-detail__comment-title'>Comments: </h2>
        <div className='news-detail__comments'>
          {data.children.length > 0 ? (
            <Comment data={data.children} limit={limit} />
          ) : (
            <div className='news-detail__no-comments'>No Comments Yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
