import styled from 'styled-components';

export const ProfileInfo = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  // todo from theme
  background-color: #eeefb0;
  border-radius: 10px;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const ProfileInfoItem = styled.div`
  padding: 10px 20px;
`;
