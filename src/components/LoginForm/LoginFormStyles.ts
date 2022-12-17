import { DialogContent } from '@mui/material';
import styled from 'styled-components';

export const FormContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;
