import React from "react";
import { Route, Switch } from "react-router-dom";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
