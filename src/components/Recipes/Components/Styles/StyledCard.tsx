import React from 'react';
import styled from 'styled-components';
import { CardMedia, Card } from '@material-ui/core';

export const StyledCard = styled(Card)`
  && {
    transition: 0.3s;
    max-width: 300;
    margin: auto;
    box-shadow: 0 8px 40px -12px rgba(0,0,0,0.3);
    &:hover {
      box-shadow: 0 16px 70px -12px rgba(0,0,0,0.3);
    }
  }
`;