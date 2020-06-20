import React from "react";
import { Route, Redirect } from "react-router-dom";

const NonPrivateRoute = ({
  component: Component,
  authorized,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
        authorized ? (
        <Redirect
          to={{
            pathname: "/my-albums",
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default NonPrivateRoute;
