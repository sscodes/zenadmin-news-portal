import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../API/API';
import { useSearchedNewsStore } from '../../Zustand/Store';
import './SearchSection.css';
import { useDebounce } from '../../Hooks/useDebounce';
import { delay } from '../../Constants/Constants';

const SearchSection = ({ page }: { page: number }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const debouncedSearchKeyword = useDebounce(searchKeyword, delay)

  const searchNewsResponse = useQuery({
    queryKey: ['search-news', debouncedSearchKeyword, page],
    queryFn: () => fetchSearchResults(debouncedSearchKeyword, page),
    enabled: debouncedSearchKeyword.length > 0,
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
