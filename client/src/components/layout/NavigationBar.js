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
import { loginModal, registerModal } from "../../actions/modal";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
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

const NavigationBar = ({
  loginModal,
  registerModal,
  isAuthenticated,
  loginOpen,
  registerOpen,
  logout,
  user,
  isLoading,
}) => {
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

  const list = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to="/">
          <ListItem button key="FlexiAbode">
            <ListItemText primary="FlexiAbode" />
          </ListItem>
        </Link>
        <Divider />
        {["Post Property", "Search Property", "Help"].map((text, index) => (
          <Link
            to={
              text === "Post Property"
                ? "/post-property"
                : text === "Search Property"
                ? "search-property"
                : "help"
            }
          >
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
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
            {isLoading ? <Spinner /> : ""}
            {isAuthenticated ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {user ? user.name : ""}
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
                  <MenuItem>Profile</MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                  {loginOpen && <Login />}
                  {registerOpen && <Register />}
                </Menu>
              </div>
            ) : (
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
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      registerModal();
                    }}
                  >
                    Register
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      loginModal();
                    }}
                  >
                    Login
                  </MenuItem>
                  {loginOpen && <Login />}
                  {registerOpen && <Register />}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
Register.propTypes = {
  loginModal: PropTypes.func.isRequired,
  registerModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  loginOpen: PropTypes.bool,
  registerOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginOpen: state.modal.login_open,
  registerOpen: state.modal.register_open,
  user: state.auth.user,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { loginModal, registerModal, logout })(
  NavigationBar
);
