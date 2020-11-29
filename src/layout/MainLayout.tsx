import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "index";
import { firebase } from "config";
import { isAuthenticated } from "helpers/userHelper";
import Sidebar from "layout/Sidebar";
import { Header } from "layout/Header";
import { Theme } from "theme";

import "layout/Styles/MainLayout.css";

const StyledSection = styled.section<{ theme: Theme }>`
  & > *:first-child {
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
      <StyledSection>
        { props.children }
      </StyledSection>
    </>
  );
};

export default MainLayout;
