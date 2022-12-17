import styled from 'styled-components';

export const TagList = styled.div`
  padding-bottom: 15px;
  width: 95%;
`;

export const ChipList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
  && > * {
    margin: 2px 1px;
  }
`;
