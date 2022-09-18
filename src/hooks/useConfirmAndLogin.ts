import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../api";
import { IConfirmDto, IJWTs } from "../api/api.interface";
import { apiRoutes } from "../routes";
import { responseErrorMessages } from "../api/api.constants";
import { useEffect } from "react";

interface IErrorResponseData {
  error: string;
  message: typeof responseErrorMessages[keyof typeof responseErrorMessages];
  statusCode: number;
}

export const useConfirmAndLogin = (
  // change on Mutation
  confirmDto: IConfirmDto
): UseQueryResult<
  AxiosResponse<Pick<IJWTs, "access_token">>,
  AxiosError<IErrorResponseData>
> => {
  const confirmAndLoginQ = useQuery<
    AxiosResponse<Pick<IJWTs, "access_token">>,
    AxiosError<IErrorResponseData>
  >([apiRoutes.confirmAndLogin], () => api.confirmAndLogin(confirmDto), {
    // ToDO think about staleTime
    enabled: false,
    retry: false,
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    // todo localStorage names to var
    if (confirmAndLoginQ.data?.data?.access_token)
      localStorage.setItem(
        "access_token",
        confirmAndLoginQ.data?.data?.access_token
      );
  }, [confirmAndLoginQ.isSuccess]);

  return confirmAndLoginQ;
};
