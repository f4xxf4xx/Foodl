import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import styled from "styled-components";

export const StyledLogin = styled(StyledFirebaseAuth)`
  && {
    .mdl-button--raised.mdl-button--colored {
      background: linear-gradient(45deg, #217fff 30%, #43adff 90%);
      border-radius: 3px;
      border: 0;
      color: white;
      padding: 0 15px;
      box-shadow: 0 1px 2px 1px rgba(33, 33, 33, .3);

      &:hover {
        box-shadow: 0 2px 4px 2px rgba(33, 33, 33, .3);
      }

      height: ${(props) => props.height ? `${props.height}px` : "35px"};

      & > span {
        white-space: nowrap;
      }
    }

    .mdl-button--primary.mdl-button--primary {
      color: #217fff;
    }

    .mdl-textfield--floating-label .mdl-textfield__label::after {
      background: linear-gradient(45deg, #217fff 30%, #43adff 90%);
    }
  }
`;
