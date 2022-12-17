import { DialogContent } from '@mui/material';
import styled from 'styled-components';

export const RequestForm = styled.div`
  /* visibility: hidden; */
`;
export const FormContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;
