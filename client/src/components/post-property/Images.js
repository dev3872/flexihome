import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Avatar, Icon, IconButton, makeStyles, Paper } from "@material-ui/core";
import { setImageDetails } from "../../actions/post-property";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    justifyContent: "center",
  },
  iconRoot: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(6),
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Images = ({ setImageDetails }) => {
  const [imageCount, setImageCount] = useState(0);
  const [imageData, setImageData] = useState([]);
  const inputFile = useRef(null);
  const classes = useStyles();
  useEffect(() => {
    setImageDetails(imageData);
  }, [imageData]);
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImageData((oldImageData) => [
        ...oldImageData,
        {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: window.URL.createObjectURL(e.target.files[0]),
        },
      ]);
    }
    setImageCount((imageCount) => imageCount + 1);
  };
  const handleClick = () => {
    inputFile.current.click();
  };
  return (
    <div className={classes.root}>
      {[0, 1, 2, 3, 4].map((id) => (
        <Paper elevation={3} id={id}>
          <input
            type="file"
            accept="image/*"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={handleChange}
          />
          {imageData.length > id ? (
            <Avatar
              alt={`property ${id}`}
              variant="square"
              src={imageData[id].preview}
              className={classes.large}
            />
          ) : (
            <IconButton onClick={handleClick} className={classes.iconRoot}>
              <Icon
                fontSize="large"
                color={imageCount >= id ? "primary" : "disabled"}
              >
                add_circle
              </Icon>
            </IconButton>
          )}
        </Paper>
      ))}
    </div>
  );
};

Images.propTypes = {
  setImageDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setImageDetails })(Images);
