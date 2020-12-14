import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postedUserModal } from "../../actions/modal";
import { contactUser } from "../../actions/search";

const PostedUserDetails = ({
  postedUserOpen,
  postedUserModal,
  contactUser,
  id,
}) => {
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
  const handleContact = () => {
    postedUserModal();
    contactUser(id);
  };

  return (
    <>
      <Dialog
        open={postedUserOpen}
        onClose={postedUserModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Send Message</DialogTitle>
        <DialogContent>
          <DialogContentText>
            I am Interested in your property posted in FlexiAbode.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              postedUserModal();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleContact} type="submit" color="primary">
            Contact
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PostedUserDetails.propTypes = {
  postedUserModal: PropTypes.func.isRequired,
  contactUser: PropTypes.func.isRequired,
  postedUserOpen: PropTypes.bool,
  id: PropTypes.string,
};
const mapStateToProps = (state) => ({
  postedUserOpen: state.modal.postedUserOpen,
});

export default connect(mapStateToProps, { postedUserModal, contactUser })(
  PostedUserDetails
);
