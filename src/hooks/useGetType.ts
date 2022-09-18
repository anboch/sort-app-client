import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../api";
import { queryKeys } from "../api/api.constants";
import { IType } from "../api/api.interface";

export const useGetType = (
  typeID: string,
  enabled: boolean
): UseQueryResult<IType> => {
  return useQuery<IType>(
    [queryKeys.type, typeID],
    () => api.fetchType(typeID),
    {
      // retry: false,
      enabled,
      // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
      staleTime: Infinity,
      // cacheTime: Infinity,
    }
  );
};
