import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { KeyboardEvent } from 'react';

import * as hooks from '../../hooks';
import { SearchItemKind } from '../../api/api.interface';
import theme from "../../styles/theme";
import { StyledSearchBar, SearchInput, HintsList } from "./SearchBarStyles";


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
  exactSearch
}: ISearchBarProps): JSX.Element => {

  const fetchSearchListQ = hooks.useFetchSearchList();
  const hints = hooks.useFuseSearch(fetchSearchListQ.data?.union);

  const searchByEnterKey = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      hints.search('');
      setSearchInputValue(event.target.value);
      exactSearch(event.target.value);
    }
  };

  return (
    <StyledSearchBar>
      <SearchInput withHints={hints.searchResult.length > 0}>
        <SearchIcon
          sx={{ margin: "0 14px", color: `${theme.palette.primary.main}` }}
        />
        {/* TODO on Enter */}
        <Input
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
            fontSize: "1.1rem",
          }}
          disableUnderline
        />
        <Button
          onClick={(): void => {
            hints.search('');
            setSearchInputValue(searchInputValue);
            exactSearch(searchInputValue);
          }}
          variant="contained"
          size="small"
          sx={{ margin: "0 10px" }}>
          Find
        </Button>
      </SearchInput>
      {hints.searchResult.length > 0 &&
        <HintsList>
          <List>
            {hints.searchResult?.map((hint) => (
              <ListItem key={hint.title} disablePadding>
                <ListItemButton onClick={(): void => {
                  hints.search('');
                  setSearchInputValue(hint.title);
                  exactSearch(hint.title);
                }}>
                  <SearchIcon sx={{ marginRight: "10px" }} />
                  <ListItemText primary={hint.title} />
                </ListItemButton>
                {(hint.kind === SearchItemKind.tag)
                  && < Button
                    sx={{ margin: "0 10px" }}
                    onClick={(): void => {
                      addFilter(hint._id);
                      hints.search('');
                    }} variant="contained" size="small" >
                    Add filter
                  </Button>}
              </ListItem>
            ))}
          </List>
        </HintsList>}
    </StyledSearchBar >
  );
};
