import { Link, Toolbar } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { Link as RouterLink, RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ApplicationState } from "..";
import { isAuthenticated } from "../helpers/userHelper";
import { ButtonSecondary } from "./Styles/Buttons";
import { StyledAppBar } from "./Styles/StyledAppBar";
import { StyledMenuIcon } from "./Styles/StyledMenuIcon";
import { StyledSpacer } from "./Styles/StyledSpacer";

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
});

const Header = compose(
  connect<StateProps>(mapStateToProps),
)(withRouter(withFirebase(HeaderBase)));

export default Header;
