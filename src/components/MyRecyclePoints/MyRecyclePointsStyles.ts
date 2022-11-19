import { Paper } from '@mui/material';
import styled from 'styled-components';

export const MyRecyclePoints = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  width: 95%;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
`;

export const NoRecyclePointsNotice = styled.div`
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing(2, 1)};
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const NoRecyclePointsNoticeExplanation = styled.div`
  text-align: center;
  & > * {
    display: inline;
  }
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
