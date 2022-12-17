import styled from 'styled-components';

export const OfferToLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }): string => theme.spacing(1)};
  & > p {
    text-align: center;
  }
  & > button {
    margin: ${({ theme }): string => theme.spacing(1, 0)};
  }
`;
