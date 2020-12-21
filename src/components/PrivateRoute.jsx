import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../conteaxts/AutoConteaxt";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
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
