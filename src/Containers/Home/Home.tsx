import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Error from '../../Components/Error/Error';
import LatestNews from '../../Components/LatestNews/LatestNews';
import SearchedNews from '../../Components/SearchedNews/SearchedNews';
import SearchSection from '../../Components/SerachSection/SearchSection';
import './Home.css';

const Home = () => {
  const [searchData, setSearchData] = useState([]);
  const {
    data: latestNews,
    isLoading: latestNewsLoading,
    error: latestNewsError,
  } = useQuery({
    queryKey: ['latestNews'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/latest-news');
      return await res.json();
    },
  });

  return (
    <div className='home'>
      <SearchSection setSearchData={setSearchData} />
      <div className='latest-news'>
        <h1>Latest News:</h1>
        {latestNewsLoading ? (
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
        ) : latestNewsError ? (
          <Error />
        ) : (
          searchData.length === 0 && <LatestNews news={latestNews?.hits} />
        )}
        {searchData.length > 0 && <SearchedNews news={searchData} />}
      </div>
    </div>
  );
};

export default Home;
