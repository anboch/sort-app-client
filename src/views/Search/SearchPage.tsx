import { useEffect, useMemo, useState } from 'react';

import { SearchBar } from '../../components/SearchBar/SearchBar';
import { withLayout } from '../../components/layout/Layout';
import { Filters } from '../../components/Filters/Filters';
import * as S from './SearchPageStyles';
import { MaterialList } from '../../components/MaterialList/MaterialList';
import { IMaterial, ITag, SearchItemKind } from '../../api/api.interface';
import { TagList } from '../../components/TagList/TagList';
import { getIDs } from '../../utils/utils';
import { MaterialNotFoundNotice } from '../../components/MaterialNotFoundNotice/MaterialNotFoundNotice';
import { localStorageKeys } from '../../components/common/constants';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../routes';
import { useFetchSearchList } from '../../hooks/useFetchSearchList';
import { useFuseSearch } from '../../hooks/useFuseSearch';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { Typography } from '@mui/material';

export type OnChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

const Search = (): JSX.Element => {
  const [selectedTags, setSelectedTag] = useState<ITag[]>([]);
  const [materialList, setMaterialList] = useState<IMaterial[]>([]);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const fetchSearchListQ = useFetchSearchList();
  const allMaterialsObj = fetchSearchListQ.data?.materialsObj;
  const allTags = useMemo(() => fetchSearchListQ.data?.tags ?? [], [fetchSearchListQ.data?.tags]);
  const allMaterials = useMemo(() => Object.values(allMaterialsObj ?? {}), [allMaterialsObj]);

  const { searchQuery, searchResult, search } = useFuseSearch(fetchSearchListQ.data?.union);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(localStorageKeys.viewedAboutPage)) {
      navigate(pageRoutes.about);
    }
  }, []);

  // todo filters to a hook
  const addFilter = (tagID: string): void => {
    const selectedTagIDs = getIDs(selectedTags);
    const newSelectedTag = allTags.find((tag) => tag._id === tagID);

    // todo filter tags from suggestion list before
    if (!selectedTagIDs.includes(tagID) && newSelectedTag) {
      setSearchInputValue('');
      search('');
      setSelectedTag((currentSelectedTags) => [...currentSelectedTags, newSelectedTag]);
    }
  };

  useEffect(() => {
    if (!allMaterialsObj) {
      return;
    }

    let newMaterialList: IMaterial[] = [];
    const newTagList: ITag[] = [];

    if (searchQuery) {
      searchResult
        .filter((i) => i.kind === SearchItemKind.material)
        .map((i) => i._id)
        .forEach((id) => newMaterialList.push(allMaterialsObj[id]));

      searchResult
        .filter((i) => i.kind === SearchItemKind.tag)
        .map((i) => i._id)
        .forEach((id) => {
          const foundTag = allTags.find((tag) => tag._id === id);
          if (foundTag && !getIDs(selectedTags).includes(foundTag._id)) {
            newTagList.push(foundTag);
          }
        });
    } else if (selectedTags.length > 0) {
      newMaterialList = allMaterials;
    }

    if (selectedTags.length > 0) {
      newMaterialList = newMaterialList.filter((material) => {
        const currentMaterialTagIDs = material.tagIDs.map((tag) => tag._id);

        return getIDs(selectedTags).every((tagId) => currentMaterialTagIDs.includes(tagId));
      });
    }

    setMaterialList(newMaterialList);
    setTagList(newTagList);
  }, [allMaterialsObj, allMaterials, searchResult, selectedTags, allTags, searchQuery]);

  // {shouldRedirect && <Navigate replace to="/home" />}

  // todo send error notification to the server
  if (fetchSearchListQ.isError) {
    return (
      <S.SearchPage>
        <Typography variant="body1">
          Ошибка при загрузке данных, попробуйте обновить страницу
        </Typography>
      </S.SearchPage>
    );
  }
  if (
    (fetchSearchListQ.isLoading && fetchSearchListQ.isFetching) ||
    !fetchSearchListQ.data?.union?.length
  ) {
    return <LoadingSpinner />;
  }

  return (
    <S.SearchPage>
      <SearchBar
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        placeholder="Картон, тетрапак, lego ..."
        addFilter={addFilter}
        exactSearch={search}
      />
      {selectedTags.length > 0 && (
        <Filters
          tagList={allTags}
          selectedTags={selectedTags}
          onTagChange={(_, value: ITag[]): void => {
            setSelectedTag(value);
          }}
        />
      )}
      {tagList.length > 0 && <TagList tags={tagList} addFilter={addFilter} />}
      <MaterialList materials={materialList} />
      <MaterialNotFoundNotice
        searchInputValueLength={searchInputValue.length}
        selectedTagsLength={selectedTags.length}
        searchQuery={searchQuery}
        searchResultLength={searchResult.length}
        materialListLength={materialList.length}
        clearSelectedTags={() => setSelectedTag([])}
      />
    </S.SearchPage>
  );
};

export default withLayout(Search);
