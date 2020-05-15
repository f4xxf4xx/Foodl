import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ApplicationState } from "..";
import { isAuthenticated } from "../helpers/userHelper";
import { firebase } from "./../config";

const Header: React.FC = () => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const history = useHistory();

  const onSignOutClick = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  return (
    <div>
      <div>{isAuthenticated(auth) && <p>Menu icon</p>}</div>
      <Link to="/">Foodl</Link>
      {isAuthenticated(auth) ? (
        <button onClick={onSignOutClick}>Sign out</button>
      ) : (
        <button onClick={redirectToLogin}>Login</button>
      )}
    </div>
  );
};

export default Header;
