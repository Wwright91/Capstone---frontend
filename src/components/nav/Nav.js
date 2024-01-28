import React, { useState } from "react";
import "./Nav.scss";
import { Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../base";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { yellow } from "@mui/material/colors";

import hero from "../../assets/hero.png";

const pages = ["Browse Businesses", "Browse Resources", "Refer A Business"];

const Nav = ({ setOpenLoginModal, user }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const links = [
    ["/businesses", "Browse Businesses"],
    ["/resources", "Browse Resources"],
    ["/refer-a-business", "Refer A Business"], ["/about", "About"]
  ];

  return (
    <AppBar position="static" className="nav">
      <Container maxWidth="xl" style={{ backgroundColor: "#f1cc24" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Navbar.Brand>
              <img className="nav__logo" src={hero} alt="hero" />
            </Navbar.Brand>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MELANATED DIAMONDS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {auth.currentUser && (
              <div className="nav__buttons">
                {links
                  .filter((link) => link[0] !== window.location.pathname)
                  .map((link) => (
                    <Link to={link[0]}>{link[1]}</Link>
                  ))}
              </div>
            )}
          </Box>

          {!auth.currentUser ? (
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setAnchorElUser(false);
                setOpenLoginModal(true);
              }}
            >
              Create An Account
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user.uid && (
                    <Avatar sx={{ bgcolor: yellow[800] }}>
                      {user.first_name[0].toUpperCase()}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={async () => {
                    navigate("/");
                    await signOut(auth);
                  }}
                >
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
