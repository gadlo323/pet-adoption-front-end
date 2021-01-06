import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../conteaxts/AutoConteaxt";
const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser !== undefined && currentUser.role === "2" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    ></Route>
  );
};

export default PrivateRouteAdmin;
