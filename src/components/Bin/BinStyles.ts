import { Paper } from '@mui/material';
import styled from 'styled-components';

export const Bin = styled(Paper)`
  display: flex;
  flex-direction: column;
  border: ${({ theme }): string => `1px solid ${theme.palette.primary.light}`};
  width: 100%;
  min-width: 280px;
  max-width: 500px;
  margin: ${({ theme }): string => theme.spacing(2, 3)};
  padding: ${({ theme }): string => theme.spacing(1)};
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const BinPropertyContainer = styled.div`
  border: 1px solid ${({ theme }): string => theme.palette.primary.light};
  border-radius: ${({ theme }): string => theme.shape.borderRadius.toString().toString()}px;
  padding: ${({ theme }): string => theme.spacing(1)};
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
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
