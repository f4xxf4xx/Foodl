import React from "react";
import Sidebar from "./Sidebar";
import {
  CssBaseline
} from '@material-ui/core';
import firebase, { UserInfo } from "firebase";
import { Dispatch, bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as userActions from './../User/userActions';
import Header from "./Header";

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

    return (
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        {signedIn && <Sidebar />}
        <main style={{ flexGrow: 1, padding: 5, marginTop: 70 }}>
          {this.props.children}
        </main>
      </div>
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
    userSignIn: bindActionCreators(userActions.userSignIn, dispatch),
    userSignOut: bindActionCreators(userActions.userSignOut, dispatch)
  };
};

const MainLayout = compose(
  connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(MainLayoutBase);

export default MainLayout;