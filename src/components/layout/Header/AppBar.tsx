import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { pages } from "../../../App";
import { Link, useLocation } from "react-router-dom";
import theme from "../../../styles/theme";
import { pageRoutes } from '../../../routes';

export const ResponsiveAppBar = (): JSX.Element => {
  const menuItems = pages.filter(({ path }) => path !== pageRoutes.search);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const currentPath = useLocation().pathname;

  return (
    <AppBar sx={{ borderRadius: "10px" }} position="static">
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Link
            to={pageRoutes.search}
            key={pageRoutes.search}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              RecycleBin
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: { sm: "flex-end" },
            }}
          >
            {menuItems.map(({ name, path }) => (
              <Link to={path} key={name} style={{ textDecoration: "none" }}>
                <Button
                  key={name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: `${path === currentPath
                      ? theme.palette.secondary.light
                      : theme.palette.primary.contrastText
                      }`,
                    display: "block",
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
              display: { xs: "flex", sm: "none" },
              justifyContent: { xs: "flex-end" },
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              {menuItems.map(({ name, path }) => (
                <Link
                  to={path}
                  key={name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem key={name} onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{
                        color: `${path === currentPath
                          ? theme.palette.secondary.dark
                          : theme.palette.text.primary
                          }`,
                      }}
                      textAlign="center"
                    >
                      {name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
