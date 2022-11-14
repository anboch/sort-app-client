import styled from 'styled-components';

export const EditableValue = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleAndActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Value = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -24px;
  @media (max-width: 500px) {
    & input {
      max-width: 100px;
    }
  }
  & * {
    text-align: center;
    overflow-wrap: anywhere;
  }
`;
