import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "../dashboard/Dashboard";
import PostProperty from "../post-property/PostProperty";
import PrivateRoute from "../routing/PrivateRoute";
import SearchProperty from "../search-property/SearchProperty";
import Help from "../other/Help";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/post-property" component={PostProperty} />
        <Route exact path="/search-property" component={SearchProperty} />
        <Route exact path="/help" component={Help} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Routes);
