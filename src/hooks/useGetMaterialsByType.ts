import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../api";
import { queryKeys } from "../api/api.constants";
import { IMaterial, IType } from "../api/api.interface";

// todo switch to useGetTypes
export const useGetMaterialsByType = (
  typeID: string,
  enabled = true
): UseQueryResult<IMaterial[]> => {
  return useQuery<IMaterial[]>(
    [queryKeys.materialsByType, typeID],
    () => api.fetchMaterialsByType(typeID),
    {
      enabled,
      // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
      staleTime: 60 * 60 * 1000,
      // cacheTime: Infinity,
    }
  );
};
