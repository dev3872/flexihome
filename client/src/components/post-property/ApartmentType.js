import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { setPropertyType } from "../../actions/post-property";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paperControlSelected: {
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    display: "flex",
    flexWrap: "wrap",
    minHeight: 50,
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paperControl: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: 50,
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const ApartmentType = ({ propertyType, setPropertyType }) => {
  const [property, setProperty] = useState({
    propertyType: "",
    propertySubType: "",
  });
  useEffect(() => {
    if (property.propertyType !== "") {
      setPropertyType(property);
    }
  }, [property.propertyType, property.propertySubType]);
  const classes = useStyles();
  const residential = [
    "Residential Apartment",
    "Farm House",
    "Serviced Apartment",
    "Independent Villa/House",
    "Independent Builder Floor",
    "Studio Apartment",
    "Residential Land",
    "Other",
  ];
  const commercial = [
    "Commercial Space/Office",
    "Commercial Showroom",
    "Industrial Warehouse",
    "Hotels/Resort",
    "Shop in Retail Mall",
    "Buisness Center",
    "Manufacturing Unit",
    "Commercial Shop",
    "Agricultural/ Farm Land",
    "Factory",
    "Office In IT Park",
    "Guest House/Banquet",
    "office in Buisness Park",
    "Cold Storage",
    "Time Share",
    "Co-Working",
    "Other",
  ];
  const ResidentialList = residential.map((item) => (
    <Grid item xs={4}>
      <Paper
        className={
          item === propertyType.propertySubType
            ? classes.paperControlSelected
            : classes.paperControl
        }
        variant="outlined"
        onClick={() => {
          setProperty({ ...property, propertySubType: item });
        }}
      >
        {item}
      </Paper>
    </Grid>
  ));
  const CommercialList = commercial.map((item) => (
    <Grid item xs={4}>
      <Paper
        className={
          item === propertyType.propertySubType
            ? classes.paperControlSelected
            : classes.paperControl
        }
        variant="outlined"
        onClick={() => {
          setProperty({ ...property, propertySubType: item });
        }}
      >
        {item}
      </Paper>
    </Grid>
  ));
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container justify="center">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="outlined-property-type-label">
            Select Property Type
          </InputLabel>
          <Select
            labelId="outlined-property-type-label"
            id="outlined-property-type"
            value={property.propertyType}
            onChange={(event) => {
              setProperty({
                ...property,
                propertyType: event.target.value,
                propertySubType: "",
              });
            }}
            label="Property Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            <MenuItem value={"Residential"}>Residential</MenuItem>
            <MenuItem value={"Commercial"}>Commercial</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={6} container spacing={2}>
        {property.propertyType === "Residential" && ResidentialList}
        {property.propertyType === "Commercial" && CommercialList}
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
};

ApartmentType.propTypes = {
  prop: PropTypes,
  propertyType: PropTypes.object,
  setPropertyType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  propertyType: state.postProperty.propertyType,
});

export default connect(mapStateToProps, { setPropertyType })(ApartmentType);
