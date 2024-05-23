import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchResults } from '../../API/API';
import { delay } from '../../Constants/Constants';
import { useDebounce } from '../../Hooks/useDebounce';
import { usePaginationStore, useSearchedNewsStore } from '../../Zustand/Store';
import './SearchSection.css';
import useSessionStorage from '../../Hooks/useSessionStorage';

const SearchSection = () => {
  const { page, setPageInital } = usePaginationStore((state) => state);
  // for getting and setting the query and conditions in URL
  let [searchParams, setSearchParams] = useSearchParams();

  // custom hook for storing the search results in session storage
  const { setData, getData, deleteData } = useSessionStorage();

  // checking for searchKeyword in session storage else initializing to empty string
  const [searchKeyword, setSearchKeyword] = useState(
    () => getData('searchKeyword') || ''
  );

  // using custom hook for debouncing search keyword.
  const debouncedSearchKeyword = useDebounce(searchKeyword, delay);

  const searchNewsResponse = useQuery({
    queryKey: ['search-news', debouncedSearchKeyword, page],
    queryFn: () => fetchSearchResults(debouncedSearchKeyword, page),
    enabled: debouncedSearchKeyword.length > 0,
  });

  // setting search results on global state
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
    // setting to default when search input section is emptied
    if (searchKeyword.length === 0) {
      setSortInital();
      setPageInital();
      searchParams.delete('sortByPoints');
      setSearchParams(searchParams, { replace: true });
    }
    // setting query on URL
    setSearchParams({ query: searchKeyword });

    // logic for setting & deleting search results on session storage
    if (searchKeyword.length > 0) setData('searchKeyword', searchKeyword);
    else deleteData('searchKeyword');
  }, [searchKeyword]);

  useEffect(() => {
    // logic for setting search by points on URL
    if (sortByPoints && searchKeyword.length > 0)
      searchParams.set('sortByPoints', sortByPoints.toString());
    else searchParams.delete('sortByPoints');
    // logic for setting search by date on URL
    if (sortByDate && searchKeyword.length > 0)
      searchParams.set('sortByDate', sortByDate.toString());
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
          value={searchKeyword}
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
