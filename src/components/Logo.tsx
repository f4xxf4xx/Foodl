import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "theme";

const StyledLink = styled(Link)<{ theme: Theme }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.space.small} ${theme.space.large}`};

  & svg {
    width: auto;
    height: ${({ theme }) => theme.fontSizes.h3};
    vertical-align: middle;
  }

  & svg path {
    fill: ${({ theme }) => theme.colors.modes.inverted.text};
  }
`;

export const Logo: React.FC = (props) => (
  <StyledLink to="/">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="122" height="25" viewBox="0 0 122 25">
    <g id="logo" transform="translate(0.75 0.75)">
      <path d="M16.1,24.3c0,0-0.1,0-0.1,0c-1-0.1-1.7-0.9-1.6-1.9l0.6-7.7c-3.8-3.1-3.4-6.6-2.7-8.5c1-3.1,4-5.7,6.4-5.7
        c0.9,0,1.8,0.8,1.8,1.7v20.3c0,0.5-0.2,0.9-0.5,1.3c-0.3,0.3-0.8,0.5-1.3,0.5L16.1,24.3C16.1,24.3,16.1,24.3,16.1,24.3z M18.6,1.9
        C18.6,1.9,18.6,1.9,18.6,1.9c-1.6,0-4.2,2-5.1,4.7c-0.5,1.5-0.9,4.5,2.6,7.2c0.2,0.1,0.3,0.4,0.3,0.6l-0.7,8.1
        c0,0.2,0.1,0.4,0.3,0.4l2.6,0c0.1,0,0.2-0.1,0.3-0.1c0.1-0.1,0.1-0.2,0.1-0.3V2.3C19,2.1,18.8,1.9,18.6,1.9z M4.6,24.3
        c-0.5,0-0.9-0.2-1.2-0.5C3,23.5,2.8,23,2.8,22.6c0,0,0-0.1,0-0.1l0.6-9.9c-1.9-0.9-3.2-2.9-3.1-5.1C0.4,5.5,0.7,3.6,1,1.7
        C1.2,1,1.9,0.5,2.8,0.5c0.7,0,1.3,0.3,1.6,0.9C4.7,0.8,5.3,0.5,6,0.5c0,0,0,0,0,0c0.7,0,1.3,0.3,1.6,0.8c0.3-0.5,0.9-0.8,1.6-0.8
        c0.9,0,1.7,0.5,1.8,1.2c0.3,1.9,0.6,3.8,0.7,5.7c0.1,2.2-1.1,4.2-3.1,5.1l0.6,9.9c0,0.5-0.1,0.9-0.5,1.3c-0.3,0.3-0.8,0.6-1.2,0.6
        c0,0-0.1,0-0.1,0H4.6C4.6,24.3,4.6,24.3,4.6,24.3z M2.8,1.9C2.6,1.9,2.4,2,2.4,2C2.1,3.8,1.8,5.7,1.7,7.6c-0.1,1.7,1,3.3,2.6,3.9
        c0.3,0.1,0.5,0.4,0.5,0.7L4.2,22.5c0,0.1,0,0.2,0.1,0.3c0.1,0.1,0.2,0.1,0.3,0.1h2.9c0.1,0,0.2,0,0.3-0.1c0.1-0.1,0.1-0.2,0.1-0.3
        L7.3,12.1c0-0.3,0.2-0.6,0.5-0.7c1.6-0.6,2.7-2.2,2.6-3.9C10.2,5.7,10,3.8,9.7,2c0,0-0.2-0.1-0.4-0.1C9,1.9,8.9,2,8.9,2v6.1
        c0,0.1,0,0.2,0,0.2C8.7,8.7,8.3,8.9,7.8,8.9c-0.7,0-0.9-0.4-1-0.6c0,0,0-0.1,0-0.2C6.7,7,6.4,2.1,6.4,1.9c0,0-0.1,0-0.4,0
        c0,0,0,0,0,0C5.8,1.9,5.7,2,5.7,2c0,0.7-0.3,5.1-0.4,6.1c0,0.1,0,0.1,0,0.2c0,0.2-0.2,0.6-0.9,0.6c-0.5,0-1-0.2-1.1-0.5
        c0-0.1,0-0.2,0-0.3V2C3.1,2,3,1.9,2.8,1.9C2.8,1.9,2.8,1.9,2.8,1.9z" />
      <path id="Path_23" d="M32.9,24.3c-0.2,0-0.5-0.1-0.7-0.3c-0.2-0.2-0.3-0.4-0.3-0.7v-22c0-0.2,0.1-0.5,0.3-0.7
        c0.2-0.2,0.4-0.3,0.7-0.3h14.9c0.2,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.4,0.3,0.7c0,0.2-0.1,0.5-0.3,0.6c-0.2,0.2-0.4,0.3-0.7,0.3h-14
        v9.1h10.3c0.2,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.4,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7c-0.2,0.2-0.4,0.3-0.7,0.3H33.9v10.1
        c0,0.2-0.1,0.5-0.3,0.7C33.4,24.2,33.2,24.3,32.9,24.3z M60.7,24.5c-1.6,0-3.1-0.4-4.4-1.1c-1.3-0.7-2.4-1.8-3.1-3
        C52.4,19,52,17.5,52,16c0-1.5,0.4-3,1.1-4.4c0.7-1.3,1.8-2.3,3.1-3c1.4-0.8,2.9-1.1,4.4-1.1c1.6,0,3.1,0.4,4.4,1.1
        c1.3,0.7,2.3,1.8,3.1,3.1c0.8,1.3,1.2,2.8,1.1,4.4c0,1.5-0.4,3-1.1,4.3c-0.7,1.3-1.8,2.3-3.1,3.1C63.8,24.1,62.3,24.5,60.7,24.5z
          M60.7,22.8c1.2,0,2.4-0.3,3.5-0.9c1-0.6,1.8-1.4,2.4-2.4c0.6-1.1,0.9-2.3,0.9-3.5c0-1.2-0.3-2.4-0.9-3.5c-0.6-1-1.4-1.9-2.4-2.4
        c-1.1-0.6-2.3-0.9-3.5-0.9c-1.2,0-2.4,0.3-3.5,0.9c-1,0.6-1.9,1.4-2.4,2.4c-0.6,1.1-0.9,2.3-0.9,3.5c0,1.2,0.3,2.4,0.9,3.5
        c0.6,1,1.4,1.9,2.4,2.4C58.3,22.5,59.5,22.8,60.7,22.8z M81.8,24.5c-1.6,0-3.1-0.4-4.4-1.1c-1.3-0.7-2.4-1.8-3.1-3
        c-0.8-1.3-1.2-2.8-1.1-4.3c0-1.5,0.4-3,1.1-4.4c0.7-1.3,1.8-2.3,3.1-3c1.4-0.8,2.9-1.1,4.4-1.1c1.5,0,3.1,0.4,4.4,1.1
        c1.3,0.7,2.3,1.8,3.1,3.1c0.8,1.3,1.2,2.8,1.1,4.4c0,1.5-0.4,3-1.1,4.3c-0.7,1.3-1.8,2.3-3.1,3C84.8,24.1,83.3,24.5,81.8,24.5z
          M81.8,22.8c1.2,0,2.4-0.3,3.5-0.9c1-0.6,1.8-1.4,2.4-2.4c0.6-1.1,0.9-2.3,0.9-3.5c0-1.2-0.3-2.4-0.9-3.5c-0.6-1-1.4-1.9-2.4-2.4
        c-1.1-0.6-2.3-0.9-3.5-0.9c-1.2,0-2.4,0.3-3.5,0.9c-1,0.6-1.9,1.4-2.4,2.4c-0.6,1.1-0.9,2.3-0.9,3.5c0,1.2,0.3,2.4,0.9,3.5
        c0.6,1,1.4,1.9,2.5,2.4C79.3,22.5,80.5,22.8,81.8,22.8z M102.8,24.5c-1.6,0-3.1-0.4-4.4-1.1c-1.3-0.7-2.4-1.8-3.1-3
        c-0.8-1.3-1.2-2.8-1.1-4.4c0-1.5,0.4-3,1.1-4.4c0.7-1.3,1.8-2.3,3.1-3c1.4-0.8,2.9-1.1,4.4-1.1c1.4,0,2.8,0.3,4,0.9
        c1.1,0.6,2.1,1.5,2.8,2.5V1.4c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.2,0.3,0.4,0.2,0.7v14.7
        c0,1.5-0.4,3-1.2,4.3c-0.8,1.2-1.8,2.3-3.1,3C105.9,24.1,104.3,24.5,102.8,24.5z M102.8,22.8c1.2,0,2.4-0.3,3.5-0.9
        c1-0.6,1.8-1.4,2.4-2.4c0.6-1.1,0.9-2.3,0.9-3.5c0-1.2-0.3-2.4-0.9-3.5c-0.6-1-1.4-1.8-2.4-2.4c-1.1-0.6-2.3-0.9-3.5-0.9
        c-1.2,0-2.4,0.3-3.5,0.9c-1,0.6-1.9,1.4-2.4,2.4C96.3,13.5,96,14.7,96,16c0,1.2,0.3,2.4,0.9,3.5c0.6,1,1.4,1.9,2.4,2.4
        C100.4,22.5,101.6,22.8,102.8,22.8z M120.4,24.3c-0.7,0-1.5-0.2-2.1-0.6c-0.6-0.4-1.1-1.1-1.4-1.8c-0.4-0.8-0.5-1.7-0.5-2.6V1.4
        c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.2c0.3,0,0.5,0.1,0.7,0.2c0.2,0.2,0.3,0.4,0.2,0.7v17.9c0,0.8,0.2,1.6,0.6,2.3
        c0.3,0.6,0.9,0.9,1.6,0.9h0.8c0.2,0,0.4,0.1,0.6,0.2c0.2,0.2,0.2,0.4,0.2,0.7c0,0.2-0.1,0.5-0.2,0.7c-0.2,0.2-0.4,0.3-0.7,0.3
        L120.4,24.3z" />
      </g>
    </svg>
  </StyledLink>
);
