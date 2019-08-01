import styled from "styled-components";
import { Box } from "@material-ui/core";

export const StyledRecipeInfo = styled(Box)`
  && {
    display: inline-block;
    width: 120px;
    height: ${(props) => props.editing ? "60px" : "auto"};
    padding: 12px;
    margin: 4px;
    background-color: ${(props) => props.theme.palette.primary.main};

    border-radius: 8px;
  }
`;
