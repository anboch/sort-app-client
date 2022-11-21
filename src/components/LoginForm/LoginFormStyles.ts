import { DialogContent } from '@mui/material';
import styled from 'styled-components';

export const RequestForm = styled.div`
  /* visibility: hidden; */
`;
export const FormContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;
