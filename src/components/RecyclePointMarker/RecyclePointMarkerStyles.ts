import styled from 'styled-components';

export const Sign = styled.div<{ isAllAccept: boolean }>`
  padding: 3px;
  cursor: pointer;
  color: ${({ theme, isAllAccept }): string =>
    theme.palette.getContrastText(
      isAllAccept ? theme.palette.success.main : theme.palette.grey[500]
    )};
  background-color: ${({ theme, isAllAccept }): string =>
    isAllAccept ? theme.palette.success.main : theme.palette.grey[500]};
  border-radius: ${({ theme }): string => theme.shape.borderRadius.toString().toString()}px;
`;
