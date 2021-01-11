import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "index";
import { firebase } from "config";
import { Sidebar } from "layout/sidebar";
import { Header } from "layout/header";
import { PublicNav } from "layout/public-nav";
import { PublicNavActions } from "layout/public-nav-actions";

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
      <Header
        center={<PublicNav/>}
        right={auth.isEmpty 
          ? <PublicNavActions />
          : <></>
        }
      />
      {!auth.isEmpty && <Sidebar />}
      <section>
        { props.children }
      </section>
    </>
  );
};

export default MainLayout;
