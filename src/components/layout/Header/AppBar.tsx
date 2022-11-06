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
import theme from '../../../styles/theme';
import { pageRoutes } from '../../../routes';

export const ResponsiveAppBar = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

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
    <AppBar sx={{ borderRadius: '10px' }} position="static">
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
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              For-Recycling
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: { sm: 'flex-end' },
            }}
          >
            {pages.map(({ name, path }) => (
              <Link to={path} key={name} style={{ textDecoration: 'none' }}>
                <Button
                  key={name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: `${
                      path === currentPath
                        ? theme.palette.secondary.light
                        : theme.palette.primary.contrastText
                    }`,
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
              display: { xs: 'flex', sm: 'none' },
              justifyContent: { xs: 'flex-end' },
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
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {pages.map(({ name, path }) => (
                <MenuItem sx={{ justifyContent: 'center' }} onKeyDown={searchByEnterKey} key={name}>
                  <Link
                    to={path}
                    key={name}
                    style={{
                      textDecoration: 'none',
                      color: `${
                        path === currentPath
                          ? theme.palette.secondary.dark
                          : theme.palette.text.primary
                      }`,
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
