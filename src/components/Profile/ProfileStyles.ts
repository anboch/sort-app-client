import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Profile = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: ${({ theme }) => theme.spacing(1)};
  & > *:not(:first-child) {
    padding: ${({ theme }): string => theme.spacing(0, 1)};
  }
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;

export const ProfileItem = styled.div`
  /* padding: 10px 20px;; */
`;
