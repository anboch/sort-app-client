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

export const UserGeoLocation = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserGeoLocationExpand = styled.div<{ isExpanded: boolean }>`
  padding-top: ${({ theme }): string => theme.spacing(1)};
  align-self: ${({ isExpanded }): string => (isExpanded ? 'flex-end' : 'center')};
`;

export const UserGeoLocationMap = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
`;
