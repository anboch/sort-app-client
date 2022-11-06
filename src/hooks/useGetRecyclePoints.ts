import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../api/api.constants';
import { IRecyclePoint } from '../api/api.interface';

export const useGetRecyclePoints = (
  recyclePointIds: string[]
  // enabled = true
): UseQueryResult<IRecyclePoint[]> => {
  return useQuery<IRecyclePoint[]>(
    [queryKeys.recyclePoints, recyclePointIds],
    () => api.fetchRecyclePointsByIds(recyclePointIds),
    {
      // retry: false,
      // enabled,
      // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
      // staleTime: Infinity,
      // cacheTime: Infinity,
    }
  );
};
