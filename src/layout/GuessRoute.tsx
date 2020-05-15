import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ApplicationState } from "..";

const GuessRoute: React.FC = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  return auth.isLoaded ? (
    <>{auth.isEmpty ? <Route {...props} /> : <Redirect to="/" />}</>
  ) : (
    <p>Loading...</p>
  );
};

export default GuessRoute;
