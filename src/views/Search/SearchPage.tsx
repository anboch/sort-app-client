
import { useEffect, useState } from "react";

import { SearchBar } from "../../components/SearchBar/";
import { withLayout } from "../../components/layout/Layout";
import { Filters } from '../../components/Filters';
import * as hooks from '../../hooks';
import { StyledSearchPage } from './SearchPageStyles';
import { MaterialList } from '../../components/MaterialList';
import { IMaterial, ITag, SearchItemKind } from '../../api/api.interface';
import { TagList } from '../../components/TagList';

export type OnChangeEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

const Search = (): JSX.Element => {
  const [selectedTags, setSelectedTag] = useState<ITag[]>([]);
  const [materialList, setMaterialList] = useState<IMaterial[]>([]);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const fetchSearchListQ = hooks.useFetchSearchList();
  const { searchResult, search } = hooks.useFuseSearch(fetchSearchListQ.data?.union);

  const addFilter = (tagID: string): void => {
    const selectedTagIDs = selectedTags.map(selectedTag => selectedTag._id);
    const newSelectedTag = fetchSearchListQ.data?.tags.find(tag => tag._id === tagID);

    if (!selectedTagIDs.includes(tagID) && newSelectedTag) {
      setSearchInputValue('');
      search('');
      setSelectedTag((currentSelectedTags) => [...currentSelectedTags, newSelectedTag]);
    }
  };

  useEffect(() => {
    const allMaterials = Object.values(fetchSearchListQ.data?.materialsObj ?? {});
    const allMaterialsObj = fetchSearchListQ.data?.materialsObj;
    const selectedTagIDs = selectedTags.map(selectedTag => selectedTag._id);
    let newMaterialList: IMaterial[] = [];
    const newTagList: ITag[] = [];

    if ((searchResult.length > 0 && allMaterialsObj) || selectedTags.length > 0) {
      newMaterialList = allMaterials;
    }

    if (searchResult.length > 0 && allMaterialsObj) {
      newMaterialList = [];
      searchResult
        .filter(i => (i.kind === SearchItemKind.material))
        .map(i => i._id)
        .forEach(id => newMaterialList.push(allMaterialsObj[id]));

      searchResult
        .filter(i => (i.kind === SearchItemKind.tag))
        .map(i => i._id)
        .forEach(id => {
          const foundTag = fetchSearchListQ.data?.tags.find(tag => tag._id === id);
          if (foundTag && !selectedTagIDs.includes(foundTag._id)) {
            newTagList.push(foundTag);
          }
        });
    }

    if (selectedTags.length > 0) {
      newMaterialList = newMaterialList.filter(material => {
        const currentMaterialTagIDs = material.tagIDs.map(tag => tag._id);

        return currentMaterialTagIDs.filter(id => selectedTagIDs.includes(id)).length === selectedTagIDs.length;
      });
    }

    setMaterialList(newMaterialList);
    setTagList(newTagList);
  }, [selectedTags, fetchSearchListQ.data?.materialsObj, searchResult, fetchSearchListQ.data?.tags]);


  return (
    <StyledSearchPage>
      <SearchBar
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        placeholder="Search by name or type"
        addFilter={addFilter}
        searchBarWidth="60vw"
        exactSearch={search}
      />
      {selectedTags.length > 0 &&
        <Filters
          tagList={fetchSearchListQ.data?.tags}
          selectedTags={selectedTags}
          onTagChange={(_, value: ITag[]): void => {
            setSelectedTag(value);
          }}
        />}
      {tagList.length > 0 &&
        <TagList tags={tagList} addFilter={addFilter} />
      }
      <MaterialList materials={materialList} />
    </StyledSearchPage>
  );
};

export default withLayout(Search);
