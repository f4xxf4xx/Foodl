import React, { useState } from "react";
import { useViewportScroll } from "framer-motion";
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
  background: transparent;
  box-shadow: 0 0 0 rgba(0,0,0,0),
              0 0 0 rgba(0,0,0,0),
              0 0 0 rgba(0,0,0,0),
              0 0 0 rgba(0,0,0,0),
              0 0 0 rgba(0,0,0,0);

  transition: background .1s ease-in,
              box-shadow .2s ease-in,
              transform .2s ease-in;

  &.raised {
    background: ${({ theme }) => theme.colors.dark.green};
    box-shadow: 0 1px 1px rgba(0,0,0,.08),
                0 2px 2px rgba(0,0,0,.08),
                0 4px 4px rgba(0,0,0,.08),
                0 8px 8px rgba(0,0,0,.08),
                0 16px 16px rgba(0,0,0,.08);
    transform: scale(1.01);
  }

  & + section, & + main {
    padding-top: ${({ theme }) => theme.sizes.headerHeight};
  }
`;

const MainLayout: React.FC = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const history = useHistory();
  const [headerRaised, setHeaderRaised] = useState(false);
  const { scrollY } = useViewportScroll();
  scrollY.onChange(y => setHeaderRaised(!!y));

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
      <StyledHeader className={headerRaised ? "raised" : ""}>
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
