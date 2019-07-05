import React from 'react';
import styled from 'styled-components';
import { StyledFirebaseAuth } from 'react-firebaseui';

export const StyledLogin = styled(StyledFirebaseAuth)`
  && {
    .mdl-button--raised.mdl-button--colored {
      background: linear-gradient(45deg, #217fff 30%, #43adff 90%);
      border-radius: 3px;
      border: 0;
      color: white;    
      padding: 0 15px;
      box-shadow: 0 2px 3px 2px rgba(65, 175, 255, .3);
      margin-top:5px;

      &:hover {
        box-shadow: 0 3px 5px 3px rgba(65, 170, 255, .3);
      }

      height: ${props => props.height ? `${props.height}px` : "35px"};

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