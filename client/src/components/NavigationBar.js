import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";
import Register from "./Register";
import Login from "./Login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavigationBar() {
  const [auth, setAuth] = React.useState(true);
  const [registerState, setRegisterState] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openState, setOpenState] = useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenState(open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRegisterOpen = () => {
    setAnchorEl(null);
    setRegisterState(true);
  };
  const handleLoginOpen = () => {
    setAnchorEl(null);
    setLoginState(true);
  };
  const handleRegisterClose = () => {
    setRegisterState(false);
  };
  const handleLoginClose = () => {
    setLoginState(false);
  };

  const list = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="FlexiAbode">
          <ListItemText primary="FlexiAbode" />
        </ListItem>
        <Divider />
        {["Post Property", "Search Property", "Help"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Drawer
              classes={{ paper: classes.list }}
              open={openState}
              onClose={toggleDrawer(false)}
            >
              {list}
            </Drawer>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              FlexiAbode
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleRegisterOpen}>Register</MenuItem>

                  <MenuItem onClick={handleLoginOpen}>Login</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      {loginState && <Login open={loginState} onClose={handleLoginClose} />}
      {registerState && (
        <Register open={registerState} onClose={handleRegisterClose} />
      )}
    </>
  );
}
export default NavigationBar;
