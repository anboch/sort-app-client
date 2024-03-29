import { DialogContent } from '@mui/material';
import styled from 'styled-components';

// todo reduplicate CustomChip
export const CustomChip = styled.span`
  display: inline-block;
  margin: ${({ theme }): string => theme.spacing(1, 0)};
  padding: ${({ theme }): string => theme.spacing(1, 1)};
  background-color: ${({ theme }): string => theme.palette.divider};
  border-radius: 15px;
`;

export const BinCreationContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;
