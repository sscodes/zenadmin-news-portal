import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchSearchResults } from '../../API/API';
import { HitsType } from '../../Types/Type';
import './SearchSection.css';

type propType = {
  setSearchData: React.Dispatch<React.SetStateAction<HitsType[]>>;
};

const SearchSection = ({ setSearchData }: propType) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  // const debouncedSearchKeyword = useDebounce(searchKeyword)

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
