import { IconButton } from "@material-ui/core";
import styled from "styled-components";

export const StyledMenuIcon = styled(IconButton)`
  && {
    color: inherit;
    ${(props) => props.theme.breakpoints.up("sm")} {
      display: none;
    }
  }
`;
