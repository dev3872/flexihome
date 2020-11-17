import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginModal, registerModal } from "../../actions/modal";
import { login } from "../../actions/auth";
import { resetError } from "../../actions/errors";

const Login = ({
  loginOpen,
  registerModal,
  loginModal,
  login,
  isAuthenticated,
  errors,
  loginError,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credentialsError, setCredentialsError] = useState(false);
  useEffect(() => {
    if (loginError === true && errors.length > 0)
      for (let i = 0; i < errors.length; i++) {
        const msg = errors[i].msg;
        const param = errors[i].param;
        if (param === "email") {
          setEmailError(msg);
        }
        if (param === "password") {
          setPasswordError(msg);
        }
        if (param === "credentials") {
          setCredentialsError(true);
        }
      }
  }, [errors, loginError]);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 500,
    },
    typography: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = () => {
    setEmailError("");
    setCredentialsError(false);
    setPasswordError("");
    resetError();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const switchRegister = () => {
    loginModal();
    registerModal();
  };

  return (
    <>
      <Dialog
        open={credentialsError}
        onClose={() => {
          setCredentialsError(false);
          resetError();
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">credentials Error</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setCredentialsError(false);
              resetError();
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={loginOpen}
        onClose={loginModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            error={emailError === "" ? false : true}
            label={emailError === "" ? "Email Address" : emailError}
            type="email"
            value={email}
            onChange={onChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="password"
            value={password}
            error={passwordError === "" ? false : true}
            label={passwordError === "" ? "Password" : passwordError}
            type="password"
            onChange={onChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={loginModal} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} type="submit" color="primary">
            Login
          </Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            <div className={classes.root} onClick={switchRegister}>
              <Typography variant="subtitle1" gutterBottom>
                Need an account? <b>Register</b>
              </Typography>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

Login.propTypes = {
  loginModal: PropTypes.func.isRequired,
  registerModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
  loginError: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  loginOpen: state.modal.login_open,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors.error,
  loginError: state.errors.login,
});

export default connect(mapStateToProps, { loginModal, registerModal, login })(
  Login
);
