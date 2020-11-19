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
        Object.keys(postProperty.listingPropertyFor).length > 0)
    ) {
      setValidForward(true);
    } else {
      setValidForward(false);
    }
  }, [
    activeStep,
    postProperty.user,
    postProperty.listingPropertyFor.listingFor,
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

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <WhoAreYou />;
      case 1:
        return <ListingPropertyFor />;
      case 2:
        return "This is the bit I really care about!";
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
