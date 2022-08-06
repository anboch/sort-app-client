import { Autocomplete, TextField } from '@mui/material';
import React, { SyntheticEvent } from 'react';
import { ICategory } from '../../mock/api.interface';
import { IUnionListItem } from '../../views/Search/SearchPage';
import { StyledFilter } from './FilterStyles';

export interface IFiltersProps {
  selectedCategory: ICategory | null
  categoryList: ICategory[];
  onCategoryChange: (event: SyntheticEvent<Element, Event>, value: ICategory | null) => void;
  tagList: IUnionListItem[];
  selectedTags: IUnionListItem[];
  onTagChange: (event: SyntheticEvent<Element, Event>, value: IUnionListItem[]) => void;
}



export const Filters = ({ selectedCategory, categoryList, onCategoryChange, tagList, selectedTags, onTagChange }: IFiltersProps): JSX.Element => {
  return (
    <StyledFilter>
      <Autocomplete
        value={selectedCategory}
        size="small"
        isOptionEqualToValue={(option, value): boolean => option._id === value._id}
        onChange={onCategoryChange}
        options={categoryList}
        getOptionLabel={(item): string => item.title}
        sx={{ width: 200 }}
        renderInput={(params): JSX.Element => <TextField {...params} variant="standard" label="Category" />}
      />
      <Autocomplete
        multiple
        value={selectedTags}
        size="small"
        isOptionEqualToValue={(option, value): boolean => option.title === value.title}
        onChange={onTagChange}
        options={tagList}
        getOptionLabel={(item): string => item.title}
        sx={{ width: 300 }}
        renderInput={(params): JSX.Element => <TextField {...params} variant="standard" label="Tags" />}
      />
    </StyledFilter>
  );
};