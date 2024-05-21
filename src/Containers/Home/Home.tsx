import { useQuery } from '@tanstack/react-query';
import LatestNews from '../../Components/LatestNews/LatestNews';
import SearchSection from '../../Components/SerachSection/SearchSection';
import './Home.css';
import { useState } from 'react';
import SearchedNews from '../../Components/SearchedNews/SearchedNews';

const Home = () => {
  const [searchData, setSearchData] = useState([]);
  const {
    data: latestNews,
    isLoading,
    error,
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
      {!isLoading && searchData.length === 0 && (
        <LatestNews news={latestNews?.hits} />
      )}
      {searchData.length > 0 && (
        <SearchedNews news={searchData} />
      )}
    </div>
  );
};

export default Home;
