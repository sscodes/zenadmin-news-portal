import LatestNewsSection from '../../Components/LatestNewsSection/LatestNewsSection';
import SearchedNewsSection from '../../Components/SearchedNewsSection/SearchedNewsSection';
import SearchSection from '../../Components/SerachSection/SearchSection';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <SearchSection />
      <LatestNewsSection />
      <SearchedNewsSection />
    </div>
  );
};

export default Home;
