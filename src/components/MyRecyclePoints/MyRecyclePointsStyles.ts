import styled from 'styled-components';

export const MyRecyclePoints = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  width: 95%;
  border-radius: ${({ theme }): string => theme.shape.borderRadius.toString()}px;
  overflow: hidden;
`;

export const RecyclePointInfo = styled.div`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const SuitableBinList = styled.div`
  padding-bottom: ${({ theme }): string => theme.spacing(1)};
`;

export const NoRecyclePointsNotice = styled.div`
  max-width: 500px;
  padding: ${({ theme }): string => theme.spacing(2, 1)};
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
