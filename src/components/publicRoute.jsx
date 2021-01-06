import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../conteaxts/AutoConteaxt";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser !== undefined && currentUser.role === "1" ? (
          <Redirect to="deshborad" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
