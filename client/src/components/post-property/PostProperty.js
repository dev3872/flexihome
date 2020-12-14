import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Steps from "./Steps";

function PostProperty({ isAuthenticated }) {
  return (
    <div>
      {/* TODO: STEPPER */}
      <Steps />
      {/* TODO: WHO ARE YOU? */}
      {/* TODO: LISTING PROPERTY FOR */}
      {/* TODO: SELECT PROPERTY TYPE */}
      {/* TODO: LOCATION DETAILS */}
      {/* TODO: PROPERTY DETAILS */}
      {/* TODO: IMAGES */}
      {/* TODO: FURNISHING */}
      {/* TODO: AMENITIES */}
      {/* TODO: PRICING */}
      {/* TODO: STEPPER CONTROL */}
    </div>
  );
}

PostProperty.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(PostProperty);
