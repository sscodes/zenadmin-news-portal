import { UseQueryResult } from '@tanstack/react-query';
import { create } from 'zustand';
import { NewsListsType } from '../Types/Type';

type SearchedNewsstore = {
  response: {
    data: NewsListsType | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  setNews: (res: UseQueryResult<NewsListsType, Error>) => void;
};

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
