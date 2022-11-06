import SearchIcon from '@mui/icons-material/Search';
import { Button, Input, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { KeyboardEvent, useEffect, useState } from 'react';

import * as hooks from '../../hooks';
import { SearchItemKind } from '../../api/api.interface';
import theme from '../../styles/theme';
import { StyledSearchBar, SearchInput, HintsList } from './SearchBarStyles';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface ISearchBarProps {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  addFilter: (tagID: string) => void;
  exactSearch: (query: string) => void;
  searchBarWidth: string;
}

export const SearchBar = ({
  searchInputValue,
  setSearchInputValue,
  placeholder,
  addFilter,
  searchBarWidth,
  exactSearch,
}: ISearchBarProps): JSX.Element => {
  const fetchSearchListQ = hooks.useFetchSearchList();
  const hints = hooks.useFuseSearch(fetchSearchListQ.data?.union);
  const [isInputInFocus, setIsInputInFocus] = useState(true);
  const ref = useOutsideClick(() => setIsInputInFocus(false));

  const searchByEnterKey = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      exactSearch(event.target.value);
      event.target.blur();
      setIsInputInFocus(false);
    }
  };

  useEffect(() => {
    hints.search(searchInputValue);
  }, [searchInputValue]);

  // todo redo hints to Menu from List to navigate by keyboard
  return (
    <StyledSearchBar ref={ref}>
      <SearchInput withHints={isInputInFocus && hints.searchResult.length > 0}>
        <SearchIcon sx={{ margin: '0 14px', color: `${theme.palette.primary.main}` }} />
        <Input
          onFocus={() => {
            setIsInputInFocus(true);
          }}
          type="search"
          placeholder={placeholder}
          value={searchInputValue}
          onKeyDown={searchByEnterKey}
          onChange={(e): void => {
            hints.search(e.target.value);
            setSearchInputValue(e.target.value);
            if (e.target.value === '') {
              exactSearch('');
            }
          }}
          sx={{
            width: searchBarWidth,
            color: `${theme.palette.text.secondary}`,
            fontSize: '1.1rem',
          }}
          disableUnderline
        />
        <Button
          onClick={(): void => {
            exactSearch(searchInputValue);
            setIsInputInFocus(false);
          }}
          variant="contained"
          size="small"
          sx={{ margin: '0 10px' }}
        >
          Find
        </Button>
      </SearchInput>
      {isInputInFocus && hints.searchResult.length > 0 && (
        <HintsList>
          <List>
            {hints.searchResult?.map((hint) => (
              <ListItem key={hint.title} disablePadding>
                <ListItemButton
                  onClick={(): void => {
                    setSearchInputValue(hint.title);
                    exactSearch(hint.title);
                    setIsInputInFocus(false);
                  }}
                >
                  <SearchIcon sx={{ marginRight: '10px' }} />
                  <ListItemText primary={hint.title} />
                </ListItemButton>
                {hint.kind === SearchItemKind.tag && (
                  <Button
                    sx={{ margin: '0 10px' }}
                    onClick={(): void => {
                      addFilter(hint._id);
                      setSearchInputValue('');
                      setIsInputInFocus(false);
                    }}
                    variant="contained"
                    size="small"
                  >
                    Add filter
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </HintsList>
      )}
    </StyledSearchBar>
  );
};
