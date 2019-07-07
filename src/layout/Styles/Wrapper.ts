import styled from 'styled-components';

export const Wrapper = styled.div`
  && {
    display: flex;
    max-width: 100vw;
    overflow-x: hidden;

    & > div.main {
      flex-grow: 1;
      padding: ${props => props.theme.spacing(3)}px;
      width: calc(100vw - 240px);
      min-height: 100vh;
      margin-top: 70px;
    }
  }
`;