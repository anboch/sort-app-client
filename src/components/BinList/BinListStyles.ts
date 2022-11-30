import styled from 'styled-components';

export const BinList = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const NoBinNotice = styled.div`
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing(2, 1)};
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(1)};
  }
`;

export const NoBinNoticeExplanation = styled.div`
  text-align: center;
  & > * {
    display: inline;
  }
`;
