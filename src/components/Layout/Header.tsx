import React from "react";
import { Typography, Toolbar } from '@material-ui/core';
import { StyledAppBar } from "./Styles/StyledAppBar";
import { StyledLink } from "./Styles/StyledLink";

export class Header extends React.Component<any> {
  render() {
    return (
      <StyledAppBar position="fixed">
        <Toolbar>
          <StyledLink to={"/"}>
            <Typography variant="h6" noWrap>
              Foodl
            </Typography>
          </StyledLink>
        </Toolbar>
      </StyledAppBar>
    );
  }
}