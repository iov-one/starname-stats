import { Home } from "components/Home";
import Login from "components/Login";
import React from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "routes/protected";

export const Routes: React.FC = (): React.ReactElement => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path={"/"} component={Home} exact />
        <Route path={"/login"} component={Login} exact />
      </Switch>
    </Router>
  );
};
