import { useState } from 'react';
import { IUnionListItem } from '../api/api.interface';
import Fuse from 'fuse.js';

export const fuseOptions = {
  // isCaseSensitive: false,
  includeScore: true,
  shouldSort: false,
  // includeMatches: true,
  // findAllMatches: false,
  minMatchCharLength: 1,
  // location: 0,
  threshold: 0.35,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
};

export const useFuseSearch = (
  unionSearchList: IUnionListItem[] | undefined
): {
  searchQuery: string;
  searchResult: IUnionListItem[];
  search: (value: string) => void;
} => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IUnionListItem[]>([]);
  const fuseSearchKeys: [keyof IUnionListItem] = ['title'];

  const makeFuseResultsUniq = (
    list: Fuse.FuseResult<IUnionListItem>[]
  ): Fuse.FuseResult<IUnionListItem>[] => {
    const uniqFuseResults: Fuse.FuseResult<IUnionListItem>[] = [];

    list.forEach((result) => {
      if (uniqFuseResults.find((i) => i.item._id === result.item._id)) {
        return;
      }

      const sameItems = list.filter((i) => i.item._id === result.item._id);

      if (sameItems.length === 1) {
        uniqFuseResults.push(sameItems[0]);
      } else {
        const newScore = sameItems.reduce((acc, current) => acc * (current.score ?? 1), 1);

        sameItems[0].score = newScore;
        uniqFuseResults.push(sameItems[0]);
      }
    });

    return uniqFuseResults;
  };

  const fuseSearch = (
    query: string,
    unionSearchList: IUnionListItem[] | undefined
  ): IUnionListItem[] => {
    const queryWords = query.split(/\s+/);
    if (queryWords.length === 0 || !unionSearchList || unionSearchList.length === 0) {
      return [];
    }

    const fuseByUnionSearchList = new Fuse<IUnionListItem>(unionSearchList, {
      keys: fuseSearchKeys,
      ...fuseOptions,
    });

    const fuseResults: Fuse.FuseResult<IUnionListItem>[] = [...new Set([query, ...queryWords])]
      .filter((word) => word.length >= fuseOptions.minMatchCharLength)
      .flatMap((word) => fuseByUnionSearchList.search(word));

    // todo to know why it (threshold) doesn't work in Fuse
    const fuseResultsWithRequiredScore = fuseResults.filter((i) => {
      if (i.score) {
        return i.score < fuseOptions.threshold * 1.6;
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

  const search = (value: string): void => {
    setSearchResult(fuseSearch(value, unionSearchList));
    setSearchQuery(value);
  };

  return { searchQuery, searchResult, search };
};
