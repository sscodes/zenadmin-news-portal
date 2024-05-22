import { useSearchedNewsStore } from '../../Zustand/Store';
import './Pagination.css';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';

const Pagination = ({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const response = useSearchedNewsStore((state) => state.response);
  const totalPages = response.data?.nbPages || 0;
  return (
    <div className='pagination-container'>
      <div
        className='pagination-icons'
        onClick={() =>
          setPage((i) => {
            console.log(i);
            if (i === 0) return totalPages - 1;
            return i - 1;
          })
        }
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
      {[...Array(totalPages)].map((_, i) => (
        <div
          className={`pagination ${page === i ? 'pagination-selected' : ''}`}
          onClick={() => setPage(i)}
          key={i}
        >
          {i + 1}
        </div>
      ))}
      <div
        className='pagination-icons'
        onClick={() => setPage((i) => (i + 1) % totalPages)}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </div>
    </div>
  );
};

export default Pagination;
