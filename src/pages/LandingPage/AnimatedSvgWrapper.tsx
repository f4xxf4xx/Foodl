import styled from "styled-components";
import { Theme } from "theme";

export const AnimatedSvgWrapper = styled.div<{ theme: Theme }>`
  display: inline-block;
  width: 100%;
  max-width: 512px;
  padding: ${({ theme }) => theme.space.large};

  & svg {
    width: 100%;
    height: auto;
    vertical-align: middle;

    & #layer2 {
      transform: translate(-48 -48)
    }

    & #layer3 {
      transform: translate(-72 -72)
    }
  }
`;
