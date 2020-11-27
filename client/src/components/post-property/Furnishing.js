import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import { setFurnishingList } from "../../actions/post-property";
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

const Furnishing = ({ setFurnishingList }) => {
  const classes = useStyles();
  const [furnishing, setFurnishing] = useState([]);
  useEffect(() => {
    if (furnishing.length > 0) {
      setFurnishingList(furnishing);
    }
  }, [furnishing]);
  const furnishingItems = [
    "WARDROBE",
    "Bed",
    "Fans",
    "Light",
    "GEYSER",
    "TV",
    "AC",
    "Modular Kitchen",
    "Fridge",
    "STOVE",
    "WASHING MACHINE",
    "WATER PURIFIER",
    "MICROWAVE",
    "CURTAINS",
    "CHIMNEY",
    "EXHAUST FAN",
    "SOFA",
    "DINING TABLE",
  ];

  return (
    <Grid container xs={12}>
      <Grid container xs={3} />
      <Grid container xs={6} spacing={3}>
        {furnishingItems.map((item) => (
          <Grid item xs={4}>
            <Paper
              className={
                furnishing.indexOf(item) !== -1
                  ? classes.paperControlSelected
                  : classes.paperControl
              }
              variant="outlined"
              onClick={() => {
                if (furnishing.indexOf(item) === -1)
                  setFurnishing([...furnishing, item]);
                else
                  setFurnishing([
                    ...furnishing.filter((item1) => item1 !== item),
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

Furnishing.propTypes = {
  setFurnishingList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setFurnishingList })(Furnishing);
