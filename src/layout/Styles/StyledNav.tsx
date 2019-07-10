import { Drawer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export const StyledNav = styled.nav`
  && {
    ${(props) => props.theme.breakpoints.up("sm")} {
      width: 240px;
      flex-shrink: 0;
    }
  }
`;
