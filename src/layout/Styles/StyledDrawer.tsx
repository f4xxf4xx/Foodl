import styled from "styled-components";

export const StyledDrawer = styled.span<{ variant: string; open: boolean}>`
  && {
    & > div.MuiPaper-root {
        width: 240px;
    }
  }
`;
