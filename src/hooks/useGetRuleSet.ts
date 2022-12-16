import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '../api/api';
import { queryKeys } from '../api/api.constants';
import { IRuleSet } from '../api/api.interface';

export const useGetRuleSet = (
  ruleSetId: string
  // enabled = true
): UseQueryResult<IRuleSet> => {
  return useQuery<IRuleSet>([queryKeys.ruleSet, ruleSetId], () => api.fetchRuleSet(ruleSetId), {
    // retry: false,
    // enabled,
    // ToDO think about staleTime(access_token time !?) and cacheTime(refresh_token time !?)
    staleTime: Infinity,
    // cacheTime: Infinity,
  });
};
