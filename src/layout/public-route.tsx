import { ApplicationState } from "index";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Loading } from "layout/loading";

export const PublicRoute: React.FC<RouteProps> = (props) => {
  const user = useSelector((state: ApplicationState) => state.user);

  return !user.isLoading
    ? !user.profile ? <Route {...props} /> : <Redirect to="/app" />
    : <Loading />;
};
