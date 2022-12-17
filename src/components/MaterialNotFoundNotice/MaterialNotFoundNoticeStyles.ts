import styled from 'styled-components';

export const MaterialNotFoundNotice = styled.div`
  width: 95%;
  max-width: 500px;
  padding: ${({ theme }): string => theme.spacing(2, 1)};
  text-align: center;
`;
