import React from "react";
import { Typography, Toolbar, Grid, Button } from '@material-ui/core';
import { StyledAppBar } from "./Styles/StyledAppBar";
import { StyledLink } from "./Styles/StyledLink";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch, compose } from "redux";
import * as userActions from './../User/userActions';
import { connect } from "react-redux";
import * as firebase from "firebase";

type StateProps = {
  signedIn: boolean;
}

type DispatchProps = {
  userSignOut: typeof userActions.userSignOut;
};

type Props = StateProps & RouteComponentProps & DispatchProps;

class HeaderBase extends React.Component<Props> {
  onSignOutClick = () => {
    this.props.userSignOut();
    firebase.auth().signOut()
    this.props.history.push("/");
  }

  render() {
    const { signedIn } = this.props;

    return (
      <StyledAppBar position="fixed">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <StyledLink to="/">
                <Typography variant="h6" noWrap>
                  Foodl
                </Typography>
              </StyledLink>
            </Grid>
            <Grid item>
              {signedIn ?
                <Button onClick={this.onSignOutClick}>Sign out</Button>
                :
                <>
                  <Button onClick={() => this.props.history.push("/login")}>Login</Button>
                  <Button onClick={() => this.props.history.push("/register")}>Register</Button>
                </>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </StyledAppBar>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
      signedIn: state.user.signedIn
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    userSignOut: bindActionCreators(userActions.userSignOut, dispatch)
  };
};

const Header = compose(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(withRouter(HeaderBase));

export default Header;