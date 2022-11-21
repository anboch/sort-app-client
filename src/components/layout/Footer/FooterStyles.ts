import { styled } from '@mui/material';

export const Footer = styled('div')`
  grid-area: ${({ theme }): string => theme.gridAreas.footer};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }): string => theme.palette.primary.dark};
  padding: ${({ theme }): string => theme.spacing(3, 0, 1, 0)};
  & > * {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const Documents = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  & > button {
    text-decoration: none;
    margin: ${({ theme }): string => theme.spacing(1, 2)};
    color: ${({ theme }): string => theme.palette.primary.contrastText};
  }
`;
