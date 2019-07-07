import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const StyledMenuIcon = styled(IconButton)`
  && {
    color: inherit;
    margin-left: ${props => props.theme.spacing(2)}px;
    padding: ${props => props.theme.spacing(0.5)}px;

    & > span > svg {
      font-size: x-large;
    }
  }
`;