import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchLatestNews } from '../../API/API';
import Images from '../../Assets';
import Error from '../../Components/Error/Error';
import LatestNews from '../../Components/LatestNews/LatestNews';
import SearchedNews from '../../Components/SearchedNews/SearchedNews';
import SearchSection from '../../Components/SerachSection/SearchSection';
import Skeleton from '../../Components/Skeleton/Skeleton';
import {
  notFoundErrorMessage,
  techErrorMessage,
} from '../../Constants/Constants';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './Home.css';
import Pagination from '../../Components/Pagination/Pagination';

const Home = () => {
  const response = useSearchedNewsStore((state) => state.response);

  const [page, setPage] = useState(response.data?.page || 0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });

  return (
    <div className='home'>
      <SearchSection page={page} />
      {!response.isLoading && !response.data && !response.error && (
        <div className='latest-news'>
          <h1>Latest News:</h1>
          {isLoading ? (
            <Skeleton />
          ) : error ? (
            <Error image={Images.Error} message={techErrorMessage} />
          ) : (
            data && !response.data && <LatestNews news={data.hits} />
          )}
        </div>
      )}
      {response.isLoading ? (
        <Skeleton />
      ) : response.error ? (
        <Error image={Images.Error} message={techErrorMessage} />
      ) : response.data && response.data.hits.length > 0 ? (
        <>
          <SearchedNews news={response.data?.hits} />
          {response.data?.nbPages > 20 && (
            <Pagination page={page} setPage={setPage} />
          )}
        </>
      ) : (
        response.data &&
        response.data.hits.length === 0 && (
          <Error image={Images.NotFoundError} message={notFoundErrorMessage} />
        )
      )}
    </div>
  );
};

export default Home;
