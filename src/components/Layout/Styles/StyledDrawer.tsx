import React from 'react';
import styled from 'styled-components';
import { Drawer } from '@material-ui/core';

export const StyledDrawer = styled(Drawer)`
  && {
    width: 240px;
    flex-shrink: 0px;
    
    & > div {
        width: 240px;
    }
  }
`;