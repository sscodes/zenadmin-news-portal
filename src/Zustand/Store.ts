import { UseQueryResult } from '@tanstack/react-query';
import { create } from 'zustand';
import { NewsListsType, SearchedNewsstore } from '../Types/Type';

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
