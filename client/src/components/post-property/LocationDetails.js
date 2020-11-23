import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import states from "./states";
import { setLocationDetails } from "../../actions/post-property";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  padding: {
    padding: theme.spacing(1),
  },
}));

const LocationDetails = ({ setLocationDetails }) => {
  const classes = useStyles();
  const [location, setLocation] = useState({
    defState: "",
    defCity: "",
    projectName: "",
    address: "",
    locality: "",
    pincode: "",
  });

  useEffect(() => {
    setLocationDetails(location);
  }, [location]);

  const stateJSX = states.map((element) => (
    <MenuItem value={element.state}>{element.state}</MenuItem>
  ));

  const cityJSX = states.map((element) =>
    element.state === location.defState ? (
      element.districts.map((district) => (
        <MenuItem value={district}>{district}</MenuItem>
      ))
    ) : (
      <></>
    )
  );

  const handleChange = (event) => {
    setLocation({ ...location, [event.target.name]: event.target.value });
    //setLocationDetail(location);
  };
  return (
    <Grid container xs={12} className={classes.root}>
      <Grid container xs={3} />
      <Grid container xs={6}>
        {/* state select */}
        <Grid xs={5} className={classes.padding}>
          <Select
            fullWidth
            labelId="state-simple-select-helper-label"
            id="state-simple-select-helper"
            name="defState"
            value={location.defState}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {stateJSX}
          </Select>
        </Grid>
        {/* city select */}
        <Grid xs={5} className={classes.padding}>
          <Select
            fullWidth
            labelId="city-simple-select-helper-label"
            id="city-simple-select-helper"
            name="defCity"
            value={location.defCity}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cityJSX}
          </Select>
        </Grid>
        {/* project name textfield */}
        <Grid xs={10} className={classes.padding}>
          <TextField
            fullWidth
            label="Project Name"
            id="project-name-helper"
            name="projectName"
            value={location.projectName}
            onChange={handleChange}
          />
        </Grid>
        {/* address textfield */}
        <Grid xs={10} className={classes.padding}>
          <TextField
            fullWidth
            label="Address"
            id="address-helper"
            name="address"
            value={location.address}
            onChange={handleChange}
          />
        </Grid>
        {/* locality */}
        <Grid xs={5} className={classes.padding}>
          <TextField
            fullWidth
            label="Locality"
            id="locality-helper"
            name="locality"
            value={location.locality}
            onChange={handleChange}
          />
        </Grid>
        {/* pincode */}
        <Grid xs={5} className={classes.padding}>
          <TextField
            fullWidth
            label="Pincode"
            id="pincode-helper"
            name="pincode"
            value={location.pincode}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container xs={3} />
    </Grid>
  );
};

LocationDetails.propTypes = {
  setLocationDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setLocationDetails })(
  LocationDetails
);
