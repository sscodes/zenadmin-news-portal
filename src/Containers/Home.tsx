import LatestNews from '../Components/LatestNews';
import SearchSection from '../Components/SearchSection';

const Home = () => {
  return (
    <div className='home'>
      <SearchSection />
      <LatestNews />
    </div>
  );
};

export default Home;
