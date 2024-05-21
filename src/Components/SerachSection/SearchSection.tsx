import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../API/API';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './SearchSection.css';

const SearchSection = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  // const debouncedSearchKeyword = useDebounce(searchKeyword)

  const searchNewsResponse = useQuery({
    queryKey: ['search-news', searchKeyword],
    queryFn: () => fetchSearchResults(searchKeyword),
    enabled: searchKeyword.length > 0,
  });

  const setNews = useSearchedNewsStore((state) => state.setNews);

  useEffect(() => {
    setNews(searchNewsResponse);
  }, [
    searchNewsResponse.data,
    searchNewsResponse.isLoading,
    searchNewsResponse.error,
  ]);

  return (
    <div className='search-section'>
      <input
        type='text'
        placeholder='Search News...'
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );
};

export default SearchSection;
