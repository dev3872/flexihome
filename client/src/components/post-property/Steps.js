import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WhoAreYou from "./WhoAreYou";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListingPropertyFor from "./ListingPropertyFor";
import ApartmentType from "./ApartmentType";
import LocationDetails from "./LocationDetails";
import PropertyDetails from "./PropertyDetails";
import Images from "./Images";
import Furnishing from "./Furnishing";

const Steps = ({ postProperty }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [validForward, setValidForward] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: 100,
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    control: {
      marginTop: theme.spacing(2),
    },
  }));
  useEffect(() => {
    if (
      (activeStep === 0 && postProperty.user !== "") ||
      (activeStep === 1 &&
        Object.keys(postProperty.listingPropertyFor).length > 0) ||
      (activeStep === 2 && postProperty.propertyType.propertySubType !== "") ||
      (activeStep === 3 && validateStep3(postProperty.locationDetails)) ||
      (activeStep === 4 && postProperty.propertyDetails.unit !== "") ||
      activeStep === 5 ||
      activeStep === 6
    ) {
      setValidForward(true);
    } else {
      setValidForward(false);
    }
  }, [
    activeStep,
    postProperty.user,
    postProperty.listingPropertyFor.listingFor,
    postProperty.propertyType.propertySubType,
    postProperty.locationDetails.defState,
    postProperty.locationDetails.defCity,
    postProperty.locationDetails.projectName,
    postProperty.locationDetails.address,
    postProperty.locationDetails.locality,
    postProperty.locationDetails.pincode,
    postProperty.propertyDetails.unit,
  ]);
  const classes = useStyles();
  const getSteps = () => [
    "Who are you?",
    "Listing Property For",
    "Select Property Type",
    "Location Details",
    "Property Details",
    "Images",
    "Furnishing",
    "Amenities",
    "Pricing",
    "Submit",
  ];

  const validateStep3 = (locationDetail) => {
    let flag = true;
    Object.entries(locationDetail).forEach(([key, value]) => {
      if (value === "") {
        flag = false;
      }
    });
    return flag;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <WhoAreYou />;
      case 1:
        return <ListingPropertyFor />;
      case 2:
        return <ApartmentType />;
      case 3:
        return <LocationDetails />;
      case 4:
        return <PropertyDetails />;
      case 5:
        return <Images />;
      case 6:
        return <Furnishing />;
      default:
        return "Unknown step";
    }
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>

            <Grid className={classes.control} container justify="center">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                disabled={!validForward}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

Steps.propTypes = {
  postProperty: PropTypes.object,
};

const mapStateToProps = (state) => ({
  postProperty: state.postProperty,
});

export default connect(mapStateToProps, {})(Steps);
