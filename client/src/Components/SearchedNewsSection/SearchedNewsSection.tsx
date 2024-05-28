import { useSearchParams } from 'react-router-dom';
import {
  notFoundErrorMessage,
  techErrorMessage,
} from '../../Constants/Constants';
import { useSearchedNewsStore } from '../../Zustand/Store';
import Error from '../Error/Error';
import ErrorAnimation from '../Loader/ErrorAnimation';
import Pagination from '../Pagination/Pagination';
import SearchedNews from '../SearchedNews/SearchedNews';
import Skeleton from '../Skeleton/Skeleton';

const SearchedNewsSection = () => {
  let [searchParams] = useSearchParams();
  const response = useSearchedNewsStore((state) => state.response);

  // Sorting logic based on points or date
  const handleNews = () => {
    if (searchParams.get('sortBy') === 'points')
      return response.data?.hits.sort((a, b) => b.points - a.points)!;
    if (searchParams.get('sortBy') === 'date')
      return response.data?.hits.sort(
        (a, b) => b.created_at_i - a.created_at_i
      )!;
    else return response.data?.hits!;
  };

  return (
    <>
      {response.isLoading ? (
        <Skeleton />
      ) : response.error ? (
        <Error loader={<ErrorAnimation />} message={techErrorMessage} />
      ) : response.data && response.data.hits.length > 0 ? (
        <>
          <SearchedNews news={handleNews()} />
          {response.data?.nbPages > 20 && <Pagination />}
        </>
      ) : (
        response.data &&
        response.data.hits.length === 0 && (
          <Error loader={<ErrorAnimation />} message={notFoundErrorMessage} />
        )
      )}
    </>
  );
};

export default SearchedNewsSection;
