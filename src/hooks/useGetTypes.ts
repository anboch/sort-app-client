import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { IType } from '../api/api.interface';

// ToDO think about staleTime and cacheTime
export const useGetTypes = (typeIDs: string[], enabled = true): UseQueryResult<IType>[] => {
  return useQueries({
    queries: typeIDs.map((typeId) => {
      return {
        queryKey: [queryKeys.type, typeId],
        queryFn: () => api.fetchType(typeId),
        staleTime: 60 * 60 * 1000,
        enabled,
      };
    }),
  });
};
