import { useQuery } from '@tanstack/react-query';
import { fetchLatestNews } from '../../API/API';
import Error from '../../Components/Error/Error';
import LatestNews from '../../Components/LatestNews/LatestNews';
import SearchedNews from '../../Components/SearchedNews/SearchedNews';
import SearchSection from '../../Components/SerachSection/SearchSection';
import Skeleton from '../../Components/Skeleton';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './Home.css';

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });

  const response = useSearchedNewsStore((state) => state.response);

  return (
    <div className='home'>
      <SearchSection />
      {!response.isLoading && !response.data && !response.error && (
        <div className='latest-news'>
          <h1>Latest News:</h1>
          {isLoading ? (
            <Skeleton />
          ) : error ? (
            <Error />
          ) : (
            data && !response.data && <LatestNews news={data.hits} />
          )}
        </div>
      )}
      {response.isLoading ? (
        <Skeleton />
      ) : response.error ? (
        <Error />
      ) : response.data && response.data.hits.length > 0 ? (
        <SearchedNews news={response.data?.hits} />
      ) : (
        response.data &&
        response.data.hits.length === 0 && (
          <div className='error-section'>
            <h1 className='error-message-section__error-message'>
              Sorry, no news found with that keyword.
            </h1>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
