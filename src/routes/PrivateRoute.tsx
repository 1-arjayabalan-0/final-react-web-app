import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  let { children, render, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          <props.component />
        ) : (
          <Redirect
            {...rest}
            to={{ pathname: "/login", state: { from: location } }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
