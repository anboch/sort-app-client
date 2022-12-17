import styled from 'styled-components';

export const ProfileActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }): string => theme.spacing(1)};
`;
