import { AppBar } from "@material-ui/core";
import styled from "styled-components";

export const StyledAppBar = styled(AppBar)`
  && {
    z-index: ${(props) => props.theme.zIndex.drawer + 1};
    background: linear-gradient(45deg, #217fff 30%, #43adff 90%);

    & > div > a {
      color: white;
    }
  }
`;
