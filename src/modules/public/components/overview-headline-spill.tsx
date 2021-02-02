import React, { useContext } from "react";
import { ThemeContext } from 'styled-components';
import { Theme } from "theme";

interface Props {
  className?: string;
}

export const OverviewHeadlineSpill: React.FC<Props> = ({className}) => {
  const theme = useContext<Theme>(ThemeContext);
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="650" height="451"
      viewBox="0 0 650 451"
      className={className}
    >
      <path
        fill={theme.colors.xlight.orange}
        d="M1683.068 498.494c-6.884-16.78 34.773-45.964 51.2-1.318C1740.286 513.55 1741.373 519 1738 519c-5.826 0-48.049-3.727-54.932-20.506zm65.685-17.033c-23.725-17.044-58.215-34.089-163.2-8.381-227.589 55.73-304.364-203.049-167.738-238.42S1467.437 3.964 1760.64 89.44s295.853 294.178 122.326 383.639c-42.936 22.135-68.906 29.9-87.114 29.906-21.436.002-32.118-10.761-47.1-21.525zM1396.3 214.418c-7.311-17.08 2.2-52.7 42.823-29.245 30.756 17.758-5.424 35.182-27.982 35.184-7.236 0-13.066-1.791-14.841-5.939z"
        data-name="Path 1208"
        transform="translate(-1350 -68)"
      ></path>
    </svg>
  );
}

