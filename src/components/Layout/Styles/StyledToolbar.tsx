import styled from 'styled-components';
import { Toolbar } from '@material-ui/core';

export const StyledToolbar = styled(Toolbar)`
  && {
    padding-left: ${props => props.theme.spacing(2)}px;
    padding-right: ${props => props.theme.spacing(2)}px;
  }
`;