import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { setPricingDetails } from "../../actions/post-property";

const Pricing = ({ setPricingDetails }) => {
  const [pricing, setPricing] = useState({
    Availability: "",
    Ownership: "",
    Maintenence: "",
    MembershipCharge: "",
    BookingAmount: "",
    AnnualDuesPayable: "",
    ExpectedRental: "",
    ExpectedPrice: "",
  });

  useEffect(() => {
    setPricingDetails(pricing);
  }, [pricing]);

  const handleChange = (e) => {
    setPricing({ ...pricing, [e.target.name]: e.target.value });
  };
  const selectMenuPricing = (selectName, selectOptions) => (
    <>
      <InputLabel id="label-selectName">{selectName}</InputLabel>
      <Select
        fullWidth
        labelId="label-selectName"
        name={selectName}
        value={pricing[selectName]}
        onChange={handleChange}
      >
        {selectOptions.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </>
  );
  const textFieldPricing = (fieldName) => (
    <TextField
      fullWidth
      name={fieldName}
      type="number"
      value={pricing[fieldName]}
      onChange={handleChange}
      label={fieldName}
    />
  );
  return (
    <Grid container xs={12}>
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Grid container xs={12} spacing={3}>
          <Grid item xs={4}>
            {selectMenuPricing("Availability", [
              "Under Construction",
              "Ready To Move",
            ])}
          </Grid>
          <Grid item xs={4}>
            {selectMenuPricing("Ownership", [
              "Freehold",
              "Leasehold",
              "Co-Operative Society",
              "Power Of Attorney",
            ])}
          </Grid>
          <Grid item xs={4}>
            {selectMenuPricing("Maintenence", [
              "Monthly",
              "Annualy",
              "One Time",
              "Per Unit / Monthly",
            ])}
          </Grid>
          <Grid item xs={4}>
            {textFieldPricing("MembershipCharge")}
          </Grid>
          <Grid item xs={4}>
            {textFieldPricing("BookingAmount")}
          </Grid>
          <Grid item xs={4}>
            {textFieldPricing("AnnualDuesPayable")}
          </Grid>
          <Grid item xs={4}>
            {textFieldPricing("ExpectedRental")}
          </Grid>
          <Grid item xs={4}>
            {textFieldPricing("ExpectedPrice")}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
};

Pricing.propTypes = {
  setPricingDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setPricingDetails })(Pricing);
