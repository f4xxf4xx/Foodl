import styled from 'styled-components';
import { Paper, Typography } from '@material-ui/core';

export const StyledPaper = styled(Paper)`
  && {
    width: 400px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding:8px;
  }
`;

export const Title = styled(Typography)`
  && {
    margin-bottom: 10px;
    font-size: 3rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.04;
    letter-spacing: 0em;
  }
`;