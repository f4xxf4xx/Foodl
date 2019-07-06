import React from "react";
import { Typography, Toolbar, Grid, Button, IconButton, Box } from '@material-ui/core';
import { StyledAppBar } from "./Styles/StyledAppBar";
import { StyledLink } from "./Styles/StyledLink";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { ApplicationState } from "../..";
import { withFirebase } from "react-redux-firebase";
import { isAuthenticated } from "../../helpers/userHelper";
import { ButtonSecondary } from "./Styles/Buttons";
import { Menu as MenuIcon } from "@material-ui/icons";

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
              <Box display="flex">
                  <IconButton
                    color="inherit"
                  // onClick={toggleSidebar}
                  // className={classNames(
                  // classes.headerMenuButton,
                  // classes.headerMenuButtonCollapse
                  // )}
                  >
                    <MenuIcon
                      classes={{
                        // root: classNames(classes.headerIcon, classes.headerIconCollapse)
                      }}
                    />
                  </IconButton>
                  <Typography
                    variant="h6"
                  // className={classes.logotype}
                  >
                    Foodl
                  </Typography>
              </Box>
            </Grid>
            <Grid item>
              {isAuthenticated(auth) ?
                <ButtonSecondary onClick={this.onSignOutClick}>Sign out</ButtonSecondary>
                :
                <ButtonSecondary onClick={() => this.props.history.push("/login")}>Login</ButtonSecondary>
              }
            </Grid>
          </Grid>
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