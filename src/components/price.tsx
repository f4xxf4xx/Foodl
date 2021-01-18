import React from "react";
import styled from "styled-components";
import { Theme } from "theme";

const StyledContainer = styled.div`
  display: inline;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
  line-height: 1rem;
`;

const StyledDollarSign = styled.span<{ theme: Theme }>`
  font-size: .5em;
  margin-right: ${({theme}) => theme.space.small};
`;

const StyledDollarAmount = styled.span<{ theme: Theme }>`
  font-size: 1em;
  font-weight: bold;
  line-height: 1em;
  vertical-align: top;
`;

const StyledCentAmount = styled.span<{ theme: Theme }>`
  font-size: .5em;
  font-weight: bold;
`;

const StyledTerm = styled.span<{ theme: Theme }>`
  font-size: .33em;
  margin-left: ${({theme}) => theme.space.small};
  line-height: 1em;
`;

interface Props {
  dollars: number;
  cents?: number;
  term?: string;
  className?: string;
}

export const Price: React.FC<Props> = ({dollars, cents, term, className}) => (
  <StyledContainer className={className}>
    <StyledDollarSign>$</StyledDollarSign>
    <StyledDollarAmount>{dollars}</StyledDollarAmount>
    {cents && <StyledCentAmount>.{cents}</StyledCentAmount>}
    {term && <StyledTerm>/{term}</StyledTerm>}
  </StyledContainer>
);