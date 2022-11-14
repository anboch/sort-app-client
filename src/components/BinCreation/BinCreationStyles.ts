import { DialogContent, Paper } from '@mui/material';
import styled from 'styled-components';

export const BinCreation = styled(Paper)(({ theme }) => ({
  padding: '10px',
}));

export const BinCreationContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;
