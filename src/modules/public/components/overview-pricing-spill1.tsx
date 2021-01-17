import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "styled-components";

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

interface Props {
  color: string;
}

export const OverviewPricingSpill1: React.FC<Props> = ({color}) => {
  const theme = useContext(ThemeContext);
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="458"
      viewBox="0 0 512 458"
      preserveAspectRatio="none"
    >
      <path
        fill={theme.colors.xlight[color]}
        d="M1544.281 503.9c-187.711 60.2-251.033-219.354-138.347-257.565s-48.2-54.926 73.1-118.447 375.2-34.757 382.457 76.931-64.684 272.745-143.761 331.391-86.861-60.079-173.449-32.31zm-156.094-279.429c-6.03-18.451 1.815-56.93 35.319-31.594 25.367 19.184-4.474 38.007-23.079 38.01-5.967.001-10.776-1.935-12.24-6.416z"
        transform="translate(-1350 -94.707)"
      ></path>
    </StyledSvg>
  )
};
