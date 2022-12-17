import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Profile = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: ${({ theme }): string => theme.spacing(1)};
  border: ${({ theme }): string => `1px solid ${theme.palette.primary.light}`};

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
  display: flex;
  justify-content: center;
`;

export const SaveAndCloseButtons = styled.div<{ isCoordsChanged: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${({ isCoordsChanged }): string =>
    isCoordsChanged ? 'space-between' : 'right'};
`;

export const UserGeoLocationMap = styled.div`
  border-radius: ${({ theme }): string => theme.shape.borderRadius.toString().toString()}px;
  overflow: hidden;
`;
