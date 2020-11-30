import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "index";
import { firebase } from "config";
import { isAuthenticated } from "helpers/userHelper";
import Sidebar from "layout/Sidebar";
import { Header } from "layout/Header";

import "layout/Styles/MainLayout.css";

const MainLayout: React.FC = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const history = useHistory();

  const onSignOutClick = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  if (!auth.isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header>
        <div className="user-actions">
          {isAuthenticated(auth) ? (
            <button onClick={onSignOutClick}>Sign out</button>
          ) : (
            <button onClick={redirectToLogin}>Login</button>
          )}
        </div>
      </Header>
      {!auth.isEmpty && <Sidebar />}
      <section>
        { props.children }
      </section>
    </>
  );
};

export default MainLayout;
