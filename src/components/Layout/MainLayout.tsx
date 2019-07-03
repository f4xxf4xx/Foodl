import React from "react";
import Sidebar from "./Sidebar";
import {
  CssBaseline
} from '@material-ui/core';
import firebase from "firebase";
import { Dispatch, bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as userActions from '../../store/users/userActions';
import Header from "./Header";
import { ApplicationState } from "../..";

type StateProps = {
  signedIn: boolean;
}

type DispatchProps = {
  userSignIn: typeof userActions.userSignIn;
  userSignOut: typeof userActions.userSignOut;
};

type Props = StateProps & DispatchProps;

class MainLayoutBase extends React.Component<Props> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        //TODO on user registering, create a db user for it
        if (user) {
          this.props.userSignIn();
        } else {
          this.props.userSignOut();
        }
      }
    );
  }

  render() {
    const { signedIn } = this.props;
    const user = firebase.auth().currentUser;

    return (
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        {signedIn && user && <Sidebar />}
        <main style={{ flexGrow: 1, padding: 5, marginTop: 70 }}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  signedIn: state.users.signedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userSignIn: bindActionCreators(userActions.userSignIn, dispatch),
  userSignOut: bindActionCreators(userActions.userSignOut, dispatch)
});

const MainLayout = compose(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(MainLayoutBase);

export default MainLayout;