import { Accordion, AccordionDetails, Paper } from '@mui/material';
import styled from 'styled-components';

export const AboutPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  margin: 0 auto;
  & > * {
    width: 100%;
    min-width: 280px;
    max-width: 600px;
  }
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;

export const AboutProject = styled(Paper)`
  border: ${({ theme }) => `1px solid ${theme.palette.primary.light}`};
  padding: ${({ theme }): string => theme.spacing(1)};
  text-align: center;
`;

export const Instructions = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;

export const Instruction = styled(Accordion).attrs({ square: true, disableGutters: true })`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.light}`};
`;

export const Details = styled(AccordionDetails)`
  & > * {
    text-align: center;
  }
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const Contacts = styled(Paper)`
  border: ${({ theme }) => `1px solid ${theme.palette.primary.light}`};
  text-align: center;
  padding: ${({ theme }): string => theme.spacing(1)};
  & a {
    display: inline-block;
  }
  && > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const EmailLinkWithCopyButton = styled.div`
  & > button {
    margin-left: ${({ theme }): string => theme.spacing(1)};
  }
`;
