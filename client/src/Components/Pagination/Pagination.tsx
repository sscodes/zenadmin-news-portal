import { usePaginationStore, useSearchedNewsStore } from '../../Zustand/Store';
import './Pagination.css';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';

const Pagination = () => {
  const { page, setPage } = usePaginationStore((state) => state);
  const response = useSearchedNewsStore((state) => state.response);
  const totalPages = response.data?.nbPages || 0;

  const getPrevPage = () => {
    if (page === 0) return totalPages - 1;
    return page - 1;
  };
  const getNextPage = () => (page + 1) % totalPages;
  return (
    <div className='pagination-container'>
      <div
        className='pagination-container__pagination-icons'
        onClick={() => setPage(getPrevPage())}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
      {[...Array(totalPages)].map((_, i) => (
        <div
          className={`pagination-container__pagination ${
            page === i ? 'pagination-container__pagination--selected' : ''
          }`}
          onClick={() => setPage(i)}
          key={i}
        >
          {i + 1}
        </div>
      ))}
      <div
        className='pagination-container__pagination-icons'
        onClick={() => setPage(getNextPage())}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
