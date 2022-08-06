
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

import { SearchBar } from "../../components/SearchBar/";
import { withLayout } from "../../components/layout/Layout";
import { Filters } from '../../components/Filters';

import mockSearchLists from "../../mock/api-material-searchList.json";
import { StyledSearch } from './SearchPageStyles';
import { MaterialsList } from '../../components/MaterialsList';
import { ICategory, IMaterial } from '../../mock/api.interface';

export type OnChangeEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

export enum SearchItemType {
  material = 'material',
  cluster = 'cluster',
  category = 'category'
}

export interface IUnionListItem {
  _id: string;
  title: string;
  type: SearchItemType
}

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


const flatTagList = (): IUnionListItem[] => {
  const tagList: IUnionListItem[] = [];
  mockSearchLists.clusters.forEach((cluster) =>
    cluster.titles.forEach((title) =>
      tagList.push({ _id: cluster._id, title, type: SearchItemType.cluster })
    )
  );
  return tagList;
};

const createUnionSearchList = (): IUnionListItem[] => {
  const unionSearchList: IUnionListItem[] = [];

  mockSearchLists.categories.forEach(({ _id, title }) =>
    unionSearchList.push({ _id, title, type: SearchItemType.category })
  );

  // the same as flatTagList() ---
  mockSearchLists.clusters.forEach((cluster) =>
    cluster.titles.forEach((title) =>
      unionSearchList.push({ _id: cluster._id, title, type: SearchItemType.cluster })
    )
  );
  // ---

  mockSearchLists.materials.forEach((material) =>
    material.titles.forEach((title) =>
      unionSearchList.push({ _id: material._id, title, type: SearchItemType.material })
    )
  );

  return unionSearchList;
};

const fuseSearchKeys: [keyof IUnionListItem] = ["title"];
const fuseByUnionSearchList = new Fuse<IUnionListItem>(
  createUnionSearchList(),
  {
    keys: fuseSearchKeys,
    ...fuseOptions,
  });

const findHints = (query: string): IUnionListItem[] => {
  const queryWords = query.split(/\s+/);
  if (queryWords.length === 0) return [];

  const resultList: Fuse.FuseResult<IUnionListItem>[] = [];
  queryWords.forEach((word) => {
    resultList.push(...fuseByUnionSearchList.search(word));
  });
  return resultList
    .filter((i) => {
      if (i.score) {
        return i.score < fuseOptions.threshold;
      } else {
        return true;
      }
    })
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



const Search = (): JSX.Element => {
  const [hints, setHints] = useState<IUnionListItem[]>([]);
  const [categoryList, setCategoryList] = useState<ICategory[]>(mockSearchLists.categories);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [tagList, setTagList] = useState<IUnionListItem[]>(flatTagList());
  const [selectedTags, setSelectedTag] = useState<IUnionListItem[]>([]);
  const [resultList, setResultList] = useState<IMaterial[]>(mockSearchLists.materials);

  const onSearchInputChange = (value: string): void => setHints(findHints(value));

  const addFilter = (hint: IUnionListItem): void => {
    if (hint.type === SearchItemType.category) {
      setSelectedCategory(hint);
    }
    if (hint.type === SearchItemType.cluster) {
      setSelectedTag((currentSelectedTags) => [...currentSelectedTags, hint]);
    }
  };


  useEffect(() => {
    let filteredMaterialList = mockSearchLists.materials;

    if (selectedCategory) {
      filteredMaterialList = filteredMaterialList.filter(i => i.categoryID._id === selectedCategory._id);
    }
    if (selectedTags.length > 0) {
      filteredMaterialList = filteredMaterialList.filter(i => {
        if (i.clusterID) {
          return selectedTags.map(tag => tag._id).includes(i.clusterID._id);
        }
      });
    }

    setResultList(filteredMaterialList);
  }, [selectedCategory, selectedTags]);



  return (
    <StyledSearch>
      <SearchBar
        placeholder="Search by name or type"
        onSearchInputChange={onSearchInputChange}
        addFilter={addFilter}
        searchBarWidth="60vw"
        hints={hints}
      />
      <Filters
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        onCategoryChange={(_, value: ICategory | null): void => {
          setSelectedCategory(value);
        }}
        tagList={tagList}
        selectedTags={selectedTags}
        onTagChange={(_, value: IUnionListItem[]): void => {
          setSelectedTag(value);
        }}
      />
      <MaterialsList materials={resultList} />
    </StyledSearch>
  );
};

export default withLayout(Search);
