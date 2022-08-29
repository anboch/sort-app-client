import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../api";
import { ISearchLists } from "../api/api.interface";

export const useFetchSearchList = (): UseQueryResult<ISearchLists> => {
  return useQuery<ISearchLists>(["search-lists"], api.fetchSearchList, {
    staleTime: 60 * 60 * 1000,
  });
};
