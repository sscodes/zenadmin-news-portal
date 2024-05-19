import { useQuery } from '@tanstack/react-query';
import LatestNews from '../Components/LatestNews/LatestNews';
import SearchSection from '../Components/SerachSection/SearchSection';

const Home = () => {
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
      <SearchSection />
      {!isLoading && <LatestNews news={latestNews?.hits} />}
    </div>
  );
};

export default Home;
