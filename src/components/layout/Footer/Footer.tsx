import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { FooterProps } from './Footer.props';

const Footer = ({ className }: FooterProps): JSX.Element => {
  return (
    <div className={className}>
      <Typography variant={'subtitle2'}>
        В-переработку © 2021 - {new Date().getFullYear()}
      </Typography>
    </div>
  );
};

export const StyledFooter = styled(Footer)`
  grid-area: ${({ theme }): string => theme.gridAreas.footer};
  display: flex;
  justify-content: center;
  background-color: ${theme.palette.primary.dark};
  padding: 10px 0;
`;
