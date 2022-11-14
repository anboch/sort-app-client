import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Info = styled(Paper)`
  display: flex;
  flex-wrap: wrap-reverse;
  padding: ${({ theme }) => theme.spacing(1)};
`;
