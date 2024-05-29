import { UseQueryResult } from '@tanstack/react-query';
import { create } from 'zustand';
import {
  NewsListsType,
  PaginationStoreType,
  SearchedNewsstore,
} from '../Types/Type';
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '../Constants/Constants';

export const useSearchedNewsStore = create<SearchedNewsstore>((set) => ({
  response: {
    data: undefined,
    isLoading: false,
    error: null,
  },
  setNews: (res: UseQueryResult<NewsListsType, Error>) => {
    set(() => ({
      response: {
        data: res.data,
        isLoading: res.isLoading,
        error: res.error,
      },
    }));
  },
}));

export const usePaginationStore = create<PaginationStoreType>((set) => ({
  page: 0,
  startPage: 1,
  endPage: 9,
  setPage: (i: number) => {
    set(() => ({
      page: i,
    }));
  },
  setStartEnd: (direction: string) => {
    if (direction === DIRECTION_LEFT)
      set((state) => ({
        startPage: state.startPage - 1,
        endPage: state.endPage - 1,
      }));
    else if (direction === DIRECTION_RIGHT)
      set((state) => ({
        startPage: state.startPage + 1,
        endPage: state.endPage + 1,
      }));
  },
  setInitalStartEnd: () => {
    set(() => ({
      startPage: 1,
      endPage: 9,
    }));
  },
  setFinalStartEnd: (totalPages) => {
    set(() => ({
      startPage: totalPages-10,
      endPage: totalPages-2,
    }));
  },
  setPageInital: () => {
    set(() => ({
      page: 0,
    }));
  },
}));
