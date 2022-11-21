import { Paper } from '@mui/material';
import styled from 'styled-components';

export const AboutPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > * {
    width: 95%;
    min-width: 280px;
    max-width: 600px;
    padding: ${({ theme }): string => theme.spacing(1)};
  }
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const AboutProject = styled(Paper)`
  text-align: center;
`;

export const Instructions = styled(Paper)`
  & > * {
    text-align: center;
  }
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const Contacts = styled(Paper)`
  text-align: center;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const EmailLinkWithCopyButton = styled.div`
  & > button {
    margin-left: ${({ theme }): string => theme.spacing(1)};
  }
`;
