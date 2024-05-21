import { UseQueryResult } from '@tanstack/react-query';
import { create } from 'zustand';
import { NewsListsType, SearchedNewsstore } from '../Types/Type';

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
