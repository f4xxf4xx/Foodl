import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const StyledLogo = styled(Typography)`
  && {
    color: white;
    margin-left: ${props => props.theme.spacing(2.5)}px;
    margin-right: ${props => props.theme.spacing(2.5)}px;
    font-weight: 500;
    font-size: 18px;
    white-space: "nowrap";
  }
`;