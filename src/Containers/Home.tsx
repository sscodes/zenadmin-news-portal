import Header from '../Components/Header';
import LatestNews from '../Components/LatestNews';
import SearchSection from '../Components/SearchSection';

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <SearchSection />
      <LatestNews />
    </div>
  );
};

export default Home;
