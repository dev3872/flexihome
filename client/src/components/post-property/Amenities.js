import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import { setAmenitiesList } from "../../actions/post-property";
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

const Amenities = ({ propertyType, setAmenitiesList }) => {
  const classes = useStyles();
  const [amenities, setAmenities] = useState([]);
  const [amenitiesItems, setAmenitiesItems] = useState([]);
  useEffect(() => {
    if (amenities.length > 0) {
      setAmenitiesList(amenities);
    }
  }, [amenities]);
  useEffect(() => {
    propertyType === "Residential"
      ? setAmenitiesItems([...amenitiesItemsResidential])
      : setAmenitiesItems([...amenitiesItemsCommercial]);
  }, []);
  const amenitiesItemsResidential = [
    "LIFTS",
    "PARK",
    "MAINTENANCE STAFF",
    "VISITOR PARKING",
    "WATER STORAGE",
    "FENG SHUI / VAASTU COMPLIANT",
    "INTERCOM FACILITY",
    "FIRE ALARM/SECURITY",
    "CENTRALLY AIR CONDITIONED",
    "PRIVATE GARDEN TERRACE",
    "PIPED GAS",
    "INTERNET / WI-FI CONNECTIVITY",
    "WATER PURIFIER",
    "FITNESS CENTRE / GYM",
    "CLUB HOUSE/COMMUNITY CENTER",
    "SECURITY PERSONNEL",
    "WATER SOFTENING PLANT",
    "SHOPPING CENTRE",
    "WASTE DISPOSAL",
    "RAIN WATER HARVESTING",
    "BANK ATTACHED PROPERTY",
  ];
  const amenitiesItemsCommercial = [
    "VISITOR PARKING",
    "LIFT",
    "WATER STORAGE",
    "MAINTENANCE STAFF",
    "SECURITY/FIRE ALARM",
    "WASTE DISPOSAL",
    "SECURITY PERSONNEL",
    "ATM",
    "SERVICE/GOODS LIFT",
    "CONFERENCE ROOM",
    "CENTRALLY AIR CONDITIONED",
    "INTERCOM FACILITY",
    "FENG SHUI/VASTU COMPLIANT",
    "FITNESS CENTRE/GYM",
    "CLUB HOUSE/COMMUNITY CENTRE",
    "SWIMMING POOL",
  ];

  return (
    <Grid container xs={12}>
      <Grid container xs={3} />
      <Grid container xs={6} spacing={3}>
        {amenitiesItems.map((item) => (
          <Grid item xs={4}>
            <Paper
              className={
                amenities.indexOf(item) !== -1
                  ? classes.paperControlSelected
                  : classes.paperControl
              }
              variant="outlined"
              onClick={() => {
                if (amenities.indexOf(item) === -1)
                  setAmenities([...amenities, item]);
                else
                  setAmenities([
                    ...amenities.filter((item1) => item1 !== item),
                  ]);
              }}
            >
              {item}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container xs={3} />
    </Grid>
  );
};

Amenities.propTypes = {
  setAmenitiesList: PropTypes.func.isRequired,
  propertyType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  propertyType: state.postProperty.propertyType.propertyType,
});

export default connect(mapStateToProps, { setAmenitiesList })(Amenities);
