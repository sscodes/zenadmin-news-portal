import { useQuery } from '@tanstack/react-query';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchResults } from '../../API/API';
import { delay } from '../../Constants/Constants';
import { useDebounce } from '../../Hooks/useDebounce';
import useSessionStorage from '../../Hooks/useSessionStorage';
import { usePaginationStore, useSearchedNewsStore } from '../../Zustand/Store';
import './SearchSection.css';

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
  const setNews = useSearchedNewsStore((state) => state.setNews);

  useEffect(() => {
    setNews(searchNewsResponse);
  }, [
    searchNewsResponse.data,
    searchNewsResponse.isLoading,
    searchNewsResponse.error,
  ]);

  const checkSearchKeyword: ChangeEventHandler<HTMLInputElement> = (event) => {
    const str = event.target.value;
    setSearchKeyword(str);
    if (str.length === 0) {
      setPageInital();
      searchParams.delete('sortByPoints');
      setSearchParams(searchParams, { replace: true });
    }
    // setting query on URL
    setSearchParams({ query: str });

    // logic for setting & deleting search results on session storage
    if (str.length > 0) setData('searchKeyword', str);
    else deleteData('str');
  };

  const setParams = (val: string) => {
    if (searchKeyword.length > 0) {
      searchParams.set('sortBy', val);
    } else searchParams.delete('sortBy');
    setSearchParams(searchParams, { replace: true });
  };

  const paramsValue = searchParams.get('sortBy');

  return (
    <div className='search-section'>
      <div className='search-section__input-section'>
        <input
          type='text'
          placeholder='Search News...'
          onChange={checkSearchKeyword}
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
                  paramsValue === 'points'
                    ? 'search-section__sort-button--selected'
                    : ''
                }`}
                onClick={() => setParams('points')}
              >
                Sort by Points
              </button>
            </div>
            <div>
              <button
                className={`search-section__sort-button ${
                  paramsValue === 'date'
                    ? 'search-section__sort-button--selected'
                    : ''
                }`}
                onClick={() => setParams('date')}
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
