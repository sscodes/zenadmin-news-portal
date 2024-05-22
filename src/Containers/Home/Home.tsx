import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchLatestNews } from '../../API/API';
import Error from '../../Components/Error/Error';
import LatestNews from '../../Components/LatestNews/LatestNews';
import ErrorAnimation from '../../Components/Loader/ErrorAnimation';
import Pagination from '../../Components/Pagination/Pagination';
import SearchedNews from '../../Components/SearchedNews/SearchedNews';
import SearchSection from '../../Components/SerachSection/SearchSection';
import Skeleton from '../../Components/Skeleton/Skeleton';
import {
  notFoundErrorMessage,
  techErrorMessage,
} from '../../Constants/Constants';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './Home.css';

const Home = () => {
  const { response, sortByPoints, sortByDate } = useSearchedNewsStore(
    (state) => state
  );

  const [page, setPage] = useState(response.data?.page || 0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });

  const handleNews = () => {
    if (sortByPoints)
      return response.data?.hits.sort((a, b) => b.points - a.points)!;
    if (sortByDate)
      return response.data?.hits.sort(
        (a, b) => b.created_at_i - a.created_at_i
      )!;
    else return response.data?.hits!;
  };

  return (
    <div className='home'>
      <SearchSection page={page} />
      {!response.isLoading && !response.data && !response.error && (
        <div className='latest-news'>
          <h1>Latest News:</h1>
          {isLoading ? (
            <Skeleton />
          ) : error ? (
            <Error loader={<ErrorAnimation />} message={techErrorMessage} />
          ) : (
            data && !response.data && <LatestNews news={data.hits} />
          )}
        </div>
      )}
      {response.isLoading ? (
        <Skeleton />
      ) : response.error ? (
        <Error loader={<ErrorAnimation />} message={techErrorMessage} />
      ) : response.data && response.data.hits.length > 0 ? (
        <>
          <SearchedNews news={handleNews()} />
          {response.data?.nbPages > 20 && (
            <Pagination page={page} setPage={setPage} />
          )}
        </>
      ) : (
        response.data &&
        response.data.hits.length === 0 && (
          <Error loader={<ErrorAnimation />} message={notFoundErrorMessage} />
        )
      )}
    </div>
  );
};

export default Home;
