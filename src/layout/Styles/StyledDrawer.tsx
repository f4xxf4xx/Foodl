import React from 'react';
import styled from 'styled-components';
import { Drawer } from '@material-ui/core';

export const StyledDrawer = styled(Drawer)`
  && {    
    & > div {
        width: 240px;
    }
  }
`;