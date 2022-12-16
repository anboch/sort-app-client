import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Bin = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.palette.primary.light}`};
  width: 100%;
  min-width: 280px;
  max-width: 500px;
  margin: ${({ theme }) => theme.spacing(2, 3)};
  padding: ${({ theme }) => theme.spacing(1)};
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;

export const BinPropertyContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(1)};
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;

export const EditRuleSetOfBin = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RulesAndEditRuleSet = styled.div`
  display: flex;
  justify-content: space-between;
`;
