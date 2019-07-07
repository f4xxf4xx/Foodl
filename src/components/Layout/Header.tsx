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
import { StyledToolbar } from "./Styles/StyledToolbar";
import { StyledLogo } from "./Styles/StyledLogo";
import { StyledMenuIcon } from "./Styles/StyledMenuIcon";
import { StyledSpacer } from "./Styles/StyledSpacer";

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
        <StyledToolbar>
          <StyledMenuIcon>
            <MenuIcon />
          </StyledMenuIcon>
          <StyledLogo>Foodl</StyledLogo>
          <StyledSpacer />
          {isAuthenticated(auth) ?
            <ButtonSecondary width="20" onClick={this.onSignOutClick}>Sign out</ButtonSecondary>
            :
            <ButtonSecondary width="20" onClick={() => this.props.history.push("/login")}>Login</ButtonSecondary>
          }
          {/* <Menu
        id="profile-menu"
        open={Boolean(props.profileMenu)}
        anchorEl={props.profileMenu}
        onClose={props.closeProfileMenu}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        disableAutoFocusItem
      >
        <div className={classes.profileMenuUser}>
          <Typography variant="h4" weight="medium">
            John Smith
          </Typography>
          <Typography
            className={classes.profileMenuLink}
            component="a"
            color="primary"
            href="https://flatlogic.com"
          >
            Flalogic.com
          </Typography>
        </div>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <AccountIcon className={classes.profileMenuIcon} /> Profile
        </MenuItem>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <AccountIcon className={classes.profileMenuIcon} /> Tasks
        </MenuItem>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <AccountIcon className={classes.profileMenuIcon} /> Messages
        </MenuItem>
        <div className={classes.profileMenuUser}>
          <Typography
            className={classes.profileMenuLink}
            color="primary"
            onClick={props.signOut}
          >
            Sign Out
          </Typography>
        </div>
      </Menu> */}
        </StyledToolbar>
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