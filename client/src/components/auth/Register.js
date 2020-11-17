import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { registerModal, loginModal } from "../../actions/modal";
import { register } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { resetError } from "../../actions/errors";

const Register = ({
  registerOpen,
  registerModal,
  loginModal,
  isAuthenticated,
  register,
  errors,
  registerError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  useEffect(() => {
    if (registerError === true && errors.length > 0)
      for (let i = 0; i < errors.length; i++) {
        const msg = errors[i].msg;
        const param = errors[i].param;
        if (param === "email") {
          setEmailError(msg);
        }
        if (param === "name") {
          setNameError(msg);
        }
        if (param === "password") {
          setPasswordError(msg);
        }
        if (param === "password2") {
          setPassword2Error(msg);
        }
      }
  }, [errors, registerError]);
  const useStyles = makeStyles({
    root: {
      width: "100%",
      maxWidth: 500,
    },
  });
  const classes = useStyles();

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    setEmailError("");
    setNameError("");
    setPasswordError("");
    setPassword2Error("");
    resetError();
    register({ name, email, password, password2 });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const switchLogin = () => {
    registerModal();
    loginModal();
  };

  return (
    <Dialog
      open={registerOpen}
      onClose={registerModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
          name="name"
          error={nameError === "" ? false : true}
          label={nameError === "" ? "Name" : nameError}
          type="text"
          onChange={onChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="password"
          error={passwordError === "" ? false : true}
          label={passwordError === "" ? "Password" : passwordError}
          type="password"
          onChange={onChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="password2"
          error={password2Error === "" ? false : true}
          label={password2Error === "" ? "Password2" : password2Error}
          type="password"
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={registerModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" type="submit">
          Register
        </Button>
      </DialogActions>
      <DialogContent>
        <DialogContentText>
          <div className={classes.root} onClick={switchLogin}>
            <Typography variant="subtitle1" gutterBottom>
              Already registered? <b>Login</b>
            </Typography>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

Register.propTypes = {
  registerModal: PropTypes.func.isRequired,
  loginModal: PropTypes.func.isRequired,
  registerOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  errors: PropTypes.array,
  register: PropTypes.func.isRequired,
  registerError: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  registerOpen: state.modal.register_open,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors.error,
  registerError: state.errors.register,
});

export default connect(mapStateToProps, {
  registerModal,
  loginModal,
  register,
})(Register);
