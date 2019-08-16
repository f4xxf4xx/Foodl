import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink, RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ApplicationState } from "..";
import { StyledAppBar } from "./Styles/StyledAppBar";
import { Toolbar, Link } from "@material-ui/core";
import { StyledMenuIcon } from "./Styles/StyledMenuIcon";
import { isAuthenticated } from "../helpers/userHelper";
import { Menu as MenuIcon } from "@material-ui/icons";
import { StyledSpacer } from "./Styles/StyledSpacer";
import { ButtonSecondary } from "./Styles/Buttons";
import { withFirebase } from "react-redux-firebase";

interface OwnProps {
  toggleDrawer: () => void;
}

interface StateProps {
  auth: any;
  firebase: firebase.app.App;
}

type Props = OwnProps & StateProps & RouteComponentProps;

class HeaderBase extends React.Component<Props> {
  public onSignOutClick = () => {
    this.props.firebase.auth().signOut();
    this.props.history.push("/");
  }

  public redirectToLogin = () => {
    this.props.history.push("/login")
  }

  public render() {
    const { auth, toggleDrawer } = this.props;

    return (
      <StyledAppBar position="fixed">
        <Toolbar>
          <StyledMenuIcon onClick={toggleDrawer}>
            {isAuthenticated(auth) &&
              <MenuIcon />
            }
          </StyledMenuIcon>
          <Link to="/" component={RouterLink} variant="h6" noWrap={true}>
            Foodl
          </Link>
          <StyledSpacer />
          {isAuthenticated(auth) ?
            <ButtonSecondary width="80" onClick={this.onSignOutClick}>Sign out</ButtonSecondary>
            :
            <ButtonSecondary width="80" onClick={this.redirectToLogin}>Login</ButtonSecondary>
          }
        </Toolbar>
      </StyledAppBar >
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.firebase.auth,
  firebase: state.firebase
});

const Header = compose(
  connect<StateProps, {}, OwnProps>(mapStateToProps),
)(withRouter(withFirebase(HeaderBase)));

export default Header;
