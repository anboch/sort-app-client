import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../api/api.constants';
import { IBin } from '../api/api.interface';
import { useGetUser } from './useGetUser';

export const useGetBins = (): UseQueryResult<IBin[]> => {
  const userQ = useGetUser();

  return useQuery<IBin[]>([queryKeys.bins], api.fetchBins, {
    // retry: false,
    enabled: !!userQ.data,
    // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
    // staleTime: Infinity,
    // cacheTime: Infinity,
  });
};
