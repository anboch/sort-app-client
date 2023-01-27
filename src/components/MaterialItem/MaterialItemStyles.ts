import { Typography } from '@mui/material';
import styled from 'styled-components';

export const MaterialItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
`;

export const MaterialPreview = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  & > * {
    width: 50%;
    min-width: 230px;
  }
`;

export const MaterialTitles = styled.div`
  /* min-width: 230px; */
`;

export const MaterialAcceptInfo = styled.div`
  /* padding: 10px; */
`;

export const Tags = styled.div``;

export const Tag = styled.div`
  display: inline-block;
  text-align: center;
  margin: ${({ theme }): string => theme.spacing(0.5)};
  padding: ${({ theme }): string => theme.spacing(0, 1)};
  background-color: ${({ theme }): string => theme.palette.grey[200]};
  color: ${({ theme }): string => theme.palette.getContrastText(theme.palette.grey[200])};
  border-radius: 15px;
`;

export const MaterialInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    width: 30%;
    min-width: 250px;
    padding: ${({ theme }): string => theme.spacing(1)};
  }
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const MaterialInfoItemTitle = styled(Typography).attrs({
  variant: 'subtitle2',
})`
  color: ${({ theme }): string => theme.palette.primary.light};
`;

export const SimilarMaterialAndDescription = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const MaterialDescription = styled.div``;

export const SimilarMaterial = styled.div``;

export const MaterialRules = styled.div``;
export const MaterialImages = styled.div`
  /* width: 30%;
  min-width: 300px; */
`;
export const Buttons = styled.div`
  text-align: end;
  padding-top: 5px;
`;
