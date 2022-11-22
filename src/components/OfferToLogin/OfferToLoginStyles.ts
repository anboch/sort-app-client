import styled from 'styled-components';

export const OfferToLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)};
  & > p {
    text-align: center;
  }
  span {
    font-weight: bold;
  }
`;
