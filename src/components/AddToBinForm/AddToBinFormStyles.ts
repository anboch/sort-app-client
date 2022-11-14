import { Dialog, DialogContent } from '@mui/material';

import styled from 'styled-components';

export const AddToBinForm = styled(Dialog)`
  /* visibility: hidden; */
`;

export const AddToBinContent = styled(DialogContent)`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;

export const CustomChip = styled.span`
  display: inline-block;
  margin: ${({ theme }): string => theme.spacing(1, 0)};
  padding: ${({ theme }): string => theme.spacing(1, 1)};
  background-color: ${({ theme }): string => theme.palette.divider};
  border-radius: 15px;
`;

export const ConfirmAdd = styled.div`
  /* visibility: hidden; */
`;
