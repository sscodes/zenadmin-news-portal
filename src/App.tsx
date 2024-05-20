import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Containers/Home';
import NewsDetail from './Containers/NewsDetail/NewsDetail';
import Header from './Components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <div className='hero-section'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/news' element={<NewsDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
