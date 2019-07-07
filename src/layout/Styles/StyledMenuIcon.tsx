import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const StyledMenuIcon = styled(IconButton)`
  && {
    color: inherit;
    ${props => props.theme.breakpoints.up('sm')} {
      display: none;
    }
  }
`;