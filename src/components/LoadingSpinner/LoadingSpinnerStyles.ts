import styled from 'styled-components';

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: ${({ theme }): string => theme.spacing(2)};
`;
