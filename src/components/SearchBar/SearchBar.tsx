import SearchIcon from '@mui/icons-material/Search';
import { Button, Input, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { KeyboardEvent, useEffect, useState } from 'react';

import { SearchItemKind } from '../../api/api.interface';
import * as S from './SearchBarStyles';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useFetchSearchList } from '../../hooks/useFetchSearchList';
import { useFuseSearch } from '../../hooks/useFuseSearch';

interface ISearchBarProps {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  addFilter: (tagID: string) => void;
  exactSearch: (query: string) => void;
}

export const SearchBar = ({
  searchInputValue,
  setSearchInputValue,
  placeholder,
  addFilter,
  exactSearch,
}: ISearchBarProps): JSX.Element => {
  const fetchSearchListQ = useFetchSearchList();
  const hints = useFuseSearch(fetchSearchListQ.data?.union);
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
    <S.SearchBar ref={ref}>
      <S.SearchInput withHints={isInputInFocus && hints.searchResult.length > 0}>
        <SearchIcon sx={{ margin: '0 14px', color: 'primary.main' }} />
        <Input
          onFocus={(): void => {
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
            // todo to know why ellipsis don't work
            // '&:placeholderShown': {
            //   textOverflow: 'ellipsis',
            // },
            overflow: 'hidden',
            width: '50vw',
            color: 'text.secondary',
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
          Найти
        </Button>
      </S.SearchInput>
      {isInputInFocus && hints.searchResult.length > 0 && (
        <S.HintsList>
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
                  <ListItemText sx={{ wordWrap: 'break-word' }} primary={hint.title} />
                </ListItemButton>
                {hint.kind === SearchItemKind.tag && (
                  <Button
                    sx={{ margin: '8px', flex: '0 0 30%' }}
                    onClick={(): void => {
                      addFilter(hint._id);
                      setSearchInputValue('');
                      setIsInputInFocus(false);
                    }}
                    variant="contained"
                    size="small"
                  >
                    Добавить фильтр
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        </S.HintsList>
      )}
    </S.SearchBar>
  );
};
