import React from "react";
import { Typography, Toolbar, Grid, Button } from '@material-ui/core';
import { StyledAppBar } from "./Styles/StyledAppBar";
import { StyledLink } from "./Styles/StyledLink";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { ApplicationState } from "../..";
import { withFirebase } from "react-redux-firebase";

type StateProps = {
  auth: any;
  firebase: firebase.app.App;
}

type Props = StateProps & RouteComponentProps;

class HeaderBase extends React.Component<Props> {
  onSignOutClick = () => {
    this.props.firebase.auth().signOut();
    this.props.history.push("/");
  }

  render() {
    const { auth } = this.props;

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
              {auth.isLoaded && !auth.isEmpty ?
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

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.firebase.auth
});

const Header = compose(
  connect<StateProps>(mapStateToProps)
)(withRouter(withFirebase(HeaderBase)));

export default Header;