import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../api";
import { queryKeys } from "../api/api.constants";
import { IUser } from "../api/api.interface";

export const useGetUser = (): UseQueryResult<IUser> => {
  return useQuery<IUser>([queryKeys.user], api.fetchUser, {
    retry: false,
    enabled: !!localStorage.getItem("access_token"),
    // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
