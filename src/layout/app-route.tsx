import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Loading } from "layout/loading";
import { ApplicationState } from "index";

export const AppRoute: React.FC<RouteProps> = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  return auth.isLoaded
    ? auth.isEmpty ? <Redirect to="/login" /> : <Route {...props} />
    : <Loading />;
};
