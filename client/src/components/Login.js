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
  Popover,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

function Login(props) {
  const { onClose, open, onRegisterOpen } = props;
  const [open1, setOpen1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credentialsError, setCredentialsError] = useState("");

  const handlePopoverClose = () => {
    setOpen1(false);
    setEmail("");
    setPassword("");
  };
  const handleClose = () => {
    onClose();
  };

  const handleFinalClose = () => {
    Axios.post("/api/auth/", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        onClose();
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        if (errors.length > 0) {
          for (let index = 0; index < errors.length; index++) {
            if (errors[index].param === "email") {
              setEmailError(errors[index].msg);
            } else if (errors[index].param === "password") {
              setPasswordError(errors[index].msg);
            } else if (errors[index].param === "credentials") {
              setCredentialsError(errors[index].msg);
              setOpen1(true);
            }
          }
        }
      });
  };

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
  const switchRegister = () => {
    onClose();
    onRegisterOpen();
  };

  return (
    <>
      <Dialog
        open={open1}
        onClose={handlePopoverClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>{credentialsError}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopoverClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            error={emailError === "" ? false : true}
            label={emailError === "" ? "Email Address" : emailError}
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailError("");
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            value={password}
            error={passwordError === "" ? false : true}
            label={passwordError === "" ? "Password" : passwordError}
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError("");
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFinalClose} color="primary">
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
}

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onRegisterOpen: PropTypes.func.isRequired,
};

export default Login;
