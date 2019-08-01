import { CardContent } from "@material-ui/core";
import styled from "styled-components";

export const StyledCardContent = styled(CardContent)`
  && {
    text-align: left;
    padding: 24px 24px 0px 24px;
    & > h6 {
      font-weight: bold;
    }
    & > p {
      line-height: 1.8;
    }
    & > hr {
      margin: 24px 24px 0px 24px;
    }
  }
`;
