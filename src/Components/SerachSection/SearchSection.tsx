import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchResults } from '../../API/API';
import { delay } from '../../Constants/Constants';
import { useDebounce } from '../../Hooks/useDebounce';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './SearchSection.css';

const SearchSection = ({ page }: { page: number }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState('');

  const debouncedSearchKeyword = useDebounce(searchKeyword, delay);

  const searchNewsResponse = useQuery({
    queryKey: ['search-news', debouncedSearchKeyword, page],
    queryFn: () => fetchSearchResults(debouncedSearchKeyword, page),
    enabled: debouncedSearchKeyword.length > 0,
  });

  const {
    setNews,
    sortByPoints,
    sortByDate,
    setSortByPoints,
    setSortByDate,
    setSortInital,
  } = useSearchedNewsStore((state) => state);

  useEffect(() => {
    setNews(searchNewsResponse);
  }, [
    searchNewsResponse.data,
    searchNewsResponse.isLoading,
    searchNewsResponse.error,
  ]);

  useEffect(() => {
    if (searchKeyword.length === 0) {
      setSortInital();
      searchParams.delete('sortByPoints');
      setSearchParams(searchParams, { replace: true });
    }
    setSearchParams({ query: searchKeyword });
  }, [searchKeyword]);

  useEffect(() => {
    if (sortByPoints) searchParams.set('sortByPoints', sortByPoints.toString());
    else searchParams.delete('sortByPoints');
    if (sortByDate) searchParams.set('sortByDate', sortByDate.toString());
    else searchParams.delete('sortByDate');
    setSearchParams(searchParams, { replace: true });
  }, [sortByPoints, sortByDate]);

  return (
    <div className='search-section'>
      <div className='search-section__input-section'>
        <input
          type='text'
          placeholder='Search News...'
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      {searchKeyword.length > 0 &&
        searchNewsResponse.data &&
        searchNewsResponse.data.hits.length > 0 && (
          <div className='search-section__button-section'>
            <div>
              <button
                className={`search-section__sort-button ${
                  sortByPoints ? 'search-section__sort-button--selected' : ''
                }`}
                onClick={setSortByPoints}
              >
                Sort by Points
              </button>
            </div>
            <div>
              <button
                className={`search-section__sort-button ${
                  sortByDate ? 'search-section__sort-button--selected' : ''
                }`}
                onClick={setSortByDate}
              >
                Sort by Date
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchSection;
