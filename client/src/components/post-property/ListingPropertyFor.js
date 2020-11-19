import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { setListingProperty } from "../../actions/post-property";
const ListingPropertyFor = ({ userSelected, setListingProperty }) => {
  const [reraStatus, setReraStatus] = useState("");
  const [agreementType, setAgreementType] = useState("");
  const [listPropertyFor, setListPropertyFor] = useState("");
  const [rentGroup, setRentGroup] = useState({
    family: false,
    singleWomen: false,
    singleMen: false,
    all: false,
  });
  const [pgGroup, setPgGroup] = useState({
    girls: false,
    boys: false,
    both: false,
  });
  const [shareGroup, setShareGroup] = useState({
    girls: false,
    boys: false,
    both: false,
  });
  const [listMenu, setListMenu] = useState([]);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectControl: {
      marginLeft: 50,
    },
  }));
  useEffect(() => {
    if (reraStatus !== "") {
      const data = { listingFor: "Sell", reraStatus: reraStatus };
      setListingProperty(data);
    }
  }, [reraStatus]);
  useEffect(() => {
    if (agreementType !== "") {
      const data = {
        listingFor: "Rent",
        agreementType: agreementType,
        rentGroup: rentGroup,
      };
      setListingProperty(data);
    }
  }, [agreementType, rentGroup]);
  useEffect(() => {
    if (pgGroup.girls || pgGroup.boys || pgGroup.both) {
      const data = {
        listingFor: "PG",
        pgGroup: pgGroup,
      };
      setListingProperty(data);
    }
  }, [pgGroup]);
  useEffect(() => {
    if (shareGroup.girls || shareGroup.boys || shareGroup.both) {
      const data = {
        listingFor: "Share",
        shareGroup: shareGroup,
      };
      setListingProperty(data);
    }
  }, [shareGroup]);
  useEffect(() => {
    switch (userSelected) {
      case "Owner":
        setListMenu((oldMenu) => [...oldMenu, "Sell"]);
        setListMenu((oldMenu) => [...oldMenu, "Rent"]);
        setListMenu((oldMenu) => [...oldMenu, "P.G"]);
        break;
      case "Builder":
        setListMenu((oldMenu) => [...oldMenu, "Sell"]);
        setListMenu((oldMenu) => [...oldMenu, "Rent"]);
        setListMenu((oldMenu) => [...oldMenu, "P.G"]);
        break;
      case "Dealer":
        setListMenu((oldMenu) => [...oldMenu, "Sell"]);
        setListMenu((oldMenu) => [...oldMenu, "Rent"]);

        break;
      case "Roommate":
        setListMenu((oldMenu) => [...oldMenu, "Share"]);
        break;
    }
  }, [userSelected]);
  const classes = useStyles();
  const listGroupChange = (event) => {
    setRentGroup({ ...rentGroup, [event.target.name]: event.target.checked });
  };
  const pgGroupChange = (event) => {
    setPgGroup({ ...pgGroup, [event.target.name]: event.target.checked });
  };
  const shareGroupChange = (event) => {
    setShareGroup({ ...shareGroup, [event.target.name]: event.target.checked });
  };
  const sell = (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Rera Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={reraStatus}
        onChange={(event) => {
          setReraStatus(event.target.value);
        }}
      >
        <MenuItem value={"Not Applicable"}>Not Applicable</MenuItem>
        <MenuItem value={"Registered"}>Registered</MenuItem>
        <MenuItem value={"Applied For"}>Applied For</MenuItem>
      </Select>
    </FormControl>
  );
  const rent = (
    <>
      <Grid container>
        <Grid item xs={12} container justify="center">
          <Typography variant="body1" gutterBottom>
            Rent Group Availability
          </Typography>
        </Grid>
        <Grid container xs={4} />
        <Grid container xs={4}>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rentGroup.family}
                  onChange={listGroupChange}
                  name="family"
                  color="primary"
                />
              }
              label="Family"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rentGroup.singleMen}
                  onChange={listGroupChange}
                  name="singleMen"
                  color="primary"
                />
              }
              label="Single Men"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rentGroup.singleWomen}
                  onChange={listGroupChange}
                  name="singleWomen"
                  color="primary"
                />
              }
              label="Single Women"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rentGroup.all}
                  onChange={listGroupChange}
                  name="all"
                  color="primary"
                />
              }
              label="All"
            />
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid container xs={4} />

        <Grid item xs={12} container justify="center">
          <FormControl className={classes.formControl}>
            <InputLabel id="simple-select-label">Agreement Type</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={agreementType}
              onChange={(event) => {
                setAgreementType(event.target.value);
              }}
            >
              <MenuItem value={"Company Lease"}>Company Lease</MenuItem>
              <MenuItem value={"Any"}>Any</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
  const pg = (
    <>
      <Grid container>
        <Grid item xs={12} container justify="center">
          <Typography variant="body1" gutterBottom>
            P.G Availability
          </Typography>
        </Grid>
        <Grid container xs={4} />
        <Grid container xs={4}>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pgGroup.girls}
                  onChange={pgGroupChange}
                  name="girls"
                  color="primary"
                />
              }
              label="Girls"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pgGroup.boys}
                  onChange={pgGroupChange}
                  name="boys"
                  color="primary"
                />
              }
              label="Boys"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pgGroup.all}
                  onChange={pgGroupChange}
                  name="all"
                  color="primary"
                />
              }
              label="All"
            />
          </Grid>
          <Grid item xs={6} />
        </Grid>
        <Grid container xs={4} />
      </Grid>
    </>
  );
  const share = (
    <>
      <Grid container xs={12}>
        <Grid container xs={12} justify="center">
          <Typography variant="body1" gutterBottom>
            Share Availability
          </Typography>
        </Grid>
        <Grid container xs={4} />
        <Grid container xs={4}>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={shareGroup.girls}
                  onChange={shareGroupChange}
                  name="girls"
                  color="primary"
                />
              }
              label="Girls"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={shareGroup.boys}
                  onChange={shareGroupChange}
                  name="boys"
                  color="primary"
                />
              }
              label="Boys"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={shareGroup.all}
                  onChange={shareGroupChange}
                  name="all"
                  color="primary"
                />
              }
              label="All"
            />
          </Grid>
          <Grid item xs={6} />
        </Grid>
        <Grid container xs={4} />
      </Grid>
    </>
  );
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} container justify="center">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo1-simple-select-label">
            List Property For
          </InputLabel>
          <Select
            labelId="demo1-simple-select-label"
            id="demo1-simple-select"
            value={listPropertyFor}
            onChange={(event) => {
              setListPropertyFor(event.target.value);
            }}
          >
            {listMenu.map((label) => (
              <MenuItem value={label}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} container justify="center">
        {listPropertyFor === "Sell" && sell}
        {listPropertyFor === "Rent" && rent}
        {listPropertyFor === "P.G" && pg}
        {listPropertyFor === "Share" && share}
      </Grid>
    </Grid>
  );
};
ListingPropertyFor.propTypes = {
  userSelected: PropTypes.string,
  setListingProperty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userSelected: state.postProperty.user,
});

export default connect(mapStateToProps, { setListingProperty })(
  ListingPropertyFor
);
