import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api';
import { queryKeys } from '../api/api.constants';
import { IUser } from '../api/api.interface';
import { localStorageKeys } from '../components/common/constants';

export const useGetUser = (): UseQueryResult<IUser> => {
  const client = useQueryClient();
  return useQuery<IUser>([queryKeys.user], api.fetchUser, {
    notifyOnChangeProps: 'all',
    retry: false,
    enabled: !!localStorage.getItem(localStorageKeys.accessToken),
    // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
    // staleTime: Infinity,
    // cacheTime: Infinity,
    onError: () => {
      client.removeQueries([queryKeys.user]);
    },
  });
};
