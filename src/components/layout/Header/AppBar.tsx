import * as React from 'react';
import { KeyboardEvent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { pages } from '../../../App';
import { Link, useLocation } from 'react-router-dom';
import { pageRoutes } from '../../../routes';
import { useTheme } from '@mui/material';

export const ResponsiveAppBar = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const searchByEnterKey = (event: KeyboardEvent<HTMLLIElement>): void => {
    if (event.key === 'Enter') {
      const link = event.target?.firstElementChild as HTMLLinkElement | null;
      if (link) {
        link.click();
      }
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const currentPath = useLocation().pathname;

  return (
    <AppBar enableColorOnDark sx={{ borderRadius: '10px', minHeight: {} }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to={pageRoutes.search}
            key={pageRoutes.search}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 'bolder',
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              СОРТИРУЙ
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'none', md: 'flex' },
              justifyContent: { xs: 'flex-end', sm: 'flex-end' },
            }}
          >
            {pages.map(({ name, path }) => (
              <Link to={path} key={name} style={{ textDecoration: 'none' }}>
                <Button
                  key={name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    fontWeight: `${path === currentPath ? 'bold' : 'normal'}`,
                    color: 'primary.contrastText',
                    display: 'block',
                  }}
                >
                  {name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', sm: 'flex', md: 'none' },
              justifyContent: { xs: 'flex-end', sm: 'flex-end' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={!!anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', sm: 'flex', md: 'none' },
              }}
            >
              {pages.map(({ name, path }) => (
                <MenuItem sx={{ justifyContent: 'center' }} onKeyDown={searchByEnterKey} key={name}>
                  <Link
                    to={path}
                    key={name}
                    style={{
                      textDecoration: 'none',
                      fontWeight: `${path === currentPath ? 'bold' : 'normal'}`,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
