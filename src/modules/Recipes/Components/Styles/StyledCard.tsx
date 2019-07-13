import { Card, CardMedia } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  && {
    transition: 0.3s;
    max-width: 300;
    margin: auto;
    box-shadow: 0 4px 20px -6px rgba(0,0,0,0.3);
    &:hover {
      box-shadow: 0 8px 30px -6px rgba(0,0,0,0.3);
    }
  }
`;
