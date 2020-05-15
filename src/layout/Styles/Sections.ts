import styled from "styled-components";

type DimensionProps = {
  width?: string;
  height?: string;
};

export const StyledSection = styled.div<DimensionProps>`
  && {
    width: ${(props) => (props.width ? `${props.width}px` : "400px")};
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 8px;
  }
`;
