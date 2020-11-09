import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { ApplicationState } from "index";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  return auth.isLoaded ? (
    <>{auth.isEmpty ? <Redirect to="/login" /> : <Route {...props} />}</>
  ) : (
    <p>Loading...</p>
  );
};

export default PrivateRoute;
