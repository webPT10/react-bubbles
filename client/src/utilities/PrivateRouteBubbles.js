import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteBubbles = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={props =>
          localStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" /> // to LOGIN page
          )
        }
      />
    </>
  );
};
export default PrivateRouteBubbles;
