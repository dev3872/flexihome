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
import React, { useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

function Register(props) {
  const { onClose, open, onLoginOpen } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const useStyles = makeStyles({
    root: {
      width: "100%",
      maxWidth: 500,
    },
  });
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };
  const switchLogin = () => {
    onClose();
    onLoginOpen();
  };
  const handleFinalClose = () => {
    Axios.post("/api/users/", {
      name: name,
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
            if (errors[index].param === "name") {
              setNameError(errors[index].msg);
            } else if (errors[index].param === "email") {
              setEmailError(errors[index].msg);
            } else if (errors[index].param === "password") {
              setPasswordError(errors[index].msg);
            }
          }
        }
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          error={emailError === "" ? false : true}
          label={emailError === "" ? "Email Address" : emailError}
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError("");
          }}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          error={nameError === "" ? false : true}
          label={nameError === "" ? "Name" : nameError}
          type="text"
          onChange={(event) => {
            setName(event.target.value);
            setNameError("");
          }}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
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
}

Register.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onLoginOpen: PropTypes.func.isRequired,
};

export default Register;
