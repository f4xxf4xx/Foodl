import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Loading } from "layout/loading";
import { ApplicationState } from "index";

export const AppRoute: React.FC<RouteProps> = (props) => {
  const user = useSelector((state: ApplicationState) => state.user);

  return !user.isLoading
    ? user.profile ? <Route {...props} /> : <Redirect to="/login" />
    : <Loading />;
};
