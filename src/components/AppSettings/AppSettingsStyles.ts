import { Paper } from '@mui/material';
import styled from 'styled-components';

export const AppSettings = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(1)};
  & > *:not(:first-child) {
    padding: ${({ theme }): string => theme.spacing(0, 1)};
  }
`;

export const ColorTheme = styled.div`
  display: flex;
  flex-direction: column;
  && > * {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;
