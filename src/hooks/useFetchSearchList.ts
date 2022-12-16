import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { ISearchLists } from '../api/api.interface';

export const useFetchSearchList = (): UseQueryResult<ISearchLists> => {
  return useQuery<ISearchLists>([queryKeys.searchList], api.fetchSearchList, {
    staleTime: 60 * 60 * 1000,
  });
};
