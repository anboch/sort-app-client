import styled from "styled-components";

interface ISearchInputProps {
  withHints: boolean;
}

export const SearchInput = styled.div<ISearchInputProps>`
  display: flex;
  align-items: center;
  /* todo color from theme */
  border: 1px solid #cdd2d7;
  border-radius: ${({ withHints }): string =>
    withHints ? "10px 10px 0px 0px" : "10px"};
  height: 44px;
  /* background: #e7ebf0b3; */
  /* max-width: 584px; */
  /* width: 100%; */
`;

export const HintsList = styled.div`
  display: block;
  position: relative;
  top: -1px;
  border: 1px solid #cdd2d7;
  line-height: 1.25;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 2;
  overflow-y: auto;
  /* width: 100%; */
  /* background-color: #fff; */
  /* font-size: 16px; */
  /* max-height: 260px; */
`;

export const StyledSearchBar = styled.div`
  max-width: 584px;
`;
