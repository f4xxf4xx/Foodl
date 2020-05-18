import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ApplicationState } from "..";
import { isAuthenticated } from "../helpers/userHelper";
import { firebase } from "./../config";

import "./Styles/MainLayout.css";

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
    <div className="header">
      <div className="logo">
        <Link to="/">
          <h3>Foodl</h3>
        </Link>
      </div>
      <div className="user-actions">
        {isAuthenticated(auth) ? (
          <button onClick={onSignOutClick}>Sign out</button>
        ) : (
          <button onClick={redirectToLogin}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
