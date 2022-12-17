import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Info = styled(Paper)`
  display: flex;
  padding: ${({ theme }): string => theme.spacing(1)};
`;
