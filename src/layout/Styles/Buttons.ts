import { Button } from "@material-ui/core";
import styled from "styled-components";
import { ButtonProps } from "@material-ui/core/Button";

type DimensionProps = ButtonProps & { 
  width?: string;
  height?: string;
}

export const ButtonPrimary = styled(Button)<DimensionProps>`
  && {
    background: linear-gradient(45deg, #217fff 30%, #43adff 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    padding: 0 15px;

    &:hover {
      box-shadow: 0 1px 2px 1px rgba(33, 33, 33, .3);
    }

    width: ${(props) => props.width ? `${props.width}px` : "100%"};
    height: ${(props) => props.height ? `${props.height}px` : "35px"};

    & > span {
      white-space: nowrap;
    }
  }
`;

export const ButtonSecondary = styled(Button)<DimensionProps>`
  && {
    background: none;
    border: 0;
    color: ${(props) => props.color ? props.color : "white"};
    padding: 0 15px;
    text-transform: none;

    width: ${(props) => props.width ? `${props.width}px` : "100%"};
    height: ${(props) => props.height ? `${props.height}px` : "35px"};

    & > span {
      white-space: nowrap;
    }
  }
`;

export const ButtonError = styled(Button)<DimensionProps>`
  && {
    background: linear-gradient(45deg, #e10005 30%, #ff4145 90%);
    border-radius: 3px;
    border: 0;
    color: white;
    padding: 0 15px;

    &:hover {
      box-shadow: 0 1px 2px 1px rgba(33, 33, 33, .3);
    }

    width: ${(props) => props.width ? `${props.width}px` : "100%"};
    height: ${(props) => props.height ? `${props.height}px` : "35px"};
  }
`;
