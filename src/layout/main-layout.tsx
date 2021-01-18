import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "index";
import { firebase } from "config";
import { Sidebar } from "layout/sidebar";
import { Header } from "layout/header";
import { PublicNav } from "layout/public-nav";
import { PublicNavActions } from "layout/public-nav-actions";
import { Footer } from "layout/footer";
import "layout/Styles/MainLayout.css";

const StyledHeader = styled(Header)`
  flex: 0 0 auto;
`;

const StyledMain = styled.main`
  flex: 1 0 auto;
`;

const StyledFooter = styled(Footer)`
  flex: 0 0 auto;
`;

const StyledSidebar = styled(Sidebar)`
  top: 80px;
  background-color: lightsteelblue;
  width: 240px;
  height: 100vh;
  position: fixed;
`;



const MainLayout: React.FC = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const history = useHistory();

  const onSignOutClick = () => {
    firebase.auth().signOut();
    history.push("/");
  };

  if (!auth.isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <StyledHeader
        center={<PublicNav/>}
        right={auth.isEmpty 
          ? <PublicNavActions />
          : <button onClick={onSignOutClick}>Sign out</button>
        }
      />
      {!auth.isEmpty && <StyledSidebar />}
      <StyledMain>
        { props.children }
      </StyledMain>
      <StyledFooter />
    </>
  );
};

export default MainLayout;
