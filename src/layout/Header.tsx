import React from "react";
import { Typography, Toolbar, Grid, Button, IconButton, Box, Link } from '@material-ui/core';
import { StyledAppBar } from "./Styles/StyledAppBar";
import { RouteComponentProps, withRouter, Link as RouterLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { ButtonSecondary } from "./Styles/Buttons";
import { Menu as MenuIcon } from "@material-ui/icons";
import { StyledMenuIcon } from "./Styles/StyledMenuIcon";
import { StyledSpacer } from "./Styles/StyledSpacer";
import { isAuthenticated } from "../helpers/userHelper";
import { ApplicationState } from "..";

type OwnProps = {
  toggleDrawer: () => void
}

type StateProps = {
  auth: any;
  firebase: firebase.app.App;
}

type Props = OwnProps & StateProps & RouteComponentProps;

class HeaderBase extends React.Component<Props> {
  onSignOutClick = () => {
    this.props.firebase.auth().signOut();
    this.props.history.push("/");
  }

  render() {
    const { auth, toggleDrawer } = this.props;

    return (
      <StyledAppBar position="fixed">
        <Toolbar>
          <StyledMenuIcon onClick={toggleDrawer}>
            {isAuthenticated(auth) &&
              <MenuIcon />
            }
          </StyledMenuIcon>
          <Link to="/" component={RouterLink} variant="h6" noWrap>
            Foodl
          </Link>
          <StyledSpacer />
          {isAuthenticated(auth) ?
            <ButtonSecondary width="80" onClick={this.onSignOutClick}>Sign out</ButtonSecondary>
            :
            <ButtonSecondary width="80" onClick={() => this.props.history.push("/login")}>Login</ButtonSecondary>
          }
        </Toolbar>
      </StyledAppBar >
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.firebase.auth
});

const Header = compose(
  connect<StateProps>(mapStateToProps)
)(withRouter(withFirebase(HeaderBase)));

export default Header;