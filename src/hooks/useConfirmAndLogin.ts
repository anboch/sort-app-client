import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../api';
import { IConfirmDto, IJWTs } from '../api/api.interface';
import { apiRoutes } from '../routes';
import { queryKeys, responseErrorMessages } from '../api/api.constants';

interface IErrorResponseData {
  error: string;
  message: typeof responseErrorMessages[keyof typeof responseErrorMessages];
  statusCode: number;
}

export const useConfirmAndLogin = (
  // todo change on Mutation
  confirmDto: IConfirmDto
): UseQueryResult<AxiosResponse<Pick<IJWTs, 'access_token'>>, AxiosError<IErrorResponseData>> => {
  const client = useQueryClient();

  return useQuery<AxiosResponse<Pick<IJWTs, 'access_token'>>, AxiosError<IErrorResponseData>>({
    queryKey: [apiRoutes.confirmAndLogin, confirmDto],
    queryFn: () => api.confirmAndLogin(confirmDto),
    enabled: false,
    retry: false,
    staleTime: 0,
    cacheTime: 0,
    onSuccess: async ({ data }) => {
      if (data?.access_token) {
        // todo localStorage names to var
        localStorage.setItem('access_token', data.access_token);
      }
      await client.invalidateQueries([queryKeys.user]);
      await client.invalidateQueries([queryKeys.bins]);
    },
  });
};
