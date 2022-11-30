import styled from 'styled-components';

export const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  margin: 0 auto;
  & > * {
    width: 100%;
    min-width: 280px;
    max-width: 400px;
    height: 100%;
    margin: ${({ theme }): string => theme.spacing(0, 1)};
  }
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }): string => theme.spacing(2)};
  }
`;
