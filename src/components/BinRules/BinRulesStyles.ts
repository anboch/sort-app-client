import { Typography } from '@mui/material';
import styled from 'styled-components';

export const BinRule = styled(Typography)<{ selected: boolean }>`
  ${({ selected }) => !selected && `text-decoration-line: line-through;`};
`;

export const BinRules = styled.div`
  display: flex;
  flex-direction: column;
`;
