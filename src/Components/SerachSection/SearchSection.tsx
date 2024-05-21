import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../API/API';
import './SearchSection.css';

const SearchSection = ({ setSearchData }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['search-news', searchKeyword],
    queryFn: () => fetchSearchResults(searchKeyword),
    enabled: searchKeyword.length > 0,
  });

  useEffect(() => {
    if (data?.hits) setSearchData(data.hits);
    else setSearchData([]);
  }, [data]);

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
