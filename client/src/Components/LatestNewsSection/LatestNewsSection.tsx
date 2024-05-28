import { useQuery } from '@tanstack/react-query';
import { fetchLatestNews } from '../../API/API';
import { techErrorMessage } from '../../Constants/Constants';
import { useSearchedNewsStore } from '../../Zustand/Store';
import Error from '../Error/Error';
import LatestNews from '../LatestNews/LatestNews';
import ErrorAnimation from '../Loader/ErrorAnimation';
import Skeleton from '../Skeleton/Skeleton';

const LatestNewsSection = () => {
  const response = useSearchedNewsStore((state) => state.response);

  // Querying the latest news
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });
  return (
    <>
      {!response.isLoading && !response.data && !response.error && (
        <div className='home__latest-news'>
          <h1>Latest News:</h1>
          {/* component when data fetch is loading */}
          {isLoading ? (
            <Skeleton />
          ) : // component when data fetch sends error
          error ? (
            <Error loader={<ErrorAnimation />} message={techErrorMessage} />
          ) : (
            data && !response.data && <LatestNews news={data.hits} />
          )}
        </div>
      )}
    </>
  );
};

export default LatestNewsSection;
