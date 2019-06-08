import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Signin from "pages/auth/signin";
import Orders from "pages/orders";
import { AuthConsumer } from "providers/AuthComponent";

const AllRoutes = () => (
  <Router>
    <Switch>
      <AuthConsumer>
        {props => (
          <>
            <Route exact path="/" component={(routeProps) => <Signin {...props} {...routeProps} />} />
            <Route
              exact
              path="/pedidos"
              component={(routeProps) => <Orders {...props} {...routeProps} />}
            />
          </>
        )}
      </AuthConsumer>
    </Switch>
  </Router>
);

export default AllRoutes;