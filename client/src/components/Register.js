import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";

function Register(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  const handleFinalClose = () => {
    onClose();
    Axios.get("/api/users/").then((res) => {
      console.log(res.data.data);
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
          label="Email Address"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="phone"
          label="Phone"
          type="tel"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
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
    </Dialog>
  );
}

Register.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Register;
