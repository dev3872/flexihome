import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Grid,
  Icon,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { setPropertyDetails } from "../../actions/post-property";

const useStyles = makeStyles((theme) => ({
  formControl: { marginTop: theme.spacing(4) },
  select: { paddingBlock: theme.spacing(2) },
}));

const Property = ({ setPropertyDetails }) => {
  const [property, setProperty] = useState({
    superBuiltUpArea: 0,
    builtUpArea: 0,
    carpetArea: 0,
    unit: "",
    roomCount: {
      bedrooms: 0,
      bathrooms: 0,
      balconies: 0,
      poojaRoom: 0,
      studyRoom: 0,
      serventRoom: 0,
    },
    reservedParking: "",
    parkingCount: 0,
    constructionCount: 0,
  });
  const classes = useStyles();
  useEffect(() => {
    setPropertyDetails(property);
  }, [property]);
  const handleChange = (event) => {
    setProperty((oldProperty) => ({
      ...oldProperty,
      [event.target.name]: event.target.value,
    }));
  };

  const unitList = [
    "SQ FT",
    "SQ MT",
    "SQ YARDS",
    "ACRE",
    "BIGHA",
    "HECTARE",
    "MARLA",
    "KANAL",
    "BISWAL",
    "GROUND",
    "AANTADAM",
    "ROOD",
    "CHATAK",
    "KOTTAH",
    "MARLA",
    "CENT",
    "PERCH",
    "GUNTHE",
    "ARE",
  ];
  const propertyFloor = [
    "Basement",
    "Lower Ground",
    "Ground",
    "1",
    "2",
    "3",
    "4",
  ];
  const reservedParkingList = ["Not Available", "Available"];
  const superBuiltUpArea = (
    <TextField
      fullWidth
      name="superBuiltUpArea"
      type="number"
      value={property.superBuiltUpArea}
      onChange={handleChange}
      label="Super BuiltUp Area"
    />
  );
  const builtUpArea = (
    <TextField
      fullWidth
      name="builtUpArea"
      type="number"
      value={property.builtUpArea}
      onChange={handleChange}
      label="BuiltUp Area"
    />
  );
  const carpetArea = (
    <TextField
      fullWidth
      name="carpetArea"
      type="number"
      value={property.carpetArea}
      onChange={handleChange}
      label="Carpet Area"
    />
  );
  const plotArea = (
    <TextField
      fullWidth
      name="plotArea"
      type="number"
      value={property.plotArea}
      onChange={handleChange}
      label="Plot Area"
    />
  );
  const selectUnit = (
    <>
      <InputLabel id="label-selectUnit">Unit</InputLabel>
      <Select
        fullWidth
        labelId="label-selectUnit"
        name="unit"
        value={property.unit}
        onChange={handleChange}
      >
        {unitList.map((unit) => (
          <MenuItem value={unit}>{unit}</MenuItem>
        ))}
      </Select>
    </>
  );
  const propertyOnFloor = (
    <>
      <InputLabel id="label-propertyOnFloor">Property On Floor</InputLabel>
      <Select
        fullWidth
        classes={{ select: classes.select }}
        labelId="label-propertyOnFloor"
        name="propertyOnFloor"
        value={property.propertyOnFloor}
        onChange={handleChange}
      >
        {propertyFloor.map((unit) => (
          <MenuItem value={unit}>{unit}</MenuItem>
        ))}
      </Select>
    </>
  );

  const roomCount = (roomType) => (
    <div>
      <IconButton
        color="primary"
        name="decrement room"
        component="span"
        disabled={property.roomCount[roomType] === 0 ? true : false}
        onClick={() => {
          setProperty((oldProperty) => ({
            ...oldProperty,
            roomCount: {
              ...oldProperty.roomCount,
              [roomType]: oldProperty.roomCount[roomType] - 1,
            },
          }));
        }}
      >
        <Icon color="primary">remove_circle</Icon>
      </IconButton>
      <TextField
        type="number"
        name={roomType}
        variant="standard"
        label={[roomType]}
        value={property.roomCount[roomType]}
        disabled
      />
      <IconButton
        color="primary"
        name="increment room"
        component="span"
        onClick={() => {
          setProperty((oldProperty) => ({
            ...oldProperty,
            roomCount: {
              ...oldProperty.roomCount,
              [roomType]: oldProperty.roomCount[roomType] + 1,
            },
          }));
        }}
      >
        <Icon color="primary">add_circle</Icon>
      </IconButton>
    </div>
  );

  const reservedParking = (
    <>
      <InputLabel id="label-parking">Reserved Parking</InputLabel>
      <Select
        fullWidth
        labelId="label-parking"
        name="reservedParking"
        value={property.reservedParking}
        onChange={handleChange}
      >
        {reservedParkingList.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </>
  );

  const otherCount = (otherName) => (
    <>
      <IconButton
        color="primary"
        name="decrement room"
        component="span"
        disabled={property[otherName] === 0 ? true : false}
        onClick={() => {
          setProperty((oldProperty) => ({
            ...oldProperty,
            [otherName]: oldProperty[otherName] - 1,
          }));
        }}
      >
        <Icon color="primary">remove_circle</Icon>
      </IconButton>
      <TextField
        type="number"
        name={otherName}
        label={otherName}
        value={property[otherName]}
        disabled
      />
      <IconButton
        color="primary"
        name="increment room"
        component="span"
        onClick={() => {
          setProperty((oldProperty) => ({
            ...oldProperty,
            [otherName]: oldProperty[otherName] + 1,
          }));
        }}
      >
        <Icon color="primary">add_circle</Icon>
      </IconButton>
    </>
  );

  return (
    <Grid container xs={12}>
      <Grid xs={1} />
      <Grid xs={9}>
        <Grid container xs={12}>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            <Grid item xs={6}>
              {superBuiltUpArea}
            </Grid>
            <Grid item xs={4}>
              {selectUnit}
            </Grid>
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            <Grid xs={6} item>
              {builtUpArea}
            </Grid>
            <Grid xs={4} item>
              {selectUnit}
            </Grid>
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            <Grid item xs={6}>
              {carpetArea}
            </Grid>
            <Grid item xs={4}>
              {selectUnit}
            </Grid>
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            {roomCount("bedrooms")}
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            {roomCount("bathrooms")}
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            {roomCount("balconies")}
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            {roomCount("poojaRoom")}
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            {roomCount("studyRoom")}
          </Grid>
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            {roomCount("serventRoom")}
          </Grid>
          <Grid container xs={3} spacing={2} className={classes.formControl}>
            {propertyOnFloor}
          </Grid>
          <Grid container xs={1} />
          <Grid container xs={3} spacing={2} className={classes.formControl}>
            {reservedParking}
          </Grid>
          <Grid container xs={1} />
          <Grid container xs={4} spacing={2} className={classes.formControl}>
            {otherCount("parkingCount")}
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={1} />
    </Grid>
  );
};

Property.propTypes = {
  setPropertyDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setPropertyDetails })(Property);
