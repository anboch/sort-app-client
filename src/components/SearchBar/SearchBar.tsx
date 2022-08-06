import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from 'react';
import {
  IUnionListItem,
  SearchItemType,
} from "../../views/Search/SearchPage";
import theme from "../../styles/theme";
import { StyledSearchBar, SearchInput, HintsList } from "./SearchBarStyles";


interface ISearchBarProps {
  placeholder?: string;
  onSearchInputChange: (value: string) => void;
  addFilter: (hint: IUnionListItem) => void;
  searchBarWidth: string;
  hints: IUnionListItem[];
}

export const SearchBar = ({
  placeholder,
  onSearchInputChange,
  addFilter,
  searchBarWidth,
  hints,
}: ISearchBarProps): JSX.Element => {

  const [inputValue, setInputValue] = useState<string>('');

  return (
    <StyledSearchBar>
      <SearchInput withHints={hints.length > 0}>
        <SearchIcon
          sx={{ margin: "0 14px", color: `${theme.palette.primary.main}` }}
        />
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e): void => {
            onSearchInputChange(e.target.value);
            setInputValue(e.target.value);
          }}
          sx={{
            width: searchBarWidth,
            color: `${theme.palette.text.secondary}`,
            fontSize: "1.1rem",
          }}
          disableUnderline
        />
        <Button variant="contained" size="small" sx={{ margin: "0 10px" }}>
          Find
        </Button>
      </SearchInput>
      {hints.length > 0 &&
        <HintsList>
          <List>
            {hints?.map((hint) => (
              <ListItem key={hint.title} disablePadding>
                <ListItemButton>
                  <SearchIcon sx={{ marginRight: "10px" }} />
                  <ListItemText primary={hint.title} />
                  {(hint.type === SearchItemType.category ||
                    hint.type === SearchItemType.cluster)
                    && < Button onClick={(): void => {
                      addFilter(hint);
                      onSearchInputChange('');
                      setInputValue('');
                    }} variant="contained" size="small" >
                      Add filter
                    </Button>}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </HintsList>}
    </StyledSearchBar >
  );
};
