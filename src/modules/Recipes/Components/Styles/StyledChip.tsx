import React from "react";
import styled from "styled-components";
import { Chip } from "@material-ui/core";

export const StyledChip = styled(Chip)`
  && {
    margin: ${(props) => props.theme.spacing(0.5)}px;
  }
`;
