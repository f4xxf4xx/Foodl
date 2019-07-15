import { Card, CardMedia } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  && {
    color: rgba(0, 0, 0, 0.54);
    margin: ${(props) => props.theme.spacing(1)}px;
  }
`;
