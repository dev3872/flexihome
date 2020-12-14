import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Help = () => {
  return (
    <div>
      <p>Help</p>
    </div>
  );
};

Help.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Help);
