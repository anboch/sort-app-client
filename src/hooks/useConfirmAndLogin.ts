import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../api/api';
import { IConfirmDto, IJWTs } from '../api/api.interface';
import { apiRoutes } from '../api/api.routes';
import { responseErrorMessages } from '../api/api.constants';
import { ValueOf } from '../components/common/types';
import { localStorageKeys } from '../components/common/constants';
import { useGetUser } from './useGetUser';

interface IErrorResponseData {
  error: string;
  message: ValueOf<typeof responseErrorMessages>;
  statusCode: number;
}

export const useConfirmAndLogin = (
  // todo change on Mutation
  confirmDto: IConfirmDto
): UseQueryResult<AxiosResponse<Pick<IJWTs, 'access_token'>>, AxiosError<IErrorResponseData>> => {
  const userQ = useGetUser();

  return useQuery<AxiosResponse<Pick<IJWTs, 'access_token'>>, AxiosError<IErrorResponseData>>({
    queryKey: [apiRoutes.confirmAndLogin, confirmDto],
    queryFn: () => api.confirmAndLogin(confirmDto),
    enabled: false,
    retry: false,
    staleTime: 0,
    cacheTime: 0,
    onSuccess: async ({ data }) => {
      if (data?.access_token) {
        localStorage.setItem(localStorageKeys.accessToken, data.access_token);
        await userQ.refetch();
      }
    },
  });
};
