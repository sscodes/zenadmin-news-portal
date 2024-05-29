import { UseQueryResult } from '@tanstack/react-query';

export type HighlightsType = {
  author: {
    matchLevel: string;
    matchedWords: string[];
    value: string;
  };
  title: {
    matchLevel: string;
    matchedWords: string[];
    value: string;
  };
  url: {
    matchLevel: string;
    matchedWords: string[];
    value: string;
  };
};

export type HitsType = {
  _highlightResult: HighlightsType;
  _tags: string[];
  author: string;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: string;
  points: number;
  story_id: number;
  title: string;
  updated_at: string;
  url: string;
};

export type NewsListsType = {
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: HitsType[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: {
    _request: {
      roundTrip: number;
    };
    getIdx: {
      load: {
        dicts: number;
        gens: number;
        total: number;
      };
      total: number;
    };
    total: number;
  };
  query: string;
  serverTimeMS: number;
};

export type ImagesTypes = {
  Profile: string;
};

export type NewsDetails = {
  author: string;
  children: NewsDetails[];
  points: number;
  title: string;
  parent_id: number;
  id: number;
  text: string;
  url: string;
};

export type SearchedNewsstore = {
  response: {
    data: NewsListsType | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  setNews: (res: UseQueryResult<NewsListsType, Error>) => void;
};

export type PaginationStoreType = {
  page: number;
  startPage: number;
  endPage: number;
  setPage: (i: number) => void;
  setPageInital: () => void;
  setStartEnd: (direction: string) => void;
  setInitalStartEnd: () => void;
  setFinalStartEnd: (totalPages: number) => void;
};
