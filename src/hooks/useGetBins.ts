import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../api/api.constants';
import { IBin } from '../api/api.interface';

export const useGetBins = (): UseQueryResult<IBin[]> => {
  return useQuery<IBin[]>([queryKeys.bins], api.fetchBins, {
    // retry: false,
    enabled: !!localStorage.getItem('access_token'),
    // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
    // staleTime: Infinity,
    // cacheTime: Infinity,
  });
};
