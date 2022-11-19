import styled from 'styled-components';

export const Sign = styled.div<{ isAllAccept: boolean }>`
  padding: 3px;
  cursor: pointer;
  color: ${({ theme, isAllAccept }) =>
    theme.palette.getContrastText(
      isAllAccept ? theme.palette.success.main : theme.palette.grey[500]
    )};
  background-color: ${({ theme, isAllAccept }) =>
    isAllAccept ? theme.palette.success.main : theme.palette.grey[500]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;
