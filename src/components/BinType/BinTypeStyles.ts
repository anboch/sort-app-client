import { IconButton, Typography, Link } from '@mui/material';
import styled from 'styled-components';

export const BinType = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TypeTitle = styled(Typography)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }): string => theme.spacing(0, 1)};
  text-align: center;
  overflow-wrap: anywhere;
`;

export const BinTypeSummary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BinTypeActions = styled.div`
  display: flex;
  justify-content: end;
`;

export const BinTypeMaterialItem = styled(Link)`
  cursor: pointer;
  && {
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
  :not(:last-child):after {
    content: ', ';
  }
`;

// todo fix Warning: Received `false` for a non-boolean attribute `expand`.
export const ExpandMore = styled(IconButton)<{ expand: boolean }>(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
