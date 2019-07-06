import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const ButtonPrimary = styled(Button)`
  && {
    background: linear-gradient(45deg, #217fff 30%, #43adff 90%);
    border-radius: 3px;
    border: 0;
    color: white;    
    padding: 0 15px;
    box-shadow: 0 2px 3px 2px rgba(65, 175, 255, .3);

    &:hover {
      box-shadow: 0 3px 5px 3px rgba(65, 170, 255, .3);
    }

    width: 100%;

    height: ${props => props.height ? `${props.height}px` : "35px"};

    & > span {
      white-space: nowrap;
    }
  }
`;

export const ButtonSecondary = styled(Button)`
  && {
    background: none;
    border: 0;
    color: white;    
    padding: 0 15px;


    width: 100%;

    height: ${props => props.height ? `${props.height}px` : "35px"};

    & > span {
      white-space: nowrap;
    }
  }
`;

export const ButtonError = styled(Button)`
  && {
    background: linear-gradient(45deg, #e10005 30%, #ff4145 90%);
    border-radius: 3px;
    border: 0;
    color: white;    
    padding: 0 30px;
    box-shadow: 0 2px 3px 2px rgba(255, 105, 135, .3);
    margin:5px;

    &:hover {
      box-shadow: 0 3px 5px 3px rgba(255, 105, 135, .3);
    }

    width: max-content;

    height: ${props => props.height ? `${props.height}px` : "35px"}
  }
`;