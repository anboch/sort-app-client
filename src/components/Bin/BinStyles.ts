import { IconButton, Paper, Typography, Link } from '@mui/material';
import styled from 'styled-components';

export const BinActions = styled.div`
  display: flex;
  justify-content: end;
`;

export const Bin = styled(Paper)`
  border: ${({ theme }) => `1px solid ${theme.palette.primary.light}`};
  width: 90%;
  height: 100%;
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

export const BinRule = styled(Typography)<{ selected: boolean }>`
  ${({ selected }) => !selected && `text-decoration-line: line-through;`};
`;

export const ExpandMore = styled(IconButton)<{ expand: boolean }>(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const BinRules = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BinType = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BinTypeActions = styled.div`
  display: flex;
  justify-content: end;
`;

export const TypeTitle = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(0, 1)};
  text-align: center;
  overflow-wrap: anywhere;
`;

export const BinTypeSummary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RecyclePointsOfBinSummary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EditRuleSetOfBin = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RulesAndEditRuleSet = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BinTypeMaterialItem = styled(Link)`
  cursor: pointer;
  && {
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
  :not(:last-child):after {
    content: ', ';
  }
`;
