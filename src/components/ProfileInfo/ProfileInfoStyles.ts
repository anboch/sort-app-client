import { Paper } from '@mui/material';
import styled from 'styled-components';

export const ProfileInfo = styled(Paper)`
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  // todo from theme
  /* background-color: #eeefb0; */
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: 10px;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;

export const ProfileInfoItem = styled.div`
  padding: 10px 20px;
`;
