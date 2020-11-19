import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { setUser } from "../../actions/post-property";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 50,
    minHeight: 150,
  },
  selected: {
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  title: {
    fontSize: 14,
  },
});

const ImageBlock = (props) => {
  const classes = useStyles();
  const { user, setUser, userSelected } = props;
  const handleClick = () => {
    setUser(user);
  };

  return (
    <Card
      className={classes.root}
      onClick={handleClick}
      className={user === userSelected ? classes.selected : ""}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {user}
        </Typography>
      </CardContent>
    </Card>
  );
};
ImageBlock.propTypes = {
  setUser: PropTypes.func.isRequired,
  userSelected: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userSelected: state.postProperty.user,
});

export default connect(mapStateToProps, {
  setUser,
})(ImageBlock);
