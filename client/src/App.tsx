import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';

const Home = lazy(() => import('./Containers/Home/Home'));
const NewsDetail = lazy(() => import('./Containers/NewsDetail/NewsDetail'));

function App() {
  return (
    <>
      <Header />
      <div className='hero-section'>
        <Suspense
          fallback={
            <div className='loader-section'>
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/news/:id' element={<NewsDetail />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
