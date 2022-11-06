import { Autocomplete, TextField } from '@mui/material';
import React, { SyntheticEvent } from 'react';
import { ITag, IUnionListItem } from '../../api/api.interface';
import { StyledFilter } from './FilterStyles';

export interface IFiltersProps {
  tagList: ITag[] | undefined;
  selectedTags: ITag[];
  onTagChange: (event: SyntheticEvent<Element, Event>, value: ITag[]) => void;
}

export const Filters = ({ tagList, selectedTags, onTagChange }: IFiltersProps): JSX.Element => {
  return (
    <StyledFilter>
      <Autocomplete
        multiple
        value={selectedTags}
        size="small"
        isOptionEqualToValue={(option, value): boolean => option._id === value._id}
        onChange={onTagChange}
        options={tagList ?? []}
        getOptionLabel={(item): string => item.titles.join(', ')}
        sx={{ width: 300 }}
        renderInput={(params): JSX.Element => (
          <TextField {...params} variant="standard" label="Filters" />
        )}
      />
    </StyledFilter>
  );
};
