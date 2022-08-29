import { useState } from "react";
import { IUnionListItem } from "../api/api.interface";
import Fuse from "fuse.js";

export const fuseOptions = {
  // isCaseSensitive: false,
  includeScore: true,
  shouldSort: false,
  // includeMatches: true,
  // findAllMatches: false,
  minMatchCharLength: 2,
  // location: 0,
  threshold: 0.4,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
};

export const useFuseSearch = (
  unionSearchList: IUnionListItem[] | undefined
): {
  searchResult: IUnionListItem[];
  search: (value: string) => void;
} => {
  const [searchResult, setSearchResult] = useState<IUnionListItem[]>([]);
  const fuseSearchKeys: [keyof IUnionListItem] = ["title"];

  const fuseSearch = (
    query: string,
    unionSearchList: IUnionListItem[] | undefined
  ): IUnionListItem[] => {
    const queryWords = query.split(/\s+/);
    if (
      queryWords.length === 0 ||
      !unionSearchList ||
      unionSearchList.length === 0
    ) {
      return [];
    }

    const fuseByUnionSearchList = new Fuse<IUnionListItem>(unionSearchList, {
      keys: fuseSearchKeys,
      ...fuseOptions,
    });

    const fuseResults: Fuse.FuseResult<IUnionListItem>[] = [];
    [query, ...queryWords].forEach((word) => {
      if (word.length > 1)
        fuseResults.push(...fuseByUnionSearchList.search(word));
    });

    const fuseResultsWithRequiredScore = fuseResults.filter((i) => {
      if (i.score) {
        return i.score < fuseOptions.threshold;
      } else {
        return true;
      }
    });

    return makeFuseResultsUniq(fuseResultsWithRequiredScore)
      .sort((a, b) => {
        if (a.score && b.score) {
          if (a.score > b.score) {
            return 1;
          } else if (a.score < b.score) {
            return -1;
          }
        }
        if (a.refIndex > b.refIndex) {
          return 1;
        } else if (a.refIndex < b.refIndex) {
          return -1;
        }
        return 0;
      })
      .map((i) => i.item);
  };

  const makeFuseResultsUniq = (
    list: Fuse.FuseResult<IUnionListItem>[]
  ): Fuse.FuseResult<IUnionListItem>[] => {
    const uniqFuseResults: Fuse.FuseResult<IUnionListItem>[] = [];

    list.forEach((result) => {
      if (
        uniqFuseResults.filter((i) => i.item._id === result.item._id).length > 0
      ) {
        return;
      }

      const sameItems = list.filter((i) => i.item._id === result.item._id);

      if (sameItems.length === 1) {
        uniqFuseResults.push(sameItems[0]);
      } else {
        const newScore = sameItems.reduce(
          (acc, current) => acc * (current.score ?? 1),
          1
        );

        sameItems[0].score = newScore;
        uniqFuseResults.push(sameItems[0]);
      }
    });

    return uniqFuseResults;
  };

  const search = (value: string): void => {
    setSearchResult(fuseSearch(value, unionSearchList));
  };

  return { searchResult, search };
};
