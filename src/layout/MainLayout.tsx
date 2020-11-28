import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "index";
import { firebase } from "config";
import { isAuthenticated } from "helpers/userHelper";
import { Header } from "layout/Header";
import Sidebar from "layout/Sidebar";
import { Theme } from "theme";

import "layout/Styles/MainLayout.css";

const StyledHeader = styled(Header)<{ theme: Theme }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  & + section, & + main {
    padding-top: ${({ theme }) => theme.sizes.headerHeight};
  }
`;

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
      <StyledHeader>
        <div className="user-actions">
          {isAuthenticated(auth) ? (
            <button onClick={onSignOutClick}>Sign out</button>
          ) : (
            <button onClick={redirectToLogin}>Login</button>
          )}
        </div>
      </StyledHeader>
      {!auth.isEmpty && <Sidebar />}
      { props.children }
    </>
  );
};

export default MainLayout;
