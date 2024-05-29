import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '../../Constants/Constants';
import { usePaginationStore, useSearchedNewsStore } from '../../Zustand/Store';
import './Pagination.css';
import { useEffect } from 'react';

const Pagination = () => {
  const {
    page,
    setPage,
    setStartEnd,
    startPage,
    endPage,
    setInitalStartEnd,
    setFinalStartEnd,
  } = usePaginationStore((state) => state);

  const response = useSearchedNewsStore((state) => state.response);
  const totalPages = response.data?.nbPages || 0;

  const getPrevPage = () => {
    if (page === 0) return totalPages - 1;
    return page - 1;
  };
  const getNextPage = () => (page + 1) % totalPages;

  const handlePreviousPage = () => {
    if (page <= totalPages-9) setStartEnd(DIRECTION_LEFT);
    setPage(getPrevPage());
  };

  const handleNextPage = () => {
    if (page >= 9) setStartEnd(DIRECTION_RIGHT);
    setPage(getNextPage());
  };

  useEffect(() => {
    if (page === totalPages-1) setFinalStartEnd(totalPages);
    if (page === 0) setInitalStartEnd();
  }, [page])

  return (
    <div className='pagination-container'>
      <div
        className='pagination-container__pagination-icons'
        onClick={handlePreviousPage}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
      {totalPages <= 20 ? (
        [...Array(totalPages)].map((_, i) => (
          <div
            className={`pagination-container__pagination ${
              page === i ? 'pagination-container__pagination--selected' : ''
            }`}
            onClick={() => setPage(i)}
            key={i}
          >
            {i + 1}
          </div>
        ))
      ) : (
        <>
          <div
            className={`pagination-container__pagination ${
              page === 0 ? 'pagination-container__pagination--selected' : ''
            }`}
            onClick={() => setPage(0)}
          >
            1
          </div>
          {startPage > 1 &&
            [...Array(3)].map((_, i) => (
              <div className={`pagination-container__pagination__dots`} key={i}>
                .
              </div>
            ))}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
            (el, i) => (
              <div
                className={`pagination-container__pagination ${
                  page === el
                    ? 'pagination-container__pagination--selected'
                    : ''
                }`}
                onClick={() => setPage(el)}
                key={i}
              >
                {el + 1}
              </div>
            )
          )}
          {endPage < totalPages-2 &&
            [...Array(3)].map((_, i) => (
              <div className={`pagination-container__pagination__dots`} key={i}>
                .
              </div>
            ))}
          <div
            className={`pagination-container__pagination ${
              page === totalPages - 1
                ? 'pagination-container__pagination--selected'
                : ''
            }`}
            onClick={() => setPage(totalPages - 1)}
          >
            {totalPages}
          </div>
        </>
      )}
      <div
        className='pagination-container__pagination-icons'
        onClick={handleNextPage}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
