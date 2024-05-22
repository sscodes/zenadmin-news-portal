import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../API/API';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './SearchSection.css';
import { useDebounce } from '../../Hooks/useDebounce';
import { delay } from '../../Constants/Constants';

const SearchSection = ({ page }: { page: number }) => {
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
    if (searchKeyword.length === 0) setSortInital();
  }, [searchKeyword]);

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
                className={`search-section__button-section__sort-button ${
                  sortByPoints ? 'selected' : ''
                }`}
                onClick={setSortByPoints}
              >
                Sort by Points
              </button>
            </div>
            <div>
              <button
                className={`search-section__button-section__sort-button ${
                  sortByDate ? 'selected' : ''
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
