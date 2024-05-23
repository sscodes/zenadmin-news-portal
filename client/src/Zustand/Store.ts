import { UseQueryResult } from '@tanstack/react-query';
import { create } from 'zustand';
import { NewsListsType, PaginationStoreType, SearchedNewsstore } from '../Types/Type';

export const useSearchedNewsStore = create<SearchedNewsstore>((set) => ({
  response: {
    data: undefined,
    isLoading: false,
    error: null,
  },
  sortByPoints: false,
  sortByDate: true,
  setNews: (res: UseQueryResult<NewsListsType, Error>) => {
    set(() => ({
      response: {
        data: res.data,
        isLoading: res.isLoading,
        error: res.error,
      },
    }));
  },
  setSortByPoints: () => {
    set((state) => ({
      sortByPoints: !state.sortByPoints,
      sortByDate: false,
    }));
  },
  setSortByDate: () => {
    set((state) => ({
      sortByPoints: false,
      sortByDate: !state.sortByDate,
    }));
  },
  setSortInital: () => {
    set(() => ({
      sortByPoints: true,
      sortByDate: false,
    }));
  },
}));

export const usePaginationStore = create<PaginationStoreType>((set) => ({
  page: 0,
  setPage: (i: number) => {
    set(() => ({
      page: i,
    }));
  },
  setPageInital: () => {
    set(() => ({
      page: 0,
    }));
  },
}));
