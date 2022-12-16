import styled from 'styled-components';

export const RecyclePointsOfBinSummary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RecyclePointsOfBinOnMap = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
`;
