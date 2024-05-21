import { useQuery } from '@tanstack/react-query';
import { fetchLatestNews } from '../../API/API';
import Error from '../../Components/Error/Error';
import LatestNews from '../../Components/LatestNews/LatestNews';
import SearchedNews from '../../Components/SearchedNews/SearchedNews';
import SearchSection from '../../Components/SerachSection/SearchSection';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './Home.css';

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });

  const searchData = useSearchedNewsStore((state) => state.response.data?.hits);

  return (
    <div className='home'>
      <SearchSection />
      <div className='latest-news'>
        <h1>Latest News:</h1>
        {isLoading ? (
          <div className='home-skeleton-section'>
            <div></div>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className='home-skeleton-section__skeleton animate-pulse'
              ></div>
            ))}
            <div></div>
          </div>
        ) : error ? (
          <Error />
        ) : (
          data && !searchData && <LatestNews news={data.hits} />
        )}
      </div>
      {searchData && searchData.length > 0 && (
        <SearchedNews news={searchData} />
      )}
    </div>
  );
};

export default Home;
