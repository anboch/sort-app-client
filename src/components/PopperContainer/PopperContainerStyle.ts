import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Info = styled(Paper)`
  display: flex;
  padding: ${({ theme }) => theme.spacing(1)};
`;
