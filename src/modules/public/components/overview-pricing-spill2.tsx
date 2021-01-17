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

export const OverviewPricingSpill2: React.FC<Props> = ({color}) => {
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
        d="M1615.2 485.485c-5.482-16.307 27.694-44.67 40.773-1.281 4.8 15.913 5.662 21.208 2.975 21.21-4.639.003-38.266-3.622-43.748-19.929zm52.313-16.553c-18.895-16.564-46.363-33.129-129.973-8.145-181.257 54.16-229.636-50.933-133.59-231.706s39.518-224.2 273.031-141.129S1912.6 373.844 1774.4 460.786c-34.195 21.512-54.878 29.062-69.379 29.064-17.07.002-25.577-10.458-37.509-20.919zm-280.7-259.523c-5.822-16.6 1.753-51.214 34.105-28.422 24.495 17.258-4.32 34.191-22.285 34.194-5.764 0-10.407-1.741-11.821-5.772z"
        transform="translate(-1355.611 -47.414)"
      ></path>
    </StyledSvg>
  )
};
