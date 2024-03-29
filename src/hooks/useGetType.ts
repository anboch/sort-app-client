import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { IType } from '../api/api.interface';

// todo switch to useGetTypes
export const useGetType = (typeID: string, enabled = true): UseQueryResult<IType> => {
  return useQuery<IType>([queryKeys.type, typeID], () => api.fetchType(typeID), {
    // retry: false,
    enabled,
    // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
    staleTime: 60 * 60 * 1000,
    // cacheTime: Infinity,
  });
};
