import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = {
    name: "isayas Gadlo",
    email: "gadlo323@gmail.com",
  };
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
