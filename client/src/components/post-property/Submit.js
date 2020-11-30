import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  accordionControl: {
    width: "70%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  column: {
    flexBasis: "33.33%",
    padding: theme.spacing(1, 2),
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Submit = ({ postProperty }) => {
  const [listingType, setListingType] = useState("");
  useEffect(() => {
    let listingDetail = "";
    switch (postProperty.listingPropertyFor.listingFor) {
      case "Sell":
        listingDetail = clsx(
          "rera status: ",
          postProperty.listingPropertyFor.reraStatus
        );
        break;
      case "Rent":
        listingDetail = clsx(
          "Rent for: ",
          postProperty.listingPropertyFor.rentGroup.family ? "family" : "",
          postProperty.listingPropertyFor.rentGroup.singleWomen
            ? "singleWomen"
            : "",
          postProperty.listingPropertyFor.rentGroup.singleMen
            ? "singleMen"
            : "",
          postProperty.listingPropertyFor.rentGroup.All ? "All" : "",
          "\n",
          "Agreement Type: ",
          postProperty.listingPropertyFor.agreementType
        );
        break;
      case "Share":
        listingDetail = clsx(
          "Share for: ",
          postProperty.listingPropertyFor.shareGroup.girls ? "girls" : "",
          postProperty.listingPropertyFor.shareGroup.boys ? "boys" : "",
          postProperty.listingPropertyFor.shareGroup.both ? "both" : ""
        );
        break;
      case "PG":
        listingDetail = clsx(
          "PG for: ",
          postProperty.listingPropertyFor.pgGroup.girls ? "girls" : "",
          postProperty.listingPropertyFor.pgGroup.boys ? "boys" : "",
          postProperty.listingPropertyFor.pgGroup.both ? "both" : ""
        );
        break;
      default:
    }
    setListingType(listingDetail);
  }, [postProperty]);
  const classes = useStyles();
  const submitAccordion = (accordionSummary, accordionDetails) => (
    <Grid container className={classes.root}>
      <Accordion defaultExpanded={false} className={classes.accordionControl}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div>
            <Typography className={classes.heading}>
              {accordionSummary}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {accordionDetails.map((item, index) => (
              <>
                <Grid
                  item
                  xs={4}
                  className={
                    index % 3 === 0
                      ? classes.column
                      : clsx(classes.column, classes.helper)
                  }
                >
                  {item.heading}: <div>{item.value}</div>
                </Grid>
                {index % 3 === 2 ? (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
  const imageAccordion = (accordionImages) => (
    <Grid container className={classes.root}>
      <Accordion defaultExpanded={false} className={classes.accordionControl}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div>
            <Typography component="p" className={classes.heading}>
              {"Images"}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {accordionImages.map((item, index) => (
              <>
                <Grid
                  item
                  xs={3}
                  className={
                    index % 4 === 0
                      ? classes.column
                      : clsx(classes.column, classes.helper)
                  }
                >
                  <Paper elevation={3} id={index} className={classes.large}>
                    <Avatar
                      alt={`property ${index}`}
                      variant="square"
                      src={item.preview}
                      className={classes.large}
                    />
                  </Paper>
                </Grid>
                {index % 4 === 3 ? (
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
  return (
    <>
      {submitAccordion("Property Type and Location", [
        { heading: "Property posted by", value: postProperty.user },
        {
          heading: "Property posted for",
          value: postProperty.listingPropertyFor.listingFor,
        },
        {
          heading: "Posting Details",
          value: listingType,
        },
        {
          heading: "Property type",
          value: postProperty.propertyType.propertyType,
        },
        {
          heading: "Property subtype",
          value: postProperty.propertyType.propertySubType,
        },
        {
          heading: "Property location",
          value: clsx(
            postProperty.locationDetails.locality,
            ", ",
            postProperty.locationDetails.defCity,
            ", ",
            postProperty.locationDetails.defState
          ),
        },
      ])}
      {submitAccordion("Property Details", [
        {
          heading: "Super builtup Area",
          value: clsx(
            postProperty.propertyDetails.superBuiltUpArea,
            " ",
            postProperty.propertyDetails.unit
          ),
        },
        {
          heading: "Builtup Area",
          value: clsx(
            postProperty.propertyDetails.builtUpArea,
            " ",
            postProperty.propertyDetails.unit
          ),
        },
        {
          heading: "Carpet Area",
          value: clsx(
            postProperty.propertyDetails.carpetArea,
            " ",
            postProperty.propertyDetails.unit
          ),
        },
        {
          heading: "Reserved Parking",
          value: postProperty.propertyDetails.reservedParking,
        },
        {
          heading: "Property on Floor",
          value: postProperty.propertyDetails.propertyOnFloor,
        },
        {
          heading: "Parking Count",
          value: postProperty.propertyDetails.parkingCount,
        },
        {
          heading: "Bedrooms",
          value: postProperty.propertyDetails.roomCount.bedrooms,
        },
        {
          heading: "Bathrooms",
          value: postProperty.propertyDetails.roomCount.bathrooms,
        },
        {
          heading: "Balconies",
          value: postProperty.propertyDetails.roomCount.balconies,
        },
        {
          heading: "Pooja Room",
          value: postProperty.propertyDetails.roomCount.poojaRoom,
        },
        {
          heading: "Study Room",
          value: postProperty.propertyDetails.roomCount.studyRoom,
        },
        {
          heading: "Servent Room",
          value: postProperty.propertyDetails.roomCount.serventRoom,
        },
      ])}
      {imageAccordion(postProperty.imageDetails)}
      {submitAccordion("Furnishing and Amenities", [
        {
          heading: "Furnishing",
          value: clsx(postProperty.furnishing.map((item) => clsx(item, "\n"))),
        },
        {
          heading: "Amenities",
          value: clsx(postProperty.amenities.map((item) => item)),
        },
      ])}
      {submitAccordion("Pricing", [
        {
          heading: "Availability",
          value: postProperty.pricing.Availability,
        },
        {
          heading: "Ownership",
          value: postProperty.pricing.Ownership,
        },
        {
          heading: "Maintenence",
          value: postProperty.pricing.Maintenence,
        },
        {
          heading: "MembershipCharge",
          value: postProperty.pricing.MembershipCharge,
        },
        {
          heading: "BookingAmount",
          value: postProperty.pricing.BookingAmount,
        },
        {
          heading: "AnnualDuesPayable",
          value: postProperty.pricing.AnnualDuesPayable,
        },
        {
          heading: "ExpectedRental",
          value: postProperty.pricing.ExpectedRental,
        },
        {
          heading: "ExpectedPrice",
          value: postProperty.pricing.ExpectedPrice,
        },
      ])}
    </>
  );
};

Submit.propTypes = {
  postProperty: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  postProperty: state.postProperty,
});

export default connect(mapStateToProps, {})(Submit);
