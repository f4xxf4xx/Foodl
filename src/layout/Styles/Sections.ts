import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { PaperProps } from "@material-ui/core/Paper";

type DimensionProps = PaperProps & { 
  width?: string;
  height?: string;
}

export const StyledPaper = styled(Paper)<DimensionProps>`
  && {
    width: ${props => props.width ? `${props.width}px` : "400px"};
    margin-top: 10px;
    margin-bottom: 20px;
    padding:8px;
  }
`;