import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ApplicationState } from "index";
import { Header } from "layout/header";
import { PublicNav } from "layout/public-nav";
import { AppNav } from "layout/app-nav";
import { Footer } from "layout/footer";
import { Theme } from "theme";
import "layout/Styles/MainLayout.css";

const StyledHeader = styled(Header)`
  flex: 0 0 auto;
`;

const StyledBackdrop = styled.div<{ theme: Theme }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({theme}) => theme.colors.dark.blue};
  opacity: .12;
  z-index: 24;
`;

const StyledMain = styled.main<{theme: Theme}>`
  flex: 1 0 auto;
  transition: transform .2s ease-out;

  &.pushed-back {
    transform: translateX(-${({theme}) => theme.space.large});
  }
`;

const StyledFooter = styled(Footer)`
  flex: 0 0 auto;
`;

function setIsWindowScrollable(isScrollable: boolean) {
  const html = document.documentElement;
  if (html) {
    html.style['overflow'] = isScrollable ? 'auto' : 'hidden';
  }
}

const MainLayout: React.FC = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  useEffect(() => setIsWindowScrollable(!isDrawerOpened), [isDrawerOpened]);

  if (!auth.isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <StyledHeader
        isDrawerOpened={isDrawerOpened}
        onMenuClick={() => setIsDrawerOpened(!isDrawerOpened)}
        children={auth.isEmpty ? <PublicNav /> : <AppNav />}
      />
      {isDrawerOpened && <StyledBackdrop
        onClick={() => setIsDrawerOpened(!isDrawerOpened)}
      />}
      <StyledMain className={isDrawerOpened && "pushed-back"}>
        { props.children }
      </StyledMain>
      <StyledFooter />
    </>
  );
};

export default MainLayout;
