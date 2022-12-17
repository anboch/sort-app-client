import { Paper } from '@mui/material';
import styled from 'styled-components';

export const AppSettings = styled(Paper)`
  padding: ${({ theme }): string => theme.spacing(1)};
  border: ${({ theme }): string => `1px solid ${theme.palette.primary.light}`};
  & > *:not(:first-child) {
    padding: ${({ theme }): string => theme.spacing(0, 1)};
  }
`;

export const ColorTheme = styled.div`
  display: flex;
  flex-direction: column;
  && > * {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;
