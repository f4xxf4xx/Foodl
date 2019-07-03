import React from "react";
import Sidebar from "./Sidebar";
import {
  CssBaseline
} from '@material-ui/core';
import { Header } from "./Header";
import firebase, { UserInfo } from "firebase";
import { Dispatch, bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as userActions from './../User/userActions';

type DispatchProps = {
  userSignIn: typeof userActions.userSignIn;
  userSignOut: typeof userActions.userSignOut;
};

type Props = DispatchProps;

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
    return (
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <main style={{ flexGrow: 1, padding: 5, marginTop: 70 }}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    userSignIn: bindActionCreators(userActions.userSignIn, dispatch),
    userSignOut: bindActionCreators(userActions.userSignOut, dispatch)
  };
};

const MainLayout = compose(
  connect<{}, DispatchProps>(null, mapDispatchToProps)
)(MainLayoutBase);

export default MainLayout;